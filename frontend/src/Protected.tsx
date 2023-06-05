import { Navigate, Outlet } from "react-router-dom";

const Protected = ({
  isSignedIn,
}: {
  isSignedIn: boolean;
}): React.ReactElement => {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default Protected;
