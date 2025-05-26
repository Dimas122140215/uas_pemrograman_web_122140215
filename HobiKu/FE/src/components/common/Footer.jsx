// src/components/common/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto py-10 px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About section */}
          <div>
            <h3 className="font-raleway text-lg font-semibold mb-4">About HobiKu</h3>
            <p className="font-poppins text-sm text-lightBlue leading-relaxed">
              HobiKu helps you track your favorite games, films, and anime.
              Discover new media, follow what you're watching or playing,
              and share reviews in a clean, minimalist way.
            </p>
          </div>

          {/* Primary Navigation */}
          <div>
            <nav aria-label="Main navigation">
              <h3 className="font-raleway text-lg font-semibold mb-4">Explore</h3>
              <ul className="space-y-3 text-sm font-poppins">
                <li>
                  <Link to="/" className="text-lightBlue hover:text-white transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/your-space" className="text-lightBlue hover:text-white transition-colors duration-200">
                    Your Space
                  </Link>
                </li>
                <li>
                  <Link to="/media" className="text-lightBlue hover:text-white transition-colors duration-200">
                    Dive
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Account Section */}
          <div>
            <nav aria-label="Account settings">
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
                    Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-primary text-sm text-center font-poppins text-lightBlue">
          <p>© {currentYear} HobiKu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;