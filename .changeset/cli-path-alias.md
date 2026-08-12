---
"@aledx18/authkit": minor
---

`init` now configures the `@/*` → `./src/*` path alias in tsconfig.json (skipped when already present, `.bak` backup kept). Astro resolves the alias at runtime natively, no Vite config needed. Generated pages import the stylesheet via `@/styles/global.css`.
