import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/login.tsx";
import ForgotPasswordPage from "./pages/forgot-password.tsx";
import { AppProvider } from "./states/app-state/app-state";
import TestPage from "./pages/test.tsx";
import { AuthProvider } from "./states/app-state/auth-provider.tsx";
import { generalRoutes } from "./pages/general/routes.tsx";
import { workRoutes } from "./pages/work/routes.tsx";
import { personalPages } from "./pages/personal/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/test" element={<TestPage />} />

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
