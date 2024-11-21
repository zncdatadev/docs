# Quick Start

In this quick start, we will use Kubedoop's hive-operator as an example to show how to deploy a Hive Metastore in a Kubernetes cluster.

## Prerequisites

To start using Kubedoop, you need to meet the following requirements:

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- Prepare a Kubernetes cluster

## Install OLM

Kubedoop relies on the Operator Lifecycle Manager (OLM) to manage Operators. If OLM is not installed in your cluster, you can install it with the following command:

```bash
curl -sL https://github.com/operator-framework/operator-lifecycle-manager/releases/download/v0.25.0/install.sh | bash -s v0.25.0
```

## Install hive-operator

OLM manages the installation of Operators through [Subscription](https://olm.operatorframework.io/docs/concepts/subscriptions/). We can install the hive-metastore-operator by creating a Subscription:

```yaml
kubectl apply -f https://raw.githubusercontent.com/kubedoop.dev/kubedatastack/main/examples/hive/olm-subscriptions.yaml
```

Verify that the operator's pod is running normally:

```bash
kubectl get pods -n operator
```

## Create Namespace

Create a namespace for hive to deploy the hive cluster:

```bash
kubectl create ns hive
```

## Deploy a Hive Cluster

The Hive cluster is managed by the hive-operator. We can deploy a Hive Metastore by creating a HiveCluster object:

```yaml
kubectl apply -f https://raw.githubusercontent.com/kubedoop.dev/kubedatastack/main/examples/hive/hive-metastore.yaml
```

## Access Hive Metastore

After the Hive cluster is deployed, we can access the Hive Metastore with the following command:

```bash
kubectl exec -it hive-metastore-0 -n hive -- bash
```

## Clean Up Resources

Run the following command to clean up the hive cluster:

```bash
kubectl delete -f https://raw.githubusercontent.com/kubedoop.dev/kubedatastack/main/examples/hive/hive-cluster.yaml
```

Run the following command to clean up the operator:

```bash
kubectl delete -f https://raw.githubusercontent.com/kubedoop.dev/kubedatastack/main/examples/hive/olm-subscriptions.yaml
```
