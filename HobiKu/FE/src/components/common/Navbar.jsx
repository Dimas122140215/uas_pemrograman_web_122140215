// src/components/common/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Simulated auth state – replace with real later
  const isAuthenticated = false;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-secondary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-raleway font-bold text-xl tracking-tight">HobiKu</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-poppins font-medium hover:bg-primary transition-colors"
            >
              Home
            </Link>
            <button
              onClick={() => handleNavigation('/media')}
              className="text-sm font-poppins font-medium hover:bg-primary transition-colors px-3 py-2 rounded-md"
            >
              Dive
            </button>
            <button
              onClick={() => handleNavigation('/your-space')}
              className="text-sm font-poppins font-medium hover:bg-primary transition-colors px-3 py-2 rounded-md"
            >
              Your Space
            </button>
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-poppins font-medium hover:bg-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-2 px-4 py-2 bg-primary hover:bg-secondary rounded-md text-sm font-poppins font-medium transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="px-3 py-2 rounded-md text-sm font-poppins font-medium hover:bg-primary"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleNavigation('/logout')}
                  className="ml-2 px-4 py-2 bg-primary hover:bg-secondary rounded-md text-sm font-poppins font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-secondary">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => handleNavigation("/")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-poppins font-medium hover:bg-primary"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/media")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-poppins font-medium hover:bg-primary"
            >
              Dive
            </button>
            <button
              onClick={() => handleNavigation("/your-space")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-poppins font-medium hover:bg-primary"
            >
              Your Space
            </button>
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation("/login")}
                  className="block w-full text-left px-3 py-2 mt-2 rounded-md text-base font-poppins font-medium bg-lightBlue text-secondary"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("/register")}
                  className="block w-full text-left px-3 py-2 mt-1 rounded-md text-base font-poppins font-medium bg-primary hover:bg-[#0066cc] text-white"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("/profile")}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-poppins font-medium hover:bg-primary"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleNavigation("/logout")}
                  className="block w-full text-left px-3 py-2 mt-2 rounded-md text-base font-poppins font-medium bg-red-500 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;