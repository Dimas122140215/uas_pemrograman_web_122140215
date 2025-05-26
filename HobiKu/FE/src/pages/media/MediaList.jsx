// src/pages/media/MediaList.jsx
import { useState } from 'react';
import MediaGrid from '../../components/media/MediaGrid';

const sampleMedia = [
  {
    id: '1',
    title: 'Dune: Part Two',
    coverImage: 'https://xl.movieposterdb.com/24_01/2024/15239678/xl_dune-part-two-movie-poster_e27e32f3.jpg',
    rating: 4.5,
    type: 'Film',
    status: 'Watching'
  },
  {
    id: '2',
    title: 'Jujutsu Kaisen',
    coverImage: 'https://images-cdn.ubuy.co.id/633feb8bd279163476374ad1-japan-anime-manga-poster-jujutsu.jpg',
    rating: 4.7,
    type: 'Anime',
    status: 'Watching'
  },
  {
    id: '3',
    title: 'Chainsaw Man',
    coverImage: 'https://m.media-amazon.com/images/I/81iZCUeRLXL.jpg',
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