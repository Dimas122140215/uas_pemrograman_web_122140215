import { Link } from 'react-router-dom';
import MediaCard from '../media/MediaCard';

const MediaSection = ({ title, mediaType, items = [], viewAllLink }) => {  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <Link 
            to={viewAllLink} 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All
          </Link>
        </div>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <p className="text-lg">No items to display</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {items.map(item => (
              <MediaCard 
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                type={mediaType}
                rating={item.rating}
                year={item.year}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaSection;