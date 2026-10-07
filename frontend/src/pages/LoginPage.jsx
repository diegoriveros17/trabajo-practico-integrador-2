// import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/userForm";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { form, handleChange } = useForm({
    username: "",
    password: "",
  });
  const { login } = useAuth();

  const { fetchingData, isLoading, error } = useFetch("login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const { username, password } = form;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Datos a enviar:", form);
    try {
      const res = await fetchingData({ username, password });

      console.log(res);
      if (res.token) {
        login(res);
        return navigate("/home");
      }
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              placeholder="******"
              value={password}
              onChange={handleChange}
              name="password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Iniciar sesión
          </button>

          {error && error.length > 0 && (
            <ul>
              {error.map((err, index) => (
                <li
                  className="text-red-500 text-sm text-center mt-2"
                  key={index}
                >
                  {err}
                </li>
              ))}
            </ul>
          )}
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrarse
          </Link>
        </p>

        <p className="mt-4 text-sm text-center text-gray-600">
          <Link to="/" className="text-blue-600 hover:underline">
            Volver a la página principal
          </Link>
        </p>
      </div>
    </div>
  );
};
