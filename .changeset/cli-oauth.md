---
"@aledx18/authkit": minor
---

`init` now scaffolds the OAuth entry point (`src/pages/api/auth/oauth/[provider].ts` re-exporting `oauthRedirect`) and adds "Continue with Google/GitHub" links to the generated signin/register pages. Signin also displays the `?error=` query param (used by the callback and OAuth failure redirects).
