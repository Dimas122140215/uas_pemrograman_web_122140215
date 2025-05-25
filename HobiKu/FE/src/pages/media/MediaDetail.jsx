import { useParams } from 'react-router-dom';
import { useState } from 'react';

const MediaDetail = () => {
  const { type, id } = useParams();

  // Mock data — will be replaced by API call later
  const media = {
    id,
    title: type === 'anime' ? 'Attack on Titan Final Season' : type === 'film' ? 'Oppenheimer' : 'Elden Ring',
    description:
      'A fantastic journey through a vast world full of mysteries, enemies, and hidden stories.',
    rating: 4.8,
    year: 2023,
    genres: ['Action', 'Adventure', 'Fantasy'],
    status: 'Watching',
    coverImage: '/api/placeholder/600/400',
  };

  const relatedMedia = [
    { id: 1, title: 'God of War Ragnarök', type: 'Game', rating: 4.7 },
    { id: 2, title: 'Jujutsu Kaisen', type: 'Anime', rating: 4.7 },
    { id: 3, title: 'Dune: Part Two', type: 'Film', rating: 4.5 },
    { id: 4, title: 'Spy x Family', type: 'Anime', rating: 4.6 },
  ];

  const [progress, setProgress] = useState(30); // Simulated progress
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText || rating === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      alert('Review submitted!');
      setReviewText('');
      setRating(0);
      setIsSubmitting(false);
    }, 500);
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

          <div className="flex items-center mb-6">
            <span className="text-yellow-500 font-bold mr-1">★</span>
            <span className="font-poppins text-gray-700">{media.rating}/5</span>
            <span className="mx-2">·</span>
            <span className="font-poppins text-gray-700">{media.year}</span>
          </div>

          <div>
            <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-full font-poppins">
              {media.status}
            </span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="font-raleway text-xl text-gray-800 mb-4">Track Progress</h3>
          <div className="mb-2">
            <label className="block text-sm font-poppins text-gray-700 mb-1">
              Progress: {progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="font-raleway text-xl text-gray-800 mb-4">Write a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label htmlFor="review" className="block text-sm font-poppins text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                id="review"
                rows="4"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What did you think about this?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-poppins text-gray-700 mb-1">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-xl ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-primary hover:bg-secondary text-white font-poppins rounded-lg transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>

        {/* More Like This */}
        <div className="mb-8">
          <h3 className="font-raleway text-xl text-gray-800 mb-4">More Like This</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedMedia.map((item) => (
              <MediaCard
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl="/api/placeholder/200/300"
                rating={item.rating}
                year={2023}
                type={item.type}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;