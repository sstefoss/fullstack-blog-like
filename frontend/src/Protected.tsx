import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/auth";

const Protected = (): React.ReactElement => {
  const { loggedIn } = useContext(AuthContext);
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default Protected;
