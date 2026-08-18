import type { AstroCookies } from "astro";
import { z } from "astro/zod";
import { getAuthErrorMessage } from "astro-auth-core";
import { createSupabaseServerClient } from "./server.js";

/**
 * Context available to auth action handlers (structural subset of Astro's
 * ActionAPIContext — keeps this package free of `astro:actions` imports).
 */
interface AuthActionContext {
  request: Request;
  url: URL;
  cookies: AstroCookies;
}

type AuthResult = { ok: true } | { ok: false; code: string; error: string };

/**
 * Auth action definitions for Astro Actions.
 *
 * These are plain `defineAction` option objects: the consumer wraps them with
 * `defineAction()` in their own `src/actions/index.ts` (the `astro:actions`
 * virtual import stays in user code, same pattern as the middleware).
 *
 * Handlers return a discriminated result instead of throwing `ActionError`,
 * so the package never imports from `astro:actions` at runtime.
 *
 * The definitions are plain objects, so the input schema can be customized
 * by spreading and overriding:
 *
 * @example
 * // Custom input validation while keeping the default handler
 * import { z } from "astro/zod";
 * import { authActions } from "astro-auth-integration/actions";
 * defineAction({
 *   ...authActions.register,
 *   input: z.object({ email: z.email(), password: z.string().min(8) }),
 * });
 *
 * @example
 * // src/actions/index.ts
 * import { defineAction } from "astro:actions";
 * import { authActions } from "astro-auth-integration/actions";
 * export const server = {
 *   signin: defineAction(authActions.signin),
 *   signout: defineAction(authActions.signout),
 *   register: defineAction(authActions.register),
 * };
 */
export const authActions = {
  signin: {
    accept: "form" as const,
    input: z.object({
      email: z.email(),
      password: z.string().min(1),
    }),
    handler: async (
      { email, password }: { email: string; password: string },
      context: AuthActionContext,
    ): Promise<AuthResult> => {
      const supabase = createSupabaseServerClient({
        request: context.request,
        cookies: context.cookies,
      });

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { ok: false, code: error.code ?? "unknown", error: getAuthErrorMessage(error) };
      }
      return { ok: true };
    },
  },

  signout: {
    accept: "form" as const,
    input: z.object({}),
    handler: async (
      _input: Record<string, never>,
      context: AuthActionContext,
    ): Promise<AuthResult> => {
      const supabase = createSupabaseServerClient({
        request: context.request,
        cookies: context.cookies,
      });

      await supabase.auth.signOut();
      return { ok: true };
    },
  },

  register: {
    accept: "form" as const,
    input: z.object({
      email: z.email(),
      password: z.string().min(1),
    }),
    handler: async (
      { email, password }: { email: string; password: string },
      context: AuthActionContext,
    ): Promise<AuthResult> => {
      const supabase = createSupabaseServerClient({
        request: context.request,
        cookies: context.cookies,
      });

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: new URL("/api/auth/callback", context.url).toString(),
        },
      });

      if (error) {
        return { ok: false, code: error.code ?? "unknown", error: getAuthErrorMessage(error) };
      }
      return { ok: true };
    },
  },

  forgotPassword: {
    accept: "form" as const,
    input: z.object({
      email: z.email(),
    }),
    handler: async (
      { email }: { email: string },
      context: AuthActionContext,
    ): Promise<AuthResult> => {
      const supabase = createSupabaseServerClient({
        request: context.request,
        cookies: context.cookies,
      });

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: new URL("/reset-password", context.url).toString(),
      });

      if (error) {
        return { ok: false, code: error.code ?? "unknown", error: getAuthErrorMessage(error) };
      }
      return { ok: true };
    },
  },

  updatePassword: {
    accept: "form" as const,
    input: z.object({
      password: z.string().min(1),
    }),
    handler: async (
      { password }: { password: string },
      context: AuthActionContext,
    ): Promise<AuthResult> => {
      const supabase = createSupabaseServerClient({
        request: context.request,
        cookies: context.cookies,
      });

      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        return { ok: false, code: error.code ?? "unknown", error: getAuthErrorMessage(error) };
      }
      return { ok: true };
    },
  },
};
