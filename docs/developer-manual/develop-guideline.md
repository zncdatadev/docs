---
title: Development Guideline
---

This page covers developing Kubedoop itself — the operators and the framework they share. For
writing documentation see [Document Writing Guidelines](./document-guideline.md), and for the fork
and pull request mechanics see [First Contribution](./first-commiter.md).

## What you would be working on

Kubedoop is not one repository. Each piece lives under
[github.com/zncdatadev](https://github.com/zncdatadev):

| Repository | Contains |
|------------|----------|
| `operator-go` | The Go framework every operator builds on: shared CRD types, the reconciler, resource builders |
| `<product>-operator` | One operator per product — `zookeeper-operator`, `hdfs-operator`, `trino-operator`, and so on |
| `commons-operator`, `listener-operator`, `secret-operator` | The built-in operators every product cluster depends on |
| `containers` | Product container images |
| `kubedoop-helm-charts` | Published Helm charts |
| `docs` | This site |

Each operator is an independent Go module that depends on `operator-go`. A change to shared
behaviour usually belongs in the framework; a change to one product's rendering belongs in that
product's operator.

## Prerequisites

| Tool | Why |
|------|-----|
| Go | Building and testing. The required version is in each repository's `go.mod` |
| Docker or Podman | Building operator images |
| kubectl | Talking to a cluster |
| [kind](https://kind.sigs.k8s.io/) | The local cluster end-to-end tests run against |
| Helm | Installing operator dependencies during e2e |

Everything else — `controller-gen`, `kustomize`, `setup-envtest`, `golangci-lint`, `chainsaw` — is
downloaded into the repository's `bin/` directory by the Makefile on first use. Do not install those
globally; a mismatched version is a source of failures that do not reproduce in CI.

Kubernetes 1.29 is the supported floor.

## Repository layout

Operators follow the standard [Kubebuilder](https://book.kubebuilder.io/) layout, with a few
Kubedoop additions:

```text
api/v1alpha1/       # CRD Go types — the API surface
internal/           # Reconcilers, builders, product-specific logic
cmd/                # Manager entrypoint
config/             # Kustomize manifests, including generated CRDs
deploy/helm/        # The operator's Helm chart
test/e2e/           # Chainsaw end-to-end suites
examples/           # Example custom resources
Makefile            # Every task below
PROJECT             # Kubebuilder project metadata
```

`make help` lists the targets in any operator repository.

## The development loop

```bash
make manifests generate   # regenerate CRDs and deepcopy code after API changes
make fmt vet              # format and vet
make lint                 # golangci-lint
make test                 # unit tests
make build                # build the manager binary
make run                  # run the controller against your current kubecontext
```

`make test` depends on `manifests generate fmt vet`, so it regenerates before running. If that
produces a diff, commit it — generated files are checked in.

## Changing the API

API types live in `api/v1alpha1/`. After editing them:

```bash
make manifests generate
```

This regenerates the CRD YAML under `config/` and the `zz_generated.deepcopy.go` files. Both are
committed, so a change to a type with no accompanying regeneration will show up as a diff in CI.

The Helm chart carries its own copy of the CRDs and the operator's RBAC rules, and they do not
update themselves:

```bash
make helm-crd-sync    # copy generated CRDs into deploy/helm/
make helm-rbac-sync   # copy the generated ClusterRole rules into deploy/helm/
```

Forgetting these is the usual cause of a chart that installs an operator against a stale CRD.

### Adding fields

Prefer the shared structures in `operator-go`'s `pkg/apis/commons/v1alpha1` — resources, logging,
affinity, PodDisruptionBudget — over defining a product-local equivalent. A field that ends up
copied into three operators is a sign it belongs in the framework instead.

Be careful with `+kubebuilder:default` on fields inside `config`. That block is folded from role to
role group, and structural defaulting fills a leaf as soon as its enclosing object exists — so a
default there makes "unset" indistinguishable from "explicitly this value", and the role's setting
can never win. Several fields in the framework carry comments explaining exactly this; defaults for
folded fields belong at consumption time.

## Testing

### Unit tests

```bash
make test
```

These run against [envtest](https://book.kubebuilder.io/reference/envtest.html) — a real API server
and etcd, no scheduler or controllers. Enough to assert what the operator *renders*: that a given
CR produces the StatefulSet, ConfigMap and Service you expect.

### End-to-end tests

End-to-end tests use [Chainsaw](https://kyverno.github.io/chainsaw/) against a kind cluster. Cases
live in `test/e2e/<suite>/<case>/`, each a directory of YAML steps and assertions.

```bash
make setup-chainsaw-cluster   # create the kind cluster, install operator dependencies
make setup-chainsaw-e2e       # build the image, load it, deploy the operator
make chainsaw-e2e             # run the suites
make cleanup-chainsaw-e2e     # undeploy
```

`setup-chainsaw-cluster` installs the operators the product depends on — `commons-operator`,
`listener-operator` and `secret-operator` — from the published charts, because almost nothing works
without them: secrets, listeners and pod enrichment are all provided by those three.

Write an end-to-end case for anything that only shows up on a live cluster: rendered configuration
a unit test would have to duplicate, rolling behaviour, discovery between two products. Keep
assertions on the resources rather than on log output.

## Working with operator-go

Operators depend on a released `operator-go`. When a change needs both the framework and an operator
at once, point the module at your local checkout while developing:

```text
replace github.com/zncdatadev/operator-go => ../operator-go
```

Remove the `replace` before opening the pull request — it cannot be merged. Land the framework
change first, then bump the operator to the released version.

## Before opening a pull request

Run the same gates CI does, from the operator's repository:

```bash
make manifests generate   # and commit any resulting diff
make fmt vet lint
make test
make helm-crd-sync helm-rbac-sync   # if the API changed
```

Then the end-to-end suite for anything touching rendering or reconcile behaviour.

Follow the commit and branch conventions in [First Contribution](./first-commiter.md), and describe
in the pull request what you actually ran. A checklist box ticked without running the command is
worse than an honest note about what was skipped.

## Related

- [Collaboration Guide](./collaboration.md)
- [First Contribution](./first-commiter.md)
- [Document Writing Guidelines](./document-guideline.md)
- [Project Status](./project-status.md)
