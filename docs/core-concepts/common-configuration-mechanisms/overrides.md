
# 高级： 配置覆盖

为了 datastack 中所有产品能快速安全的运行，所有产品都提供了相应的默认配置。但是，有时候你可能需要覆盖这些默认配置。这个文档将会介绍如何覆盖 datastack 中的配置。

所有产品都支持覆盖机制，以提供简单灵活的方式更改程序配置，环境变量和 operator 配置。

## 配置覆盖

在角色和角色组中，可以使用 `configOverrides` 字段覆盖默认配置。

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
    configOverrides:
      hdfs-site.xml:
        fs.trash.interval: "5"
    roleGroups:
      default:
        replicas: 2
        configOverrides:
          hdfs-site.xml:
            dfs.namenode.num.checkpoints.retained: "3"
```

上述示例中，我们定义了：

- namenode 的 `hdfs-site.xml` 配置覆盖了 `fs.trash.interval` 为 5。
- namenode 的角色组 `default` 的 `hdfs-site.xml` 配置覆盖了 `dfs.namenode.num.checkpoints.retained` 为 3。

## 环境变量覆盖

在角色和角色组中，可以使用 `envOverrides` 字段覆盖默认环境变量。

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
    configOverrides:
      hdfs-site.xml:
        fs.trash.interval: "5"
    roleGroups:
      default:
        replicas: 2
        envOverrides:
          FOO: "bar"
```

在上述示例中，通过在 namenode 的角色组 `default` 中添加 `envOverrides` 字段，我们将环境变量 `FOO` 的值覆盖为 `bar`。

## 命令行参数覆盖

在角色和角色组中，可以使用 `commandOverrides` 字段覆盖默认命令行参数。

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
        commandOverrides:
          - "-Dfoo=bar"
```

在上述示例中，通过在 namenode 的角色组 `default` 中添加 `commandOverrides` 字段，我们将命令行参数 `-Dfoo=bar` 添加到 namenode 的启动命令中。

## pod 模板覆盖

在角色和角色组中，可以使用 `podTemplateOverrides` 字段覆盖默认 pod 模板。

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
    podOverrides:
      spec:
        tolerations:
          - key: "key"
            operator: "Equal"
            value: "value"
            effect: "NoSchedule"
    roleGroups:
      default:
        replicas: 2
        podOverrides:
          metadata:
            labels:
              foo: bar
```

`podOverrides` 是通过 `PodTemplateSpec` 来覆盖默认 pod 模板的字段。合法的 `PodTemplateSpec` 配置都可以在 `podOverrides` 中使用。

在上述示例中，为 namenode 角色增加了 `tolerations` ，所有 namenode 的角色组都会继承这个 `tolerations`。同时，为 namenode 的角色组 `default` 添加了 `metadata.labels` 字段，所有 namenode 的角色组都会继承这个 `metadata.labels`。

pod 的配置覆盖级别如下(由低到高)：

- operator 生成的 PodTemplateSpec
- 角色级别的 PodTemplateSpec
- 角色组级别的 PodTemplateSpec
