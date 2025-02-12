import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-8">
        <nav className="flex justify-end space-x-8 h-16">
          <Link
            to="/"
            className={`text-gray-600 hover:text-gray-900 relative flex items-end pb-4 ${
              location.pathname === '/' ? 'text-gray-600' : ''
            }`}
          >
            Home
            {location.pathname === '/' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
            )}
          </Link>
          <Link
            to="/history"
            className={`text-gray-600 hover:text-gray-900 relative flex items-end pb-4 ${
              location.pathname === '/history' ? 'text-gray-600' : ''
            }`}
          >
            History
            {location.pathname === '/history' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 