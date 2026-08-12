---
"@aledx18/astro": minor
---

Add password reset actions to `authActions`: `forgotPassword` (`resetPasswordForEmail` with redirect to `/reset-password`) and `updatePassword` (`updateUser({ password })`, requires the recovery session).
