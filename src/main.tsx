import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/login.tsx";
import ForgotPasswordPage from "./pages/forgot-password.tsx";
import { AppProvider } from "./states/app-state/app-state";
import { RequireAuth } from "./hoc/RequireAuth.tsx";
import { RequireNoAuth } from "./hoc/RequireNoAuth.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <App />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <RequireNoAuth>
                <LoginPage />
              </RequireNoAuth>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {/* Add other routes here as needed */}
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
