# ⚡ astro-auth-kit

Supabase + Astro authentication scaffolding in one command.

`astro-auth-kit` generates an Astro project with production-ready auth — SSR sessions, email/password, OAuth (Google/GitHub), password reset, protected routes, Tailwind, and a set of reusable components. Styled and working out of the box.

## ✨ What it generates

| | |
|---|---|
| **SSR sessions** | Middleware + cookies with `@supabase/ssr`, automatic refresh |
| **Full auth** | Sign in, register, email confirmation, OAuth, password reset |
| **Protected routes** | Explicit `requireAuth` / `requireGuest` per page |
| **UI** | Tailwind + `Button`, `Input`, `Card`, `AuthForm` components (shadcn-style) |
| **Friendly messages** | Supabase errors translated to clear text |
| **`@/*` alias** | Clean imports configured in `tsconfig.json` |

## 🚀 Getting started

**Prerequisite:** an existing Astro project (or create one):

```bash
bun create astro@latest my-app --template basics
cd my-app
```

**Run the CLI:**

```bash
bun add -d astro-auth-kit
bunx astro-auth-kit init
```

> **npm**: `npx astro-auth-kit init` works directly.

The CLI will ask whether you already have a Supabase project (URL + publishable key). If not, it generates a `.env.example` with placeholders to fill in later.

## ⚙️ Automatic setup

`init` detects and configures for you:

- **SSR** — if `output: "server"` is missing, it asks for an adapter (node/vercel/cloudflare/netlify), installs it and patches `astro.config.*` (with a `.bak` backup)
- **Tailwind** — if absent, runs `astro add tailwind --yes` (v4 + vite plugin)
- **`@/*` alias** — adds `paths` to `tsconfig.json`
- **`.env`** — with your credentials, or `.env.example` with placeholders

Nothing is overwritten: existing files are skipped, and any config it touches keeps a `.bak`.

## 🔐 What stays in your project

```
src/
├── actions/index.ts          # signin, signout, register, forgotPassword, updatePassword
├── components/
│   ├── AuthForm.astro        # reusable auth form
│   └── ui/{Button,Input,Card}.astro
├── lib/supabase/{client,server}.ts
├── middleware.ts
├── pages/
│   ├── signin.astro / register.astro / forgot-password.astro / reset-password.astro
│   ├── dashboard.astro       # example protected route
│   └── api/auth/callback.ts  # + oauth/[provider].ts
└── styles/global.css         # design tokens (light/dark)
```

## 🔧 Supabase configuration

1. **Providers** → enable Email and any others you want (Google/GitHub)
2. For OAuth, create an **OAuth App** in the provider and paste the client ID/secret
3. Set the redirect URL: `https://<ref>.supabase.co/auth/v1/callback`
4. Toggle "Allow email" / "allow no email" as needed

## 🛠️ Customize

The components and pages are **yours** — edit them freely:

```ts
// src/actions/index.ts — custom validation
import { z } from "astro/zod";
export const server = {
  register: defineAction({
    ...authActions.register,
    input: z.object({ email: z.email(), password: z.string().min(8) }),
  }),
};
```

Or write your own action with the server client:

```ts
import { createSupabaseServerClient } from "astro-auth-integration/server";
// full control
```

## 📦 Packages

| Package | Role |
|---|---|
| `astro-auth-kit` | Scaffolding CLI |
| `astro-auth-integration` | Astro integration (middleware, protect, actions, oauth) |
| `astro-auth-core` | Shared types and utilities (error messages, env) |

## 🧑‍💻 Monorepo development

```bash
bun install
bun run build          # builds packages/*
bun run typecheck      # type checks
bun run lint           # Biome
```

---

**astro-auth-kit** — Supabase auth for Astro, in one command.
