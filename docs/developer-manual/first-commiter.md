---
title: First Contribution
---

If this is your first time contributing on GitHub, the steps below will get you started. For the
conventions this project expects — branch names, commit messages, what to run before opening a pull
request — see [Collaboration Guide](./collaboration.md) and
[Development Guideline](./develop-guideline.md).

## Fork the project

- Open the project page and click **Fork** in the top right
- A copy appears under your account, for example `<your_name>/docs`
- Clone it locally:

```bash
git clone https://github.com/<your_name>/docs
```

## Track the upstream repository

Link your local clone to the upstream repository:

```bash
git remote add upstream https://github.com/zncdatadev/docs
```

Then sync:

```bash
git pull upstream main
```

You are now on the `main` branch of your fork, which is kept for tracking `upstream`. Do not commit
to it directly.

## Create a branch

Do your work on a branch rather than on `main`.

Name the branch for the kind of change you are making:

| Type | Format | Example |
|------|--------|---------|
| New feature | `feature/<scope>-<desc>` | `feature/kafka-rebalance` |
| Bug fix | `fix/<scope>-<desc>` | `fix/hdfs-memory-leak` |
| Documentation | `docs/<desc>` | `docs/add-trino-operator` |
| Refactor | `refactor/<scope>-<desc>` | `refactor/operator-go-api` |
| Chore, deps, CI | `chore/<desc>` | `chore/upgrade-k8s-0.36` |

```bash
git switch -c fix/foo-error
```

Make your changes, then commit. Commit messages follow
[Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -a -m "fix: foo error"
```

## Rebase before you push

While you were working, `upstream` probably moved. Rebasing onto the latest `main` first means your
pull request applies cleanly instead of arriving with conflicts.

Update `main`:

```bash
git switch main
git pull upstream main
```

Then rebase your branch onto it:

```bash
git switch fix/foo-error
git rebase main
```

If there are conflicts, resolve them and continue:

```bash
git add .
git rebase --continue
```

Then push to your fork:

```bash
git push origin fix/foo-error
```

If you had already pushed the branch before rebasing, the push will be rejected because the history
changed. Force-push your own branch:

```bash
git push --force-with-lease origin fix/foo-error
```

## Open a pull request

Go to the project on GitHub, switch to the branch you just pushed, click **Pull Request**, and fill
in the description.

Before you do, run the checks locally so CI does not fail on something you could have caught:

```bash
npm run verify
```

All CI checks must pass, and one reviewer approval is required, before a pull request can be merged.

## Related

- [Collaboration Guide](./collaboration.md)
- [Development Guideline](./develop-guideline.md)
- [Document Writing Guidelines](./document-guideline.md)
