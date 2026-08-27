---
title: Kubebuilder
---

Every Kubedoop Operator is a [Kubebuilder](https://book.kubebuilder.io/) project. This page is a
reference for the parts of Kubebuilder that Kubedoop actually relies on — the project metadata, the
marker vocabulary used in the API types, and the code generation pipeline. It is aimed at people
working on the Operators; see [Development Guideline](../developer-manual/develop-guideline.md) for
the wider workflow.

## The PROJECT file

Every Operator repository has a `PROJECT` file at its root recording how the project was scaffolded
and which resources it owns. It is generated — do not hand-edit it.

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

Two things are consistent across the whole project:

- **`domain: kubedoop.dev`** — every API group is `<group>.kubedoop.dev`, which is why resources
  appear as `zookeeper.kubedoop.dev/v1alpha1`, `s3.kubedoop.dev/v1alpha1` and so on
- **`layout: go.kubebuilder.io/v4`** — all Operators use the v4 layout, so their directory
  structures match

## Code generation

Two tools do the generation, both pinned in each Operator's Makefile and downloaded into `bin/`:

| Tool | Version | Produces |
|------|---------|----------|
| `controller-gen` | v0.19.0 | CRD YAML under `config/crd/bases/`, and `zz_generated.deepcopy.go` |
| `kustomize` | v5.7.1 | The assembled install manifests |

```bash
make manifests   # CRD YAML from the Go types
make generate    # DeepCopy implementations
```

Both outputs are **committed to the repository**. Editing an API type without regenerating leaves
the CRD and the Go types disagreeing, and shows up as a diff in CI. The Helm chart keeps yet another
copy — see [Development Guideline](../developer-manual/develop-guideline.md) for `helm-crd-sync`.

## Markers

Markers are `+kubebuilder:` comments above a type or field that tell `controller-gen` what to emit.
These are the ones Kubedoop uses.

### Object markers

| Marker | Effect |
|--------|--------|
| `+kubebuilder:object:root=true` | This type is a top-level API object, so generate a CRD for it |
| `+kubebuilder:object:generate=true` | Generate DeepCopy for every type in the package |
| `+kubebuilder:subresource:status` | Give the resource a `/status` subresource |
| `+kubebuilder:resource:path=...,scope=Cluster,shortName=...` | Plural path, scope, and `kubectl` short name |
| `+kubebuilder:printcolumn:name=...` | Extra column in `kubectl get` output |

Most Kubedoop resources are namespaced. The cluster-scoped ones are the classes that describe
shared infrastructure — `AuthenticationClass`, `ListenerClass` — because they are referenced by name
from any namespace.

### Validation markers

| Marker | Effect |
|--------|--------|
| `+kubebuilder:validation:Required` / `Optional` | Whether the field must be present |
| `+kubebuilder:default=<value>` | Default applied by the API server when the field is absent |
| `+kubebuilder:validation:Enum=a;b;c` | Restrict to a fixed set |
| `+kubebuilder:validation:Minimum` / `Maximum` | Numeric bounds |
| `+kubebuilder:validation:Pattern` | Regular expression |
| `+kubebuilder:validation:items:MinLength` / `items:Pattern` | Constraints on array elements |
| `+kubebuilder:validation:XValidation:rule="..."` | CEL expression for anything the above cannot express |

## Two ways to get this wrong

Both of these have already bitten this project.

### Markers are case-sensitive

`controller-gen` matches marker names exactly. `+kubebuilder:validation:optional` — lowercase `o` —
is not a marker; it is silently ignored, and the field falls back to the default rule that a field
without `omitempty` in its JSON tag is **required**.

Nothing warns you. The build succeeds, the CRD generates, and the field quietly lands in the CRD's
`required` list. The only way to notice is to read the generated YAML:

```bash
grep -A3 'required:' config/crd/bases/<group>_<plural>.yaml
```

Always write `Optional` and `Required` capitalised, and give optional fields `omitempty` in the JSON
tag as well.

### Defaults on fields inside `config`

`+kubebuilder:default` looks harmless but must not be used on fields inside the `config` block,
which is folded from role to role group.

Structural defaulting fills a leaf as soon as its **enclosing object** exists. So a default on a
field inside `config` is applied to any role group that wrote a `config` block for any reason at
all — which makes "the group did not set this" indistinguishable from "the group explicitly set the
default", and stops the role-level value from ever winning the merge.

Several fields in `operator-go` carry comments explaining exactly this and deliberately omit a
default. Defaults for folded fields belong at consumption time, in the code that reads them.

## Related

- [Kubebuilder Book](https://book.kubebuilder.io/)
- [CRD generation reference](https://book.kubebuilder.io/reference/generating-crd)
- [Development Guideline](../developer-manual/develop-guideline.md)
