---
title: Spark
---

> Kubedoop Operator for Apache Spark — deploys and manages the Spark History Server on Kubernetes.

## Overview

[Apache Spark](https://spark.apache.org/) is a distributed engine for large-scale data processing.
When a Spark application runs it writes an *event log* describing every job, stage and task it
executed. Once the application finishes, its driver UI disappears along with it, and that event log
is all that remains.

The **Spark History Server** reads those event logs back and serves the same web UI for applications
that have already completed. It is how you answer "why was last night's job slow?" after the job is
gone.

This Operator manages the History Server. It does **not** submit or schedule Spark applications —
there is no `SparkApplication` resource in this API. You run Spark however you already do, point it
at an object store for event logs, and point a `SparkHistoryServer` at the same location to browse
them.

## Prerequisites

- Kubernetes — see [supported versions](../user-manual/environment/kubernetes.md#supported-versions)
- kubectl
- Helm v3+ — see [Installation](../quick-start/installation.md)
- An S3-compatible object store holding the event logs, reachable from the cluster

## Quick Start

### Install the Operator

Install the built-in Operators first — they are required:

```bash
helm install commons-operator kubedoop/commons-operator -n operators --create-namespace
helm install listener-operator kubedoop/listener-operator -n operators
helm install secret-operator kubedoop/secret-operator -n operators
```

Then the Spark Operator:

```bash
helm install spark-k8s-operator kubedoop/spark-k8s-operator -n operators
```

Verify it is running:

```bash
kubectl get pods -n operators -l app.kubernetes.io/name=spark-k8s-operator
```

### Create a Namespace

```bash
kubectl create ns spark
```

### Point at the event logs

The History Server reads event logs from S3, so describe the bucket first. Credentials come from a
SecretClass, the connection from an `S3Connection`, and the bucket from an `S3Bucket`:

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

> For the full set of connection options — TLS, region, and the `pathStyle` setting that most
> self-hosted backends need — see [S3](../core-concepts/resources/s3.md).

### Deploy the History Server

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

`prefix` is the path inside the bucket that your Spark applications write event logs to. It must
match whatever `spark.eventLog.dir` your applications use.

### Verify the Deployment

```bash
kubectl get pods -n spark
```

Expected output:

```text
NAME                          READY   STATUS    RESTARTS   AGE
simple-history-node-default-0 1/1     Running   0          2m
```

Check the resource:

```bash
kubectl get sparkhistoryserver -n spark
```

Reach the UI by port-forwarding to the pod:

```bash
kubectl port-forward -n spark simple-history-node-default-0 18080:18080
```

Then open [http://localhost:18080](http://localhost:18080). To expose it beyond the cluster, use
`listenerClass` rather than port-forwarding — see [Listeners and Services](#listeners-and-services)
below.

## Configuration

### Roles and Role Groups

The History Server has a single role:

| Role | Description |
|------|-------------|
| `node` | Serves the History Server web UI and reads event logs from the configured storage |

A role can still have several role groups when you want different resources or scheduling — but see
the note on the cleaner below before running more than one.

> For more details, see
> [Roles and Role Groups](../core-concepts/common-configuration-mechanisms/roles-and-role-groups.md).

### Configurations

| Parameter | Description | Default |
|-----------|-------------|---------|
| `clusterConfig.logFileDirectory.s3.bucket` | The bucket holding event logs, `inline` or `reference` | required |
| `clusterConfig.logFileDirectory.s3.prefix` | Path within the bucket | required |
| `clusterConfig.listenerClass` | How the UI is exposed | `cluster-internal` |
| `clusterConfig.authentication` | OIDC authentication for the UI | none |
| `clusterConfig.vectorAggregatorConfigMapName` | Vector aggregator discovery ConfigMap | none |
| `image.productVersion` | Spark version | `3.5.5` |
| `image.repo` | Image repository | `quay.io/zncdatadev` |
| `image.pullPolicy` | Image pull policy | `IfNotPresent` |
| `node.roleGroups.<name>.replicas` | Replicas in the group | `1` |
| `node.config.cleaner` | Enable event log cleanup | `false` |

`clusterConfig` and `node` are both required; a resource without them is rejected.

> Configuration can be set at the role level and overridden per role group — see
> [Overrides](../core-concepts/common-configuration-mechanisms/overrides.md).

### Ports

| Name | Port | Purpose |
|------|------|---------|
| `http` | 18080 | History Server web UI |
| `metrics` | 18081 | Metrics endpoint |
| `oidc` | 4180 | OIDC proxy, only when authentication is configured |

### Listeners and Services

`clusterConfig.listenerClass` decides how the UI is reachable:

| Value | Exposure |
|-------|----------|
| `cluster-internal` (default) | ClusterIP — inside the cluster only |
| `external-unstable` | NodePort — address changes if the pod moves |
| `external-stable` | LoadBalancer — stable address |

> For more details, see [Service Discovery](../core-concepts/connectivity/service-discovery.md).

### Dependencies

| Dependency | Required | Description |
|------------|----------|-------------|
| S3-compatible storage | Yes | Where event logs are read from; there is no other backend |
| `commons-operator`, `listener-operator`, `secret-operator` | Yes | Provide pod enrichment, service exposure and credential delivery |
| An OIDC provider | No | Only when `clusterConfig.authentication` is set |

## Advanced

### The event log cleaner

Setting `cleaner: true` lets the History Server delete old event logs from the bucket. Because the
bucket is shared, **only one instance may clean**, and the Operator enforces that:

```yaml
spec:
  node:
    roleGroups:
      default:
        replicas: 1
        config:
          cleaner: true
```

Two configurations are rejected with an error rather than silently allowing several cleaners to race:

- `cleaner` enabled on a role group whose `replicas` is greater than 1
- `cleaner` enabled at the role level when the role has more than one role group

If you need several role groups, enable the cleaner on exactly one single-replica group.

### Resource Management

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

> For more details, see [Resource Management](../core-concepts/resources/resource-manage.md).

### Pod Placement

Affinity is set under `config.affinity` on the role or a role group. Note that it **replaces** the
product's defaults rather than merging with them.

> For more details, see [Pod Placement](../core-concepts/operations/pod-placement.md).

### Authentication

The UI can be put behind an OIDC provider by referencing an `AuthenticationClass`:

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

The referenced Secret must contain `CLIENT_ID` and `CLIENT_SECRET`. When authentication is
configured the OIDC proxy port (4180) is added to the pod.

> For more details, see [Authentication](../core-concepts/security/authentication.md).

### Logging

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

> For more details, see [Logging](../core-concepts/observability/logging.md).

## Troubleshooting

### Common Issues

1. **The UI loads but lists no applications**
   - **Symptom**: The History Server is running and reachable, but the application list is empty.
   - **Cause**: `prefix` does not match the path your Spark applications write to, or the
     applications are not writing event logs at all.
   - **Resolution**: Confirm `spark.eventLog.enabled` is true in your applications and that
     `spark.eventLog.dir` resolves to the same bucket and prefix. List the bucket to confirm files
     are actually arriving.

2. **The pod fails to start or cannot read the bucket**
   - **Symptom**: The pod crash-loops, or the logs show S3 access errors.
   - **Cause**: Wrong credentials, or virtual-host addressing against a backend that only serves
     path-style. Nothing rejects the latter at apply time — it fails on first access.
   - **Resolution**: Check that the SecretClass supplies `ACCESS_KEY` and `SECRET_KEY`, and set
     `pathStyle: true` on the `S3Connection` for MinIO, Ceph RGW and similar backends. See
     [S3](../core-concepts/resources/s3.md).

3. **The resource is rejected when enabling the cleaner**
   - **Symptom**: An error mentioning more than one role group or more than one replica with the
     cleaner enabled.
   - **Cause**: Several instances would compete to delete from the same bucket.
   - **Resolution**: Enable `cleaner` on exactly one role group with `replicas: 1`.

> For general operational topics, see
> [Pod Disruptions](../core-concepts/operations/pod-disruptions.md).

## Clean Up

```bash
kubectl delete sparkhistoryserver simple-history -n spark
kubectl delete ns spark
helm uninstall spark-k8s-operator -n operators
```

## Related Links

- [Spark History Server documentation](https://spark.apache.org/docs/latest/monitoring.html)
- [Kubedoop Operator for Apache Spark on GitHub](https://github.com/zncdatadev/spark-k8s-operator)
- [Apache Spark on GitHub](https://github.com/apache/spark)
