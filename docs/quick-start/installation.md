# Quick Start

In this quick start, we will use Kubedoop's hive-operator as an example to show
how to deploy a Hive Metastore in a Kubernetes cluster.

## Prerequisites

To start using Kubedoop, you need to meet the following requirements:

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- Install [Helm](https://helm.sh/docs/intro/install/) v3+
- Prepare a Kubernetes cluster

## Install the Operator

Kubedoop uses Helm charts to deploy and manage Operators.
All charts are published to [quay.io](https://quay.io/kubedoopcharts).

### Add the Helm Repository

```bash
helm repo add kubedoop https://zncdatadev.github.io/kubedoop-helm-charts/
helm repo update
```

### Install Built-in Operators

The commons-operator, listener-operator, and secret-operator are required
dependencies for all product Operators. Install them first:

```bash
helm install commons-operator kubedoop/commons-operator -n operators --create-namespace
helm install listener-operator kubedoop/listener-operator -n operators
helm install secret-operator kubedoop/secret-operator -n operators
```

### Install the Hive Operator

```bash
helm install hive-operator kubedoop/hive-operator -n operators
```

Verify that the Operator pod is running normally:

```bash
kubectl get pods -n operators
```

## Create Namespace

Create a namespace for Hive to deploy the Hive cluster:

```bash
kubectl create ns hive
```

## Deploy a Hive Cluster

The Hive cluster is managed by the hive-operator. You can deploy a Hive
Metastore by creating a HiveCluster custom resource:

```yaml
apiVersion: hive.kubedoop.dev/v1alpha1
kind: HiveMetastore
metadata:
  name: hive-metastore
  namespace: hive
spec:
  roleGroups:
    default:
      replicas: 1
```

```bash
kubectl apply -f - <<EOF
apiVersion: hive.kubedoop.dev/v1alpha1
kind: HiveMetastore
metadata:
  name: hive-metastore
  namespace: hive
spec:
  roleGroups:
    default:
      replicas: 1
EOF
```

## Access Hive Metastore

After the Hive cluster is deployed, you can access the Hive Metastore with
the following command:

```bash
kubectl exec -it hive-metastore-0 -n hive -- bash
```

## Clean Up Resources

Run the following command to clean up the Hive cluster:

```bash
kubectl delete hivemetastore hive-metastore -n hive
```

Run the following command to uninstall the Operators:

```bash
helm uninstall hive-operator -n operators
helm uninstall secret-operator -n operators
helm uninstall listener-operator -n operators
helm uninstall commons-operator -n operators
```
