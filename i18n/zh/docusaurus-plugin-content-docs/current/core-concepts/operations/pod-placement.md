---
title: Pod 放置
---

角色的 Pod 落在哪里，决定了一次故障的代价有多大。三个 ZooKeeper 节点都在同一台机器上，就是三个会
一起消失的 Pod。因此 Kubedoop 的产品都自带一份默认
[亲和性](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/)配置，
把角色打散到不同节点；当你的拓扑需要别的安排时，也可以替换它。

## 默认配置已经存在

每个产品都为自己的角色声明了亲和性默认值——通常是一条让同一角色的副本避开同一节点的
`podAntiAffinity`。你什么都不写就已经生效。

在覆盖它之前请先读下面一节，因为**覆盖不等于追加**。

## 配置亲和性

亲和性配置在 `config` 下，而 `config` 存在于两个层级：

```yaml
apiVersion: zookeeper.kubedoop.dev/v1alpha1
kind: ZookeeperCluster
metadata:
  name: zookeeper
spec:
  server:
    config:
      affinity:                       # 角色级：对该角色的所有角色组生效
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: node-role.kubernetes.io/worker
                    operator: Exists
    roleGroups:
      default:
        replicas: 3
      gpu:
        replicas: 2
        config:
          affinity:                   # 角色组级：只对该组生效
            nodeAffinity:
              requiredDuringSchedulingIgnoredDuringExecution:
                nodeSelectorTerms:
                  - matchExpressions:
                      - key: accelerator
                        operator: In
                        values: ["nvidia"]
```

取值是标准的 Kubernetes
[`Affinity`](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#scheduling)
对象，会原样传递到 Pod spec，因此 `nodeAffinity`、`podAffinity`、`podAntiAffinity`
的行为与在普通 Deployment 中完全一致。

## 亲和性是替换，不是合并

一共三层，自下而上：

1. 产品的角色默认值
2. 角色的 `config.affinity`
3. 角色组的 `config.affinity`

**任何一层只要设置了 `affinity`，就会整体替换它下面那一层。** 这遵循 Kubernetes 的惯例，也符合
编辑该字段的人的预期——但它带来一个很容易忽略的后果。

在角色组级只写一个 `nodeAffinity` 把该组钉到某种机型上，会连同产品的 `podAntiAffinity` 一起丢弃。
结果是这组 Pod 确实落到了正确的节点上，却不再彼此打散——通常与本意正好相反。

**发生这种情况时不会有任何失败。** 资源是合法的，Pod spec 是合法的，所有状态条件都是绿的，
而法定人数已经悄悄不再分散了。

### 如何发现

Operator 会在集群资源上发出 Warning 事件：

```text
Type     Reason              Message
Warning  AffinityOverridden  role "server" group "gpu": the role group's config replaces
                             config.affinity wholesale, discarding the podAntiAffinity declared
                             beneath it. config.affinity follows the Kubernetes rule and is not
                             merged per member; restate the discarded member alongside your own
                             to keep it
```

改动亲和性之后建议检查一下：

```bash
kubectl get events --field-selector reason=AffinityOverridden
```

### 保留被替换掉的部分

把被丢弃的成员和你自己的配置一起重新写出来：

```yaml
config:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
              - key: accelerator
                operator: In
                values: ["nvidia"]
    podAntiAffinity:                        # 必须重新声明，否则丢失
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 70
          podAffinityTerm:
            topologyKey: kubernetes.io/hostname
            labelSelector:
              matchLabels:
                app.kubernetes.io/name: zookeeper
                app.kubernetes.io/instance: zookeeper
                app.kubernetes.io/component: server
```

## 选择拓扑键

`topologyKey` 决定了"打散"是按什么维度：

| 键 | 打散范围 |
|----|----------|
| `kubernetes.io/hostname` | 节点——防止单节点故障 |
| `topology.kubernetes.io/zone` | 可用区——防止单可用区故障 |

按可用区打散要求每个可用区有足够的节点。如果用
`requiredDuringSchedulingIgnoredDuringExecution` 而可用区数少于副本数，多出来的 Pod 会永远处于
`Pending`；`preferredDuringSchedulingIgnoredDuringExecution` 则是降级而非阻塞，
这也是产品默认值偏向后者的原因。

## 相关内容

- [Pod 干扰](./pod-disruptions.md)
- [角色和角色组](../common-configuration-mechanisms/roles-and-role-groups.md)
