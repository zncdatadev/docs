
# operator-sdk

operator-sdk 是构建 kubernetes 扩展的的命令行工具。

## 基本命令

```bash
operator-sdk [flags]
```

输出：

```text
CLI tool for building Kubernetes extensions and tools.

Usage:
  operator-sdk [flags]
  operator-sdk [command]

Examples:
The first step is to initialize your project:
    operator-sdk init [--plugins=<PLUGIN KEYS> [--project-version=<PROJECT VERSION>]]

<PLUGIN KEYS> is a comma-separated list of plugin keys from the following table
and <PROJECT VERSION> a supported project version for these plugins.

                                   Plugin keys | Supported project versions
-----------------------------------------------+----------------------------
           ansible.sdk.operatorframework.io/v1 |                          3
              declarative.go.kubebuilder.io/v1 |                       2, 3
       deploy-image.go.kubebuilder.io/v1-alpha |                          3
                          go.kubebuilder.io/v2 |                       2, 3
                          go.kubebuilder.io/v3 |                          3
                          go.kubebuilder.io/v4 |                          3
               grafana.kubebuilder.io/v1-alpha |                          3
              helm.sdk.operatorframework.io/v1 |                          3
 hybrid.helm.sdk.operatorframework.io/v1-alpha |                          3
           quarkus.javaoperatorsdk.io/v1-alpha |                          3

For more specific help for the init command of a certain plugins and project version
configuration please run:
    operator-sdk init --help --plugins=<PLUGIN KEYS> [--project-version=<PROJECT VERSION>]

Default plugin keys: "go.kubebuilder.io/v4"
Default project version: "3"


Available Commands:
  alpha            Alpha-stage subcommands
  bundle           Manage operator bundle metadata
  cleanup          Clean up an Operator deployed with the 'run' subcommand
  completion       Load completions for the specified shell
  create           Scaffold a Kubernetes API or webhook
  edit             Update the project configuration
  generate         Invokes a specific generator
  help             Help about any command
  init             Initialize a new project
  olm              Manage the Operator Lifecycle Manager installation in your cluster
  pkgman-to-bundle Migrates packagemanifests to bundles
  run              Run an Operator in a variety of environments
  scorecard        Runs scorecard
  version          Print the operator-sdk version

Flags:
  -h, --help                     help for operator-sdk
      --plugins strings          plugin keys to be used for this subcommand execution
      --project-version string   project version (default "3")
      --verbose                  Enable verbose logging

Use "operator-sdk [command] --help" for more information about a command.
```

## operator-sdk init

这是一个初始化 operator 项目的脚手架命令，会创建一个完整 operator 项目结构，并包含一些默认的配置。

```bash
operator-sdk init [flags]
```

示例：

```bash
# 创建一个 operator 项目，使用 go.kubebuilder.io/v4 插件
operator-sdk init --domain example.org --owner "john" --repo "github.com/john/example-operator" --plugins go/v4
```

项目包含如下内容：

- `Dockerfile`：用于构建 operator 镜像的 Dockerfile
- `Makefile`：用于构建、部署 operator 的 Makefile
- `PROJECT`: 项目配置文件
- `README.md`: 项目说明文件
- `go.mod`: 项目依赖文件
- `cmd/main.go`: 运行控制器的主入口文件
- `config/`: 一些与项目部署相关的 yaml 资源文件

## operator-sdk create api

这是一个创建 kubernetes API 的脚手架命令。执行命令会创建一个新的 kubernetes API ，并生成相应的代码。

```bash
# 创建一个新的 kubernetes API ，指定类型为 Memcached ，并生成资源和控制器代码
operator-sdk create api --version v1alpha1 --kind Memcached --resource --controller

# 生成 API 定义相关代码
make generate

# 生成 API 的 CRD 资源文件
make manifests
```

生成如下内容：

- `api/`: 生成 API 资源定义文件
- `internal/`: 生成控制器代码
- `config/crd`: 生成 CRD 资源文件
- `config/samples`: 生成 CRD 示例文件
- `config/rbac`: 生成资源的 RBAC 规则文件。

## operator-sdk create webhook

## operator-sdk run

## operator-sdk run bundle

## operator-sdk cleanup

## operator-sdk olm install

## operator-sdk olm status

## operator-sdk olm uninstall
