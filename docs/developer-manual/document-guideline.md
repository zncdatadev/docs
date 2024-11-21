# Document Writing Guidelines

If you want to participate in document writing, please read this document to understand the basic norms of document writing.

The project documentation is built based on [docusaurus](https://docusaurus.io/), and the documentation source code is located in the `docs` directory.

The default language of the current document is English, and it now supports both Chinese and English. If you need to contribute English documents, 
you can write directly in the `docs` directory. If you contribute Chinese documents, you need to write in the `i18n/zh/docusaurus-plugin-content-docs` directory.
After writing, please run `yarn write-translations --locale zh` to generate the Chinese internationalization configuration, 
and then adjust the Chinese internationalization configuration in `i18n/zh`.

## Writing Norms

When writing documents, you need to clearly follow the following norms:

- Documents are written in Markdown, with the file extension `.md`.
- Document filenames are named in English and must be semantically meaningful, such as `document-guideline.md`.
- English words in document filenames are connected with `-`, not `_`. Since document filenames will be part of the URL, it is necessary to ensure the readability of the URL.

TODO
