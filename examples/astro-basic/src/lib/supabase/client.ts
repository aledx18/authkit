import { createSupabaseBrowserClient } from "astro-auth-integration";

/** Browser-side Supabase client (client components and scripts). */
export const supabase = createSupabaseBrowserClient();
