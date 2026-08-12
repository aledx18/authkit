# @aledx18/authkit

## 0.7.0

### Minor Changes

- 3188ceb: Style the generated auth pages with Tailwind: signin, register, forgot-password, reset-password and dashboard now ship with a consistent card layout (slate background, blue primary, green/red message banners) and import the Tailwind stylesheet. The example mirrors the styled scaffold.
- aa36649: `init` now installs and configures Tailwind by default (like SSR): detects whether Tailwind is already present (deps or config), and if not, runs `astro add tailwind --yes` with the detected package manager (installs Tailwind v4 via `@tailwindcss/vite`, adds the vite plugin, scaffolds `src/styles/global.css`).

## 0.6.0

### Minor Changes

- 9e6bf57: `init` now scaffolds the password reset flow: `forgot-password` and `reset-password` pages (the latter exchanges the recovery code for a session with a PRG redirect, then updates the password), wires the new actions, and adds "Forgot your password?" + "password updated" messages to signin.

## 0.5.0

### Minor Changes

- 1b8cfc0: `init` now scaffolds the OAuth entry point (`src/pages/api/auth/oauth/[provider].ts` re-exporting `oauthRedirect`) and adds "Continue with Google/GitHub" links to the generated signin/register pages. Signin also displays the `?error=` query param (used by the callback and OAuth failure redirects).

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
