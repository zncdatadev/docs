---
slug: /
---

# Introduction

Kubedoop Data Platform is a modular, Kubernetes-native platform. Through Kubedoop,
users can quickly and easily deploy data infrastructure and algorithm infrastructure to address DataOps and MLOps requirements.

Kubedoop includes mainstream data processing components such as HDFS, Hive, Kafka, Superset, etc.,
while supporting data lakes and real-time data warehouses to meet the migration needs from traditional Hadoop platforms to Kubernetes platforms.

Built on Kubernetes Operator technology, Kubedoop automates the lifecycle management of data processing tasks,
including task creation, startup, monitoring, scheduling, restart, and scaling. Users only need to define data processing tasks through simple configuration files,
and Kubedoop will automatically deploy the tasks to the Kubernetes cluster and manage their lifecycle.

## Components

Kubedoop Product Operators:

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

Built-in Kubedoop Operators:

- [Commons Operator](https://github.com/zncdatadev/commons-operator)
- [Listener Operator](https://github.com/zncdatadev/listener-operator)
- [Secret Operator](https://github.com/zncdatadev/secret-operator)

## Contributing

If you would like to contribute to Kubedoop, please refer to our [contribution guide](https://kubedoop.dev/docs/developer-manual/collaboration) for more information.
We welcome all forms of contributions, including but not limited to code, documentation, and use cases.
