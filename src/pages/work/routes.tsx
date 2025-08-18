import WorkDashboardPage from "./Dashboard";

export const workRoutes = [
  {
    path: "",
    exact: true,
    children: [{ path: "", exact: true, element: <WorkDashboardPage /> }],
  },
];
