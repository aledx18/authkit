import {
  type CookieMethodsServer,
  type CookieOptionsWithName,
  createServerClient,
  parseCookieHeader,
} from "@supabase/ssr";
import type { AstroCookies } from "astro";
import { getSupabaseEnv } from "./env.js";

export const authCookieOptions: CookieOptionsWithName = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "lax",
};

interface ServerClientContext {
  request: Request;
  cookies: AstroCookies;
}

/**
 * Creates a Supabase client for server-side usage (middleware, endpoints, .astro pages).
 *
 * Handles cookie-based session transport via Astro's request/cookies.
 *
 * @example
 * // In middleware, endpoint, or .astro page
 * import { createSupabaseServerClient } from "@aledx18/astro/server";
 * const supabase = createSupabaseServerClient({ request: Astro.request, cookies: Astro.cookies });
 */
export function createSupabaseServerClient(context: ServerClientContext) {
  const { url, key } = getSupabaseEnv();

  return createServerClient(url, key, {
    cookieOptions: authCookieOptions,
    cookies: {
      getAll() {
        return parseCookieHeader(context.request.headers.get("Cookie") ?? "").map((c) => ({
          name: c.name,
          value: c.value ?? "",
        }));
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: Record<string, unknown>;
        }[],
      ) {
        for (const { name, value, options } of cookiesToSet) {
          context.cookies.set(name, value, options ?? authCookieOptions);
        }
      },
    } satisfies CookieMethodsServer,
  });
}
