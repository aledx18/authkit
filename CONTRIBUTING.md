# Contributing to authkit

## Regla de oro para `astro-auth-core`

Antes de agregar cualquier función al core, respondete estas dos preguntas:

1. **¿`@supabase/supabase-js` ya resuelve esto?**
2. **¿Lo necesito idéntico en 2+ aplicaciones?**

Si la respuesta a **cualquiera de las dos** es "no", **no lo metas**.

### Por qué esta regla

El core NO es un wrapper de `supabase-js`. Es una capa fina de tipos y utilidades que supabase-js NO cubre. Agregar wrappers 1:1 crea una API redundante que hay que mantener sin aportar valor real.

### Ejemplos

| Función | ¿Pasa el filtro? | Razón |
|---|---|---|
| `getAuthErrorMessage()` | ✅ Sí | Supabase NO normaliza errores a mensajes de UI |
| `signup()` con `redirectTo` automático | ✅ Sí | Composición con defaults, no wrapper 1:1 |
| `login()` como alias de `signInWithPassword` | ❌ No | Wrapper 1:1, no agrega valor |
| `getSession()` | ❌ No | Supabase ya lo hace, idéntico |
| `onAuthStateChange()` | ❌ No | Supabase ya lo hace, idéntico |

### Cuándo sí agregar algo al core

- Cuando un patrón se repite en 2+ proyectos y NO es cubierto por supabase-js
- Cuando es el contrato estable que consumen otros paquetes del monorepo (astro, cli)
- Cuando agrega composición o defaults que supabase-js no ofrece

## Estructura del monorepo

```
authkit/
├── packages/
│   ├── cli/          → astro-auth-kit (CLI, sin lógica de auth)
│   ├── core/         → astro-auth-core (tipos + utilidades mínimas)
│   └── astro/        → astro-auth-integration (integración Astro)
└── examples/
    └── astro-basic/  → Campo de pruebas para patrones Astro
```

## Flujo de trabajo

1. Descubrí patrones en `examples/astro-basic`
2. Si un patrón se repite en 2+ proyectos → extraelo a `packages/astro` o `packages/core`
3. Si un patrón es específico de un proyecto → dejalo en el ejemplo

## Commits

- Usá conventional commits (`feat:`, `fix:`, `chore:`, etc.)
- No agregues "Co-Authored-By" ni atribución de AI
- Un commit por cambio lógico

## Releases

- Creá un changeset con `bunx changeset` antes de pushear
- El CI versionea y publica automáticamente al mergear a `main`
