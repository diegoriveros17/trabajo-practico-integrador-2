import { Navigate, Outlet } from "react-router";

export const PublicRoute = () => {
  const isLogged = localStorage.getItem("isLogged");

  if (isLogged) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};
