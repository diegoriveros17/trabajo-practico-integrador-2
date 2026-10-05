import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to My App</h1>
        <p className="text-lg text-gray-600 mb-8">
          This is a simple landing page for our application.
        </p>
      </div>
      <Footer />
    </>
  );
};
