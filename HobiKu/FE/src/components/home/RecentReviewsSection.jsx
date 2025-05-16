import { Link } from 'react-router-dom';
import { Star, User } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
      <div className="flex items-start">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          {review.userAvatar ? (
            <img 
              src={review.userAvatar} 
              alt={review.username} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User size={24} className="text-gray-500" />
          )}
        </div>
        
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">{review.username}</h4>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="ml-1 text-sm">{review.rating}/5</span>
            </div>
          </div>
          <Link 
            to={`/media/${review.mediaType.toLowerCase()}/${review.mediaId}`} 
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {review.mediaTitle}
          </Link>
        </div>
      </div>
      
      <p className="mt-3 text-gray-600 text-sm line-clamp-3">
        {review.content}
      </p>
      
      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 mt-auto">
        {new Date(review.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

const RecentReviewsSection = ({ reviews = [] }) => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Reviews</h2>
          <Link 
            to="/reviews" 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All Reviews
          </Link>
        </div>
        
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <p className="text-lg">No reviews yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentReviewsSection;