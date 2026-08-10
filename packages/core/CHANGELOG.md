# @aledx18/supabase-auth-core

## 0.3.0

### Minor Changes

- 30c289b: Reduce core to minimal day-1 surface:

  - **Removed**: `createAuthClient`, `AuthClient`, `getAuthErrorMessage`, `AuthResult`, `AuthClientOptions` — all auth wrappers were 1:1 duplicates of supabase-js.
  - **Added**: `validateSupabaseEnv` (zod-based env validation accepting `PUBLIC_SUPABASE_PUBLISHABLE_KEY` or legacy `PUBLIC_SUPABASE_ANON_KEY`) and `AuthUser` / `NormalizedAuthError` shared types.

## 0.2.1

### Patch Changes

- 7221909: Fix ESM: add `.js` extensions to relative imports so the packages work in Node/Bun without a bundler

## 0.2.0

### Minor Changes

- 76b253c: Initial release: framework-agnostic auth layer for Supabase with login, logout, signup
