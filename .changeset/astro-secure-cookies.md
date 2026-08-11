---
"@aledx18/astro": patch
---

Fix session cookies in non-HTTPS environments: `secure` now derives from the request protocol (`https:` → secure) instead of being hardcoded `true`. Previously browsers silently dropped session cookies over http (local dev via LAN IP, http deployments), breaking login.
