import GeneralDashboardPage from "./Dashboard";

export const generalRoutes = [
  {
    path: "",
    exact: true,
    children: [{ path: "", exact: true, element: <GeneralDashboardPage /> }],
  },
];
