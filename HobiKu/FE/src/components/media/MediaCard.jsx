import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'Watching':
      case 'Playing':
        return 'bg-primary';
      case 'Plan to Watch':
      case 'Plan to Play':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <span className={`${getStatusColor()} text-white text-xs px-2 py-1 rounded-full`}>
      {status}
    </span>
  );
};

const MediaCard = ({ 
  id, 
  title, 
  imageUrl, 
  type, 
  rating, 
  status = null,
  year
}) => {
  // Use a placeholder image if no image URL is provided
  const [imgSrc, setImgSrc] = useState(imageUrl || '/api/placeholder/200/300');
  
  const handleImageError = () => {
    setImgSrc('/api/placeholder/200/300');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/media/${type.toLowerCase()}/${id}`}>
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imgSrc} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          {status && (
            <div className="absolute top-2 right-2">
              <StatusBadge status={status} />
            </div>
          )}
        </div>
        
        {/* Card Body */}
        <div className="p-4">
          <h3 className="font-raleway font-semibold text-gray-800 text-lg truncate">{title}</h3>
          
          {/* Rating + Year */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="ml-1 text-sm font-poppins text-gray-600">
                {rating ? rating.toFixed(1) : 'N/A'}
              </span>
            </div>
            <span className="text-sm font-poppins text-gray-500">{year || '-'}</span>
          </div>
          
          {/* Type Tag */}
          <div className="mt-2">
            <span className="font-poppins text-xs font-medium text-secondary uppercase tracking-wider">
              {type}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MediaCard;