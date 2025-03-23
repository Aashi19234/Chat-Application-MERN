import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-900 to-black flex flex-col items-center justify-center text-white">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">
          Welcome to <span className="text-blue-400">ChatX</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto animate-fade-in delay-200">
          The fastest and most secure way to chat with friends and teams.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-6 animate-slide-up">
        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-md"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-700 hover:bg-gray-800 px-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-md"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 px-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-lg"
        >
          Get Started 🚀
        </button>
      </div>

      {/* Illustration */}
      
    </div>
  );
};

export default LandingPage;
