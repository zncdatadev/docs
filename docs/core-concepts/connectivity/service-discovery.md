---
title: Service Discovery
---

Two separate problems live under this heading, and Kubedoop solves them with different mechanisms:

- **Exposing** a product so something can reach it — handled by `ListenerClass` and `Listener`
- **Finding** a product from another product — handled by discovery ConfigMaps

A cluster that publishes HDFS on a node port and points HDFS at ZooKeeper is using both.

## Exposing a product

### ListenerClass

A `ListenerClass` is a cluster-scoped resource describing an exposure strategy. Products name a
class rather than a Kubernetes Service type, so the decision about how workloads reach the outside
world is made once by whoever runs the cluster.

Three classes are built in:

| Class | Service type | Reachable from | Address stability |
|-------|--------------|----------------|-------------------|
| `cluster-internal` | `ClusterIP` | Inside the cluster only | Stable |
| `external-unstable` | `NodePort` | Outside the cluster | Tied to the node the pod runs on |
| `external-stable` | `LoadBalancer` | Outside the cluster | Survives rescheduling |

**`external-unstable` is NodePort, not a LoadBalancer with a changing IP.** The name describes the
address, not the mechanism: with NodePort the client reaches whichever node the pod happens to be
on, so the address changes when the pod is rescheduled. `external-stable` is the LoadBalancer one.
This has been misread before — two operators in this project drew opposite conclusions from an
earlier wording — so it is worth stating plainly.

An unrecognised or empty class resolves to `ClusterIP`. The narrowest exposure is the safe default;
a typo should not produce an accidental public address.

### Defining your own

```yaml
apiVersion: listeners.kubedoop.dev/v1alpha1
kind: ListenerClass
metadata:
  name: external-stable
spec:
  serviceType: LoadBalancer
  serviceExternalTrafficPolicy: Local
  preferredAddressType: HostnameConservative
  serviceAnnotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
```

| Field | Required | Default | Notes |
|-------|----------|---------|-------|
| `serviceType` | yes | — | `LoadBalancer`, `NodePort` or `ClusterIP` |
| `serviceAnnotations` | no | `{}` | Passed to the Service — where cloud load balancer settings go |
| `serviceExternalTrafficPolicy` | no | `Local` | `Local` or `Cluster` |
| `preferredAddressType` | no | `HostnameConservative` | See below |

`serviceAnnotations` is how you reach cloud-provider load balancer features without Kubedoop needing
to model them.

### preferredAddressType

This decides whether clients are handed a hostname or an IP:

| Value | Behaviour |
|-------|-----------|
| `HostnameConservative` (default) | IP when the service type is `NodePort`, hostname otherwise |
| `Hostname` | Always a hostname |
| `IP` | Always an IP |

The default exists because a NodePort address refers to a specific node, and node hostnames are not
always resolvable by clients outside the cluster. Everything else gets a hostname, which survives
address changes.

### Listener

A `Listener` is the per-workload object that realises a class:

```yaml
apiVersion: listeners.kubedoop.dev/v1alpha1
kind: Listener
metadata:
  name: hdfs-namenode
spec:
  className: external-stable
  ports:
    - name: http
      port: 9870
      protocol: TCP
```

| Field | Required | Default | Notes |
|-------|----------|---------|-------|
| `className` | yes | — | The `ListenerClass` to use |
| `ports` | no | — | Named ports, each with `port` and optional `protocol` |
| `extraPodSelectorLabels` | no | `{}` | Narrows which pods are behind the listener |
| `publishNotReadyAddresses` | no | `true` | Whether not-ready pods are published |

`publishNotReadyAddresses` defaults to `true`, which matters for products that need to talk to their
peers *before* they report ready — a quorum cannot form if members cannot find each other during
startup. Set it to `false` when you want strict readiness gating.

Once reconciled, the address is on the resource's status:

```bash
kubectl get listener hdfs-namenode -o jsonpath='{.status.ingressAddresses}'
```

`status` carries `ingressAddresses` (each with `address`, `addressType` and a port map), `nodePorts`,
and `serviceName`.

### How a pod learns its own address

Listeners are wired to pods through a CSI volume rather than through environment variables, which
lets each pod discover the address it is actually published on. The volume is requested against the
`listeners.kubedoop.dev` StorageClass, and annotations on the claim select the class:

| Annotation | Meaning |
|------------|---------|
| `listeners.kubedoop.dev/class` | Which `ListenerClass` to use |
| `listeners.kubedoop.dev/listenerName` | Which `Listener` to bind — defaults to the pod name |

Products set this up themselves; you normally interact with it through the product's
`listenerClass` field rather than by writing volumes by hand.

A `PodListeners` resource records what each pod ended up with, including whether the address has
`Node` or `Cluster` scope.

## Finding another product

Exposure does not tell HDFS where ZooKeeper is. For that, an operator publishes a **discovery
ConfigMap** and the consuming product references it by name.

### What a discovery ConfigMap contains

ZooKeeper's looks like this:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: simple-zk
data:
  ZOOKEEPER: simple-zk-server-default.default.svc.cluster.local:2282/
  ZOOKEEPER_HOSTS: simple-zk-server-default.default.svc.cluster.local
  ZOOKEEPER_PORT: "2282"
  ZOOKEEPER_CHROOT: /
```

| Key | Contents |
|-----|----------|
| `ZOOKEEPER` | Full connection URI, including the chroot |
| `ZOOKEEPER_HOSTS` | Comma-separated host list |
| `ZOOKEEPER_PORT` | Client port |
| `ZOOKEEPER_CHROOT` | The znode path this ConfigMap is scoped to |

A `ZookeeperCluster` always produces a cluster-level ConfigMap named after the cluster, advertising
the ensemble at the root znode `/`. When the cluster's listener class is `external-unstable`, a
second ConfigMap named `<cluster>-nodeport` is produced alongside it, carrying the externally
reachable address.

### Consuming it

The consumer takes the ConfigMap name:

```yaml
apiVersion: hdfs.kubedoop.dev/v1alpha1
kind: HdfsCluster
metadata:
  name: simple-hdfs
spec:
  clusterConfig:
    zookeeperConfigMapName: simple-zk
```

Because the reference is a ConfigMap name rather than a hostname, the ZooKeeper cluster can move or
be reconfigured without the HDFS resource changing.

### Scoping with a ZookeeperZnode

Pointing several products at the root znode makes them share one namespace. A `ZookeeperZnode`
carves out a dedicated path and publishes its own discovery ConfigMap for it:

```yaml
apiVersion: zookeeper.kubedoop.dev/v1alpha1
kind: ZookeeperZnode
metadata:
  name: simple-hdfs-znode
spec:
  clusterRef:
    name: simple-zk
    namespace: default
```

The operator creates the znode and emits a ConfigMap named after the `ZookeeperZnode`, with
`ZOOKEEPER_CHROOT` set to the allocated path. Point the consumer at that name instead:

```yaml
spec:
  clusterConfig:
    zookeeperConfigMapName: simple-hdfs-znode
```

This is the recommended arrangement when more than one product shares a ZooKeeper ensemble — each
gets its own subtree, and deleting the `ZookeeperZnode` cleans it up.

## Related

- [Roles and role groups](../common-configuration-mechanisms/roles-and-role-groups.md)
- [Authentication](../security/authentication.md)
