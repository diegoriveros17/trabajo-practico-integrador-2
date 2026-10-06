import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold">TLP II</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">
            Inicio
          </Link>
          {!isLogged ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:underline text-red-400"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
