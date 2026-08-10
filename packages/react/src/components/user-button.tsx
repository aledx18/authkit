import { useState } from "react";
import { useAuth } from "../hooks";
import { cx } from "./form-shared.js";

export type UserButtonProps = {
  className?: string;
  onSignOut?: () => void;
};

export function UserButton({ className, onSignOut }: UserButtonProps) {
  const { user, signOut, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isLoading || !user) {
    return null;
  }

  async function handleSignOut() {
    setLoading(true);
    setError(null);
    const result = await signOut();
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    onSignOut?.();
  }

  const label = user.email ?? user.id;

  return (
    <div className={cx("ak-user-button", className)}>
      <span className="ak-user-label" title={label}>
        {label}
      </span>
      <button
        className="ak-button ak-button-ghost"
        disabled={loading}
        onClick={() => void handleSignOut()}
        type="button"
      >
        {loading ? "Signing out…" : "Sign out"}
      </button>
      {error ? (
        <p className="ak-alert ak-alert-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type SignOutButtonProps = {
  className?: string;
  onSignOut?: () => void;
  label?: string;
};

export function SignOutButton({ className, onSignOut, label = "Sign out" }: SignOutButtonProps) {
  const { signOut, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  async function handleClick() {
    setLoading(true);
    const result = await signOut();
    setLoading(false);
    if (!result.error) {
      onSignOut?.();
    }
  }

  return (
    <button
      className={cx("ak-button ak-button-ghost", className)}
      disabled={loading}
      onClick={() => void handleClick()}
      type="button"
    >
      {loading ? "Signing out…" : label}
    </button>
  );
}
