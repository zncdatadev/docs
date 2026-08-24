---
title: 服务发现
---

这个标题下其实是两个不同的问题，Kubedoop 用两套机制分别解决：

- **暴露**——让外部能访问到某个产品，由 `ListenerClass` 和 `Listener` 负责
- **查找**——让一个产品找到另一个产品，由发现（discovery）ConfigMap 负责

一个把 HDFS 暴露在节点端口上、同时让 HDFS 连接 ZooKeeper 的集群，两套都用到了。

## 暴露产品

### ListenerClass

`ListenerClass` 是集群级资源，描述一种暴露策略。产品引用的是 class 的名字而不是 Kubernetes
Service 类型，这样"工作负载如何被外部访问"这个决定，由集群管理者统一做一次。

内置三个 class：

| Class | Service 类型 | 可访问范围 | 地址稳定性 |
|-------|--------------|------------|------------|
| `cluster-internal` | `ClusterIP` | 仅集群内部 | 稳定 |
| `external-unstable` | `NodePort` | 集群外部 | 绑定在 Pod 所在的节点上 |
| `external-stable` | `LoadBalancer` | 集群外部 | 重新调度后依然有效 |

**`external-unstable` 是 NodePort，不是"IP 会变的 LoadBalancer"。** 这个名字描述的是地址特性
而不是实现机制：NodePort 模式下客户端访问的是 Pod 恰好所在的那个节点，因此 Pod 被重新调度后
地址就会变。用 LoadBalancer 的是 `external-stable`。这一点此前被误读过——本项目里有两个 Operator
从早期措辞中得出了相反的结论——所以有必要明确写出来。

无法识别或为空的 class 会落到 `ClusterIP`。最窄的暴露范围才是安全的默认值，
一个拼写错误不应该导致意外的公网地址。

### 自定义 ListenerClass

```yaml
apiVersion: listeners.kubedoop.dev/v1alpha1
kind: ListenerClass
metadata:
  name: external-stable
spec:
  serviceType: LoadBalancer
  serviceExternalTrafficPolicy: Local
  preferredAddressType: HostnameConservative
  serviceAnnotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
```

| 字段 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `serviceType` | 是 | — | `LoadBalancer`、`NodePort` 或 `ClusterIP` |
| `serviceAnnotations` | 否 | `{}` | 透传给 Service——云厂商负载均衡器的配置写在这里 |
| `serviceExternalTrafficPolicy` | 否 | `Local` | `Local` 或 `Cluster` |
| `preferredAddressType` | 否 | `HostnameConservative` | 见下文 |

`serviceAnnotations` 让你在 Kubedoop 不必建模云厂商特性的前提下，依然能使用它们的负载均衡能力。

### preferredAddressType

它决定客户端拿到的是主机名还是 IP：

| 取值 | 行为 |
|------|------|
| `HostnameConservative`（默认） | Service 类型为 `NodePort` 时用 IP，其余情况用主机名 |
| `Hostname` | 始终使用主机名 |
| `IP` | 始终使用 IP |

之所以有这个默认值：NodePort 地址指向的是某个具体节点，而节点主机名对集群外的客户端未必可解析。
其余情况则使用主机名，这样地址变化时依然有效。

### Listener

`Listener` 是把某个 class 落到具体工作负载上的对象：

```yaml
apiVersion: listeners.kubedoop.dev/v1alpha1
kind: Listener
metadata:
  name: hdfs-namenode
spec:
  className: external-stable
  ports:
    - name: http
      port: 9870
      protocol: TCP
```

| 字段 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | 是 | — | 使用哪个 `ListenerClass` |
| `ports` | 否 | — | 具名端口，各自带 `port` 和可选的 `protocol` |
| `extraPodSelectorLabels` | 否 | `{}` | 收窄 listener 背后的 Pod 范围 |
| `publishNotReadyAddresses` | 否 | `true` | 是否发布尚未 ready 的 Pod 地址 |

