import { useContext } from "react";
import { AppStateContext } from "../states/app-state/app-context";
import { Navigate } from "react-router";

export function RequireNoAuth({ children }: { children: React.ReactNode }) {
  const state = useContext(AppStateContext);

  if (state?.user) {
    // User is logged in, redirect to home
    return <Navigate to="/" replace />;
  }

  // User is not logged in, render children
  return <>{children}</>;
}
