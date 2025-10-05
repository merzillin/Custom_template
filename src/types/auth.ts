export interface RouteItem {
  path: string;
  component: React.ReactNode;
  name: string;
  icon?: React.ReactNode;
  menuKey: string;
}

export interface ModuleRoute {
  moduleKey: string;
  moduleName: string;
  menus: RouteItem[];
}
