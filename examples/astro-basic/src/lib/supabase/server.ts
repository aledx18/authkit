import { createSupabaseServerClient } from "@aledx18/astro";
import type { AstroCookies } from "astro";

/** Server-side Supabase client for middleware, endpoints and pages. */
export function createClient(options: { request: Request; cookies: AstroCookies }) {
  return createSupabaseServerClient(options);
}
