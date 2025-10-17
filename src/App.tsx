// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import SettingPage from "./pages/settings/Settings";
import LoginPage from "./pages/auth/LoginPage";
import AuthLayout from "./pages/layout/AuthLayout";
import MainLayout from "./pages/layout/MainLayout";
import RegisterPage from "./pages/auth/Register";
import { MenuBar } from "./components/navbar/MenuBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route path="/*" element={<MenuBar />} />
          <Route path="/settings" element={<SettingPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
