---
title: 角色和角色组
---

在软件程序中，一个程序会由多个不同的进程组成，每个进程都有自己的职责。每一个独立的进程定义为角色，角色可以存在多个，一个角色的多副本被称为角色组。角色组是一个逻辑概念，它代表了一个角色的多个实例。角色组的目的是为了提供高可用性和容错能力。

一个角色可以根据不同情况定义多个角色组。例如，一个角色可以有两个角色组，一个角色组在机房A，另一个角色组在机房B。这样，即使机房A发生故障，机房B中的角色组仍然可以继续工作。或者根据不同资源的不同需求，一个角色可以有多个角色组，一个角色组使用SSD，另一个角色组使用HDD。

角色和角色组可以满足一下需求：

- 配置：根据业务需求为角色定义不同配置的角色组。如：内存，CPU，磁盘，或者程序的配置。
- 调度：根据业务需求为角色定义不同调度的角色组。如：机房，网络，或者资源的调度。

## 示例

以 HDFS 为例，HDFS 有多个角色，如 NameNode，DataNode，JournalNode。其中，DataNode 是一个角色，DataNode 的多个实例组成一个角色组。NameNode 也是一个角色，NameNode 的多个实例组成一个角色组。可以根据业务需求为 NameNode 和 DataNode 定义不同配置的角色组。

```yaml
apiVersion: hdfs.zncdata.dev/v1alpha1
kind: HdfsCluster
metadata:
  labels:
    app.kubernetes.io/name: hdfscluster
    app.kubernetes.io/instance: hdfscluster-sample
    app.kubernetes.io/part-of: hdfs-operator
    app.kubernetes.io/managed-by: kustomize
    app.kubernetes.io/created-by: hdfs-operator
  name: hdfscluster-sample
spec:
  image:
    repository: qury.io/zncdata/hadoop
    tag: 3.3.4
  clusterConfig:
    zookeeperDiscoveryZNode: sample-hdfs
  nameNode:
    roleGroups:
      default:
        replicas: 2
  dataNode:
    roleGroups:
      default:
        replicas: 3
        config:
          resources:
            cpu:
              min: 1
              max: 2
            memory:
              limit: "3Gi"
  journalNode:
    roleGroups:
      default:
        replicas: 3
```

在上述示例中，我们定义了：

- 一个 HDFS 集群，包含了 NameNode，DataNode，JournalNode 三个角色。
- NameNode 有一个角色组，包含两个实例。
- DataNode 有一个角色组，包含三个实例，每个实例的 CPU 最小 1，最大 2，内存限制 3Gi。
- JournalNode 有一个角色组，包含三个实例。
