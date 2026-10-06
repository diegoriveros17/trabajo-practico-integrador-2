import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const PublicRoute = () => {
  const { isLogged } = useAuth();

  if (isLogged) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};
