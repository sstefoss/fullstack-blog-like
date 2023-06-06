import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/solid";
import { AuthContext } from "./context/auth";
import cn from "classnames";

const Layout = () => {
  const { loggedIn } = useContext(AuthContext);
  const location = useLocation();
  const links = loggedIn
    ? [
        { to: "/profile", label: "Profile" },
        { to: "/logout", label: "Logout" },
      ]
    : [
        { to: "/signup", label: "Signup" },
        { to: "/login", label: "Login" },
      ];

  const isHomePageActive = () => location.pathname === "/";
  return (
    <div>
      <div className="flex fixed top-0 w-full px-6 py-4 justify-between bg-gray-900 border-b border-gray-700">
        <Link to="/">
          <HomeIcon
            className={cn("h-6 w-6 hover:text-gray-200 hover:cursor-pointer", {
              "text-gray-400": !isHomePageActive(),
              "text-gray-100": isHomePageActive(),
            })}
          />
        </Link>
        <div>
          {links.map((l, i) => (
            <NavLink
              active={location.pathname === l.to}
              key={i}
              to={l.to}
              label={l.label}
            />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  active: boolean;
}

const NavLink = ({ to, label, active }: NavLinkProps) => (
  <Link
    to={to}
    className={cn("ml-4 hover:text-gray-200 transition-colors font-semibold", {
      "text-gray-100": active,
      "text-gray-400": !active,
    })}
  >
    {label}
  </Link>
);

export default Layout;
