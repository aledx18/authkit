# @aledx18/supabase-auth-react

## 1.0.2

### Patch Changes

- 30c289b: Make package self-contained: moved `getAuthErrorMessage` and `AuthResult` locally, removed the dependency on `@aledx18/supabase-auth-core`. Package remains paused.

## 1.0.1

### Patch Changes

- 7221909: Fix ESM: add `.js` extensions to relative imports so the packages work in Node/Bun without a bundler
- Updated dependencies [7221909]
  - @aledx18/supabase-auth-core@0.2.1

## 1.0.0

### Major Changes

- 76b253c: Renamed from @aledx18/supabase-auth. Now depends on @aledx18/supabase-auth-core internally.

### Patch Changes

- Updated dependencies [76b253c]
  - @aledx18/supabase-auth-core@0.2.0
