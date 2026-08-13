---
"@aledx18/authkit": patch
---

`reset-password` now requires a valid recovery session to show the form: a direct visit without a code and without a session renders the "invalid or expired link" message (with a link to request a new one) instead of a form that would fail on submit.
