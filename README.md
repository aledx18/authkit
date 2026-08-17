# authkit

Kit de autenticación para Supabase con múltiples integraciones:

- **`@aledx18/supabase-auth-core`**: tipos y utilidades mínimas NO cubiertas por `@supabase/supabase-js`.
- **`@aledx18/authkit`**: CLI para scaffolding de auth en Astro, Express, Hono, y más.
- **`@aledx18/astro`**: integración Astro con middleware, locals, cookies y rutas protegidas.

El consumidor trae su propio cliente `@supabase/supabase-js` (peer dependency de todos los paquetes).

## Setup local

```bash
bun install
```

## Comandos

```bash
bun run build          # buildea packages/*
bun run typecheck      # verifica tipos con tsc --build
bun run lint           # revisa el código con Biome
bun run lint:fix       # corrige lo que se pueda automáticamente
bun run format         # formatea todo el repo
```

## Estructura

```
packages/
  core/         # @aledx18/supabase-auth-core (tipos + utilidades mínimas)
  cli/          # @aledx18/authkit (CLI de scaffolding)
  astro/        # @aledx18/astro (integración Astro)
examples/
  astro-basic/  # Campo de pruebas Astro con output: 'server'
```

Cada paquete nuevo dentro de `packages/` debe:
1. Tener su propio `package.json` con nombre `@aledx18/<nombre>`.
2. Tener un `tsconfig.json` que haga `"extends": "../../tsconfig.base.json"`.
3. Agregar `"references"` en su `tsconfig.json` si depende de otros paquetes.
4. Agregarlo al root `tsconfig.json` en `"references"`.
5. Exportar todo lo público desde `src/index.ts`.

## Usar un paquete dentro de este mismo repo

```json
{
  "dependencies": {
    "@aledx18/supabase-auth-core": "workspace:*"
  }
}
```

## Publicar a GitHub Packages

El workflow `.github/workflows/publish.yml` corre en pushes a `main`: buildea `packages/*` y usa Changesets para abrir una release PR o publicar.

## Consumir desde otro repositorio

En el repo externo, agregá un `.npmrc`:

```
@aledx18:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Y luego:

```bash
bun add @supabase/supabase-js @aledx18/supabase-auth-core
```

## Regla de oro para el core

Antes de agregar cualquier función a `@aledx18/supabase-auth-core`:

1. **¿`@supabase/supabase-js` ya resuelve esto?** → si sí, no lo metas.
2. **¿Lo necesito idéntico en 2+ aplicaciones?** → si no, no lo metas todavía.

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles.

