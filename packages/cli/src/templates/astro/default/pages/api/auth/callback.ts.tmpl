import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "astro-auth-integration/server";

export const GET: APIRoute = async ({ request, cookies, redirect, url }) => {
  const supabase = createSupabaseServerClient({ request, cookies });
  const code = url.searchParams.get("code");

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return redirect("/dashboard", 302);
  }

  return redirect("/signin?error=Verification+failed", 302);
};
