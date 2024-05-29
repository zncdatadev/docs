
# 快速开始

datastack 是一个基于 Kubernetes 的数据平台，它提供了一套完整的数据处理工具，包括数据采集、数据存储、数据处理、数据分析等功能。datastack 通过 Operator 的方式部署在 Kubernetes 集群中，用户可以通过简单的配置文件来部署和管理数据处理任务。

在这篇快速开始中，我们以 datastack 的 hive-operator 为例，介绍如何在 Kubernetes 集群中部署一个 Hive Metastore。

## 环境准备

要开始使用 datastack ，需要满足一下条件：

- 安装 [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- 准备一个 Kubernetes 集群

## 安装 OLM

datastack 依赖于 Operator Lifecycle Manager (OLM) 来管理 Operator。如果你的集群中没有安装 OLM，你可以通过以下命令安装：

```bash
curl -sL https://github.com/operator-framework/operator-lifecycle-manager/releases/download/v0.25.0/install.sh | bash -s v0.25.0
```

## 安装 hive-operator

OLM 通过 [Subscription](https://olm.operatorframework.io/docs/concepts/subscriptions/) 来管理 Operator 的安装。我们可以通过创建一个 Subscription 来安装 hive-metastore-operator：

```yaml
kubectl apply -f https://raw.githubusercontent.com/zncdata.dev/kubedatastack/main/examples/hive/olm-subscriptions.yaml
```

验证 operator 的 pod 是否正常运行：

```bash
kubectl get pods -n operator
```

## 创建命名空间

创建一个 hive 的命名空间，用于部署 hive 集群：

```bash
kubectl create ns hive
```

## 部署一个 Hive 集群

Hive 集群是通过 hive-operator 来管理的，我们可以通过创建一个 HiveCluster 对象来部署一个 Hive Metastore：

```yaml
kubectl apply -f https://raw.githubusercontent.com/zncdata.dev/kubedatastack/main/examples/hive/hive-metastore.yaml
```

## 查看 Hive Metastore

Hive 集群部署完成后，我们可以通过以下命令来访问 Hive Metastore：

```bash
kubectl exec -it hive-metastore-0 -n hive -- bash
```

## 清理资源

运行下面命令，清理 hive 集群：

```bash
kubectl delete -f https://raw.githubusercontent.com/zncdata.dev/kubedatastack/main/examples/hive/hive-cluster.yaml
```

运行下面命令，清理 operator：

```bash
kubectl delete -f https://raw.githubusercontent.com/zncdata.dev/kubedatastack/main/examples/hive/olm-subscriptions.yaml
```
