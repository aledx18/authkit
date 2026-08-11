---
"@aledx18/astro": minor
---

Replace `createAuthHandlers` with `authActions` — Astro Actions definitions for `signin`, `signout` and `register` (`@aledx18/astro/actions`). Consumers wrap them with `defineAction()` in their own `src/actions/index.ts` (the `astro:actions` virtual import stays in user code). Handlers return discriminated results (`{ ok: true } | { ok: false, error }`) and use zod-4 schemas from `astro/zod`, giving built-in input validation and CSRF protection. `createAuthHandlers` is removed. Peer dependency raised to `astro >= 5.0.0` (Actions requirement).
