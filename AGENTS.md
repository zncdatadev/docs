# AGENTS.md

Instructions for AI coding agents working with this repository.

## Project Overview

This is the documentation site for **Kubedoop Data Platform** (<https://kubedoop.dev>),
built with [Docusaurus 3](https://docusaurus.io/). The site is deployed to GitHub
Pages and supports both English and Chinese (zh-Hans).

## Tech Stack

- **Framework**: Docusaurus 3.10 (React 19, TypeScript 5.8)
- **Package Manager**: npm
- **Deployment**: GitHub Pages (`gh-pages` branch)

## Repository Structure

```text
docs/                  # English documentation source
i18n/zh/docusaurus-plugin-content-docs/current/  # Chinese documentation source
src/                   # React components and custom CSS
docusaurus.config.ts   # Site configuration (navbar, footer, i18n, plugins)
sidebars.ts            # Sidebar navigation structure
static/                # Static assets (images, favicons)
```

## Common Commands

```bash
npm install            # Install dependencies
npm run build          # Production build (en + zh-Hans)
npm start              # Local dev server with hot reload
npm run typecheck      # TypeScript type checking (npx tsc --noEmit)
```

## Development Rules

### Before Submitting a PR

1. Run `npm run build` and ensure it succeeds for both locales
2. Run `npx tsc --noEmit` and ensure no TypeScript errors
3. Check for markdown lint issues — no line should exceed 200 characters
4. Verify new pages appear correctly in the sidebar (`sidebars.ts`)

### Adding Documentation

- **English docs**: place in `docs/` directory
- **Chinese docs**: place in `i18n/zh/docusaurus-plugin-content-docs/current/`
- Filenames use kebab-case (e.g., `service-discovery.md`)
- After adding Chinese docs, run `npm run write-translations -- --locale zh-Hans`
  (the `--` separator is required, otherwise npm swallows `--locale` and the
  bare `zh` is read as a site directory)

### Sidebar Updates

All sidebar navigation is defined in `sidebars.ts`. New documentation pages
must be added to the appropriate category in this file to appear in the nav.

### i18n Notes

- Default locale: `en`
- Second locale: `zh-Hans` (BCP 47 compliant)
- Locale configs are in `docusaurus.config.ts` under `i18n.localeConfigs`
- Do NOT use `zh` as a locale key — use `zh-Hans` (Docusaurus 3.10+ requirement)

### Markdown Rules

- Max line length: 200 characters
- Use fenced code blocks with language hints (`yaml`, `bash`, `typescript`)
- For Mermaid diagrams, use fenced blocks with `mermaid` language hint
- Prefer relative links for internal references (`../core-concepts/...`)

### Operator Documentation Template

When creating documentation for a new Operator, use the template at
`docs/operators/_template.md` as a starting point. The template defines
the standard sections: Overview, Prerequisites, Quick Start, Configuration,
Advanced, Troubleshooting, Clean Up, Related Links.

## Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <subject>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example: `docs(operators): add kafka-operator documentation`

## CI Checks

This repository runs the following GitHub Actions on every PR:

- **Markdown Lint** — line length, formatting rules
- **TypeScript Lint** — type checking for `.ts`/`.tsx` files
- **Deploy to GitHub Pages** — only runs on main branch after merge

All checks must pass before a PR can be merged.

## Development Workflow

All contributions follow a fork-based workflow with Git Worktree for parallel
task development.

### Git Setup

```bash
# Fork zncdatadev/docs to your personal account
# Clone and configure remotes
git clone https://github.com/<your-username>/docs.git
git remote add upstream https://github.com/zncdatadev/docs.git
```

### Workflow Steps

1. **Sync upstream**: `git pull --rebase upstream main`
2. **Create branch**: use naming convention `<type>/<short-description>`
3. **Create worktree**: `git worktree add ../docs-<task> -b <branch-name>`
4. **Develop and verify** in the worktree (run `npm run build`)
5. **Push to fork**: `git push origin <branch-name>`
6. **Open PR** against `zncdatadev/docs` main branch
7. **Ensure all CI checks pass** (Markdown Lint, TypeScript Lint)
8. **Code Review**: at least 1 reviewer approval required
9. **Clean up** after merge: remove worktree and delete branch

### Branch Naming

| Type | Format | Example |
|------|--------|--------|
| New feature | `feature/<scope>-<desc>` | `feature/kafka-rebalance` |
| Bug fix | `fix/<scope>-<desc>` | `fix/hdfs-memory-leak` |
| Documentation | `docs/<desc>` | `docs/add-trino-operator` |
| Refactor | `refactor/<scope>-<desc>` | `refactor/operator-go-api` |
| Dependency | `chore/<desc>` | `chore/upgrade-k8s-0.36` |

### Worktree Conventions

- Each task gets its own worktree: `docs-<task-short-name>`
- Multiple worktrees can run in parallel for the same repo
- Clean up after merge: `git worktree remove <path>`

### PR Description Template

```markdown
## Summary
Brief description of the change.

## Changes
- Change 1
- Change 2

## Testing
- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit` passes
- [ ] No lines exceeding 200 characters
- [ ] All CI checks pass

## Related Issues
Link to related issues or task IDs.
```
