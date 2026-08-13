---
"@aledx18/authkit": minor
---

Extract the shared auth form markup into a reusable `AuthForm` component (`src/components/AuthForm.astro`): card layout, header with subtitle link, email/password fields with errors, success/auth banners, submit button and the OAuth provider buttons (with their icons — previously duplicated in both templates). signin/register pages are now thin wrappers passing props.
