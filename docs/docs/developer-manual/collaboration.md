
# 协作指南

本文会指导你如何为 ZNCData Labs 贡献一份自己的力量，在贡献代码之前，请花点时间阅读一下细节。

## 行为准则

我们有一份[行为准则](https://github.com/zncdata-labs/zncdata-stack.git/CODE_OF_CONDUCT.md)，希望所有的贡献者都能遵守，请花时间阅读一遍全文以确保你能明白哪些是可以做的，哪些是不可以做的。

## 分支管理

我们长期维护主分支（`main`）和发布分支（`release-x.x`）。主分支是最新的代码，我们会不定期将新特性和功能合并到主分支，所以主分支会有一些 BUG 和不稳定的地方。
当主分支经历一个阶段的功能积累时，或者在发布路线图中的某个时机点，我们会从主分支切出一个新的发布分支，并在发布分支上进行测试和修复 BUG，直到发布分支稳定后，
我们会将发布分支合并到主分支，并发布一个新的版本。

在贡献代码之前请确定你是修复某一个版本的 BUG，还是在开发新的功能。如果修复 BUG，请基于 `fix/` 前缀分支开发后合并到该版本的发布分支。我们会在合适的时间发布 `patch` 版本。
如果是开发新的功能，请基于 `feature/` 前缀分支开发后合并到主分支。

## 第一次贡献

如果你是第一次贡献代码，请参考[第一次贡献](./first-commiter.md) 快速开始。

## Pull Request

我们使用 Pull Request 来进行代码的合并，如果你不熟悉 Pull Request 的使用，请参考 [Github 官方文档](https://docs.github.com/cn/github/collaborating-with-issues-and-pull-requests/about-pull-requests)。

我们会及时关注 Pull Request，并合并，也有可能在代码评审后要求你最一些修改再合并。如果你的 Pull Request 没有及时得到回复，请在我们的社区中提出来，我们会尽快处理。

在提交 Pull Request 之前，请检查一下清单：

- 基于正确的分支开发
- 执行 `pre-commit` 并确保没有异常
- 代码提交信息遵循提交规范
- 确保所有 Github CI 检查通过，如果失败，请查看原因并修改。

在所有问题都解决后，发起 Pull Request。

## 提交信息规范

清晰易读的提交信息有助于问题排查，也有利于自动生成 CHANGELOG，所以我们要求所有的提交信息都遵循以下规范：

### 提交信息格式

每条提交消息均由标题、正文和页脚组成。标头具有特殊格式，包括类型、范围和主题：

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

其中，**标题是必需的，正文和页脚是可选的**。

提交消息的任何行都不能超过 100 个字符！这使得该消息在 GitHub 以及各种 git 工具中更容易阅读。

示例提交：

```text
docs(changelog): update changelog to beta.5
```

```text
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

#### 范围（scope）

范围时可选的，用于标识提交的影响范围。例如，变更内容是某个模块，或者某种类型的任务等。

#### 类型（type）

- build: 影响构建系统或外部依赖的更改(示例范围:gulp、broccoli、npm)
- ci: 更改CI配置文件和脚本(示例范围:Travis, Circle, BrowserStack, SauceLabs)
- docs: 仅文档更改
- feat: 新功能
- fix: 修复bug
- perf: 改进性能的代码更改
- refactor: 代码更改既不修复错误也不添加功能
- style: 不影响代码含义的更改(空格、格式、缺少分号等)
- test: 添加缺失测试或更正现有测试

#### 主题 （subject）

该主题包含对更改的简洁描述：

- 使用祈使句、现在时：“change”而不是“changed”或“changes”
- 不要将第一个字母大写
- 末尾没有点 (.)

#### 正文（body）

正如在主语中一样，使用祈使式、现在时：“change”而不是“changed”或“changes”。正文应包括改变的动机，并将其与以前的行为进行对比。

#### 页脚（footer）

页脚应包含有关重大更改的所有信息，也是引用此提交关闭的GitHub 问题的位置。

重大变更BREAKING CHANGE:应以带有空格或两个换行符的单词开头。然后，提交消息的其余部分将用于此目的。

详细的解释可以在这个文档中找到。
