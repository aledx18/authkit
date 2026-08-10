# @aledx18/astro

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
