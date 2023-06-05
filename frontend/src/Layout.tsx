import { Link, Outlet } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/solid";

const Layout = () => {
  return (
    <div className="bg-gray-900">
      <div className="flex fixed top-0 w-full px-6 py-4 justify-between bg-gray-900 border-b border-gray-700">
        <HomeIcon className="h-6 w-6 text-gray-400 hover:text-gray-200 hover:cursor-pointer" />
        <div>
          {[
            { to: "/signup", label: "Signup" },
            { to: "/login", label: "Login" },
          ].map((l) => (
            <NavLink to={l.to} label={l.label} />
          ))}
        </div>
      </div>
      <div className="pt-28">
        <Outlet />
      </div>
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
