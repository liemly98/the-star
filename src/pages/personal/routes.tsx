import PersonalDashboardPage from "./Dashboard";

export const personalPages = [
  {
    path: "",
    exact: true,
    children: [{ path: "", exact: true, element: <PersonalDashboardPage /> }],
  },
];
