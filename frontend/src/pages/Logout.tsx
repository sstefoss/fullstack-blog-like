import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/auth";

const LogoutPage = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout?.();
  }, [logout]);

  return <Navigate to="/" />;
};

export default LogoutPage;
