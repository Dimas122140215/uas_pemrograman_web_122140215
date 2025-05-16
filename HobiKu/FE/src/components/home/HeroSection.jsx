import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-secondary text-white">
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-90" 
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:px-8 lg:px-10 flex flex-col items-center text-center">
        <h1 className="font-raleway text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          Track Your Entertainment Journey
        </h1>
        <p className="font-poppins text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl">
          Keep track of your favorite games, films, and anime all in one place. 
          Share reviews, get recommendations, and never lose track of where you left off.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/register" 
            className="font-poppins px-8 py-3 bg-primary rounded-lg text-lg font-medium hover:bg-[#0066cc] transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Get Started
          </Link>
          <Link 
            to="/about" 
            className="font-poppins px-8 py-3 bg-transparent border-2 border-white rounded-lg text-lg font-medium hover:bg-white hover:text-secondary transition-colors duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;