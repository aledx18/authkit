---
"@aledx18/astro": minor
---

Add `oauthRedirect` (`@aledx18/astro/oauth`): an `APIRoute` handler that starts OAuth sign-in for the provider in the route param (`/api/auth/oauth/[provider]`), redirecting the browser to Supabase's authorize URL with PKCE. Reuses the existing auth callback (`exchangeCodeForSession`).
