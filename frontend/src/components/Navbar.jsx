import { Link } from "react-router";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold">TLP II</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">
            Inicio
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};
