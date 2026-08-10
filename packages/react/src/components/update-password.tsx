import { type FormEvent, useState } from "react";
import { useAuth } from "../hooks";
import type { AuthFormProps } from "../types";
import { AuthCard, Field, SubmitButton } from "./form-shared.js";

export function UpdatePassword({ className, onSuccess, onError }: AuthFormProps) {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirm) {
      const message = "Passwords do not match.";
      setError(message);
      onError?.(message);
      return;
    }

    setLoading(true);
    const result = await updatePassword(password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      onError?.(result.error);
      return;
    }

    setSuccess("Password updated.");
    onSuccess?.();
  }

  return (
    <AuthCard
      className={className}
      description="Choose a new password for your account."
      error={error}
      onSubmit={handleSubmit}
      success={success}
      title="Update password"
    >
      <Field
        autoComplete="new-password"
        disabled={loading}
        id="ak-update-password"
        label="New password"
        onChange={setPassword}
        type="password"
        value={password}
      />
      <Field
        autoComplete="new-password"
        disabled={loading}
        id="ak-update-password-confirm"
        label="Confirm password"
        onChange={setConfirm}
        type="password"
        value={confirm}
      />
      <SubmitButton label="Update password" loading={loading} />
    </AuthCard>
  );
}
