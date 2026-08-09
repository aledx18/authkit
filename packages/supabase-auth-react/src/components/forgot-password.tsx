import { type FormEvent, useState } from "react";
import { useAuth } from "../hooks";
import type { AuthFormProps } from "../types";
import { AuthCard, Field, SubmitButton } from "./form-shared.js";

export function ForgotPassword({ className, onSuccess, onError }: AuthFormProps) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const result = await resetPassword(email);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      onError?.(result.error);
      return;
    }

    setSuccess("If an account exists, a reset link is on its way.");
    onSuccess?.();
  }

  return (
    <AuthCard
      className={className}
      description="We'll email you a link to reset your password."
      error={error}
      onSubmit={handleSubmit}
      success={success}
      title="Forgot password"
    >
      <Field
        autoComplete="email"
        disabled={loading}
        id="ak-forgot-email"
        label="Email"
        onChange={setEmail}
        type="email"
        value={email}
      />
      <SubmitButton label="Send reset link" loading={loading} />
    </AuthCard>
  );
}
