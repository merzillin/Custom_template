// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { NavRoutes } from "./components/navbar/navbarRoute";
import "./App.css";
import SettingPage from "./pages/settings/Settings";
import LoginPage from "./pages/auth/LoginPage";
import AuthLayout from "./pages/layout/AuthLayout";
import MainLayout from "./pages/layout/MainLayout";
import RegisterPage from "./pages/auth/Register";

function App() {
  const allRoutes = NavRoutes.flatMap((module) => module.menus);

  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          {allRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
          <Route path="/settings" element={<SettingPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
