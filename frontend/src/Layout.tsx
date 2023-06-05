import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      Login / Signup
      <Outlet />
    </div>
  );
};

export default Layout;
