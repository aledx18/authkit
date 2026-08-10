import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env.js";

/**
 * Creates a Supabase client for browser-side usage (client components, scripts).
 *
 * Uses `@supabase/ssr`'s `createBrowserClient` which handles cookie-based
 * session transport automatically.
 *
 * @example
 * // In a client script or component
 * import { createSupabaseBrowserClient } from "@aledx18/astro/client";
 * const supabase = createSupabaseBrowserClient();
 * const { data } = await supabase.auth.getSession();
 */
export function createSupabaseBrowserClient() {
  const { url, key } = getSupabaseEnv();
  return createBrowserClient(url, key);
}
