// src/pages/media/MediaList.jsx
import { useState } from 'react';
import MediaGrid from '../../components/media/MediaGrid';

const sampleMedia = [
  {
    id: '1',
    title: 'Dune: Part Two',
    coverImage: '/api/placeholder/200/300',
    rating: 4.5,
    type: 'Film',
    status: 'Watching'
  },
  {
    id: '2',
    title: 'Jujutsu Kaisen',
    coverImage: '/api/placeholder/200/300',
    rating: 4.7,
    type: 'Anime',
    status: 'Watching'
  },
  {
    id: '3',
    title: 'Chainsaw Man',
    coverImage: '/api/placeholder/200/300',
    rating: 4.5,
    type: 'Anime',
    status: 'Plan to Watch'
  }
];

const MediaList = () => {
  const [filter, setFilter] = useState('');

  const filteredMedia = sampleMedia.filter(item =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search media..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Grid of Results */}
        <MediaGrid items={filteredMedia} title="Search Results" />
      </div>
    </div>
  );
};

export default MediaList;