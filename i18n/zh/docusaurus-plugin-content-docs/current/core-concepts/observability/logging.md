---
title: 日志
---

Kubedoop 为所有产品提供同一套日志控制：可以按角色或单个角色组设置的容器级日志级别，
以及一个可选的 [Vector](https://vector.dev/) agent，负责把产生的日志文件发送到聚合器。

## 日志写在哪

容器把日志写在 `/kubedoop/log/` 下，每个容器一个目录：

```text
/kubedoop/log/<container>/<container>.<suffix>
```

后缀取决于产品使用的日志框架。控制台输出和这些文件会同时产生，两者独立配置——见下文。

## 配置日志级别

日志配置位于 `config` 下，因此可以在角色上设置，再按角色组细化：

```yaml
apiVersion: trino.kubedoop.dev/v1alpha1
kind: TrinoCluster
metadata:
  name: trino
spec:
  coordinator:
    config:
      logging:
        containers:
          trino:
            console:
              level: INFO
            file:
              level: DEBUG
            loggers:
              io.trino.server:
                level: DEBUG
    roleGroups:
      default:
        replicas: 1
```

结构如下：

| 键 | 含义 |
|----|------|
| `containers.<name>` | 这些设置作用于哪个容器 |
| `containers.<name>.console.level` | 控制台（stdout）输出的阈值 |
| `containers.<name>.file.level` | 文件输出的阈值 |
| `containers.<name>.loggers.<name>.level` | 某个具名 logger 的阈值 |
| `enableVectorAgent` | 是否注入 Vector sidecar |

所有 `level` 取值范围：

```text
FATAL  ERROR  WARN  INFO  DEBUG  TRACE
```

### 不设置意味着继承

`level` 在 CRD 里刻意没有默认值。不填写它表示"继承"：

- 角色组没填时，取角色上的取值
- 都没有设置时，走产品自身的默认——根 logger 为 `INFO`，输出端不设阈值

这正是为什么在角色组里写一个空的 `console: {}` 不会悄悄覆盖你在角色级设的 `DEBUG`。
如果该字段带了 CRD 默认值，API server 会在其外层对象一存在时就把它填上，
角色级的取值就永远赢不了。

### 非 Java 产品会做级别映射

Kubedoop 的级别名沿用 Java 惯例。日志框架使用不同命名的产品会得到一层映射：

| Kubedoop | 映射为 |
|----------|--------|
| `FATAL` | `CRITICAL` |
| `ERROR` | `ERROR` |
| `WARN` | `WARNING` |
| `INFO` | `INFO` |
| `DEBUG` | `DEBUG` |
| `TRACE` | `DEBUG` |

在这类产品上 `TRACE` 和 `DEBUG` 会塌缩到同一级别，所以请求 `TRACE` 并不会比 `DEBUG` 拿到更多信息。

## 用 Vector 发送日志

设置 `enableVectorAgent: true` 会注入一个 Vector sidecar，它会跟踪日志目录并转发到你自己运行的
聚合器：

```yaml
spec:
  clusterConfig:
    vectorAggregatorConfigMapName: vector-aggregator-discovery
  coordinator:
    config:
      logging:
        enableVectorAgent: true
```

聚合器的地址并不写在集群资源里。`vectorAggregatorConfigMapName` 指向同命名空间下的一个
ConfigMap，其中只有一个键：

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: vector-aggregator-discovery
data:
  ADDRESS: http://vector-aggregator.default.svc.cluster.local:6000
```

这层间接的意义在于：聚合器迁移时不必逐个修改产品集群资源。

## 启用 agent 却没有聚合器会直接报错

如果 Vector agent 已启用、产品也确实产生日志，但 `vectorAggregatorConfigMapName` 为空，
调谐会直接失败，而不是发出一个无处投递的 sidecar：

```text
vector agent is enabled but vectorAggregatorConfigMapName is not configured (role "coordinator", group "default")
```

指定了但无法解析的 ConfigMap 会以同样方式失败，并且报错会指出是哪一项检查没通过：

```text
configmap default/vector-aggregator-discovery missing "ADDRESS" key
configmap default/vector-aggregator-discovery has empty "ADDRESS" value
```

这是刻意设计。一条接错了却不报错的日志链路，看起来一切正常，直到你真正需要日志的那一刻。

## 相关内容

- [角色和角色组](../common-configuration-mechanisms/roles-and-role-groups.md)
- [配置覆盖](../common-configuration-mechanisms/overrides.md)
