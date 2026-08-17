import { z } from "zod";

/**
 * Validates required Supabase env vars.
 *
 * Accepts both naming conventions for backwards compatibility:
 * - `PUBLIC_SUPABASE_PUBLISHABLE_KEY` (new, preferred)
 * - `PUBLIC_SUPABASE_ANON_KEY` (legacy)
 *
 * At least one of the two key vars must be present.
 * The returned object always exposes `supabasePublishableKey`.
 */
const supabaseEnvSchema = z
  .object({
    SUPABASE_URL: z.string().url(),
    PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
    PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  })
  .refine((data) => data.PUBLIC_SUPABASE_PUBLISHABLE_KEY || data.PUBLIC_SUPABASE_ANON_KEY, {
    message: "Either PUBLIC_SUPABASE_PUBLISHABLE_KEY or PUBLIC_SUPABASE_ANON_KEY must be set",
  });

export type SupabaseEnv = {
  SUPABASE_URL: string;
  supabasePublishableKey: string;
};

/**
 * Validates env and returns a normalized shape.
 * Always returns `supabasePublishableKey` regardless of which var was set.
 *
 * @example
 * import { validateSupabaseEnv } from "astro-auth-core";
 * const env = validateSupabaseEnv(import.meta.env);
 * createClient(env.SUPABASE_URL, env.supabasePublishableKey);
 */
export function validateSupabaseEnv(env: Record<string, string | undefined>): SupabaseEnv {
  const parsed = supabaseEnvSchema.parse(env);

  const key = parsed.PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? parsed.PUBLIC_SUPABASE_ANON_KEY;

  return {
    SUPABASE_URL: parsed.SUPABASE_URL,
    supabasePublishableKey: key as string,
  };
}
