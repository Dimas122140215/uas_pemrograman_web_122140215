// src/components/auth/AuthCard.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthCard = ({ heading, subheading, children, footerLinkText, onFooterLinkClick }) => {
  return (
    <>
      <h2 className="font-raleway text-2xl text-gray-800 mb-2">{heading}</h2>
      {subheading && (
        <p className="font-poppins text-gray-600 mt-1">{subheading}</p>
      )}
      
      {/* Render children */}
      {children}

      {/* Footer Link */}
      {footerLinkText && (
        <p className="mt-4 font-poppins text-sm text-gray-600 text-center">
          {footerLinkText}{' '}
          <Link to={onFooterLinkClick} className="text-primary hover:underline">
            Login
          </Link>
        </p>
      )}
    </>
  );
};

AuthCard.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  children: PropTypes.node.isRequired,
  footerLinkText: PropTypes.string,
  onFooterLinkClick: PropTypes.string.isRequired,
};

export default AuthCard;