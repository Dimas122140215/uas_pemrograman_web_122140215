import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Simulated auth state — replace with real logic later
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
            <Link to="/" className="flex items-center">
              <span className="font-raleway font-bold text-xl tracking-tight">HobiKu</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-poppins font-medium hover:bg-primary"
            >
              Home
            </Link>
            <Link
              to="/media/games"
              className="px-3 py-2 rounded-md text-sm font-poppins font-medium hover:bg-primary"
            >
              Games
            </Link>
            <Link
              to="/media/films"
              className="px-3 py-2 rounded-md text-sm font-poppins font-medium hover:bg-primary"
            >
              Films
            </Link>
            <Link
              to="/media/anime"
              className="px-3 py-2 rounded-md text-sm font-poppins font-medium hover:bg-primary"
            >
              Anime
            </Link>
          </div>

          {/* Auth Buttons / User Section */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="px-3 py-2 rounded-md text-sm font-poppins font-medium hover:bg-primary"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleNavigation('/logout')}
                  className="ml-2 px-3 py-2 bg-lightBlue text-secondary rounded-md text-sm font-poppins font-medium hover:bg-[#CCE0FF]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-poppins font-medium hover:bg-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-2 px-3 py-2 bg-primary rounded-md text-sm font-poppins font-medium hover:bg-[#0066cc]"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-secondary">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => handleNavigation("/")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-poppins font-medium hover:bg-primary"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/media/games")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-poppins font-medium hover:bg-primary"
            >
              Games
            </button>
            <button
              onClick={() => handleNavigation("/media/films")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-poppins font-medium hover:bg-primary"
            >
              Films
            </button>
            <button
              onClick={() => handleNavigation("/media/anime")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-poppins font-medium hover:bg-primary"
            >
              Anime
            </button>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation("/profile")}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-poppins font-medium hover:bg-primary"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleNavigation("/logout")}
                  className="block w-full text-left px-3 py-2 mt-1 rounded-md text-base font-poppins font-medium bg-lightBlue text-secondary hover:bg-[#CCE0FF]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("/login")}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-poppins font-medium hover:bg-primary"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("/register")}
                  className="block w-full text-left px-3 py-2 mt-1 rounded-md text-base font-poppins font-medium bg-primary hover:bg-[#0066cc]"
                >
                  Register
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