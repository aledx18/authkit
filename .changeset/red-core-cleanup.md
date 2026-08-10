---
"@aledx18/supabase-auth-core": minor
---

Reduce core to minimal day-1 surface:

- **Removed**: `createAuthClient`, `AuthClient`, `getAuthErrorMessage`, `AuthResult`, `AuthClientOptions` — all auth wrappers were 1:1 duplicates of supabase-js.
- **Added**: `validateSupabaseEnv` (zod-based env validation accepting `PUBLIC_SUPABASE_PUBLISHABLE_KEY` or legacy `PUBLIC_SUPABASE_ANON_KEY`) and `AuthUser` / `NormalizedAuthError` shared types.
