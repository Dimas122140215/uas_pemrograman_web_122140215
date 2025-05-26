// src/components/media/MediaGrid.jsx
import { Link } from 'react-router-dom';
import MediaCard from '../common/MediaCard';

const MediaGrid = ({ items = [], title = "All Media" }) => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-raleway text-2xl md:text-3xl text-gray-800 mb-6">{title}</h2>
        
        {items.length === 0 ? (
          <div className="text-center py-10">
            <p className="font-poppins text-gray-500">No media found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {items.map(item => (
              <MediaCard key={item.id} media={item} showProgress={false} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaGrid;