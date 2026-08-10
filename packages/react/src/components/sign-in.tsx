import { type FormEvent, useState } from "react";
import { useAuth } from "../hooks";
import type { AuthFormProps } from "../types";
import { AuthCard, Field, SubmitButton } from "./form-shared.js";

export function SignIn({ className, onSuccess, onError }: AuthFormProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      onError?.(result.error);
      return;
    }

    onSuccess?.();
  }

  return (
    <AuthCard
      className={className}
      description="Sign in with your email and password."
      error={error}
      onSubmit={handleSubmit}
      success={null}
      title="Sign in"
    >
      <Field
        autoComplete="email"
        disabled={loading}
        id="ak-sign-in-email"
        label="Email"
        onChange={setEmail}
        type="email"
        value={email}
      />
      <Field
        autoComplete="current-password"
        disabled={loading}
        id="ak-sign-in-password"
        label="Password"
        onChange={setPassword}
        type="password"
        value={password}
      />
      <SubmitButton label="Sign in" loading={loading} />
    </AuthCard>
  );
}
