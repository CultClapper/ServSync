import React from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';
import SchedulePage from './pages/SchedulePage';

const isAuthenticated = () => !!localStorage.getItem('servsync_token');

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function Header() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    localStorage.removeItem('servsync_token');
    navigate('/login');
  };

  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold">ServSync</h1>
      <nav className="flex gap-4 items-center">
        {authenticated && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/services">Services</Link>
            <Link to="/schedule">Schedule</Link>
            <button
              onClick={handleLogout}
              className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/services"
            element={
              <PrivateRoute>
                <ServicesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <SchedulePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} />} />
        </Routes>
      </main>
    </div>
  );
}