`publishNotReadyAddresses` 默认为 `true`，这对那些需要在自己 ready **之前**就与同伴通信的产品很关键
——如果成员在启动阶段互相找不到，法定人数就无法形成。需要严格按 readiness 把关时才设为 `false`。

调谐完成后，地址会出现在资源的 status 上：

```bash
kubectl get listener hdfs-namenode -o jsonpath='{.status.ingressAddresses}'
```

`status` 中包含 `ingressAddresses`（每项带 `address`、`addressType` 和端口映射）、
`nodePorts` 和 `serviceName`。

### Pod 如何得知自己的地址

Listener 是通过 CSI 卷而非环境变量接入 Pod 的，这样每个 Pod 都能拿到自己实际被发布的地址。
该卷向 `listeners.kubedoop.dev` StorageClass 申请，由声明上的注解选择 class：

| 注解 | 含义 |
|------|------|
| `listeners.kubedoop.dev/class` | 使用哪个 `ListenerClass` |
| `listeners.kubedoop.dev/listenerName` | 绑定哪个 `Listener`——不设置时默认取 Pod 名 |

这套机制由产品自己配置好，通常你只需要通过产品的 `listenerClass` 字段来使用，
不需要手写卷定义。

`PodListeners` 资源会记录每个 Pod 最终获得的地址，包括该地址的作用域是 `Node` 还是 `Cluster`。

## 查找其他产品

暴露并不能告诉 HDFS "ZooKeeper 在哪"。这件事由 Operator 发布的**发现 ConfigMap** 承担，
消费方按名字引用它。

### 发现 ConfigMap 里有什么

ZooKeeper 的长这样：

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: simple-zk
data:
  ZOOKEEPER: simple-zk-server-default.default.svc.cluster.local:2282/
  ZOOKEEPER_HOSTS: simple-zk-server-default.default.svc.cluster.local
  ZOOKEEPER_PORT: "2282"
  ZOOKEEPER_CHROOT: /
```

| 键 | 内容 |
|----|------|
| `ZOOKEEPER` | 完整连接 URI，含 chroot |
| `ZOOKEEPER_HOSTS` | 逗号分隔的主机列表 |
| `ZOOKEEPER_PORT` | 客户端端口 |
| `ZOOKEEPER_CHROOT` | 该 ConfigMap 所限定的 znode 路径 |

`ZookeeperCluster` 总会产出一个以集群名命名的集群级 ConfigMap，在根 znode `/` 上宣告整个集群。
当集群的 listener class 是 `external-unstable` 时，还会额外产出一个名为 `<cluster>-nodeport`
的 ConfigMap，携带可从外部访问的地址。

### 引用它

消费方只需要 ConfigMap 的名字：

```yaml
apiVersion: hdfs.kubedoop.dev/v1alpha1
kind: HdfsCluster
metadata:
  name: simple-hdfs
spec:
  clusterConfig:
    zookeeperConfigMapName: simple-zk
```

因为引用的是 ConfigMap 名字而不是主机名，ZooKeeper 集群迁移或重新配置时，HDFS 资源不需要改动。

### 用 ZookeeperZnode 做隔离

把多个产品都指向根 znode，会让它们共享同一个命名空间。`ZookeeperZnode` 能划出一条专属路径，
并为它发布独立的发现 ConfigMap：

```yaml
apiVersion: zookeeper.kubedoop.dev/v1alpha1
kind: ZookeeperZnode
metadata:
  name: simple-hdfs-znode
spec:
  clusterRef:
    name: simple-zk
    namespace: default
```

Operator 会创建该 znode，并发出一个以 `ZookeeperZnode` 命名的 ConfigMap，
其中 `ZOOKEEPER_CHROOT` 指向分配到的路径。消费方改为引用这个名字：

```yaml
spec:
  clusterConfig:
    zookeeperConfigMapName: simple-hdfs-znode
```

多个产品共用一套 ZooKeeper 时推荐这种做法——各自拥有独立子树，删除 `ZookeeperZnode` 即可清理。

## 相关内容

- [角色和角色组](../common-configuration-mechanisms/roles-and-role-groups.md)
- [认证](../security/authentication.md)
