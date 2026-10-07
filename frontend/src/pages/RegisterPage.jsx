import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/userForm";
import { useFetch } from "../hooks/useFetch";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { form, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const { fetchingData, isLoading, error } = useFetch("register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const { username, email, password, first_name, last_name } = form;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetchingData({
        username,
        email,
        password,
        first_name,
        last_name,
      });

      // console.log(res);
      if (res) {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
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
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                name="email"
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
                value={first_name}
                onChange={handleChange}
                name="first_name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
                value={last_name}
                onChange={handleChange}
                name="last_name"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
              onClick={handleSubmit}
            >
              Registarme
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
            Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
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
