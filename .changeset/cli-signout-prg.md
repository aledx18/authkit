---
"@aledx18/authkit": patch
---

Fix signout PRG in the generated dashboard: read `Astro.getActionResult(actions.signout)` and redirect to `/signin` on success. Without it the middleware (which runs before the action) still saw a valid session, so the page re-rendered instead of redirecting and the browser showed a "confirm form resubmission" dialog on refresh.
