import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-indigo-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-800 opacity-90"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Track Your Entertainment Journey
        </h1>
        <p className="text-xl text-center mb-10 max-w-3xl">
          Keep track of your favorite games, films, and anime all in one place. 
          Share reviews, get recommendations, and never lose track of where you left off.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/register" 
            className="px-8 py-3 bg-indigo-500 rounded-lg text-lg font-medium hover:bg-indigo-600 transition-colors text-center"
          >
            Get Started
          </Link>
          <Link 
            to="/about" 
            className="px-8 py-3 bg-transparent border-2 border-white rounded-lg text-lg font-medium hover:bg-white hover:text-indigo-900 transition-colors text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;