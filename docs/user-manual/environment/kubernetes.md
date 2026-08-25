---
title: Kubernetes
---

Kubedoop runs on any conformant Kubernetes cluster. This page covers the versions it is tested
against and the handful of cluster capabilities the built-in Operators depend on.

## Supported versions

Every Operator's end-to-end suite runs against the same matrix on each pull request and each
release:

| Kubernetes | Status |
|------------|--------|
| 1.35 | Tested |
| 1.34 | Tested |
| 1.33 | Tested |

Other versions are not exercised by CI. Older releases may well work — nothing in the Operators
deliberately requires a recent API — but if you run one, you are the first to find out.

The Helm charts declare no `kubeVersion` constraint, so Helm will not stop you installing on
anything. Treat the table above as the supported range rather than a limit the tooling enforces.

## Cluster requirements

### CSI

Two of the built-in Operators are CSI drivers rather than ordinary controllers:

| Operator | CSI driver | Provides |
|----------|------------|----------|
| `secret-operator` | `secrets.kubedoop.dev` | Delivers credentials and certificates into pods as volumes |
| `listener-operator` | `listeners.kubedoop.dev` | Exposes pods and reports the address back into the pod |

Both register a `CSIDriver` object and run a node component as a DaemonSet, so the cluster must
allow CSI drivers and let those pods mount the kubelet directory. A managed cluster that forbids
privileged workloads outright will not be able to run them, and without them almost nothing else
works — every product cluster gets its secrets and its service exposure through these two.

`secret-operator`'s driver is registered with `attachRequired: false`, `podInfoOnMount: true` and
both `Ephemeral` and `Persistent` volume lifecycle modes.

### The kubelet directory

The node components mount the kubelet's plugin directories from the host. The chart default is:

```yaml
kubeletDir: /var/lib/kubelet
```

**Distributions that put the kubelet somewhere else need this overridden**, or the driver never
registers and every pod that wants a secret volume stays `Pending`. microk8s and k3s are the usual
cases:

```bash
helm install secret-operator kubedoop/secret-operator -n operators \
  --set kubeletDir=/var/snap/microk8s/common/var/lib/kubelet
```

Check where your distribution keeps it before installing:

```bash
ps aux | grep kubelet | grep -o '\-\-root-dir=[^ ]*'
```

If that prints nothing, the default is in use.

### Storage

Products that keep state — HDFS, Kafka, ZooKeeper — request PersistentVolumeClaims, so the cluster
needs a working `StorageClass`. Most managed clusters ship one; a bare kind cluster has
`standard` from the local-path provisioner.

```bash
kubectl get storageclass
```

`listener-operator` additionally creates its own StorageClass, `listeners.listeners.kubedoop.dev`,
used by the ephemeral volumes that carry listener addresses. That one is installed for you.

### RBAC

The Operators create and manage StatefulSets, Services, ConfigMaps, PodDisruptionBudgets and their
own custom resources. Installing via Helm creates the ClusterRoles they need, so you need
permission to create cluster-scoped RBAC at install time.

## Local clusters

[kind](https://kind.sigs.k8s.io/) is what the project's own end-to-end tests use, and it is the
quickest way to try Kubedoop:

```bash
kind create cluster --image kindest/node:v1.35.0
```

minikube and k3d work too. On k3d, remember the kubelet directory note above.

Size the cluster for what you deploy rather than for Kubedoop itself: the Operators are small, but a
three-node ZooKeeper ensemble plus HDFS plus a query engine will not fit in a default single-node
kind cluster without raising its resources.

## Verifying a cluster

Before installing, confirm the basics:

```bash
kubectl version                 # server version within the supported range
kubectl get storageclass        # at least one, ideally a default
kubectl auth can-i create clusterrole   # needed for the Helm install
```

After installing the built-in Operators, check that the CSI drivers registered:

```bash
kubectl get csidrivers
```

Both `secrets.kubedoop.dev` and `listeners.kubedoop.dev` should be listed. If they are missing, the
kubelet directory is the first thing to check.

## Related

- [Installation](../../quick-start/installation.md)
- [Service Discovery](../../core-concepts/connectivity/service-discovery.md)
- [Resource Management](../../core-concepts/resources/resource-manage.md)
