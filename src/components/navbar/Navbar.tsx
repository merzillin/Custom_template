import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavRoutes } from "./navbarRoute";
import { LogOut, X, Settings } from "lucide-react";
import logo from "../../assets/logo/Q.png";
import btnLogo from "../../assets/logo/btn-logo.png";
import profile from "../../assets/Profile.jpg";
import AuthService from "../../api/auth/auth";
import type {
  ModuleRouteApiResponse,
  RouteItemApiResponse,
} from "../../types/auth";

const user = {
  name: "John Doe",
  avatar: "https://via.placeholder.com/40",
};

const Sidebar = () => {
  const [navbarData, setNavData] = useState(NavRoutes);
  const [masterData, setMasterData] = useState({
    isOpen: false,
    isSmallScreen: window.innerWidth <= 768,
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const getModuleAndMenu = async () => {
    try {
      const response = await AuthService.getModuleMenu();
      const { data } = response;
      if (!data.status) return;

      const filteredNavRoutes = NavRoutes.map((navRoute) => {
        const apiRouteItem = data.result.find(
          (apiRouteModule: ModuleRouteApiResponse) =>
            apiRouteModule.moduleKey === navRoute.moduleKey
        );

        if (apiRouteItem) {
          const filteredMenus = navRoute.menus.filter((menu) =>
            apiRouteItem.menus.some(
              (apiMenu: RouteItemApiResponse) =>
                apiMenu.menuKey === menu.menuKey
            )
          );

          if (filteredMenus.length > 0) {
            return {
              ...navRoute,
              menus: filteredMenus,
            };
          }
        }

        return undefined;
      }).filter((item) => item !== undefined);

      setNavData(filteredNavRoutes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getModuleAndMenu();

    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      // Only update state if screen size actually changes
      if (isSmallScreen !== masterData.isSmallScreen) {
        setMasterData((prev) => ({
          ...prev,
          isSmallScreen,
        }));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [masterData.isSmallScreen]);

  console.count("sidebar rendered");

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow "
        onClick={() => setMasterData((prev) => ({ ...prev, isOpen: true }))}
      >
        <img
          src={btnLogo}
          alt="User Avatar"
          className="object-cover w-full h-8"
        />
      </button>

      {masterData.isOpen && (
        <div
          className="fixed inset-0 bg-slate-200-800 bg-opacity-25 z-40"
          onClick={() => setMasterData((prev) => ({ ...prev, isOpen: false }))}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transform
          ${masterData.isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() =>
              setMasterData((prev) => ({ ...prev, isOpen: false }))
            }
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center w-full">
          <img
            src={logo}
            alt="User Avatar"
            className="w-full h-4/5  object-cover"
          />
        </div>

        <div className="flex-1 overflow-y-auto mt-4">
          {navbarData.map((module) => (
            <div
              key={module.moduleKey}
              className="mb-1"
              title={module.moduleName}
            >
              <button className="flex items-center justify-between w-full text-gray-500 uppercase text-xs font-semibold hover:bg-gray-100">
                <span className="truncate overflow-hidden whitespace-nowrap text-[11px] ml-2 p-2">
                  {module.moduleName}
                </span>
              </button>

              <ul>
                {module.menus.map((menu) => (
                  <li key={menu.path} title={menu.name}>
                    <NavLink
                      to={menu.path}
                      onClick={() => {
                        if (masterData.isSmallScreen) {
                          setMasterData((prev) => ({ ...prev, isOpen: false }));
                        }
                      }}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors
                          ${isActive ? "bg-gray-100 font-semibold" : ""}`
                      }
                    >
                      {menu.icon}
                      <span className="truncate overflow-hidden whitespace-nowrap text-[10px]">
                        {menu.name}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-2">
          <NavLink
            to="/settings"
            onClick={() =>
              setMasterData((prev) => ({
                ...prev,
                isOpen: false,
              }))
            }
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors
                ${isActive ? "bg-gray-200 font-semibold" : ""}`
            }
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </div>

        <div className="border-t p-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div>
              <img src={profile} className="w-10 h-10 rounded-full" />
            </div>
            <span className="font-semibold text-l sm:text-s text-gray-800">
              {user.name}
            </span>
          </div>

          <button
            className="p-2 rounded-md hover:bg-gray-100"
            title="Logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
