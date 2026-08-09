import { getAuthErrorMessage } from "@aledx18/supabase-auth-core";
import type { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./context.js";
import type { AuthProviderProps, AuthResult } from "./types.js";

function ok(): AuthResult {
  return { error: null };
}

function fail(error: unknown): AuthResult {
  if (error && typeof error === "object" && "message" in error) {
    return { error: getAuthErrorMessage(error as Error) };
  }
  return { error: getAuthErrorMessage(null) };
}

export function AuthProvider({
  supabase,
  children,
  redirectTo,
  onSessionChange,
}: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const resolveRedirectTo = useCallback(() => {
    if (redirectTo) {
      return redirectTo;
    }
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return undefined;
  }, [redirectTo]);

  useEffect(() => {
    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (!active) {
        return;
      }
      setSession(data.session);
      setIsLoading(false);
      onSessionChange?.(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
      onSessionChange?.(nextSession);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase, onSessionChange]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return error ? fail(error) : ok();
    },
    [supabase],
  );

  const signUp = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const emailRedirectTo = resolveRedirectTo();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        ...(emailRedirectTo ? { options: { emailRedirectTo } } : {}),
      });
      return error ? fail(error) : ok();
    },
    [supabase, resolveRedirectTo],
  );

  const signOut = useCallback(async (): Promise<AuthResult> => {
    const { error } = await supabase.auth.signOut();
    return error ? fail(error) : ok();
  }, [supabase]);

  const resetPassword = useCallback(
    async (email: string): Promise<AuthResult> => {
      const redirect = resolveRedirectTo();
      const { error } = await supabase.auth.resetPasswordForEmail(
        email,
        redirect ? { redirectTo: redirect } : undefined,
      );
      return error ? fail(error) : ok();
    },
    [supabase, resolveRedirectTo],
  );

  const updatePassword = useCallback(
    async (password: string): Promise<AuthResult> => {
      const { error } = await supabase.auth.updateUser({ password });
      return error ? fail(error) : ok();
    },
    [supabase],
  );

  const value = useMemo(
    () => ({
      supabase,
      session,
      user: session?.user ?? null,
      isLoading,
      isAuthenticated: session !== null,
      signIn,
      signUp,
      signOut,
      resetPassword,
      updatePassword,
    }),
    [supabase, session, isLoading, signIn, signUp, signOut, resetPassword, updatePassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
