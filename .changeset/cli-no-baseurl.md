---
"@aledx18/authkit": patch
---

Stop adding `baseUrl` when configuring the `@/*` path alias — `paths` resolve relative to the tsconfig location since TS 4.1, and `baseUrl` is deprecated in TypeScript 7 (it emitted a deprecation error in generated projects). Verified Astro still resolves the alias at runtime.
