---
"@aledx18/authkit": minor
---

`init` now scaffolds Astro Actions instead of form POST endpoints: generates `src/actions/index.ts` (wiring `authActions` with `defineAction`), and signin/register/dashboard pages use `<form method="POST" action={actions.x}>` with PRG redirects via `Astro.getActionResult()`. The email-confirmation `callback` remains a GET endpoint.
