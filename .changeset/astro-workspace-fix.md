---
"@aledx18/astro": patch
---

Fix publishability: replace the `workspace:*` dependency on `@aledx18/supabase-auth-core` with a semver range (`^0.3.0`). Changesets leaves `workspace:*` untouched in published tarballs, so 0.1.1 and 0.2.0 were uninstallable outside the monorepo.
