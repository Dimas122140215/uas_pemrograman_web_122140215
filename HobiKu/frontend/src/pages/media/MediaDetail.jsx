// src/pages/media/MediaDetail.jsx
import { useParams } from 'react-router-dom';
import MediaCard from '../../components/common/MediaCard';
import ProgressTracker from '../../components/media/ProgressTracker';
import ReviewSection from '../../components/media/ReviewSection';

const relatedMedia = [
  {
    id: '2',
    title: 'Jujutsu Kaisen',
    coverImage: 'https://images-cdn.ubuy.co.id/633feb8bd279163476374ad1-japan-anime-manga-poster-jujutsu.jpg',
    rating: 4.7,
    type: 'Anime'
  },
  {
    id: '3',
    title: 'God of War Ragnarök',
    coverImage: 'https://ae01.alicdn.com/kf/S2ee185e7f1064ed2bb9414f206475ce8B.jpg',
    rating: 4.7,
    type: 'Game'
  }
];

const MediaDetail = () => {
  const { type, id } = useParams();

  // Mock media item
  const media = {
    id,
    title: type === 'anime' ? 'Attack on Titan Final Season' : type === 'film' ? 'Oppenheimer' : 'Elden Ring',
    description: 'A fantastic journey through a vast world full of mysteries.',
    genres: ['Action', 'Adventure', 'Fantasy'],
    year: 2023,
    rating: 4.8,
    coverImage: 'https://cdn.europosters.eu/image/1300/216782.jpg',
    type: type.charAt(0).toUpperCase() + type.slice(1),
    status: 'Watching',
    progress: 60,
    total: 25
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Cover Image */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <img
            src={media.coverImage}
            alt={media.title}
            className="w-full h-auto"
          />
        </div>

        {/* Title & Description */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="font-raleway text-3xl text-gray-800 mb-2">{media.title}</h2>
          <p className="font-poppins text-gray-600 mb-4">{media.description}</p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {media.genres.map((genre, index) => (
              <span
                key={index}
                className="bg-lightBlue text-secondary text-xs px-2 py-1 rounded-full font-poppins"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Rating & Year */}
          <div className="flex items-center mb-6">
            <span className="text-yellow-500 font-bold mr-1">★</span>
            <span className="font-poppins text-gray-700">{media.rating}/5</span>
            <span className="mx-2">·</span>
            <span className="font-poppins text-gray-700">{media.year}</span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mb-8">
          <ProgressTracker media={media} />
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <ReviewSection media={media} />
        </div>

        {/* More Like This */}
        <div className="mb-8">
          <h3 className="font-raleway text-xl text-gray-800 mb-4">More Like This</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedMedia.map((item) => (
              <MediaCard key={item.id} media={item} showProgress={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;