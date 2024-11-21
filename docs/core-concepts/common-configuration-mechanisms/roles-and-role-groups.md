---
title: Roles and Role Groups
---

In a software program, a program consists of multiple different processes, each with its own responsibilities.
Each independent process is defined as a role, and there can be multiple instances of a role. Multiple instances of a role are called a role group.
A role group is a logical concept that represents multiple instances of a role. The purpose of a role group is to provide high availability and fault tolerance.

A role can define multiple role groups based on different situations. For example, a role can have two role groups, one in Data Center A and another in Data Center B.
This way, even if Data Center A fails, the role group in Data Center B can continue to work. Or, based on different resource requirements,
a role can have multiple role groups, one using SSD and another using HDD.

Roles and role groups can meet the following needs:

- Configuration: Define role groups with different configurations for roles based on business needs, such as memory, CPU, disk, or program configuration.
- Scheduling: Define role groups with different scheduling for roles based on business needs, such as data center, network, or resource scheduling.

## Example

Take HDFS as an example. HDFS has multiple roles, such as NameNode, DataNode, and JournalNode. Among them, DataNode is a role,
and multiple instances of DataNode form a role group. NameNode is also a role, and multiple instances of NameNode form a role group.
Different configurations of role groups can be defined for NameNode and DataNode based on business needs.

```yaml
apiVersion: hdfs.kubedoop.dev/v1alpha1
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
    repository: qury.io/zncdatadev/hadoop
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

In the above example, we have defined:

- An HDFS cluster that includes three roles: NameNode, DataNode, and JournalNode.
- NameNode has a role group with two instances.
- DataNode has a role group with three instances, each with a minimum CPU of 1, a maximum CPU of 2, and a memory limit of 3Gi.
- JournalNode has a role group with three instances.
