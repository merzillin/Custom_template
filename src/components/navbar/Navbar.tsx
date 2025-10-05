import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { NavRoutes } from "./navbarRoute";
import { LogOut, X, ChevronDown, ChevronRight, Settings } from "lucide-react";
import logo from "../../assets/logo/Q.png";
import btnLogo from "../../assets/logo/btn-logo.png";
import profile from "../../assets/Profile.jpg";
import { apiRoute } from "./navbarRoute";
import type { ModuleRoute } from "../../types/auth";

const user = {
  name: "John Doe",
  avatar: "https://via.placeholder.com/40",
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbarData, setNavData] = useState<ModuleRoute[]>(NavRoutes);
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialOpenModules = () => {
    return NavRoutes.filter((module) =>
      module.menus.some((menu) => menu.path === location.pathname)
    ).map((module) => module.moduleName);
  };

  const [openModules, setOpenModules] = useState<string[]>(
    getInitialOpenModules()
  );

  const toggleModule = (moduleName: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((m) => m !== moduleName)
        : [...prev, moduleName]
    );
  };

  const isModuleActive = (module: (typeof NavRoutes)[0]) =>
    module.menus.some((menu) => menu.path === location.pathname);

  const handleLogout = () => {
    navigate("/login");
  };

  const getModuleAndMenu = () => {
    try {
      // assuming apiRoute as the value from api
      const filteredNavRoutes = NavRoutes.map((navRoute) => {
        const apiRouteItem = apiRoute.find(
          (apiRouteModule) => apiRouteModule.moduleKey === navRoute.moduleKey
        );

        if (apiRouteItem) {
          const filteredMenus = navRoute.menus.filter((menu) =>
            apiRouteItem.menus.some(
              (apiMenu) => apiMenu.menuKey === menu.menuKey
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
    setOpenModules(getInitialOpenModules());
  }, [location.pathname]);

  useEffect(() => {
    getModuleAndMenu();
  }, []);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow "
        onClick={() => setIsOpen(true)}
      >
        <img
          src={btnLogo}
          alt="User Avatar"
          className="object-cover w-full h-8"
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-200-800 bg-opacity-25 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
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
          {navbarData.map((module) => {
            const isModuleOpen = openModules.includes(module.moduleName);
            const activeModule = isModuleActive(module);

            return (
              <div
                key={module.moduleName}
                className="mb-1"
                title={module.moduleName}
              >
                <button
                  onClick={() => toggleModule(module.moduleName)}
                  className={`flex items-center justify-between w-full  text-gray-500 uppercase text-xs font-semibold hover:bg-gray-100 
                    ${activeModule ? "bg-gray-200 text-gray-900" : ""}`}
                >
                  <span className="truncate overflow-hidden whitespace-nowrap text-[11px]  ml-2 p-2">
                    {module.moduleName}
                  </span>
                  {isModuleOpen ? (
                    <ChevronDown size={12} />
                  ) : (
                    <ChevronRight size={12} />
                  )}
                </button>

                {isModuleOpen && (
                  <ul className="">
                    {module.menus.map((menu) => (
                      <li key={menu.path} title={menu.name}>
                        <NavLink
                          to={menu.path}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-8 py-2  text-gray-700 hover:bg-gray-100 transition-colors
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
                )}
              </div>
            );
          })}
        </div>

        <div className=" p-2">
          <NavLink
            to="/settings"
            onClick={() => setIsOpen(false)}
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
