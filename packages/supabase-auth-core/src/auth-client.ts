import { getAuthErrorMessage } from "./errors.js";
import type { AuthClientOptions, AuthResult } from "./types.js";

export type AuthClient = {
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
  signup: (email: string, password: string) => Promise<AuthResult>;
};

function ok(): AuthResult {
  return { error: null };
}

function fail(error: unknown): AuthResult {
  if (error && typeof error === "object" && "message" in error) {
    return { error: getAuthErrorMessage(error as Error) };
  }
  return { error: getAuthErrorMessage(null) };
}

export function createAuthClient(options: AuthClientOptions): AuthClient {
  const { supabase, redirectTo } = options;

  const login = async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? fail(error) : ok();
  };

  const logout = async (): Promise<AuthResult> => {
    const { error } = await supabase.auth.signOut();
    return error ? fail(error) : ok();
  };

  const signup = async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      ...(redirectTo ? { options: { emailRedirectTo: redirectTo } } : {}),
    });
    return error ? fail(error) : ok();
  };

  return { login, logout, signup };
}
