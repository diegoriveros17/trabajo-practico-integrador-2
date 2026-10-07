import { useState } from "react";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();

  // 1. Estado reactivo basado en localStorage
  const [isLogged, setIsLogged] = useState(
    Boolean(localStorage.getItem("isLogged")),
  );

  // 2. Función para iniciar sesión (al recibir respuesta exitosa de la API)
  const login = (userData = null) => {
    localStorage.setItem("isLogged", "true");
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    setIsLogged(true);
  };

  // 3. Función centralizada de Logout
  const logout = () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Si usas tokens
    setIsLogged(false);
    navigate("/login", { replace: true });
  };

  // 4. Obtener datos del usuario guardados si existen
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  return {
    isLogged,
    user: getUser(),
    login,
    logout,
  };
};
