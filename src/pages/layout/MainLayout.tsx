import { Outlet } from "react-router-dom";
import Sidebar from "../../components/navbar/Navbar";

export default function MainLayout() {
  console.count("mainlayout");
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 pt-16 md:pt-0 p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
