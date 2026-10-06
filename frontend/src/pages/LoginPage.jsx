import { useState } from "react";
import { useNavigate, Link } from "react-router";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, password } = form;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "agustin" && password === "agus123") {
      localStorage.setItem("isLogged", true);
      navigate("/home");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Iniciar sesión
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
                value={username}
                onChange={handleChange}
                name="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={handleChange}
                name="password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
              onClick={handleSubmit}
            >
              Iniciar sesión
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">
                Nombre de usuario o contraseña incorrectos.
              </p>
            )}
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            No tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Registrarse
            </Link>
          </p>
          <p className="mt-4 text-sm text-center text-gray-600">
            <Link to="/" className="text-blue-600 hover:underline">
              Volver a la pagina principal
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
