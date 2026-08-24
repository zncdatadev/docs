---
title: Pod Disruptions
---

A Kubernetes cluster moves pods around for reasons that have nothing to do with your workload:
draining a node for an upgrade, rebalancing, scaling down the node pool. These are *voluntary*
disruptions, and a
[PodDisruptionBudget](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/) is how a
workload tells the cluster how many of its pods may be taken down at once.

This matters most for quorum-based roles. Evicting two of three ZooKeeper servers at the same time
does not slow the ensemble down — it loses quorum and stops.

Kubedoop writes a PodDisruptionBudget **per role**, using a default the operator picks from what it
knows about the product. You do not have to configure anything to be protected.

## Configuration

Each role accepts a `roleConfig.podDisruptionBudget` block:

```yaml
apiVersion: zookeeper.kubedoop.dev/v1alpha1
kind: ZookeeperCluster
metadata:
  name: zookeeper
spec:
  server:
    roleConfig:
      podDisruptionBudget:
        enabled: true
        maxUnavailable: 1
    roleGroups:
      default:
        replicas: 3
```

| Field | Type | Default | Meaning |
|-------|------|---------|---------|
| `enabled` | boolean | `true` | Whether the operator writes a PDB for this role |
| `maxUnavailable` | integer | product-specific | How many pods of the role may be down at once |

Both fields are optional, and the block itself is optional.

### `enabled` defaults to true, including when you omit it

Leaving `podDisruptionBudget` out entirely, and writing a block that only sets `maxUnavailable`,
both leave the PDB enabled. A role that mentions the budget just to raise `maxUnavailable` still
gets its PDB — you only lose it by writing `enabled: false` explicitly.

### `maxUnavailable` defaults per product

When you do not set it, the operator supplies a value based on what it knows about the product
rather than a blanket number, because the safe count differs by role: a three-node quorum tolerates
one loss, a pool of stateless workers tolerates far more.

Set it yourself only when you know the product's tolerance better than the operator does for your
topology.

## Supplying your own PDB

`enabled: false` stops the operator from writing a PDB for the role, which is what you want when
you intend to manage one yourself:

```yaml
spec:
  server:
    roleConfig:
      podDisruptionBudget:
        enabled: false
```

The operator then leaves the role alone, and any PodDisruptionBudget you create with your own
selector applies normally. Note that turning it off and *not* replacing it leaves the role with no
protection against voluntary eviction at all.

## What a PDB does not cover

A PodDisruptionBudget constrains voluntary disruptions only. A node that hard-crashes, a kernel
panic, or a pod killed for exceeding its memory limit are all involuntary — the budget has no say.
Spreading a role across failure domains is the tool for that; see
[Pod placement](./pod-placement.md).

## Related

- [Pod placement](./pod-placement.md)
- [Roles and role groups](../common-configuration-mechanisms/roles-and-role-groups.md)
