import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-secondary mb-6">
        <Frown size={64} />
      </div>
      <h2 className="font-raleway text-2xl md:text-3xl text-gray-800 mb-4 text-center">
        Oops! Page Not Found
      </h2>
      <p className="font-poppins text-gray-600 mb-6 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="font-poppins inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;