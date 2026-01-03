import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';
import SchedulePage from './pages/SchedulePage';

const isAuthenticated = () => !!localStorage.getItem('servsync_token');

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-blue-700 text-white p-4 flex justify-between">
        <h1 className="font-bold">ServSync</h1>
        <nav className="flex gap-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/services">Services</Link>
          <Link to="/schedule">Schedule</Link>
        </nav>
      </header>
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

