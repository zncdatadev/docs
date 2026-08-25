---
title: 开发指南
---

本页讲的是开发 Kubedoop 本身——各个 Operator 以及它们共用的框架。撰写文档请看
[文档编写规范](./document-guideline.md)，fork 与 PR 的具体流程请看
[第一次贡献](./first-commiter.md)。

## 你会改动哪些代码

Kubedoop 不是单个仓库，各部分都在
[github.com/zncdatadev](https://github.com/zncdatadev) 下：

| 仓库 | 内容 |
|------|------|
| `operator-go` | 所有 Operator 共用的 Go 框架：共享 CRD 类型、调谐器、资源构建器 |
| `<product>-operator` | 每个产品一个 Operator——`zookeeper-operator`、`hdfs-operator`、`trino-operator` 等 |
| `commons-operator`、`listener-operator`、`secret-operator` | 所有产品集群都依赖的内置 Operator |
| `containers` | 产品容器镜像 |
| `kubedoop-helm-charts` | 已发布的 Helm chart |
| `docs` | 本站点 |

每个 Operator 都是独立的 Go module，依赖 `operator-go`。改动共性行为通常应该落在框架里，
只影响某个产品渲染结果的改动才放进该产品的 Operator。

## 前置条件

| 工具 | 用途 |
|------|------|
| Go | 构建与测试。所需版本见各仓库的 `go.mod` |
| Docker 或 Podman | 构建 Operator 镜像 |
| kubectl | 与集群交互 |
| [kind](https://kind.sigs.k8s.io/) | 端到端测试所用的本地集群 |
| Helm | e2e 过程中安装 Operator 依赖 |

其余工具——`controller-gen`、`kustomize`、`setup-envtest`、`golangci-lint`、`chainsaw`——
由 Makefile 在首次使用时下载到仓库的 `bin/` 目录。不要全局安装它们，
版本不一致会导致本地失败而 CI 无法复现（反之亦然）。

端到端测试运行在 [Kubernetes](../user-manual/environment/kubernetes.md#支持的版本) 页列出的版本上。
注意各 Makefile 里的 `KIND_K8S_VERSION` 只是本地集群的默认值，比 CI 实际覆盖的版本旧——
CI 会用自己的矩阵覆盖它。

## 仓库结构

Operator 遵循标准 [Kubebuilder](https://book.kubebuilder.io/) 布局，另有几处 Kubedoop 特有的目录：

```text
api/v1alpha1/       # CRD Go 类型——对外 API 面
internal/           # 调谐器、构建器、产品特有逻辑
cmd/                # manager 入口
config/             # Kustomize 清单，含生成的 CRD
deploy/helm/        # 该 Operator 的 Helm chart
test/e2e/           # Chainsaw 端到端用例
examples/           # 示例自定义资源
Makefile            # 下文所有任务
PROJECT             # Kubebuilder 项目元数据
```

在任意 Operator 仓库执行 `make help` 可列出全部目标。

## 开发循环

```bash
make manifests generate   # 改完 API 后重新生成 CRD 与 deepcopy 代码
make fmt vet              # 格式化与静态检查
make lint                 # golangci-lint
make test                 # 单元测试
make build                # 构建 manager 二进制
make run                  # 用当前 kubecontext 在本机运行控制器
```

`make test` 依赖 `manifests generate fmt vet`，因此会先重新生成。如果生成产生了 diff，请提交它
——生成物是纳入版本控制的。

## 修改 API

API 类型位于 `api/v1alpha1/`。修改后执行：

```bash
make manifests generate
```

这会重新生成 `config/` 下的 CRD YAML 和各处 `zz_generated.deepcopy.go`。两者都要提交，
所以改了类型却没重新生成，会在 CI 里表现为 diff。

Helm chart 自己保存了一份 CRD 和 Operator 的 RBAC 规则，它们**不会自动更新**：

```bash
make helm-crd-sync    # 把生成的 CRD 同步进 deploy/helm/
make helm-rbac-sync   # 把生成的 ClusterRole 规则同步进 deploy/helm/
```

漏掉这两步，通常就是"chart 安装出来的 Operator 配着一份过期 CRD"的原因。

### 新增字段

优先复用 `operator-go` 的 `pkg/apis/commons/v1alpha1` 中已有的结构——资源、日志、亲和性、
PodDisruptionBudget——而不是在产品侧另造一个等价物。一个字段如果被抄进了三个 Operator，
就说明它本该属于框架。

给 `config` 内部的字段加 `+kubebuilder:default` 要格外小心。该块会从角色折叠到角色组，
而结构化默认值会在其**外层对象**一存在时就填充叶子字段——于是"未设置"和"显式设成该值"
变得无法区分，角色级的取值就永远赢不了。框架里有若干字段的注释专门解释了这一点；
折叠字段的默认值应当在消费时才施加。

## 测试

### 单元测试

```bash
make test
```

它们运行在 [envtest](https://book.kubebuilder.io/reference/envtest.html) 之上——
一个真实的 API server 加 etcd，但没有调度器和内置控制器。这足以断言 Operator **渲染出了什么**：
给定一个 CR，是否产出了预期的 StatefulSet、ConfigMap 和 Service。

### 端到端测试

端到端测试使用 [Chainsaw](https://kyverno.github.io/chainsaw/)，跑在 kind 集群上。
用例位于 `test/e2e/<suite>/<case>/`，每个用例是一个装着 YAML 步骤与断言的目录。

```bash
make setup-chainsaw-cluster   # 创建 kind 集群，安装 Operator 依赖
make setup-chainsaw-e2e       # 构建镜像、加载、部署 Operator
make chainsaw-e2e             # 运行用例
make cleanup-chainsaw-e2e     # 卸载
```

`setup-chainsaw-cluster` 会从已发布的 chart 安装产品所依赖的 Operator——`commons-operator`、
`listener-operator` 和 `secret-operator`——因为缺了它们几乎什么都跑不起来：
secret、listener 和 Pod 信息补全都由这三个提供。

凡是只有在真实集群上才暴露的行为，都应该写端到端用例：单元测试需要重复实现一遍才能验证的渲染结果、
滚动更新行为、两个产品之间的服务发现。断言请针对资源本身，而不是日志输出。

## 与 operator-go 协同开发

Operator 依赖的是已发布的 `operator-go`。当一处改动同时需要框架和 Operator 时，
开发期间可以把 module 指向本地检出：

```text
replace github.com/zncdatadev/operator-go => ../operator-go
```

提 PR 之前务必移除这个 `replace`，带着它无法合并。正确顺序是先让框架的改动合入，
再把 Operator 升到已发布的版本。

## 提 PR 之前

在 Operator 仓库里跑一遍 CI 会跑的那些门禁：

```bash
make manifests generate   # 并提交由此产生的 diff
make fmt vet lint
make test
make helm-crd-sync helm-rbac-sync   # 如果改了 API
```

涉及渲染或调谐行为的改动，再跑一遍端到端用例。

提交与分支命名请遵循[第一次贡献](./first-commiter.md)中的约定，并在 PR 里如实写明你实际跑了什么。
勾了却没真跑的检查项，比诚实说明"这一项跳过了"更糟。

## 相关内容

- [协作指南](./collaboration.md)
- [第一次贡献](./first-commiter.md)
- [文档编写规范](./document-guideline.md)
- [项目状态](./project-status.md)
