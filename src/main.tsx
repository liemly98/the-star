import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/login.tsx";
import ForgotPasswordPage from "./pages/forgot-password.tsx";
import { AppProvider } from "./states/app-state/app-state";
import TestPage from "./pages/test.tsx";
import { AuthProvider } from "./states/app-state/auth-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/test" element={<TestPage />} />

            {/* Add other routes here as needed */}
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  </StrictMode>
);
