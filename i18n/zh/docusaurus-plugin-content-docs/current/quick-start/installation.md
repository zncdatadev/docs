# 快速开始

Kubedoop 是一个基于 Kubernetes 的数据平台，它提供了一套完整的数据处理工具，
包括数据采集、数据存储、数据处理、数据分析等功能。Kubedoop 通过 Operator
的方式部署在 Kubernetes 集群中，用户可以通过简单的配置文件来部署和管理
数据处理任务。

在这篇快速开始中，我们以 Kubedoop 的 hive-operator 为例，介绍如何在
Kubernetes 集群中部署一个 Hive Metastore。

## 环境准备

要开始使用 Kubedoop，需要满足以下条件：

- 安装 [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- 安装 [Helm](https://helm.sh/docs/intro/install/) v3+
- 准备一个 Kubernetes 集群

## 安装 Operator

Kubedoop 使用 Helm Chart 来部署和管理 Operator。
所有 Chart 发布在 [quay.io](https://quay.io/kubedoopcharts)。

### 添加 Helm 仓库

```bash
helm repo add kubedoop https://zncdatadev.github.io/kubedoop-helm-charts/
helm repo update
```

### 安装内置 Operator

commons-operator、listener-operator 和 secret-operator 是所有产品 Operator
的必需依赖，需要先安装：

```bash
helm install commons-operator kubedoop/commons-operator -n operators --create-namespace
helm install listener-operator kubedoop/listener-operator -n operators
helm install secret-operator kubedoop/secret-operator -n operators
```

### 安装 Hive Operator

```bash
helm install hive-operator kubedoop/hive-operator -n operators
```

验证 Operator 的 Pod 是否正常运行：

```bash
kubectl get pods -n operators
```

## 创建命名空间

创建一个 Hive 的命名空间，用于部署 Hive 集群：

```bash
kubectl create ns hive
```

## 部署 Hive 集群

Hive 集群通过 hive-operator 来管理。你可以通过创建 HiveMetastore 自定义
资源来部署一个 Hive Metastore：

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

## 查看 Hive Metastore

Hive 集群部署完成后，你可以通过以下命令来访问 Hive Metastore：

```bash
kubectl exec -it hive-metastore-0 -n hive -- bash
```

## 清理资源

运行下面命令，清理 Hive 集群：

```bash
kubectl delete hivemetastore hive-metastore -n hive
```

运行下面命令，卸载 Operator：

```bash
helm uninstall hive-operator -n operators
helm uninstall secret-operator -n operators
helm uninstall listener-operator -n operators
helm uninstall commons-operator -n operators
```
