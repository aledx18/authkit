const MESSAGES: Record<string, string> = {
  invalid_credentials: "Email or password is incorrect.",
  email_not_confirmed: "Confirm your email before signing in.",
  user_already_exists: "An account with this email already exists.",
  weak_password: "Password is too weak.",
  over_request_rate_limit: "Too many attempts. Try again later.",
  otp_expired: "This link has expired. Request a new one.",
  same_password: "New password must be different from the current one.",
};

/**
 * Maps a Supabase auth error to a friendly, UI-ready message.
 *
 * Keys off the stable error `code`; falls back to the raw message when the
 * code is unknown, and to a generic message when there is no error.
 *
 * @example
 * import { getAuthErrorMessage } from "@aledx18/supabase-auth-core";
 * const { error } = await supabase.auth.signInWithPassword({ email, password });
 * if (error) {
 *   return { error: getAuthErrorMessage(error) };
 * }
 */
export function getAuthErrorMessage(
  error: { code?: string | undefined; message?: string | undefined } | null | undefined,
): string {
  if (!error) {
    return "Something went wrong. Please try again.";
  }
  const mapped = error.code ? MESSAGES[error.code] : undefined;
  return mapped ?? error.message ?? "Something went wrong. Please try again.";
}
