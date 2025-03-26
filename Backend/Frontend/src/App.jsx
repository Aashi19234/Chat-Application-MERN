import React from 'react';
import Left from './home/left part/Left';
import Right from './home/right part/Right';
import Signup from './components/Signup';
import Login from './components/Login';
import { useAuth } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  const [authuser] = useAuth(); // Get authentication state

  return (
    <>
      <Routes>
        {/* Landing Page Route */}
        <Route
          path="/landing"
          element={<LandingPage />}
        />

        {/* Main App (Protected Route) */}
        <Route
          path="/"
          element={
            authuser ? (
              <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                  <Right />
                </div>
                <div className="drawer-side">
                  <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                  <ul className="menu w-80 min-h-full bg-black text-base-content">
                    <Left />
                  </ul>
                </div>
              </div>
            ) : (
              <Navigate to="/landing" /> // Redirect unauthenticated users to Landing Page
            )
          }
        />

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={authuser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authuser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
