# @aledx18/authkit

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
