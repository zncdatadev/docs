---
title: 第一次贡献
---

如果你是第一次在 GitHub 上贡献代码，按下面的步骤就能快速开始。至于本项目期望的各项约定——
分支命名、提交信息、提 PR 前要跑什么——参见[协作指南](./collaboration.md)和
[开发指南](./develop-guideline.md)。

## Fork 项目

- 打开项目页面，点击右上角的 **Fork**
- 你的账号下会出现一份副本，例如 `<your_name>/docs`
- 克隆到本地：

```bash
git clone https://github.com/<your_name>/docs
```

## 关联上游仓库

把本地克隆与上游仓库关联：

```bash
git remote add upstream https://github.com/zncdatadev/docs
```

然后同步：

```bash
git pull upstream main
```

现在你在自己 fork 的 `main` 分支上，这个 `main` 留作跟踪 `upstream`，不要直接往上面提交。

## 创建分支

请在分支上开发，而不是在 `main` 上。

分支名要体现改动的类型：

| 类型 | 格式 | 示例 |
|------|------|------|
| 新功能 | `feature/<scope>-<desc>` | `feature/kafka-rebalance` |
| Bug 修复 | `fix/<scope>-<desc>` | `fix/hdfs-memory-leak` |
| 文档 | `docs/<desc>` | `docs/add-trino-operator` |
| 重构 | `refactor/<scope>-<desc>` | `refactor/operator-go-api` |
| 杂项、依赖、CI | `chore/<desc>` | `chore/upgrade-k8s-0.36` |

```bash
git switch -c fix/foo-error
```

改完之后提交。提交信息遵循
[Conventional Commits](https://www.conventionalcommits.org/)：

```bash
git commit -a -m "fix: foo error"
```

## 推送前先 rebase

在你开发期间，`upstream` 多半已经往前走了。先 rebase 到最新的 `main`，
可以让你的 PR 干净地应用上去，而不是带着冲突提交过来。

先更新 `main`：

```bash
git switch main
git pull upstream main
```

再把你的分支 rebase 到它上面：

```bash
git switch fix/foo-error
git rebase main
```

如果有冲突，解决后继续：

```bash
git add .
git rebase --continue
```

然后推送到你的 fork：

```bash
git push origin fix/foo-error
```

如果这个分支在 rebase 之前已经推送过，这次推送会被拒绝，因为历史变了。
对你自己的分支强制推送即可：

```bash
git push --force-with-lease origin fix/foo-error
```

## 提交 Pull Request

在 GitHub 上进入项目，切换到刚推送的分支，点击 **Pull Request**，填写说明。

提交之前先在本地跑一遍检查，免得 CI 挂在你本可以提前发现的问题上：

```bash
npm run verify
```

所有 CI 检查通过、并获得一位 reviewer 批准后，PR 才能合并。

## 相关内容

- [协作指南](./collaboration.md)
- [开发指南](./develop-guideline.md)
- [文档编写规范](./document-guideline.md)
