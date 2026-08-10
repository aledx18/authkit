import { createSupabaseServerClient } from "@aledx18/astro/server";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient({ request, cookies });
  await supabase.auth.signOut();

  return new Response(null, { status: 302, headers: { Location: "/" } });
};
