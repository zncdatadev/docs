
# OPM

OPM 是一个构建 operator-registry 索引的工具，可以用来管理 operator 的版本和发布。

## 基本命令

```text
CLI to interact with operator-registry and build indexes of operator content

Usage:
  opm [flags]
  opm [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  generate    Generate various artifacts for declarative config indexes
  help        Help about any command
  index       generate operator index container images
  init        Generate an olm.package declarative config blob
  migrate     Migrate a sqlite-based index image or database file to a file-based catalog
  registry    interact with operator-registry database
  render      Generate a stream of file-based catalog objects from catalogs and bundles
  serve       serve declarative configs
  validate    Validate the declarative index config
  version     Print the opm version

Flags:
  -h, --help              help for opm
      --skip-tls-verify   skip TLS certificate verification for container image registries while pulling bundles
      --use-http          use plain HTTP for container image registries while pulling bundles

Use "opm [command] --help" for more information about a command.
```

### 创建 catalog

创建一个 catalog 目录，和对应的的 Dockfile ：

```bash
mkdir catalog
opm generate dockerfile catalog
```

### opm 服务

使用 opm 命令可以启动一个 operator-registry 服务：

```bash
opm serve catalog --catalog /tmp/catalog
```

一般情况下，都是通过生成的 catalog Dockerfile 启动，在本地不需要单独启动服务。

## opm alpha 命令

opm alpha 命令是一个 alpha 阶段的子命。可用来管理 operator bundle 的元数据。

```text
Run an alpha subcommand

Usage:
  opm alpha [flags]
  opm alpha [command]

Available Commands:
  bundle          Operator bundle commands
  list            List contents of an index
  render-graph    Generate mermaid-formatted view of upgrade graph of operators in an index
  render-template Render a catalog template type

Flags:
  -h, --help   help for alpha

Global Flags:
      --skip-tls-verify   skip TLS certificate verification for container image registries while pulling bundles
      --use-http          use plain HTTP for container image registries while pulling bundles

Use "opm alpha [command] --help" for more information about a command.
```

### 使用模板生成 catalog

```bash
cat << EOF >> example-operator-template.yaml
Schema: olm.semver
GenerateMajorChannels: true
GenerateMinorChannels: false
Stable:
  Bundles:
  - Image: repository-uri/example-operator:v0.8.9
  - Image: repository-uri/example-operator:v0.9.0
EOF

```

生成 catalog

```bash
opm alpha render-template semver -o yaml < example-operator-template.yaml > catalog/catalog.yaml
```

### 验证 catalog

```bash
opm validate catalog

echo $?
```

输出 0 表示验证通过。
