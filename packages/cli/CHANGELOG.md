# @aledx18/authkit

## 0.4.1

### Patch Changes

- d67a66a: Fix signout PRG in the generated dashboard: read `Astro.getActionResult(actions.signout)` and redirect to `/signin` on success. Without it the middleware (which runs before the action) still saw a valid session, so the page re-rendered instead of redirecting and the browser showed a "confirm form resubmission" dialog on refresh.

## 0.4.0

### Minor Changes

- 8aad57d: `init` now scaffolds Astro Actions instead of form POST endpoints: generates `src/actions/index.ts` (wiring `authActions` with `defineAction`), and signin/register/dashboard pages use `<form method="POST" action={actions.x}>` with PRG redirects via `Astro.getActionResult()`. The email-confirmation `callback` remains a GET endpoint.

### Patch Changes

- 5722b2f: Generated signin/register pages now use `requireGuest`: authenticated users visiting them are redirected to `/dashboard` instead of seeing the form again.

## 0.3.0

### Minor Changes

- 4c594fc: Interactive SSR setup during `init`: when the Astro config does not set `output: "server"`, the CLI now prompts to configure it (adapter choice: node/vercel/cloudflare/netlify), installs the adapter as a devDependency, and patches the config with `output: "server"` + adapter (keeping a `.bak` backup). Skipping is still possible; if `output: "server"` is already set, the step is silent.

### Patch Changes

- b4144ed: Fix env template: generate `PUBLIC_SUPABASE_URL` (matching `@aledx18/astro` env schema) instead of `SUPABASE_URL`.

## 0.2.0

### Minor Changes

- a280dd9: Implement the `init` command for Astro projects:

  - Detect Astro (config file or dependency) with a clear "framework not supported yet" error
  - Detect package manager from lockfiles (bun, pnpm, npm, yarn)
  - Prompt for Supabase credentials with `@clack/prompts` (URL + publishable key, or placeholders)
  - Install deps (`@aledx18/astro`, `@supabase/supabase-js`, `@supabase/ssr`) with the detected package manager
  - Write `.env` (real credentials) or `.env.example` (placeholders) via `{{TOKEN}}` replacement
  - Copy templates: supabase clients, middleware, auth endpoints (signin/signout/register/callback), signin/register/dashboard pages, types
  - Warn when `astro.config.*` does not set `output: "server"`
  - Final step-by-step report
