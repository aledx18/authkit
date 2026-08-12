---
"@aledx18/authkit": minor
---

`init` now scaffolds the password reset flow: `forgot-password` and `reset-password` pages (the latter exchanges the recovery code for a session with a PRG redirect, then updates the password), wires the new actions, and adds "Forgot your password?" + "password updated" messages to signin.
