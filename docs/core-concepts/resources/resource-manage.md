# Resource Management

datastack deploys product component programs through operator in the form of StatefulSets or DaemonSets.
To meet different scenarios and needs, you can manage the CPU and memory resources requested by the specified program at runtime through resource management,
and you can also limit its usage.

## Terminology

Resource management defines three types of resources: CPU, memory (RAM), and storage.

### CPU

#### min

CPU request is the CPU resource requested by the program at runtime. The CPU request is the minimum CPU resource requirement for the program to run.
If the CPU resources requested by the program exceed the CPU resources of the node, the program will not be able to run.

#### max

CPU limit is the upper limit of CPU resources for the program at runtime. If the CPU resources used by the program exceed the limit, the program will be restricted by Kubernetes but will not be terminated.

### Memory

#### limit

Memory limit is the upper limit of memory resources for the program at runtime. If the memory resources used by the program exceed the limit,
the program will be restricted by Kubernetes and the program will be terminated. To avoid the program being terminated,
it is necessary to set a reasonable memory limit based on the actual memory usage of the program.

### Storage

Storage is the storage space requested by the program at runtime. The specified storage size is allocated to the program through PVC (Persistent Volume Claim) as the maximum available storage space.

## Resource Requests

In roles and role groups, you can use `resource` to define resource configurations. The resource configuration at the role level will override the
resource configuration at the role group level. The resource configuration at the role group level will override the resource configuration at the role level.

### CPU and Memory

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

In the above example, we defined:

- An HDFS cluster, which includes a NameNode role.
- The NameNode has two role groups, rg-1 and rg-2.
- The NameNode role defines a minimum CPU of 1, a maximum of 2, and a memory limit of 1Gi for each instance.
- The rg-1 role group contains two instances, each with a minimum CPU of 1, a maximum of 2, and a memory limit of 1Gi. Inherited from the role configuration.
- The rg-2 role group contains two instances, each with a minimum CPU of 2, a maximum of 4, and a memory limit of 2Gi. Uses the role group configuration, overriding the role configuration.

### Storage Configuration

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

In the above example, we defined:

- An HDFS cluster, which includes a NameNode role.
- The NameNode has two role groups, rg-1 and rg-2.
- The NameNode role defines a `data` storage capacity of 10Gi for each instance.
- The rg-1 role group contains two instances, each with a `data` storage capacity of 10Gi. Inherited from the role configuration.
- The rg-2 role group contains two instances, each with a `data` storage capacity of 20Gi. Uses the role group configuration, overriding the role configuration.

#### Storage Class

The underlying technology of storage is implemented through Kubernetes' StorageClass. Different types of storage classes can be configured
to flexibly allocate storage space for programs, such as using SSD storage, HDD storage, or NFS storage classes.

In `storage`, StorageClass is not mandatory. If not configured, the default StorageClass in the cluster will be used.

Configuration example:

```yaml
...
resources:
  storage:
    data: # name of the storage
      capacity: 4Gi
      storageClass: ssd-storage-class
```
