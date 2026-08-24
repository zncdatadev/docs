# AGENTS.md

Instructions for AI coding agents working with this repository.

`CLAUDE.md` is a symlink to this file. Edit `AGENTS.md`; never edit `CLAUDE.md`.

## Project Overview

Documentation site for **Kubedoop Data Platform** (<https://kubedoop.dev>), built with
[Docusaurus 3](https://docusaurus.io/) and deployed to GitHub Pages. Bilingual: English
(`en`, default) and Chinese (`zh-Hans`).

This repository contains **documentation only** — no Kubedoop product code. The Operators
it documents live in sibling repositories under <https://github.com/zncdatadev>.

## Tech Stack

- **Framework**: Docusaurus 3.10 (React 19, TypeScript 5.8)
- **Package manager**: npm. The lockfile is committed — use `npm ci`, not `npm install`
- **Node**: `>=18` per `package.json`; CI runs 22
- **Deployment**: GitHub Pages via the `gh-pages` branch, published by CI on main pushes

## Repository Structure

```text
docs/                          # English documentation source (default locale)
i18n/zh/docusaurus-plugin-content-docs/current/   # Chinese documentation source
i18n/en/, i18n/zh/             # UI-string translations (generated, not prose)
src/                           # React components and custom CSS
static/                        # Static assets (images, favicons, CNAME)
docusaurus.config.ts           # Site config (navbar, footer, i18n, markdown, themes)
sidebars.ts                    # Sidebar navigation structure
.markdownlint.yml              # Markdown rule config
.github/workflows/gh-page.yml  # CI: lint, build, deploy
```

## Verify Before Claiming Done

One command mirrors CI:

```bash
npm run verify        # lint:md + typecheck + build (both locales)
```

Or step by step:

```bash
npm ci                # install exactly what the lockfile pins
npm run lint:md       # markdownlint over *.md, docs/**, i18n/**
npm run typecheck     # tsc (noEmit comes from @docusaurus/tsconfig)
npm run build         # production build, en + zh-Hans
npm start             # dev server, hot reload, default locale only
```

`npm run verify` passing is the bar for "done". Do not report a change as complete
without running it, and do not tick a PR checklist box you did not actually run.

### Traps that have already cost time here

**Use the repo's pinned markdownlint, not a global one.** `markdownlint-cli2` is a
devDependency pinned to an exact version and `npm run lint:md` uses it. Newer versions
enforce rules this repo has never enforced: 0.23 adds `MD060` (table-column-style),
which flags roughly 46 tables that CI considers clean. `npx markdownlint-cli2` without a
version pulls the latest and will send you fixing violations that do not exist.

**"Max 200 characters" is not literal.** `MD013` runs with `strict: false`, which exempts
lines having no whitespace past the limit — an unbreakable long line (a URL, a long word)
is not a violation. Do not rewrap prose to satisfy a rule that is not firing. Ask
`npm run lint:md`, do not count characters.

**Do not measure line length in bytes.** `MD013` counts characters. `awk 'length($0)'`
counts bytes, so CJK prose (3 bytes per character) looks 3x longer than it is and
produces phantom violations.

**Mermaid cannot be verified from build output.** Diagrams render client-side, so the SSR
HTML holds an empty container either way. `grep language-mermaid build/...` returning 0
only proves the fence was intercepted, not that anything drew. To confirm a diagram
renders, load the page in a browser and look for `.docusaurus-mermaid-container svg`.

## Documentation Content

### Current state: early skeleton

**13 of 24 pages are empty or single-heading placeholders.** Check before editing:

```bash
find docs -name '*.md' -size -100c | sort     # the placeholders
```

Treat a placeholder as "not written yet" rather than a page to patch around.

### The en and zh trees must mirror each other exactly

Every file in `docs/` has a counterpart at the same relative path under
`i18n/zh/docusaurus-plugin-content-docs/current/`. They currently match 1:1. Adding a
page in one language only breaks the convention silently: Docusaurus falls back to the
English source, so the build still passes.

```bash
diff <(cd docs && find . -name '*.md' | sort) \
     <(cd i18n/zh/docusaurus-plugin-content-docs/current && find . -name '*.md' | sort)
```

### Known inconsistency — do not copy it

`docs/developer-manual/first-commiter.md` and `docs/developer-manual/develop-guideline.md`
hold **Chinese prose inside the English tree**, and `first-commiter.md` is byte-identical
to its `zh` counterpart. Write new pages in the language of the tree they live in.

### Adding a page

- English goes in `docs/`, Chinese in `i18n/zh/docusaurus-plugin-content-docs/current/`
- Filenames are kebab-case (`service-discovery.md`)
- Add both languages in the same change
- Check whether the sidebar needs an entry (see below)
- After adding UI strings, regenerate translations:

  ```bash
  npm run write-translations -- --locale zh-Hans
  ```

  The `--` separator is required. Without it npm swallows `--locale` and passes a bare
  `zh` to docusaurus as a site directory, failing with `ENOENT ... lstat '<repo>/zh'`.

### New Operator pages

Start from `docs/operators/_template.md`, which defines the standard sections: Overview,
Prerequisites, Quick Start, Configuration, Advanced, Troubleshooting, Clean Up, Related
Links. Copy it into both language trees.

## Sidebar

`sidebars.ts` mixes hand-written entries with `autogenerated` blocks, so whether you must
touch it depends on where the page lands:

| Page location | Sidebar entry |
|---------------|---------------|
| `core-concepts/*/`, `operators/`, `developer-manual/`, `reference/`, `user-manual/environment/` | Automatic (`autogenerated`) |
| Repository top level and `quick-start/` | Manual — add it to `sidebars.ts` |

## Markdown Rules

- Fenced code blocks need a language hint; use `text` for plain output (`MD040`)
- Mermaid diagrams use fenced blocks with the `mermaid` hint. Rendering is wired up in
  `docusaurus.config.ts` (`markdown.mermaid` plus `@docusaurus/theme-mermaid`), with the
  diagram theme mapped to the site colour mode
- Prefer relative links for internal references (`../core-concepts/...`)
- `onBrokenLinks: 'throw'` — a broken internal link fails the build

## i18n Notes

- Default locale `en`, second locale `zh-Hans`
- `zh-Hans` is the **locale key**; `zh` is only the URL **path**, set in
  `i18n.localeConfigs['zh-Hans'].path`. Never use `zh` as a locale key
- `npm start` serves the default locale only — use `npm run build` to exercise both

## Commit Message Conventions

[Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <subject>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example: `docs(operators): add kafka-operator documentation`

Use the body to explain *why* when the reason is not obvious from the diff.

## CI

`.github/workflows/gh-page.yml`:

| Job | Runs on | Does |
|-----|---------|------|
| **Lint** | PRs and main pushes | `npm run lint` (markdownlint + tsc) |
| **Build** | PRs only | `npm run build`, both locales |
| **Deploy to GitHub Pages** | main pushes only | build, then publish to `gh-pages` |

CI invokes the same npm scripts you run locally, so a local `npm run verify` passing
should mean CI passes.

## Development Workflow

Fork-based, with git worktrees for parallel tasks.

### Setup

```bash
git clone https://github.com/<your-username>/docs.git
cd docs
git remote add upstream https://github.com/zncdatadev/docs.git
```

### Steps

1. Sync: `git fetch upstream && git switch main && git merge --ff-only upstream/main`
2. Branch off upstream main — see naming below
3. Optional worktree: `git worktree add ../docs-<task> -b <branch-name>`
4. Develop, then run `npm run verify`
5. Push to your fork: `git push -u origin <branch-name>`
6. Open a PR against `zncdatadev/docs` main
7. All CI checks must pass; one reviewer approval is required
8. Clean up after merge: `git worktree remove <path>` and delete the branch

### Do not stack PRs

Branch every PR off upstream `main`, never off another open PR's branch. A stacked PR
carries its parent's commits, and if the two merge out of order the same change lands
twice. This has already happened here: #35 was stacked on #33, both merged, and
`docusaurus.config.ts` ended up with duplicate `markdown` and `themes` keys — which broke
`tsc` on main and blocked every deploy until #36. If a change depends on another, wait
for the parent to merge, then rebase onto the new main.

### Branch Naming

| Type | Format | Example |
|------|--------|--------|
| New feature | `feature/<scope>-<desc>` | `feature/kafka-rebalance` |
| Bug fix | `fix/<scope>-<desc>` | `fix/hdfs-memory-leak` |
| Documentation | `docs/<desc>` | `docs/add-trino-operator` |
| Refactor | `refactor/<scope>-<desc>` | `refactor/operator-go-api` |
| Chore, deps, CI | `chore/<desc>` | `chore/upgrade-k8s-0.36` |

### PR Description Template

```markdown
## Summary
Brief description of the change.

## Changes
- Change 1
- Change 2

## Testing
- [ ] `npm run verify` passes (lint + typecheck + build, both locales)
- [ ] New pages added to both `docs/` and the `zh` tree
- [ ] New pages appear in the sidebar

## Related Issues
Link to related issues or task IDs.
```

Record what you actually ran. An honest note about what was skipped is worth more than a
ticked box that nobody verified.
