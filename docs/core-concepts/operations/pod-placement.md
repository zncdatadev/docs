---
title: Pod Placement
---

Where a role's pods land decides how much a single failure costs. Three ZooKeeper servers on one
node are three pods that disappear together. Kubedoop products therefore ship a default
[affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) that spreads a
role across nodes, and let you replace it when your topology calls for something else.

## The default is already there

Every product declares affinity defaults for its own roles — typically a `podAntiAffinity` that
keeps replicas of a role off the same node. You do not need to write anything to get it.

Read the section below before overriding it, because overriding does not mean adding.

## Configuring affinity

Affinity is set under `config`, which exists at two levels:

```yaml
apiVersion: zookeeper.kubedoop.dev/v1alpha1
kind: ZookeeperCluster
metadata:
  name: zookeeper
spec:
  server:
    config:
      affinity:                       # role level: applies to every group of this role
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: node-role.kubernetes.io/worker
                    operator: Exists
    roleGroups:
      default:
        replicas: 3
      gpu:
        replicas: 2
        config:
          affinity:                   # role group level: applies to this group only
            nodeAffinity:
              requiredDuringSchedulingIgnoredDuringExecution:
                nodeSelectorTerms:
                  - matchExpressions:
                      - key: accelerator
                        operator: In
                        values: ["nvidia"]
```

The value is a standard Kubernetes
[`Affinity`](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#scheduling)
object and is passed through to the pod spec unchanged, so `nodeAffinity`, `podAffinity` and
`podAntiAffinity` all behave exactly as they do in a plain Deployment.

## Affinity replaces, it does not merge

There are three layers, from the bottom up:

1. the product's role defaults
2. the role's `config.affinity`
3. the role group's `config.affinity`

**Any layer that sets `affinity` replaces the layer beneath it entirely.** This follows the
Kubernetes rule and is what someone editing the field expects — but it has a consequence that is
easy to miss.

Setting only `nodeAffinity` at the role group level, to pin a group to an instance type, discards
the product's `podAntiAffinity` along with it. The group is now pinned to the right nodes and no
longer spread across them, which is usually the opposite of what was intended.

Nothing fails when this happens. The resource is valid, the pod spec is valid, and every status
condition stays green while the quorum quietly stops being spread.

### How to tell it happened

The operator emits a Warning event on the cluster resource:

```text
Type     Reason              Message
Warning  AffinityOverridden  role "server" group "gpu": the role group's config replaces
                             config.affinity wholesale, discarding the podAntiAffinity declared
                             beneath it. config.affinity follows the Kubernetes rule and is not
                             merged per member; restate the discarded member alongside your own
                             to keep it
```

Check for it after changing affinity:

```bash
kubectl get events --field-selector reason=AffinityOverridden
```

### Keeping what you replaced

Restate the discarded member alongside your own:

```yaml
config:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
              - key: accelerator
                operator: In
                values: ["nvidia"]
    podAntiAffinity:                        # restated, or it is lost
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 70
          podAffinityTerm:
            topologyKey: kubernetes.io/hostname
            labelSelector:
              matchLabels:
                app.kubernetes.io/name: zookeeper
                app.kubernetes.io/instance: zookeeper
                app.kubernetes.io/component: server
```

## Choosing a topology key

`topologyKey` decides what "spread apart" means:

| Key | Spreads across |
|-----|----------------|
| `kubernetes.io/hostname` | Nodes — protects against a single node failing |
| `topology.kubernetes.io/zone` | Availability zones — protects against a zone failing |

Zone-level spreading needs enough nodes per zone to satisfy it. With
`requiredDuringSchedulingIgnoredDuringExecution` and fewer zones than replicas, the surplus pods
stay `Pending` forever; `preferredDuringSchedulingIgnoredDuringExecution` degrades instead of
blocking, which is why product defaults favour it.

## Related

- [Pod disruptions](./pod-disruptions.md)
- [Roles and role groups](../common-configuration-mechanisms/roles-and-role-groups.md)
