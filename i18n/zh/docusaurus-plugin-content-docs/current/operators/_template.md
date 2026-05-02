# {Operator Name}

> {A one-line description of the component this Operator manages and its role in the data platform.}

## 概述

{Brief introduction: what this component is, what problems it solves, and typical use cases. 2-3 paragraphs.}

{Paragraph 1: What is this component? Describe its core functionality and position in the data ecosystem.}

{Paragraph 2: What problems does it solve? What pain points does it address for users?}

{Paragraph 3: Typical use cases and scenarios where this component shines.}

## 前置条件

- Kubernetes {version}+
- kubectl {version}+
- {Other dependencies — e.g., if this component depends on HDFS, list HDFS Operator here}
- Helm v3+ installed — see [Quick Start](../quick-start/installation.md)

## 快速开始

### 安装 Operator

Install the built-in Operators first (required dependencies):

```bash
helm install commons-operator kubedoop/commons-operator -n operators --create-namespace
helm install listener-operator kubedoop/listener-operator -n operators
helm install secret-operator kubedoop/secret-operator -n operators
```

然后安装产品 Operator：

```bash
helm install {operator-name} kubedoop/{operator-name} -n operators
```

Verify that the Operator pod is running:

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
  # {Key configuration: specify the version of the component}
  # {Add role-specific configurations here}

  {roleName}:
    # {Describe the responsibility of this role}
    roleGroups:
      default:
        replicas: 1
        # {Role group-specific configuration overrides}
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

```
NAME                                   READY   STATUS    RESTARTS   AGE
{pod-name}-0                           1/1     Running   0          2m
```

检查集群状态：

```bash
kubectl get {clusterkind} -n {operator-name}
```

## 配置

### 角色和角色组

{List the roles available in this Operator and describe each role's responsibility.}

| 角色 | 描述 |
|------|------|
| {role-1} | {What this role does} |
| {role-2} | {What this role does} |

每个角色可以有多个角色组，通过不同的配置实现高可用、资源隔离或负载分离。

> 更多详情请参阅 [角色与角色组](../core-concepts/common-configuration-mechanisms/roles-and-role-groups.md)。

### 配置项

{List configurable parameters with descriptions.}

| 参数 | 描述 | 默认值 |
|------|------|--------|
| {param-1} | {Description of the parameter} | {default-value} |
| {param-2} | {Description of the parameter} | {default-value} |

配置可以在角色级别设置，也可以在角色组级别覆盖。

> 更多详情请参阅 [配置覆盖](../core-concepts/common-configuration-mechanisms/overrides.md)。

### 监听器和服务

{If this Operator integrates with the Listener Operator for service discovery, explain the configuration.}

{Describe which listeners are available (e.g., internal, external) and how to configure them.}

```yaml
spec:
  {roleName}:
    config:
      listeners:
        {listener-name}:
          type: {internal|external}
          # {Additional listener configuration}
```

> For more details, see [Service Discovery](../core-concepts/connectivity/service-discovery.md).

### 依赖

{List the dependencies this Operator has on other components and how to configure them.}

| 依赖组件 | 是否必需 | 描述 |
|----------|----------|------|
| {dep-1} | Yes | {Why this dependency is needed} |
| {dep-2} | No | {Optional dependency description} |

## 进阶配置

### 资源管理

{Describe how to configure CPU, memory, and storage resources for this Operator's roles.}

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

{Describe how to control pod scheduling using affinity, tolerations, and node selectors.}

> 更多详情请参阅 [Pod 调度](../core-concepts/operations/pod-placement.md)。

### 认证与安全

{Describe security-related configuration such as TLS, Kerberos, or internal authentication.}

> 更多详情请参阅 [认证](../core-concepts/security/authentication.md)。

### 日志

{Describe how to configure and access logs for this component.}

> 更多详情请参阅 [日志](../core-concepts/observability/logging.md)。

## 故障排查

{List common issues and their resolutions specific to this Operator.}

### 常见问题

1. **{Issue title}**
   - **现象**：{用户看到的情况}
   - **原因**：{为什么会发生}
   - **解决方案**：{修复步骤}

2. **{Issue title}**
   - **Symptom**: {What the user sees}
   - **Cause**: {Why this happens}
   - **Resolution**: {Steps to fix}

> 所有 Operator 的通用问题请参阅 [故障排查](../troubleshooting)。

## 清理

删除 {Component} 集群：

```bash
kubectl delete {clusterkind} {cluster-name} -n {operator-name}
```

删除命名空间：

```bash
kubectl delete ns {operator-name}
```

Uninstall the Operator via Helm:

```bash
helm uninstall {operator-name} -n operators
```

## 相关链接

- [{Component} Official Documentation]({upstream-url})
- [Kubedoop Operator for {Component} on GitHub]({github-url})
- [{Component} on GitHub]({component-github-url})
