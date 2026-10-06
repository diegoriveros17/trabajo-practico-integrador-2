import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
