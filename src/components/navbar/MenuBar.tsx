import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { NavRoutes } from "./navbarRoute";

export const MenuBar = () => {
  const allRoutes = NavRoutes.flatMap((module) => module.menus);
  console.count("menubar");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {allRoutes.map((route) => (
          <Route
            key={route.menuKey}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </Suspense>
  );
};
