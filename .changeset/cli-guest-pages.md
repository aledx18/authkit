---
"@aledx18/authkit": patch
---

Generated signin/register pages now use `requireGuest`: authenticated users visiting them are redirected to `/dashboard` instead of seeing the form again.
