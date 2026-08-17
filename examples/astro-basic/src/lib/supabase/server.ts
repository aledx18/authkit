import type { AstroCookies } from "astro";
import { createSupabaseServerClient } from "astro-auth-integration";

/** Server-side Supabase client for middleware, endpoints and pages. */
export function createClient(options: { request: Request; cookies: AstroCookies }) {
  return createSupabaseServerClient(options);
}
