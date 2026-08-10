import { useAuth } from "../hooks";
import type { RequireAuthProps } from "../types";

export function RequireAuth({ children, fallback = null, loading = null }: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <>{loading}</>;
  }

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
