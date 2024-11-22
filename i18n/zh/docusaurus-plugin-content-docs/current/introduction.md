---
slug: /
---

# 介绍

Kubedoop Data Platform 是一个模块化、Kubernetes 原生的平台。通过 Kubedoop，用户可以简单快速地部署数据基础设施和算法基础设施，从而解决 DataOps 和 MLOps 的需求。

Kubedoop 包含主流数据处理组件，如 hdfs, hive, kafka superset 等，同时支持数据湖和实时数仓，满足传统 Hadoop 平台向 Kubernetes 平台迁移的需求。

Kubedoop 基于 Kubernetes Operator 技术开发，通过 Operator 自动化管理数据处理任务的生命周期，包括任务创建、启动、监控、调度、重启和扩缩容。用户只需通过简单的配置文件定义数据处理任务，Kubedoop 就可以自动将任务部署到 Kubernetes 集群，并自动管理其生命周期。

Kubedoop 基于 Kubernetes Operator 技术开发，通过 Operator 强大管理能力，自动化管理平台创建、启动、监控、调度、重启、扩缩容等生命周期，用户只需通过简单的配置文件定义数据处理任务，Kubedoop 就可以自动将任务部署到 Kubernetes 集群，并自动管理其生命周期。

## 组件

kubedoop 中的产品 Operator:

- [Kubedoop Operator for Apache Airflow](https://github.com/zncdatadev/airflow-operator)
- [Kubedoop Operator for Apache DolphinScheduler](https://github.com/zncdatadev/dolphinscheduler-operator)
- [Kubedoop Operator for Apache Doris](https://github.com/zncdatadev/doris-operator)
- [Kubedoop Operator for Apache Hadoop HDFS](https://github.com/zncdatadev/hdfs-operator)
- [Kubedoop Operator for Apache HBase](https://github.com/zncdatadev/hbase-operator)
- [Kubedoop Operator for Apache Hive](https://github.com/zncdatadev/hive-operator)
- [Kubedoop Operator for Apache Kafka](https://github.com/zncdatadev/kafka-operator)
- [Kubedoop Operator for Apache Kyuubi](https://github.com/zncdatadev/kyuubi-operator)
- [Kubedoop Operator for Apache NiFi](https://github.com/zncdatadev/nifi-operator)
- [Kubedoop Operator for Apache Spark](https://github.com/zncdatadev/spark-k8s-operator)
- [Kubedoop Operator for Apache Superset](https://github.com/zncdatadev/superset-operator)
- [Kubedoop Operator for Trino](https://github.com/zncdatadev/trino-operator)
- [Kubedoop Operator for Apache Zookeeper](https://github.com/zncdatadev/zookeeper-operator)

Kubedoop 内置 operators:

- [Commons Operator](https://github.com/zncdatadev/commons-operator)
- [Listener Operator](https://github.com/zncdatadev/listener-operator)
- [Secret Operator](https://github.com/zncdatadev/secret-operator)

## 贡献

如果您想为 Kubedoop 做出贡献，请参阅我们的[贡献指南](https://kubedoop.dev/docs/developer-manual/collaboration)以获取更多信息。
我们欢迎各种形式的贡献，包括但不限于代码、文档和使用案例。
