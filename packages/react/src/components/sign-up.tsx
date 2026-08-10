import { type FormEvent, useState } from "react";
import { useAuth } from "../hooks";
import type { AuthFormProps } from "../types";
import { AuthCard, Field, SubmitButton } from "./form-shared.js";

export function SignUp({ className, onSuccess, onError }: AuthFormProps) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const result = await signUp(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      onError?.(result.error);
      return;
    }

    setSuccess("Check your email to confirm your account.");
    onSuccess?.();
  }

  return (
    <AuthCard
      className={className}
      description="Create an account with email and password."
      error={error}
      onSubmit={handleSubmit}
      success={success}
      title="Create account"
    >
      <Field
        autoComplete="email"
        disabled={loading}
        id="ak-sign-up-email"
        label="Email"
        onChange={setEmail}
        type="email"
        value={email}
      />
      <Field
        autoComplete="new-password"
        disabled={loading}
        id="ak-sign-up-password"
        label="Password"
        onChange={setPassword}
        type="password"
        value={password}
      />
      <SubmitButton label="Sign up" loading={loading} />
    </AuthCard>
  );
}
