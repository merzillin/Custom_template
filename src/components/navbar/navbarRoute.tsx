import { ChartNoAxesCombined, FileChartColumn, Home, User } from "lucide-react";
import { generateKey } from "../../utils/helper";
import type { ModuleRoute } from "../../types/auth";
import { lazy } from "react";

export const NavRoutes: ModuleRoute[] = [
  {
    moduleName: "Overview",
    moduleKey: generateKey("Overview"),
    menus: [
      {
        menuKey: generateKey("Home"),
        name: "Home",
        path: "/home",
        component: lazy(() => import("../../pages/homepage/Homepage")),
        icon: <Home />,
      },
      {
        menuKey: generateKey("Dashboard"),
        name: "Dashboard",
        path: "/dashboard",
        component: lazy(() => import("../../pages/dashboard/Dashboard")),
        icon: <ChartNoAxesCombined />,
      },
      {
        menuKey: generateKey("Report"),
        name: "Report",
        path: "/report",
        component: lazy(() => import("../../pages/report/ReportPage")),
        icon: <FileChartColumn />,
      },
    ],
  },
  {
    moduleKey: generateKey("User"),
    moduleName: "User",
    menus: [
      {
        menuKey: generateKey("Users"),
        name: "Users",
        path: "/users",
        component: lazy(() => import("../../pages/user/UserPage")),
        icon: <User />,
      },
    ],
  },
];
