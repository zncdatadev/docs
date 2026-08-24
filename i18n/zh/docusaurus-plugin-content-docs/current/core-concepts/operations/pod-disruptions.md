---
title: Pod 干扰
---

Kubernetes 集群会因为和你的负载毫无关系的原因挪动 Pod：为升级排空节点、重新均衡、缩容节点池。
这些属于**自愿性干扰**，而
[PodDisruptionBudget](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/)
正是负载用来告诉集群"我最多能同时下线几个 Pod"的手段。

对基于法定人数（quorum）的角色来说这尤其要紧。同时驱逐三个 ZooKeeper 节点中的两个，不是让集群变慢，
而是直接失去法定人数、停止服务。

Kubedoop 会**按角色**写出 PodDisruptionBudget，默认值由 Operator 根据它对该产品的了解选取。
你不需要做任何配置就已经受到保护。

## 配置

每个角色都接受 `roleConfig.podDisruptionBudget` 配置块：

```yaml
apiVersion: zookeeper.kubedoop.dev/v1alpha1
kind: ZookeeperCluster
metadata:
  name: zookeeper
spec:
  server:
    roleConfig:
      podDisruptionBudget:
        enabled: true
        maxUnavailable: 1
    roleGroups:
      default:
        replicas: 3
```

| 字段 | 类型 | 默认值 | 含义 |
|------|------|--------|------|
| `enabled` | 布尔 | `true` | Operator 是否为该角色写出 PDB |
| `maxUnavailable` | 整数 | 因产品而异 | 该角色允许同时下线的 Pod 数 |

两个字段都是可选的，配置块本身也是可选的。

注意 `roleConfig` 是**角色级**配置，不会被下面的角色组继承或覆盖。

### `enabled` 默认为 true，省略时也是

完全不写 `podDisruptionBudget`，以及只写了 `maxUnavailable` 的配置块，两种情况下 PDB 都保持启用。
一个角色仅仅为了调高 `maxUnavailable` 而提到这个块，它的 PDB 依然存在——只有显式写
`enabled: false` 才会失去它。

### `maxUnavailable` 按产品取默认值

不设置时，Operator 会依据它对该产品的了解给出取值，而不是套用一个统一数字，因为安全阈值因角色而异：
三节点法定人数只能容忍损失一个，而无状态工作节点池能容忍的多得多。

只有当你比 Operator 更清楚该产品在你这套拓扑下的容忍度时，才需要自己设置。

## 使用自定义 PDB

`enabled: false` 会让 Operator 不再为该角色写 PDB，适合你打算自己管理的场景：

```yaml
spec:
  server:
    roleConfig:
      podDisruptionBudget:
        enabled: false
```

此后 Operator 不再干预该角色，你用自己的选择器创建的 PodDisruptionBudget 会正常生效。
但要注意：关掉之后**不**补上替代品，等于该角色对自愿性驱逐完全失去保护。

## PDB 管不了的事

PodDisruptionBudget 只约束自愿性干扰。节点硬崩溃、内核 panic、Pod 因超出内存限制被杀，
这些都属于非自愿干扰，预算对它们没有发言权。应对这类情况的手段是把角色分散到不同故障域，
参见 [Pod 放置](./pod-placement.md)。

## 相关内容

- [Pod 放置](./pod-placement.md)
- [角色和角色组](../common-configuration-mechanisms/roles-and-role-groups.md)
