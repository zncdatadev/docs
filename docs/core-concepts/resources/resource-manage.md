
# 资源管理

datastack 通过 operator 以 StatefulSets 或者 DaemonSets 的方式部署产品组件程序。为了满足不同场景和需求，可以通过资管管理指定程序运行时请求的 CPU 和内存资源，也可以限制其使用上限。

## 名词解释

资源管理是定义 CPU 、 内存（RAM）、存储（storage）三种资源类型。

### CPU

#### min

CPU 请求是程序运行时请求的 CPU 资源。CPU 请求是程序运行时的最小 CPU 资源需求。如果程序请求的 CPU 资源超过节点的 CPU 资源，程序将无法运行。

#### max

CPU 限制是程序运行时的 CPU 资源上限。如果程序使用的 CPU 资源超过限制，程序将被 Kubernetes 限制，但不会被终止。

### 内存

#### limit

内存限制是程序运行时的内存资源上限。如果程序使用的内存资源超过限制，程序将被 Kubernetes 限制，程序会被终止。为了避免程序被终止，需要根据程序的实际内存使用情况设置合理的内存限制。

### 存储

存储是程序运行时请求的存储空间。指定的存储大小是通过 PVC（Persistent Volume Claim）来为程序分配一个最大可用的存储空间。

## 资源请求

在角色和角色组中，都可以使用 `resource` 定义资源配置。其中角色级别的资源配置会覆盖角色组级别的资源配置。而角色组级别的资源配置会覆盖角色级别的资源配置。

### CPU 和内存

```yaml
apiVersion: hdfs.kubedoop.dev/v1alpha1
kind: HdfsCluster
  name: hdfscluster-sample
spec:
  nameNode:
    config:
      resources:
        cpu:
          min: "1"
          max: "2"
        memory:
          limit: "1Gi"
    roleGroups:
      rg-1:
        replicas: 2
      rg-2:
        replicas: 2
        config:
          resources:
            cpu:
              min: "2"
              max: "4"
            memory:
              limit: "2Gi"
```

在上述示例中，我们定义了：

- 一个 HDFS 集群，包含了 NameNode 一个角色。
- NameNode 有两个角色组，rg-1 和 rg-2。
- Namenode 角色定义每个实例的 CPU 最小 1，最大 2，内存限制 1Gi。
- rg-1 角色组包含两个实例，每个实例的 CPU 最小 1，最大 2，内存限制 1Gi。继承自角色的配置。
- rg-2 角色组包含两个实例，每个实例的 CPU 最小 2，最大 4，内存限制 2Gi。使用角色组的配置，覆盖了角色的配置。

### 存储配置

```yaml
apiVersion: hdfs.kubedoop.dev/v1alpha1
kind: HdfsCluster
  name: hdfscluster-sample
spec:
  nameNode:
    config:
      resources:
        storage:
          data:
            capacity: 10Gi
    roleGroups:
      rg-1:
        replicas: 2
      rg-2:
        replicas: 2
        config:
          resources:
            storage:
              data:
                capacity: 20Gi
```

在上述示例中，我们定义了：

- 一个 HDFS 集群，包含了 NameNode 一个角色。
- NameNode 有两个角色组，rg-1 和 rg-2。
- Namenode 角色定义每个实例的 `data` 存储容量 10Gi。
- rg-1 角色组包含两个实例，每个实例的 `data` 存储容量 10Gi。继承自角色的配置。
- rg-2 角色组包含两个实例，每个实例的 `data` 存储容量 20Gi。使用角色组的配置，覆盖了角色的配置。

#### 存储累

存储的底层技术是通过 kubernetes 的 StorageClass 来实现的。可以配置不同特性的的存储类，灵活的为程序分配存储空间。如使用 SSD 存储，HDD 存储，或者 NFS 存储的存储类。

在 `storage` 中 StorageClass 不是强制的，如果没有配置，则使用集群中默认的 StorageClass 。

配置示例：

```yaml
...
resources:
  storage:
    data: # name of the storage
      capacity: 4Gi
      storageClass: ssd-storage-class
```
