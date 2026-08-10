import type { APIContext, AstroGlobal } from "astro";

type ProtectableContext = Pick<AstroGlobal | APIContext, "locals" | "redirect">;

/**
 * Protects a page or endpoint — redirects to `redirectTo` if no user in locals.
 *
 * Returns `null` if authenticated (continue rendering), or a `Response` to return early.
 *
 * @example
 * ---
 * import { requireAuth } from "@aledx18/astro/protect";
 * const redirectResponse = requireAuth(Astro);
 * if (redirectResponse) return redirectResponse;
 * const { user } = Astro.locals;
 * ---
 * <h1>Welcome {user!.email}</h1>
 */
export function requireAuth(context: ProtectableContext, redirectTo = "/signin") {
  if (!context.locals.user) {
    return context.redirect(redirectTo);
  }
  return null;
}
