
# 文档编写指南

如果你想要参与文档编写，请阅读本文档，了解文档编写的基本规范。

项目文档是基于 [docusaurus](https://docusaurus.io/) 构建的，文档源码位于 `docs` 目录下。

当前文档语言默认是英文，且现在支持中文和英文两种语言，如果需要贡献英文文档，可以直接在 `docs`中编写，如果需要贡献中文文档，请在 `i18n/zh/docusaurus-plugin-content-docs/current` 中编写。
请在编写完成后，运行 `yarn write-translations --locale zh` 生成中文国际化配置，然后调整 `i18n/zh` 的中文国际化配置。

## 编写规范

在编写文档时，需要明确遵循一下几点规范：

- 文档基于 Markdown 编写，文件后缀名为 `.md`。
- 文档文件名以英文命名，须符合语义，如 `document-guideline.md`。
- 文档文件名中的英文单词使用 `-` 连接，不要使用 `_` 连接。因为文档文件名会作为 URL 的一部分，所以需要保证 URL 的可读性。
