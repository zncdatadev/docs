# {Operator Name}

> {A one-line description of the component this Operator manages and its role in the data platform.}

## Overview

{Brief introduction: what this component is, what problems it solves, and typical use cases. 2-3 paragraphs.}

{Paragraph 1: What is this component? Describe its core functionality and position in the data ecosystem.}

{Paragraph 2: What problems does it solve? What pain points does it address for users?}

{Paragraph 3: Typical use cases and scenarios where this component shines.}

## Prerequisites

- Kubernetes {version}+
- kubectl {version}+
- {Other dependencies — e.g., if this component depends on HDFS, list HDFS Operator here}
- {Operator Lifecycle Manager (OLM) installed — see [Quick Start](../quick-start/installation.md)}

## Quick Start

### Install the Operator

Install the Operator via an OLM Subscription:

```yaml
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: {operator-name}
  namespace: operators
spec:
  channel: stable
  name: {operator-name}
  source: operatorhubio-catalog
  sourceNamespace: olm
```

```bash
kubectl apply -f - <<EOF
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: {operator-name}
  namespace: operators
spec:
  channel: stable
  name: {operator-name}
  source: operatorhubio-catalog
  sourceNamespace: olm
EOF
```

Verify that the Operator pod is running:

```bash
kubectl get pods -n operators -l app.kubernetes.io/name={operator-name}
```

### Create a Namespace

```bash
kubectl create ns {operator-name}
```

### Deploy {Component}

Create a minimal {Component} cluster using the following CRD example:

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

### Verify the Deployment

Check that all pods are running:

```bash
kubectl get pods -n {operator-name}
```

Expected output:

```
NAME                                   READY   STATUS    RESTARTS   AGE
{pod-name}-0                           1/1     Running   0          2m
```

Check the cluster status:

```bash
kubectl get {clusterkind} -n {operator-name}
```

## Configuration

### Roles and Role Groups

{List the roles available in this Operator and describe each role's responsibility.}

| Role | Description |
|------|-------------|
| {role-1} | {What this role does} |
| {role-2} | {What this role does} |

Each role can have multiple role groups with different configurations for high availability, resource isolation, or workload separation.

> For more details, see [Roles and Role Groups](../core-concepts/common-configuration-mechanisms/roles-and-role-groups.md).

### Configurations

{List configurable parameters with descriptions.}

| Parameter | Description | Default |
|-----------|-------------|---------|
| {param-1} | {Description of the parameter} | {default-value} |
| {param-2} | {Description of the parameter} | {default-value} |

Configuration can be set at the role level or overridden at the role group level.

> For more details, see [Overrides](../core-concepts/common-configuration-mechanisms/overrides.md).

### Listeners and Services

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

### Dependencies

{List the dependencies this Operator has on other components and how to configure them.}

| Dependency | Required | Description |
|-----------|----------|-------------|
| {dep-1} | Yes | {Why this dependency is needed} |
| {dep-2} | No | {Optional dependency description} |

## Advanced

### Resource Management

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

> For more details, see [Resource Management](../core-concepts/resources/resource-manage.md).

### Pod Placement

{Describe how to control pod scheduling using affinity, tolerations, and node selectors.}

> For more details, see [Pod Placement](../core-concepts/operations/pod-placement.md).

### Authentication and Security

{Describe security-related configuration such as TLS, Kerberos, or internal authentication.}

> For more details, see [Authentication](../core-concepts/security/authentication.md).

### Logging

{Describe how to configure and access logs for this component.}

> For more details, see [Logging](../core-concepts/observability/logging.md).

## Troubleshooting

{List common issues and their resolutions specific to this Operator.}

### Common Issues

1. **{Issue title}**
   - **Symptom**: {What the user sees}
   - **Cause**: {Why this happens}
   - **Resolution**: {Steps to fix}

2. **{Issue title}**
   - **Symptom**: {What the user sees}
   - **Cause**: {Why this happens}
   - **Resolution**: {Steps to fix}

> For common issues across all Operators, see [Troubleshooting](../troubleshooting).

## Clean Up

Delete the {Component} cluster:

```bash
kubectl delete {clusterkind} {cluster-name} -n {operator-name}
```

Delete the namespace:

```bash
kubectl delete ns {operator-name}
```

Uninstall the Operator by removing the Subscription:

```bash
kubectl delete subscription {operator-name} -n operators
```

## Related Links

- [{Component} Official Documentation]({upstream-url})
- [Kubedoop Operator for {Component} on GitHub]({github-url})
- [{Component} on GitHub]({component-github-url})
