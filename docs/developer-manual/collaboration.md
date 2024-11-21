# Collaboration Guide

This document will guide you on how to contribute to ZNCDataDev. Please take some time to read the details before contributing code.

## Code of Conduct

We have a [Code of Conduct](https://github.com/kubedoop.dev/docs.git/CODE_OF_CONDUCT.md) that we hope all contributors will follow.
Please take the time to read it in full to ensure you understand what is acceptable and what is not.

## Branch Management

We maintain the main branch (`main`) and release branches (`release-x.x`) for the long term. The main branch contains the latest code,
and we periodically merge new features and functionalities into it, so it may have some bugs and instability.
When the main branch accumulates enough features or reaches a point in the release roadmap, we will create a new release branch from the main branch.
We will test and fix bugs on the release branch until it stabilizes, then merge it back into the main branch and release a new version.

Before contributing code, please determine whether you are fixing a bug for a specific version or developing a new feature. If fixing a bug,
develop on a `fix/` prefix branch and merge it into the release branch for that version. We will release a `patch` version at an appropriate time.
If developing a new feature, develop on a `feature/` prefix branch and merge it into the main branch.

## First Contribution

If this is your first time contributing code, please refer to [First Contribution](./first-commiter.md) to get started quickly.

## Pull Request

We use Pull Requests to merge code. If you are not familiar with Pull Requests,
please refer to the [GitHub Documentation](https://docs.github.com/cn/github/collaborating-with-issues-and-pull-requests/about-pull-requests).

We will review and merge Pull Requests in a timely manner, but we may ask you to make some modifications after code review before merging.
If your Pull Request is not responded to promptly, please raise it in our community, and we will address it as soon as possible.

Before submitting a Pull Request, please check the following list:

- Develop based on the correct branch
- Run `pre-commit` and ensure there are no issues
- Follow the commit message conventions
- Ensure all GitHub CI checks pass; if they fail, review the reasons and make corrections

Once all issues are resolved, submit the Pull Request.

## Commit Message Conventions

Clear and readable commit messages help with issue tracking and facilitate the automatic generation of CHANGELOGs. Therefore, we require all commit messages to follow these conventions:

### Commit Message Format

Each commit message consists of a header, body, and footer. The header has a special format that includes the type, scope, and subject:

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header is mandatory, while the body and footer are optional**.

No line in the commit message should exceed 100 characters! This makes the message easier to read in GitHub and various git tools.

Example commits:

```text
docs(changelog): update changelog to beta.5
```

```text
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

#### Scope

The scope is optional and is used to identify the area affected by the commit. For example, the change might be related to a specific module or type of task.

#### Type

- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

#### Subject

The subject contains a succinct description of the change:

- Use the imperative, present tense: “change” not “changed” nor “changes”
- Do not capitalize the first letter
- No dot (.) at the end

#### Body

Just as in the subject, use the imperative, present tense: “change” not “changed” nor “changes”. The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about breaking changes and is also the place to reference GitHub issues that this commit closes.

Breaking changes should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this document.
