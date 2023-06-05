import { Link, Outlet } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/solid";
import { isLoggedIn } from "./utils";

const Layout = () => {
  const links = isLoggedIn()
    ? [
        { to: "/profile", label: "Profile" },
        { to: "/logout", label: "Logout" },
      ]
    : [
        { to: "/signup", label: "Signup" },
        { to: "/login", label: "Login" },
      ];

  return (
    <div>
      <div className="flex fixed top-0 w-full px-6 py-4 justify-between bg-gray-900 border-b border-gray-700">
        <Link to="/">
          <HomeIcon className="h-6 w-6 text-gray-400 hover:text-gray-200 hover:cursor-pointer" />
        </Link>
        <div>
          {links.map((l, i) => (
            <NavLink key={i} to={l.to} label={l.label} />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Link
      to={to}
      className="ml-4 text-gray-400 hover:text-gray-200 transition-colors"
    >
      {label}
    </Link>
  );
};

export default Layout;
