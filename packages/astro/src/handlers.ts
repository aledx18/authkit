import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "./server.js";

export interface AuthHandlersOptions {
  /** Redirect target after successful login. Defaults to "/". */
  loginRedirectTo?: string;
  /** Redirect target after logout. Defaults to "/". */
  logoutRedirectTo?: string;
}

/**
 * Factory for auth endpoint handlers (login, logout).
 *
 * Each handler is an Astro `APIRoute` that receives the form POST, calls the
 * Supabase auth action, and normalizes the HTTP response (status codes, JSON
 * errors, redirects).
 *
 * @example
 * // src/pages/api/login.ts
 * import { createAuthHandlers } from "@aledx18/astro/handlers";
 * export const POST = createAuthHandlers({ loginRedirectTo: "/dashboard" }).login;
 *
 * @example
 * // src/pages/api/logout.ts
 * import { createAuthHandlers } from "@aledx18/astro/handlers";
 * export const POST = createAuthHandlers().logout;
 */
export function createAuthHandlers(options: AuthHandlersOptions = {}) {
  const loginRedirectTo = options.loginRedirectTo ?? "/";
  const logoutRedirectTo = options.logoutRedirectTo ?? "/";

  const login: APIRoute = async ({ request, cookies, redirect }) => {
    const supabase = createSupabaseServerClient({ request, cookies });
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return redirect(loginRedirectTo, 302);
  };

  const logout: APIRoute = async ({ request, cookies, redirect }) => {
    const supabase = createSupabaseServerClient({ request, cookies });
    await supabase.auth.signOut();
    return redirect(logoutRedirectTo, 302);
  };

  return { login, logout };
}
