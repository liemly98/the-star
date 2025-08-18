export const APP_VERSIONS = ["General", "Personal", "Work"];
export const NAV_VERSIONS = [
  {
    title: "General",
    url: "/",
  },
  {
    title: "Personal",
    url: "/personal",
  },
  {
    title: "Work",
    url: "/work",
  },
];

export const GENERAL_NAV = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "/",
      },

      {
        title: "Test",
        url: "/personal",
      },
    ],
  },
];

export const PERSONAL_NAV = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "/personal",
      },
    ],
  },
];

export const WORK_NAV = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "/work",
      },
    ],
  },
];

export const NAV_MAPPINGS = {
  General: GENERAL_NAV,
  Personal: PERSONAL_NAV,
  Work: WORK_NAV,
};

export const NAV_MAIN = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      {
        title: "Installation",
        url: "#",
      },
      {
        title: "Project Structure",
        url: "#",
      },
    ],
  },
  {
    title: "Building Your Application",
    url: "#",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
        isActive: true,
      },
      {
        title: "Rendering",
        url: "#",
      },
      {
        title: "Caching",
        url: "#",
      },
      {
        title: "Styling",
        url: "#",
      },
      {
        title: "Optimizing",
        url: "#",
      },
      {
        title: "Configuring",
        url: "#",
      },
      {
        title: "Testing",
        url: "#",
      },
      {
        title: "Authentication",
        url: "#",
      },
      {
        title: "Deploying",
        url: "#",
      },
    ],
  },
];
