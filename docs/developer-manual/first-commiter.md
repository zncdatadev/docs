
# 第一次贡献

如果你是第一次在 Github 上贡献代码，请参考如下步骤快速开始：

## Fork 项目

- 首先需要fork这个项目, 进入项目页面, 点击右上角的Fork按钮
- 你的 github 帐号中会出现相应名称的项目, 例如: `zncdata-stack`
- 在本地电脑(Linux)上使用以下命令克隆项目到本地

```bash
git clone https://github.com/<your_name>/zncdata-stack
```

## 获取最新源代码

将本地个人仓库和上游仓库关联

```bash
git remote add upstream https://github.com/kubedoop.dev/zncdata-stack
```

同步最新源代码

```bash
git pull upstream main
```

现在我们在 fork 来的 `main` 分支上, 这个 `main` 留作跟踪 `upstream` 的远程代码

## 创建分支

现在开始在本地开发，并准备贡献代码。

按照国际惯例，我们一般不在 `main` 分支上开发，而是创建一个新的分支，然后在新的分支上开发，开发完成后再合并到 `main` 分支。

首先明确我们要不贡献的代码是一个新的功能特性还是修复一个 bug 。如果是新增一个功能特性，需要创建一个基于 `feature/` 开头的
分支，如果是修复一个 bug ，在创建一个基于 `fix/` 开头的分支。

```bash
git checkout -b fix/foo-error
```

然后在这个分支上进行代码开发，并在开发完成后提交代码。

```bash
git commit -a -m "fix: foo error"
```

## 合并修改

一个常见的问题是远程的 upstream (swoole/swoole-src) 有了新的更新, 从而会导致我们提交的 Pull Request 时会导致冲突, 因此我们可以在提交前先把远程其他开发者的commit和我们的commit合并.

首先我们需要切换到 `main` 分支, 然后同步最新的代码

```bash
git checkout main
git pull upstream main
```

然后切换回我们的开发分支, 并合并 `main` 分支

```bash
git checkout fix/foo-error
git rebase main
```

如果有冲突, 请解决冲突, 然后继续合并

```bash
git add .
git rebase --continue
```

最后提交代码

```bash
git push origin fix/foo-error
```

## 提交 Pull Request

在 Github 的项目中，切换到刚刚推送的分支，点击 `Pull Request` 按钮，填写相应的信息，然后提交 Pull Request。
