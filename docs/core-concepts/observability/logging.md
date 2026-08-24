---
title: Logging
---

Kubedoop gives every product the same logging controls: per-container log levels that you set on a
role or a single role group, and an optional [Vector](https://vector.dev/) agent that ships the
resulting files to an aggregator.

## Where logs go

Containers write under `/kubedoop/log/`, one directory per container:

```text
/kubedoop/log/<container>/<container>.<suffix>
```

The suffix depends on the logging framework the product uses. Both the console stream and these
files are produced, and they are configured independently — see below.

## Configuring log levels

Logging lives under `config`, so it can be set on a role and refined per role group:

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

The structure is:

| Key | Meaning |
|-----|---------|
| `containers.<name>` | The container these settings apply to |
| `containers.<name>.console.level` | Threshold for the console (stdout) appender |
| `containers.<name>.file.level` | Threshold for the file appender |
| `containers.<name>.loggers.<name>.level` | Threshold for one named logger |
| `enableVectorAgent` | Whether to inject the Vector sidecar |

Every `level` takes one of:

```text
FATAL  ERROR  WARN  INFO  DEBUG  TRACE
```

### Unset means inherit

`level` has no default in the CRD, deliberately. Leaving it out means "inherit":

- a role group that omits it takes the role's value
- when nobody sets it, the product's own default applies — root logger at `INFO`, with no threshold
  on the appender

This is why writing an empty `console: {}` in a role group does not quietly override a `DEBUG` you
set at the role level. If the field carried a CRD default, the API server would fill it as soon as
the enclosing object existed, and the role's value could never win.

### Levels are mapped for non-Java products

Kubedoop's level names follow the Java convention. Products whose logging framework uses different
names get them mapped:

| Kubedoop | Mapped to |
|----------|-----------|
| `FATAL` | `CRITICAL` |
| `ERROR` | `ERROR` |
| `WARN` | `WARNING` |
| `INFO` | `INFO` |
| `DEBUG` | `DEBUG` |
| `TRACE` | `DEBUG` |

`TRACE` and `DEBUG` collapse onto the same level for those products, so asking for `TRACE` will not
get you more than `DEBUG` there.

## Shipping logs with Vector

Setting `enableVectorAgent: true` injects a Vector sidecar that tails the log directory and forwards
to an aggregator you run:

```yaml
spec:
  clusterConfig:
    vectorAggregatorConfigMapName: vector-aggregator-discovery
  coordinator:
    config:
      logging:
        enableVectorAgent: true
```

The aggregator's address is not written in the cluster resource. Instead
`vectorAggregatorConfigMapName` names a ConfigMap in the same namespace holding a single key:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: vector-aggregator-discovery
data:
  ADDRESS: http://vector-aggregator.default.svc.cluster.local:6000
```

This indirection means the aggregator can move without editing every product cluster.

### Enabling the agent without an aggregator fails loudly

If the Vector agent is enabled and the product actually produces logs, but
`vectorAggregatorConfigMapName` is empty, reconciliation fails rather than shipping a sidecar with
nowhere to send:

```text
vector agent is enabled but vectorAggregatorConfigMapName is not configured (role "coordinator", group "default")
```

A named ConfigMap that cannot be resolved fails the same way, and the message says which check
failed:

```text
configmap default/vector-aggregator-discovery missing "ADDRESS" key
configmap default/vector-aggregator-discovery has empty "ADDRESS" value
```

This is deliberate. A silently mis-wired log pipeline looks healthy right up until you need the
logs.

## Related

- [Roles and role groups](../common-configuration-mechanisms/roles-and-role-groups.md)
- [Configuration overrides](../common-configuration-mechanisms/overrides.md)
