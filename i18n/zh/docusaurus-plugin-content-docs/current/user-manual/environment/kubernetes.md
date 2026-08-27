---
title: Kubernetes
---

Kubedoop 可以运行在任何符合规范的 Kubernetes 集群上。本页说明它经过测试的版本，
以及内置 Operator 依赖的少数几项集群能力。

## 支持的版本

每个 Operator 的端到端测试都会在每次 PR 和每次发版时跑同一套版本矩阵：

| Kubernetes | 状态 |
|------------|------|
| 1.35 | 已测试 |
| 1.34 | 已测试 |
| 1.33 | 已测试 |

其他版本 CI 不会覆盖。更老的版本很可能也能用——Operator 并没有刻意依赖新的 API——
但真要跑，你就是第一个发现问题的人。

Helm chart 没有声明 `kubeVersion` 约束，因此 Helm 不会阻止你装在任何版本上。
请把上表当作受支持的范围，而不是工具强制执行的限制。

## 集群要求

### CSI

内置 Operator 中有两个是 CSI 驱动，而不是普通的控制器：

| Operator | CSI 驱动 | 提供 |
|----------|----------|------|
| `secret-operator` | `secrets.kubedoop.dev` | 以卷的形式把凭据和证书送进 Pod |
| `listener-operator` | `listeners.kubedoop.dev` | 暴露 Pod，并把地址回写进 Pod |

两者都会注册 `CSIDriver` 对象，并以 DaemonSet 形式运行节点组件，因此集群必须允许 CSI 驱动，
并允许这些 Pod 挂载 kubelet 目录。完全禁止特权工作负载的托管集群跑不了它们，
而缺了它们几乎什么都用不了——每个产品集群的密钥分发和服务暴露都要经过这两个 Operator。

`secret-operator` 的驱动注册参数为 `attachRequired: false`、`podInfoOnMount: true`，
并同时支持 `Ephemeral` 和 `Persistent` 两种卷生命周期模式。

### kubelet 目录

节点组件需要从宿主机挂载 kubelet 的插件目录。chart 默认值为：

```yaml
kubeletDir: /var/lib/kubelet
```

**把 kubelet 放在别处的发行版必须覆盖这个值**，否则驱动永远注册不上，
所有需要密钥卷的 Pod 都会卡在 `Pending`。microk8s 和 k3s 是最常见的情况：

```bash
helm install secret-operator kubedoop/secret-operator -n operators \
  --set kubeletDir=/var/snap/microk8s/common/var/lib/kubelet
```

安装前先确认你的发行版把它放在哪：

```bash
ps aux | grep kubelet | grep -o '\-\-root-dir=[^ ]*'
```

没有输出说明用的是默认路径。

### 存储

有状态的产品——HDFS、Kafka、ZooKeeper——会申请 PersistentVolumeClaim，
因此集群需要一个可用的 `StorageClass`。大多数托管集群自带；
裸的 kind 集群带有 local-path provisioner 提供的 `standard`。

```bash
kubectl get storageclass
```

`listener-operator` 还会额外创建自己的 StorageClass `listeners.listeners.kubedoop.dev`，
供承载监听器地址的临时卷使用。这个不需要你操心。

### RBAC

Operator 需要创建和管理 StatefulSet、Service、ConfigMap、PodDisruptionBudget 以及它们自己的
自定义资源。通过 Helm 安装时会创建所需的 ClusterRole，因此安装者需要具备创建集群级 RBAC 的权限。

## 本地集群

[kind](https://kind.sigs.k8s.io/) 是项目自身端到端测试所使用的环境，也是试用 Kubedoop 最快的方式：

```bash
kind create cluster --image kindest/node:v1.35.0
```

minikube 和 k3d 同样可用。使用 k3d 时请注意上面关于 kubelet 目录的说明。

集群规格应当按你要部署的产品来定，而不是按 Operator 本身：Operator 很轻，
但三节点 ZooKeeper 加 HDFS 再加一个查询引擎，塞不进未调整资源的默认单节点 kind 集群。

## 检查集群

安装前先确认基础条件：

```bash
kubectl version                 # 服务端版本在受支持范围内
kubectl get storageclass        # 至少有一个，最好有默认的
kubectl auth can-i create clusterrole   # Helm 安装需要
```

安装完内置 Operator 后，确认 CSI 驱动已注册：

```bash
kubectl get csidrivers
```

`secrets.kubedoop.dev` 和 `listeners.kubedoop.dev` 都应当出现在列表里。
如果缺失，首先要排查的就是 kubelet 目录。

## 相关内容

- [安装](../../quick-start/installation.md)
- [服务发现](../../core-concepts/connectivity/service-discovery.md)
- [资源管理](../../core-concepts/resources/resource-manage.md)
