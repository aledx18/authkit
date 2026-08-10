# @aledx18/astro

## 0.2.0

### Minor Changes

- 8d1cd90: Add `createAuthHandlers` factory (`@aledx18/astro/handlers`) with `login` and `logout` APIRoute handlers. Handlers parse the form POST, call the Supabase auth action via the server client, and normalize HTTP responses (400/401 JSON errors, 302 redirects). Options: `loginRedirectTo`, `logoutRedirectTo`.

## 0.1.1

### Patch Changes

- Updated dependencies [30c289b]
  - @aledx18/supabase-auth-core@0.3.0
