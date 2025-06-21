import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Zap, User } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Query', path: '/Query' },
  { name: 'Team Analysis', path: '/team' },
  { name: 'Player Analysis', path: '/player' },
  { name: 'Predictions', path: '/predictions' }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const isActive = (path) => location.pathname === path;

  // Handler for profile button
  const handleProfileClick = () => {
    navigate('/profile');
    setMenuOpen(false);
  };

  return (
    <nav className="z-50 backdrop-blur-sm bg-gray-900/95 border-b border-gray-800 sticky top-0">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
              Cric-Query
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-all duration-300 hover:scale-105 ${isActive(link.path)
                    ? 'text-orange-400'
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Profile Button */}
          <div className="hidden md:block">
            <button
              className="group bg-gradient-to-r from-orange-500 to-blue-600 px-6 py-2 rounded-lg text-sm font-medium text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              onClick={handleProfileClick}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition-all duration-300"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
          <div className="px-6 py-4 space-y-4">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm font-medium transition-all duration-300 hover:translate-x-2 ${isActive(link.path)
                    ? 'text-orange-400'
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-3 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              onClick={handleProfileClick}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;