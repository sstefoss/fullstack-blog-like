import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const LogoutPage = () => {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return <Navigate to="/" />;
};

export default LogoutPage;
