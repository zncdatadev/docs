# {Operator Name}

> {该 Operator 管理的组件的一句话描述及其在数据平台中的角色。}

## 概述

{简要介绍：该组件是什么，解决什么问题，典型用例。2-3 段。}

{第一段：该组件是什么？描述其核心功能和在数据生态中的定位。}

{第二段：解决什么问题？为用户解决了哪些痛点？}

{第三段：典型用例和适用场景。}

## 前置条件

- Kubernetes {version}+
- kubectl {version}+
- {其他依赖 — 例如：如果该组件依赖 HDFS，在此列出 HDFS Operator}
- Helm v3+ 已安装 — 参见 [快速开始](../quick-start/installation.md)

## 快速开始

### 安装 Operator

先安装内置 Operator（必需依赖）：

```bash
helm install commons-operator kubedoop/commons-operator -n operators --create-namespace
helm install listener-operator kubedoop/listener-operator -n operators
helm install secret-operator kubedoop/secret-operator -n operators
```

然后安装产品 Operator：

```bash
helm install {operator-name} kubedoop/{operator-name} -n operators
```

验证 Operator Pod 是否正常运行：

```bash
kubectl get pods -n operators -l app.kubernetes.io/name={operator-name}
```

### 创建命名空间

```bash
kubectl create ns {operator-name}
```

### 部署 {Component}

使用以下 CRD 示例创建一个最小化的 {Component} 集群：

```yaml
apiVersion: {group}.kubedoop.dev/v1alpha1
kind: {ClusterKind}
metadata:
  name: {cluster-name}
  namespace: {operator-name}
  labels:
    app.kubernetes.io/name: {cluster-name}
    app.kubernetes.io/instance: {cluster-name}
spec:
  # {关键配置：指定组件版本}
  # {在此添加角色相关配置}

  {roleName}:
    # {描述该角色的职责}
    roleGroups:
      default:
        replicas: 1
        # {角色组级别的配置覆盖}
```

```bash
kubectl apply -f - <<EOF
apiVersion: {group}.kubedoop.dev/v1alpha1
kind: {ClusterKind}
metadata:
  name: {cluster-name}
  namespace: {operator-name}
spec:
  {roleName}:
    roleGroups:
      default:
        replicas: 1
EOF
```

### 验证部署

检查所有 Pod 是否正常运行：

```bash
kubectl get pods -n {operator-name}
```

预期输出：

```text
NAME                                   READY   STATUS    RESTARTS   AGE
{pod-name}-0                           1/1     Running   0          2m
```

检查集群状态：

```bash
kubectl get {ClusterKind} -n {operator-name}
```

## 配置

### 角色和角色组

{列出此 Operator 中的可用角色并描述各角色的职责。}

| 角色 | 描述 |
|------|------|
| {role-1} | {该角色的职责} |
| {role-2} | {该角色的职责} |

每个角色可以有多个角色组，通过不同的配置实现高可用、资源隔离或负载分离。

> 更多详情请参阅 [角色与角色组](../core-concepts/common-configuration-mechanisms/roles-and-role-groups.md)。

### 配置项

{列出可配置的参数及说明。}

| 参数 | 描述 | 默认值 |
|------|------|--------|
| {param-1} | {参数描述} | {默认值} |
| {param-2} | {参数描述} | {默认值} |

配置可以在角色级别设置，也可以在角色组级别覆盖。

> 更多详情请参阅 [配置覆盖](../core-concepts/common-configuration-mechanisms/overrides.md)。

### 监听器和服务

{如果此 Operator 通过 Listener Operator 集成服务发现，请说明配置方式。}

{描述可用的监听器（如 internal、external）及其配置方式。}

```yaml
spec:
  {roleName}:
    config:
      listeners:
        {listener-name}:
          type: {internal|external}
          # {额外的监听器配置}
```

> 更多详情请参阅 [服务发现](../core-concepts/connectivity/service-discovery.md)。

### 依赖

{列出此 Operator 对其他组件的依赖及配置方式。}

| 依赖组件 | 是否必需 | 描述 |
|----------|----------|------|
| {dep-1} | 是 | {为什么需要此依赖} |
| {dep-2} | 否 | {可选依赖的描述} |

## 进阶配置

### 资源管理

{描述如何为此 Operator 的角色配置 CPU、内存和存储资源。}

```yaml
spec:
  {roleName}:
    config:
      resources:
        cpu:
          min: "1"
          max: "2"
        memory:
          limit: "4Gi"
        storage:
          {volume-name}:
            capacity: 100Gi
```

> 更多详情请参阅 [资源管理](../core-concepts/resources/resource-manage.md)。

### Pod 调度

{描述如何通过亲和性、容忍度和节点选择器控制 Pod 调度。}

> 更多详情请参阅 [Pod 调度](../core-concepts/operations/pod-placement.md)。

### 认证与安全

{描述安全相关配置，如 TLS、Kerberos 或内部认证。}

> 更多详情请参阅 [认证](../core-concepts/security/authentication.md)。

### 日志

{描述如何配置和访问此组件的日志。}

> 更多详情请参阅 [日志](../core-concepts/observability/logging.md)。

## 故障排查

{列出此 Operator 的常见问题及解决方案。}

### 常见问题

1. **{问题标题}**
   - **现象**：{用户看到的情况}
   - **原因**：{为什么会发生}
   - **解决方案**：{修复步骤}

2. **{问题标题}**
   - **现象**：{用户看到的情况}
   - **原因**：{为什么会发生}
   - **解决方案**：{修复步骤}

> 所有 Operator 的通用运维问题请参阅 [运维管理](../core-concepts/operations/pod-disruptions.md)。

## 清理

删除 {Component} 集群：

```bash
kubectl delete {ClusterKind} {cluster-name} -n {operator-name}
```

删除命名空间：

```bash
kubectl delete ns {operator-name}
```

通过 Helm 卸载 Operator：

```bash
helm uninstall {operator-name} -n operators
```

## 相关链接

- [{Component} 官方文档]({upstream-url})
- [Kubedoop Operator for {Component} GitHub]({github-url})
- [{Component} GitHub]({component-github-url})
