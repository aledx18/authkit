# authkit Agent Guide

## Workspace

- This Bun monorepo targets a Supabase auth kit with multiple integrations.
- Publishable code lives under `packages/`:
  - `packages/core` → `astro-auth-core` (tipos + utilidades mínimas NO cubiertas por supabase-js)
  - `packages/cli` → `astro-auth-kit` (CLI de scaffolding, sin lógica de auth)
  - `packages/astro` → `astro-auth-integration` (integración Astro: middleware, locals, cookies, protected routes)
- `examples/astro-basic` is a real Astro project with `output: 'server'` and adapter-node — this is the test field for discovering patterns that deserve to move up to core or astro.
- Public package APIs are exported from each package's `src/index.ts`.
- Internal dependencies use `"workspace:*"`.

## Commands

Run from the repository root:

```bash
bun install
bun run lint
bun run typecheck
bun run build
```

- `bun run build` builds all workspaces under `packages/*`.
- Focused commands: `bun run --filter='astro-auth-core' build`, `bun run --filter='astro-auth-kit' build`, `bun run --filter='astro-auth-integration' build`.
- To run the Astro example: `cd examples/astro-basic && bun install && bun run dev`.
- There is no test runner or automated test suite yet.
- Biome is authoritative for linting and formatting. Use `bun run lint:fix` or `bun run format` only when intentionally applying automated edits.

## TypeScript Packages

- TypeScript uses strict composite project references. When adding a package, extend `../../tsconfig.base.json`, add references for its internal dependencies, and add the package to root `tsconfig.json` references.
- New packages under `packages/` use unscoped npm names and expose their public API from `src/index.ts`.

## Releases

- Changesets manages package releases. The GitHub workflow runs on pushes to `main`, builds `packages/*`, then opens a release PR or publishes to npm. Do not rely on the README's tag-trigger statement; the workflow is the source of truth.
