---
title: Kubebuilder
---

每个 Kubedoop Operator 都是一个 [Kubebuilder](https://book.kubebuilder.io/) 项目。
本页是 Kubedoop 实际用到的那部分 Kubebuilder 的参考——项目元数据、API 类型中使用的 marker 词汇，
以及代码生成流程。面向的是开发 Operator 的人；更完整的流程参见
[开发指南](../developer-manual/develop-guideline.md)。

## PROJECT 文件

每个 Operator 仓库根目录都有一个 `PROJECT` 文件，记录项目的脚手架方式和它拥有哪些资源。
它是生成的，不要手工编辑。

```yaml
cliVersion: 4.10.1
domain: kubedoop.dev
layout:
- go.kubebuilder.io/v4
projectName: zookeeper-operator
repo: github.com/zncdatadev/zookeeper-operator
resources:
- api:
    crdVersion: v1
    namespaced: true
  controller: true
  domain: kubedoop.dev
  group: zookeeper
  kind: ZookeeperCluster
  path: github.com/zncdatadev/zookeeper-operator/api/v1alpha1
  version: v1alpha1
version: "3"
```

其中有两项在整个项目中是统一的：

- **`domain: kubedoop.dev`** —— 所有 API 组都是 `<group>.kubedoop.dev`，
  因此资源表现为 `zookeeper.kubedoop.dev/v1alpha1`、`s3.kubedoop.dev/v1alpha1` 等
- **`layout: go.kubebuilder.io/v4`** —— 所有 Operator 都使用 v4 布局，因此目录结构彼此一致

## 代码生成

生成工作由两个工具完成，版本都钉在各 Operator 的 Makefile 里，并下载到 `bin/`：

| 工具 | 版本 | 产出 |
|------|------|------|
| `controller-gen` | v0.19.0 | `config/crd/bases/` 下的 CRD YAML，以及 `zz_generated.deepcopy.go` |
| `kustomize` | v5.7.1 | 组装后的安装清单 |

```bash
make manifests   # 从 Go 类型生成 CRD YAML
make generate    # 生成 DeepCopy 实现
```

两类产物都是**纳入版本控制的**。改了 API 类型却不重新生成，会让 CRD 和 Go 类型不一致，
并在 CI 中表现为 diff。Helm chart 还另存了一份副本——参见
[开发指南](../developer-manual/develop-guideline.md)中的 `helm-crd-sync`。

## Marker

Marker 是写在类型或字段上方的 `+kubebuilder:` 注释，用来告诉 `controller-gen` 该生成什么。
以下是 Kubedoop 实际使用的这些。

### 对象类 marker

| Marker | 作用 |
|--------|------|
| `+kubebuilder:object:root=true` | 该类型是顶层 API 对象，为它生成 CRD |
| `+kubebuilder:object:generate=true` | 为包内所有类型生成 DeepCopy |
| `+kubebuilder:subresource:status` | 为资源添加 `/status` 子资源 |
| `+kubebuilder:resource:path=...,scope=Cluster,shortName=...` | 复数路径、作用域、`kubectl` 简称 |
| `+kubebuilder:printcolumn:name=...` | 在 `kubectl get` 输出中增加一列 |

Kubedoop 的资源大多是命名空间级的。集群级的是那些描述共享基础设施的 class——
`AuthenticationClass`、`ListenerClass`——因为它们要被任意命名空间按名字引用。

### 校验类 marker

| Marker | 作用 |
|--------|------|
| `+kubebuilder:validation:Required` / `Optional` | 字段是否必须存在 |
| `+kubebuilder:default=<value>` | 字段缺失时由 API server 填充的默认值 |
| `+kubebuilder:validation:Enum=a;b;c` | 限定取值集合 |
| `+kubebuilder:validation:Minimum` / `Maximum` | 数值范围 |
| `+kubebuilder:validation:Pattern` | 正则表达式 |
| `+kubebuilder:validation:items:MinLength` / `items:Pattern` | 数组元素的约束 |
| `+kubebuilder:validation:XValidation:rule="..."` | 上述都表达不了时使用的 CEL 表达式 |

## 两个容易写错的地方

这两个坑本项目都已经踩过。

### Marker 区分大小写

`controller-gen` 精确匹配 marker 名称。`+kubebuilder:validation:optional`——小写的 `o`——
根本不是一个 marker，它会被静默忽略，字段随即回落到默认规则：
**JSON tag 中没有 `omitempty` 的字段视为必填**。

不会有任何提示。构建成功、CRD 正常生成，而该字段悄悄进入了 CRD 的 `required` 列表。
唯一能发现的办法是去读生成出来的 YAML：

```bash
grep -A3 'required:' config/crd/bases/<group>_<plural>.yaml
```

`Optional` 和 `Required` 请始终大写开头，并且给可选字段的 JSON tag 也加上 `omitempty`。

### 不要给 `config` 内的字段加默认值

`+kubebuilder:default` 看着无害，但绝不能用在 `config` 块内部的字段上，
因为该块会从角色折叠到角色组。

结构化默认值会在其**外层对象**一存在时就填充叶子字段。于是，`config` 内字段上的默认值，
会被施加到任何因为**任何原因**写了 `config` 块的角色组上——这就让"该组没有设置这个值"
和"该组显式设成了默认值"变得无法区分，角色级的取值也就永远赢不了这次合并。

`operator-go` 中有若干字段的注释专门解释了这一点，并刻意不加默认值。
折叠字段的默认值应该放在消费时施加，即在读取它们的代码里。

## 相关内容

- [Kubebuilder Book](https://book.kubebuilder.io/)
- [CRD 生成参考](https://book.kubebuilder.io/reference/generating-crd)
- [开发指南](../developer-manual/develop-guideline.md)
