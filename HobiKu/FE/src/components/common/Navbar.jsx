import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl tracking-tight">HobiKu</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800">
                Home
              </Link>
              <Link to="/media/games" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800">
                Games
              </Link>
              <Link to="/media/films" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800">
                Films
              </Link>
              <Link to="/media/anime" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800">
                Anime
              </Link>
            </div>
          </div>

          {/* User section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800">
                Login
              </Link>
              <Link to="/register" className="ml-2 px-3 py-2 bg-indigo-500 rounded-md text-sm font-medium hover:bg-indigo-600">
                Register
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-800"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/media/games" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-800"
              onClick={() => setIsOpen(false)}
            >
              Games
            </Link>
            <Link 
              to="/media/films" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-800"
              onClick={() => setIsOpen(false)}
            >
              Films
            </Link>
            <Link 
              to="/media/anime" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-800"
              onClick={() => setIsOpen(false)}
            >
              Anime
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-800"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="block px-3 py-2 mt-1 rounded-md text-base font-medium bg-indigo-500 hover:bg-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;