import { z } from "zod";

/**
 * Astro-specific env schema.
 *
 * Astro exposes env vars with `PUBLIC_` prefix to the client via `import.meta.env`.
 * This schema validates that the required Supabase vars are present.
 *
 * Accepts both naming conventions for backwards compatibility:
 * - `PUBLIC_SUPABASE_PUBLISHABLE_KEY` (new, preferred)
 * - `PUBLIC_SUPABASE_ANON_KEY` (legacy)
 */
const envSchema = z
  .object({
    PUBLIC_SUPABASE_URL: z.string().url(),
    PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
    PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  })
  .refine((env) => env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.PUBLIC_SUPABASE_ANON_KEY, {
    message: "Falta PUBLIC_SUPABASE_PUBLISHABLE_KEY (o PUBLIC_SUPABASE_ANON_KEY como legacy)",
  });

export type AstroSupabaseEnv = {
  url: string;
  key: string;
};

/**
 * Reads and validates Supabase env vars from `import.meta.env`.
 *
 * Call this once per request (server) or once at init (browser).
 * Throws if env vars are missing or malformed.
 *
 * @example
 * import { getSupabaseEnv } from "@aledx18/astro/env";
 * const { url, key } = getSupabaseEnv();
 */
export function getSupabaseEnv(): AstroSupabaseEnv {
  // import.meta.env is Astro/Vite-specific — not in baseline TS types
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const raw: Record<string, string | undefined> = (
    import.meta as unknown as { env: Record<string, string | undefined> }
  ).env;
  const parsed = envSchema.parse(raw);

  const key = parsed.PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? parsed.PUBLIC_SUPABASE_ANON_KEY;

  return {
    url: parsed.PUBLIC_SUPABASE_URL,
    key: key as string,
  };
}
