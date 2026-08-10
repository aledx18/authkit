import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import type { ReactNode } from "react";

export type AuthResult = {
  error: string | null;
};

export type AuthContextValue = {
  supabase: SupabaseClient;
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  updatePassword: (password: string) => Promise<AuthResult>;
};

export type AuthProviderProps = {
  supabase: SupabaseClient;
  children: ReactNode;
  /** Used for password recovery and email redirect flows. Defaults to window.location.origin. */
  redirectTo?: string;
  onSessionChange?: (session: Session | null) => void;
};

export type AuthFormProps = {
  className?: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

export type RequireAuthProps = {
  children: ReactNode;
  fallback?: ReactNode;
  loading?: ReactNode;
};
