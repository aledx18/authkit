---
"@aledx18/authkit": minor
---

Generate a shadcn-style UI system with the auth scaffold:

- `src/components/ui/{Button,Input,Card}.astro` (written when missing — user components are never overwritten)
- `src/styles/global.css` with design tokens (light/dark palettes, `@theme` mapping) — replaces the bare `@import "tailwindcss"` stub created by `astro add tailwind`, but leaves a user's own stylesheet untouched
- Auth pages styled with the design system (Button supports `href` for the OAuth links)
