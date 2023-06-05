import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="fixed top-0 right-0 p-4">
        <Link to="/login" className="mr-4">
          Login
        </Link>
        <Link to="/signup">Signup</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
