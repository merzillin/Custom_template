import type { JSX, LazyExoticComponent } from "react";

export interface RouteItem {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
  name: string;
  icon?: React.ReactNode;
  menuKey: string;
}

export interface ModuleRoute {
  moduleKey: string;
  moduleName: string;
  menus: RouteItem[];
}

export interface RouteItemApiResponse {
  path: string;
  name: string;
  menuKey: string;
}

export interface ModuleRouteApiResponse {
  moduleKey: string;
  moduleName: string;
  menus: RouteItemApiResponse[];
}

export type TLogin = {
  username: string;
  password: string;
};
