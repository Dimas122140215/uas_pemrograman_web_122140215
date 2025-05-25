import { useState } from 'react';
import MediaCard from '../../components/common/MediaCard';

const sampleMedia = [
  { id: 1, title: 'Elden Ring', rating: 4.8, year: 2022 },
  { id: 2, title: 'Attack on Titan', rating: 4.9, year: 2023 },
  { id: 3, title: 'Oppenheimer', rating: 4.7, year: 2023 },
  { id: 4, title: 'Dune: Part Two', rating: 4.5, year: 2024 },
];

const MediaList = () => {
  const [filter, setFilter] = useState('');

  const filteredMedia = sampleMedia.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="font-raleway text-2xl md:text-3xl text-gray-800">All Media</h2>
          <div className="mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search media..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {filteredMedia.length === 0 ? (
          <div className="text-center py-10">
            <p className="font-poppins text-gray-600">No media found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredMedia.map((item) => (
              <MediaCard
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl="/api/placeholder/200/300"
                rating={item.rating}
                year={item.year}
                type="Game"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaList;