import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Base from './pages/Base';
import Home from './pages/Home';
import PlayerAnalysis from './components/PlayerAnalysis';
import Prediction from './pages/Prediction';
import Navbar from './components/Navbar';
import QueryAnswer from './pages/QueryAnswer';
import RegisterUser from './pages/RegisterUser';
import { UserProvider } from './context/UserContext';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  const location = useLocation();

  // Public routes
  const publicPaths = ['/register', '/base', '/'];

  if (publicPaths.includes(location.pathname)) {
    return children;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return children;
}

function ProtectedLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-200 to-blue-300">
      <div className='h-15vh'>
      <Navbar />
      </div>
      <main className="relative h-min">
        <Routes>
          <Route path="/Query" element={<QueryAnswer />} />
          <Route path="/team" element={<Home />} />
          <Route path="/player" element={<PlayerAnalysis />} />
          <Route path="/predictions" element={<Prediction />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/team" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
