---
"@aledx18/authkit": minor
---

`init` now installs and configures Tailwind by default (like SSR): detects whether Tailwind is already present (deps or config), and if not, runs `astro add tailwind --yes` with the detected package manager (installs Tailwind v4 via `@tailwindcss/vite`, adds the vite plugin, scaffolds `src/styles/global.css`).
