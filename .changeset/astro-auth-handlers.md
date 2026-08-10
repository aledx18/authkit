---
"@aledx18/astro": minor
---

Add `createAuthHandlers` factory (`@aledx18/astro/handlers`) with `login` and `logout` APIRoute handlers. Handlers parse the form POST, call the Supabase auth action via the server client, and normalize HTTP responses (400/401 JSON errors, 302 redirects). Options: `loginRedirectTo`, `logoutRedirectTo`.
