# @aledx18/astro

## 0.3.0

### Minor Changes

- 8aad57d: Replace `createAuthHandlers` with `authActions` — Astro Actions definitions for `signin`, `signout` and `register` (`@aledx18/astro/actions`). Consumers wrap them with `defineAction()` in their own `src/actions/index.ts` (the `astro:actions` virtual import stays in user code). Handlers return discriminated results (`{ ok: true } | { ok: false, error }`) and use zod-4 schemas from `astro/zod`, giving built-in input validation and CSRF protection. `createAuthHandlers` is removed. Peer dependency raised to `astro >= 5.0.0` (Actions requirement).
- 5722b2f: Add `requireGuest` to `@aledx18/astro/protect` — the inverse of `requireAuth`: redirects authenticated users away from guest-only pages (signin, register) to `/dashboard` by default.

## 0.2.1

### Patch Changes

- 6a26ed7: Fix publishability: replace the `workspace:*` dependency on `@aledx18/supabase-auth-core` with a semver range (`^0.3.0`). Changesets leaves `workspace:*` untouched in published tarballs, so 0.1.1 and 0.2.0 were uninstallable outside the monorepo.

## 0.2.0

### Minor Changes

- 8d1cd90: Add `createAuthHandlers` factory (`@aledx18/astro/handlers`) with `login` and `logout` APIRoute handlers. Handlers parse the form POST, call the Supabase auth action via the server client, and normalize HTTP responses (400/401 JSON errors, 302 redirects). Options: `loginRedirectTo`, `logoutRedirectTo`.

## 0.1.1

### Patch Changes

- Updated dependencies [30c289b]
  - @aledx18/supabase-auth-core@0.3.0
