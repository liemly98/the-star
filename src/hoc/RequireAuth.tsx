import { useContext } from "react";
import { AppStateContext } from "../states/app-state/app-context";
import { Navigate } from "react-router";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const state = useContext(AppStateContext);

  if (!state?.user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is logged in, render children
  return <>{children}</>;
}
