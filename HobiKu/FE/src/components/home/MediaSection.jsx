import { Link } from 'react-router-dom';
import MediaCard from '../media/MediaCard';

const MediaSection = ({ title, mediaType, items = [], viewAllLink }) => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-raleway text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          <Link 
            to={viewAllLink} 
            className="font-poppins text-primary hover:text-secondary font-medium transition-colors"
          >
            View All
          </Link>
        </div>
        
        {/* Content Grid or Empty State */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <p className="font-poppins text-lg">No items to display</p>
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
    </section>
  );
};

export default MediaSection;