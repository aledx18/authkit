# ⚡ astro-auth-kit

Scaffolding de autenticación **Supabase + Astro** en un comando.

`astro-auth-kit` genera un proyecto Astro con auth lista para usar — sesión SSR, email/password, OAuth (Google/GitHub), reset de contraseña, rutas protegidas, Tailwind y un sistema de componentes reutilizables. Todo estilado y funcionando.

## ✨ Qué genera

| | |
|---|---|
| **Sesión SSR** | Middleware + cookies con `@supabase/ssr`, refresh automático |
| **Auth completo** | Sign in, register, confirmación de email, OAuth, reset de contraseña |
| **Rutas protegidas** | `requireAuth` / `requireGuest` explícitos por página |
| **UI** | Tailwind + componentes `Button`, `Input`, `Card`, `AuthForm` (estilo shadcn) |
| **Mensajes amigables** | Errores de Supabase traducidos a texto claro |
| **Alias `@/*`** | Imports limpios configurados en `tsconfig.json` |

## 🚀 Empezar

**Requisito:** un proyecto Astro existente (o crealo):

```bash
bun create astro@latest mi-app --template basics
cd mi-app
```

**Corré el CLI:**

```bash
bun add -d astro-auth-kit
bunx astro-auth-kit init
```

> **npm**: `npx astro-auth-kit init` funciona directo.

El CLI te va a preguntar si ya tenés un proyecto de Supabase (URL + publishable key). Si no, genera un `.env.example` con placeholders para completar después.

## ⚙️ Configuración automática

`init` detecta y configura por vos:

- **SSR** — si falta `output: "server"`, te pregunta por un adapter (node/vercel/cloudflare/netlify), lo instala y patchea `astro.config.*` (con backup `.bak`)
- **Tailwind** — si no está, corre `astro add tailwind --yes` (v4 + plugin vite)
- **Alias `@/*`** — agrega `paths` al `tsconfig.json`
- **`.env`** — con tus credenciales, o `.env.example` con placeholders

Nada se pisa: archivos que ya existen se saltan, y los configs que toca dejan `.bak`.

## 🔐 Lo que queda en tu proyecto

```
src/
├── actions/index.ts          # signin, signout, register, forgotPassword, updatePassword
├── components/
│   ├── AuthForm.astro        # form de auth reutilizable
│   └── ui/{Button,Input,Card}.astro
├── lib/supabase/{client,server}.ts
├── middleware.ts
├── pages/
│   ├── signin.astro / register.astro / forgot-password.astro / reset-password.astro
│   ├── dashboard.astro       # ejemplo de ruta protegida
│   └── api/auth/callback.ts  # + oauth/[provider].ts
└── styles/global.css         # tokens de diseño (light/dark)
```

## 🔧 Configuración en Supabase

1. **Providers** → activá Email y los que quieras (Google/GitHub)
2. Para OAuth, creá una **OAuth App** en el provider y pegá client ID/secret
3. Configurá la redirect URL: `https://<ref>.supabase.co/auth/v1/callback`
4. Activá "Allow email" / "allow no email" según tu caso

## 🛠️ Personalizar

Los componentes y páginas son **tuyos** — editálos libremente:

```ts
// src/actions/index.ts — validación custom
import { z } from "astro/zod";
export const server = {
  register: defineAction({
    ...authActions.register,
    input: z.object({ email: z.email(), password: z.string().min(8) }),
  }),
};
```

O escribí tu propia action con el cliente SSR:

```ts
import { createSupabaseServerClient } from "astro-auth-integration/server";
// control total
```

## 📦 Paquetes

| Paquete | Rol |
|---|---|
| `astro-auth-kit` | CLI de scaffolding |
| `astro-auth-integration` | Integración Astro (middleware, protect, actions, oauth) |
| `astro-auth-core` | Tipos y utilidades compartidas (mensajes de error, env) |

## 🧑‍💻 Desarrollo del monorepo

```bash
bun install
bun run build          # buildea packages/*
bun run typecheck      # verifica tipos
bun run lint           # Biome
```

---

**astro-auth-kit** — auth Supabase para Astro, en un comando.
