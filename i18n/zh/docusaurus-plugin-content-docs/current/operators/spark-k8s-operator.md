---
title: Spark
---

> Kubedoop Operator for Apache Spark —— 在 Kubernetes 上部署和管理 Spark History Server。

## 概述

[Apache Spark](https://spark.apache.org/) 是用于大规模数据处理的分布式引擎。Spark 应用运行时会写出
**事件日志**（event log），记录它执行过的每个 job、stage 和 task。应用一旦结束，driver UI 也随之消失，
留下的就只有这份事件日志。

**Spark History Server** 负责把这些事件日志读回来，为已经结束的应用重新提供同样的 Web UI。
当你想回答"昨晚那个任务为什么慢"时，靠的就是它。

本 Operator 管理的是 History Server。它**不负责**提交或调度 Spark 应用——该 API 中并没有
`SparkApplication` 资源。你照旧用自己的方式运行 Spark，让它把事件日志写到对象存储，
再让 `SparkHistoryServer` 指向同一位置来浏览这些日志。

## 前置条件

- Kubernetes —— 参见[支持的版本](../user-manual/environment/kubernetes.md#支持的版本)
- kubectl
- Helm v3+ —— 参见[安装](../quick-start/installation.md)
- 一个集群内可访问、存放事件日志的 S3 兼容对象存储

## 快速开始

### 安装 Operator

先安装内置 Operator，它们是必需的：

```bash
helm install commons-operator kubedoop/commons-operator -n operators --create-namespace
helm install listener-operator kubedoop/listener-operator -n operators
helm install secret-operator kubedoop/secret-operator -n operators
```

然后安装 Spark Operator：

```bash
helm install spark-k8s-operator kubedoop/spark-k8s-operator -n operators
```

确认它已运行：

```bash
kubectl get pods -n operators -l app.kubernetes.io/name=spark-k8s-operator
```

### 创建命名空间

```bash
kubectl create ns spark
```

### 指向事件日志

History Server 从 S3 读取事件日志，所以先把桶描述出来。凭据来自 SecretClass，连接来自
`S3Connection`，桶来自 `S3Bucket`：

```yaml
apiVersion: s3.kubedoop.dev/v1alpha1
kind: S3Connection
metadata:
  name: minio
  namespace: spark
spec:
  host: minio
  port: 9000
  credentials:
    secretClass: s3-credentials
---
apiVersion: s3.kubedoop.dev/v1alpha1
kind: S3Bucket
metadata:
  name: spark-history
  namespace: spark
spec:
  bucketName: spark-history
  connection:
    reference: minio
```

> 完整的连接选项——TLS、region，以及大多数自建后端都需要的 `pathStyle`——参见
> [S3](../core-concepts/resources/s3.md)。

### 部署 History Server

```bash
kubectl apply -f - <<EOF
apiVersion: spark.kubedoop.dev/v1alpha1
kind: SparkHistoryServer
metadata:
  name: simple-history
  namespace: spark
spec:
  clusterConfig:
    listenerClass: cluster-internal
    logFileDirectory:
      s3:
        prefix: events
        bucket:
          reference: spark-history
  node:
    roleGroups:
      default:
        replicas: 1
EOF
```

`prefix` 是桶内 Spark 应用写事件日志的路径，必须与应用使用的 `spark.eventLog.dir` 保持一致。

### 验证部署

```bash
kubectl get pods -n spark
```

预期输出：

```text
NAME                          READY   STATUS    RESTARTS   AGE
simple-history-node-default-0 1/1     Running   0          2m
```

查看资源：

```bash
kubectl get sparkhistoryserver -n spark
```

通过端口转发访问 UI：

```bash
kubectl port-forward -n spark simple-history-node-default-0 18080:18080
```

然后打开 [http://localhost:18080](http://localhost:18080)。若要在集群外暴露，
请使用 `listenerClass` 而不是端口转发——参见下文[监听器与服务](#监听器与服务)。

## 配置

### 角色与角色组

History Server 只有一个角色：

| 角色 | 说明 |
|------|------|
| `node` | 提供 History Server Web UI，并从配置的存储中读取事件日志 |

当你需要不同的资源或调度策略时，该角色仍然可以拥有多个角色组——但在运行多个之前，
请先看下文关于 cleaner 的说明。

> 更多内容参见
> [角色和角色组](../core-concepts/common-configuration-mechanisms/roles-and-role-groups.md)。

### 配置项

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `clusterConfig.logFileDirectory.s3.bucket` | 存放事件日志的桶，`inline` 或 `reference` | 必填 |
| `clusterConfig.logFileDirectory.s3.prefix` | 桶内路径 | 必填 |
| `clusterConfig.listenerClass` | UI 的暴露方式 | `cluster-internal` |
| `clusterConfig.authentication` | UI 的 OIDC 认证 | 无 |
| `clusterConfig.vectorAggregatorConfigMapName` | Vector 聚合端发现用 ConfigMap | 无 |
| `image.productVersion` | Spark 版本 | `3.5.5` |
| `image.repo` | 镜像仓库 | `quay.io/zncdatadev` |
| `image.pullPolicy` | 镜像拉取策略 | `IfNotPresent` |
| `node.roleGroups.<name>.replicas` | 该组副本数 | `1` |
| `node.config.cleaner` | 是否启用事件日志清理 | `false` |

`clusterConfig` 和 `node` 都是必填的，缺少任一的资源会被拒绝。

> 配置可以在角色级设置、并在角色组级覆盖——参见
> [覆盖配置](../core-concepts/common-configuration-mechanisms/overrides.md)。

### 端口

| 名称 | 端口 | 用途 |
|------|------|------|
| `http` | 18080 | History Server Web UI |
| `metrics` | 18081 | 指标端点 |
| `oidc` | 4180 | OIDC 代理，仅在配置了认证时存在 |

### 监听器与服务

`clusterConfig.listenerClass` 决定 UI 如何被访问：

| 取值 | 暴露方式 |
|------|----------|
| `cluster-internal`（默认） | ClusterIP——仅集群内可访问 |
| `external-unstable` | NodePort——Pod 漂移后地址会变 |
| `external-stable` | LoadBalancer——地址稳定 |

> 更多内容参见[服务发现](../core-concepts/connectivity/service-discovery.md)。

### 依赖

| 依赖 | 必需 | 说明 |
|------|------|------|
| S3 兼容存储 | 是 | 事件日志的唯一来源，没有其他后端可选 |
| `commons-operator`、`listener-operator`、`secret-operator` | 是 | 分别提供 Pod 信息补全、服务暴露和凭据分发 |
| OIDC 提供方 | 否 | 仅在设置了 `clusterConfig.authentication` 时需要 |

## 进阶

### 事件日志清理器

设置 `cleaner: true` 可以让 History Server 删除桶中的旧事件日志。由于这个桶是共享的，
**只能有一个实例执行清理**，Operator 会强制这一点：

```yaml
spec:
  node:
    roleGroups:
      default:
        replicas: 1
        config:
          cleaner: true
```

以下两种配置会直接报错，而不是放任多个清理器互相竞争：

- 在 `replicas` 大于 1 的角色组上启用 `cleaner`
- 角色拥有多个角色组时，在角色级启用 `cleaner`

如果确实需要多个角色组，请只在其中一个单副本组上启用清理器。

### 资源管理

```yaml
spec:
  node:
    config:
      resources:
        cpu:
          min: "1"
          max: "2"
        memory:
          limit: "4Gi"
```

> 更多内容参见[资源管理](../core-concepts/resources/resource-manage.md)。

### Pod 放置

亲和性配置在角色或角色组的 `config.affinity` 下。注意它是**替换**产品默认值，而非与之合并。

> 更多内容参见[Pod 放置](../core-concepts/operations/pod-placement.md)。

### 认证

可以通过引用 `AuthenticationClass` 把 UI 置于 OIDC 提供方之后：

```yaml
spec:
  clusterConfig:
    authentication:
      authenticationClass: keycloak
      oidc:
        clientCredentialsSecret: spark-oidc-client
        extraScopes:
          - profile
```

被引用的 Secret 必须包含 `CLIENT_ID` 和 `CLIENT_SECRET`。配置认证后，Pod 上会增加 OIDC 代理端口
（4180）。

> 更多内容参见[认证](../core-concepts/security/authentication.md)。

### 日志

```yaml
spec:
  node:
    config:
      logging:
        containers:
          node:
            console:
              level: INFO
            file:
              level: DEBUG
```

> 更多内容参见[日志](../core-concepts/observability/logging.md)。

## 故障排查

### 常见问题

1. **UI 能打开，但没有任何应用**
   - **现象**：History Server 正常运行也能访问，但应用列表是空的。
   - **原因**：`prefix` 与 Spark 应用实际写入的路径不一致，或者应用根本没有写事件日志。
   - **解决**：确认应用的 `spark.eventLog.enabled` 为 true，且 `spark.eventLog.dir`
     指向同一个桶和前缀。直接列一下桶，确认文件确实在写进来。

2. **Pod 启动失败或读不到桶**
   - **现象**：Pod 反复重启，或日志里出现 S3 访问错误。
   - **原因**：凭据不对；或者对只支持路径风格的后端使用了虚拟主机寻址。后者在 apply 阶段不会被拦截，
     只会在首次访问时失败。
   - **解决**：确认 SecretClass 提供了 `ACCESS_KEY` 和 `SECRET_KEY`；对 MinIO、Ceph RGW
     这类后端，在 `S3Connection` 上设置 `pathStyle: true`。参见
     [S3](../core-concepts/resources/s3.md)。

3. **启用 cleaner 时资源被拒绝**
   - **现象**：报错提示启用了 cleaner 的角色组数量或副本数大于 1。
   - **原因**：多个实例会争抢删除同一个桶中的内容。
   - **解决**：只在一个 `replicas: 1` 的角色组上启用 `cleaner`。

> 通用运维话题参见 [Pod 干扰](../core-concepts/operations/pod-disruptions.md)。

## 清理

```bash
kubectl delete sparkhistoryserver simple-history -n spark
kubectl delete ns spark
helm uninstall spark-k8s-operator -n operators
```

## 相关链接

- [Spark History Server 官方文档](https://spark.apache.org/docs/latest/monitoring.html)
- [Kubedoop Operator for Apache Spark（GitHub）](https://github.com/zncdatadev/spark-k8s-operator)
- [Apache Spark（GitHub）](https://github.com/apache/spark)
