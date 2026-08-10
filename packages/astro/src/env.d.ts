/// <reference types="astro/client" />

declare namespace Astro {
  interface Env {
    PUBLIC_SUPABASE_URL: string;
    PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
    PUBLIC_SUPABASE_ANON_KEY?: string;
  }
}
