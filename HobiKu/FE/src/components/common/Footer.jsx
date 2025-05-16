import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="max-w-7xl mx-auto py-10 px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About section */}
          <div>
            <h3 className="font-raleway text-lg font-semibold mb-4">About HobiKu</h3>
            <p className="font-poppins text-sm text-lightBlue leading-relaxed">
              HobiKu helps you track your favorite games, films, and anime.
              Keep up with what you're watching or playing, share reviews,
              and discover new content.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-raleway text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm font-poppins">
              <li>
                <Link to="/" className="text-lightBlue hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/media/games" className="text-lightBlue hover:text-white transition-colors duration-200">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/media/films" className="text-lightBlue hover:text-white transition-colors duration-200">
                  Films
                </Link>
              </li>
              <li>
                <Link to="/media/anime" className="text-lightBlue hover:text-white transition-colors duration-200">
                  Anime
                </Link>
              </li>
            </ul>
          </div>

          {/* Account section */}
          <div>
            <h3 className="font-raleway text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-3 text-sm font-poppins">
              <li>
                <Link to="/login" className="text-lightBlue hover:text-white transition-colors duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-lightBlue hover:text-white transition-colors duration-200">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-lightBlue hover:text-white transition-colors duration-200">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-[#007BFF] text-sm text-center font-poppins text-lightBlue">
          <p>© {currentYear} HobiKu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;