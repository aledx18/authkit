---
"@aledx18/authkit": minor
---

Interactive SSR setup during `init`: when the Astro config does not set `output: "server"`, the CLI now prompts to configure it (adapter choice: node/vercel/cloudflare/netlify), installs the adapter as a devDependency, and patches the config with `output: "server"` + adapter (keeping a `.bak` backup). Skipping is still possible; if `output: "server"` is already set, the step is silent.
