import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/login.tsx";
import ForgotPasswordPage from "./pages/forgot-password.tsx";
import TestPage from "./pages/test.tsx";
import { generalRoutes } from "./pages/general/routes.tsx";
import { workRoutes } from "./pages/work/routes.tsx";
import { personalPages } from "./pages/personal/routes.tsx";
import MyAccountPage from "./pages/my-account.tsx";
import { AppProvider } from "./states/app-state/context.tsx";
import { AuthProvider } from "./states/auth-state/context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/my-account" element={<MyAccountPage />} />

            {generalRoutes.map((route, idx) => (
              <Route key={idx} path="">
                {route.children?.map((child, cidx) => (
                  <Route key={cidx} path={child.path} element={child.element} />
                ))}
              </Route>
            ))}

            {workRoutes.map((route, idx) => (
              <Route key={idx} path="work">
                {route.children?.map((child, cidx) => (
                  <Route key={cidx} path={child.path} element={child.element} />
                ))}
              </Route>
            ))}

            {personalPages.map((route, idx) => (
              <Route key={idx} path="personal">
                {route.children?.map((child, cidx) => (
                  <Route key={cidx} path={child.path} element={child.element} />
                ))}
              </Route>
            ))}
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  </StrictMode>
);
