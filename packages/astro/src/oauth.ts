import type { Provider } from "@supabase/supabase-js";
import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "./server.js";

/**
 * APIRoute handler that starts an OAuth sign-in for the provider in the
 * route param (`/api/auth/oauth/[provider]`). Redirects the browser to the
 * provider; the provider sends the user back through Supabase to the auth
 * callback, which exchanges the code for a session.
 *
 * @example
 * // src/pages/api/auth/oauth/[provider].ts
 * export { oauthRedirect as GET } from "astro-auth-integration/oauth";
 */
export const oauthRedirect: APIRoute = async ({ request, cookies, params, url, redirect }) => {
  const provider = params.provider;
  if (!provider) {
    return redirect("/signin?error=OAuth+failed", 302);
  }

  const supabase = createSupabaseServerClient({ request, cookies });
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as Provider,
    options: {
      redirectTo: new URL("/api/auth/callback", url).toString(),
    },
  });

  if (error || !data.url) {
    return redirect("/signin?error=OAuth+failed", 302);
  }
  return redirect(data.url, 302);
};
