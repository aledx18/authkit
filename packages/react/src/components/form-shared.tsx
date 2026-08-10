import type { FormEvent, ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

type FieldProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function Field({
  id,
  label,
  type,
  value,
  autoComplete,
  required = true,
  disabled,
  onChange,
}: FieldProps) {
  return (
    <div className="ak-field">
      <label className="ak-label" htmlFor={id}>
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        className="ak-input"
        disabled={disabled}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        value={value}
      />
    </div>
  );
}

type AuthCardProps = {
  title: string;
  description?: string | undefined;
  className?: string | undefined;
  error: string | null;
  success: string | null;
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  footer?: ReactNode | undefined;
};

export function AuthCard({
  title,
  description,
  className,
  error,
  success,
  children,
  onSubmit,
  footer,
}: AuthCardProps) {
  return (
    <div className={cx("ak-card", className)}>
      <div className="ak-card-header">
        <h2 className="ak-title">{title}</h2>
        {description ? <p className="ak-description">{description}</p> : null}
      </div>
      <form className="ak-form" onSubmit={onSubmit}>
        {error ? (
          <p className="ak-alert ak-alert-error" role="alert">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="ak-alert ak-alert-success" role="status">
            {success}
          </p>
        ) : null}
        {children}
      </form>
      {footer ? <div className="ak-footer">{footer}</div> : null}
    </div>
  );
}

type SubmitButtonProps = {
  loading: boolean;
  label: string;
  loadingLabel?: string;
};

export function SubmitButton({ loading, label, loadingLabel = "Please wait…" }: SubmitButtonProps) {
  return (
    <button className="ak-button ak-button-primary" disabled={loading} type="submit">
      {loading ? loadingLabel : label}
    </button>
  );
}
