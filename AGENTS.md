# AGENTS.md

Instructions for AI coding agents working with this repository.

## Project Overview

This is the documentation site for **Kubedoop Data Platform** (https://kubedoop.dev),
built with [Docusaurus 3](https://docusaurus.io/). The site is deployed to GitHub
Pages and supports both English and Chinese (zh-Hans).

## Tech Stack

- **Framework**: Docusaurus 3.10 (React 19, TypeScript 5.8)
- **Package Manager**: npm
- **Deployment**: GitHub Pages (`gh-pages` branch)

## Repository Structure

```
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
- After adding Chinese docs, run `npm run write-translations --locale zh`

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

```
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
