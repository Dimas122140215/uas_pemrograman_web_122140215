// src/components/auth/AuthCard.jsx
import PropTypes from 'prop-types';

const AuthCard = ({ children, heading, subheading }) => {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="font-raleway text-2xl font-semibold text-gray-800">{heading}</h2>
        {subheading && (
          <p className="font-poppins text-gray-600 mt-2">{subheading}</p>
        )}
      </div>
      
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

AuthCard.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default AuthCard;