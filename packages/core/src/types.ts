/**
 * Minimal shared auth types.
 *
 * These represent the _intersection_ of what different frameworks need.
 * We intentionally do NOT mirror the full supabase-js types here —
 * consumers use @supabase/supabase-js directly for the real shapes.
 */

/** Minimal user shape shared across frameworks */
export interface AuthUser {
  id: string;
  email: string | null;
}

/** Normalized error for UI display — framework-agnostic */
export interface NormalizedAuthError {
  code: string;
  message: string;
  status: number;
}
