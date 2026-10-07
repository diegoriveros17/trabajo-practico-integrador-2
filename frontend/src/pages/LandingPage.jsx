import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">
          Taller de lenguaje de programación II
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Tp integrador 2, conectar front con back
        </p>
      </div>
      <Footer />
    </>
  );
};
