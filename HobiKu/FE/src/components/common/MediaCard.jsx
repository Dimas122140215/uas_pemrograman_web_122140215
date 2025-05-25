// src/components/media/MediaCard.jsx
import PropTypes from 'prop-types';
import StatusBadge from './StatusBadge';
import { Link } from 'react-router-dom';

const MediaCard = ({ media, showProgress = false, children }) => {
  return (
    <Link to={`/media/${media.type.toLowerCase()}/${media.id}`} className="block relative group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
          <img 
            src={media.coverImage} 
            alt={media.title}
            className="w-full h-48 object-cover"
          />
          {media.status && (
            <div className="absolute top-2 right-2">
              <StatusBadge status={media.status} />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-raleway font-bold text-lg line-clamp-1">{media.title}</h3>
          
          <div className="flex items-center justify-between mt-1">
            <span className="text-gray-600 capitalize">{media.type}</span>
            
            {media.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-medium">{media.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Optional Progress Tracker */}
          {showProgress && media.progress && (
            <div className="mt-3">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${(media.progress / media.total) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-1 block text-right">
                {media.progress} / {media.total}
              </span>
            </div>
          )}

          {/* Optional child components like ProgressTracker */}
          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

MediaCard.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    rating: PropTypes.number,
    status: PropTypes.string,
    progress: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  showProgress: PropTypes.bool,
  children: PropTypes.node,
};

export default MediaCard;