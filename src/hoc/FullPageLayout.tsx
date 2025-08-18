import React, { useContext } from "react";
import { AuthContext } from "../states/app-state/auth-context";
import PageLoading from "../components/page-loading";
import { Navigate } from "react-router";

function FullPageLayout({ children }: { children: React.ReactNode }) {
  const state = useContext(AuthContext);

  if (state.loading) {
    return <PageLoading />;
  }

  if (state.user) {
    // If user is logged in, redirect to dashboard
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {children}
    </div>
  );
}

export default FullPageLayout;
