---
"@aledx18/astro": patch
---

Auth actions now return friendly error messages via core's `getAuthErrorMessage`, plus the stable error `code` in the result (`{ ok: false, code, error }`) so pages can branch on it for custom UX.
