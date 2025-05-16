import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About HobiKu</h3>
            <p className="text-gray-300 text-sm">
              HobiKu helps you track your favorite games, films, and anime. 
              Keep up with what you're watching or playing, share reviews, 
              and discover new content.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/media/games" className="text-gray-300 hover:text-white">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/media/films" className="text-gray-300 hover:text-white">
                  Films
                </Link>
              </li>
              <li>
                <Link to="/media/anime" className="text-gray-300 hover:text-white">
                  Anime
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Account section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-center text-gray-400">
          <p>© {currentYear} HobiKu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;