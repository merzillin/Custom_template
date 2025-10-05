import HomePage from "../../pages/homepage/Homepage";
import ReportPage from "../../pages/report/ReportPage";
import UserPage from "../../pages/user/UserPage";
import { ChartNoAxesCombined, FileChartColumn, Home, User } from "lucide-react";
import { generateKey } from "../../utils/helper";
import { DashboardPage } from "../../pages/dashboard/Dashboard";
import type { ModuleRoute } from "../../types/auth";

export const NavRoutes: ModuleRoute[] = [
  {
    moduleName: "Overview",
    moduleKey: generateKey("Overview"),
    menus: [
      {
        menuKey: generateKey("Home"),
        name: "Home",
        path: "/home",
        component: <HomePage />,
        icon: <Home />,
      },
      {
        menuKey: generateKey("Dashboard"),
        name: "Dashboard",
        path: "/dashboard",
        component: <DashboardPage />,
        icon: <ChartNoAxesCombined />,
      },
      {
        menuKey: generateKey("Report"),
        name: "Report",
        path: "/report",
        component: <ReportPage />,
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
        component: <UserPage />,
        icon: <User />,
      },
    ],
  },
];

export const apiRoute: ModuleRoute[] = [
  {
    moduleName: "Overview",
    moduleKey: generateKey("Overview"),
    menus: [
      {
        menuKey: generateKey("Home"),
        name: "Home",
        path: "/home",
        component: <HomePage />,
        icon: <Home />,
      },
      {
        menuKey: generateKey("Dashboard"),
        name: "Dashboard",
        path: "/dashboard",
        component: <DashboardPage />,
        icon: <ChartNoAxesCombined />,
      },
    ],
  },
];
