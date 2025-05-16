import { Link } from 'react-router-dom';
import { Star, User } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 flex flex-col h-full">
      {/* Author Info */}
      <div className="flex items-start">
        <div className="w-12 h-12 bg-lightBlue rounded-full flex items-center justify-center flex-shrink-0">
          {review.userAvatar ? (
            <img 
              src={review.userAvatar} 
              alt={review.username} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User size={24} className="text-secondary" />
          )}
        </div>
        
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-poppins font-semibold text-gray-800">{review.username}</h4>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="ml-1 text-sm font-poppins text-gray-600">
                {review.rating}/5
              </span>
            </div>
          </div>
          <Link 
            to={`/media/${review.mediaType.toLowerCase()}/${review.mediaId}`} 
            className="font-poppins text-sm text-primary hover:text-secondary font-medium transition-colors"
          >
            {review.mediaTitle}
          </Link>
        </div>
      </div>
      
      {/* Review Content */}
      <p className="mt-3 font-poppins text-gray-600 text-sm line-clamp-3">
        {review.content}
      </p>
      
      {/* Date Footer */}
      <div className="mt-auto pt-3 border-t border-gray-100 text-xs font-poppins text-gray-400">
        {new Date(review.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

const RecentReviewsSection = ({ reviews = [] }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-raleway text-2xl md:text-3xl font-bold text-gray-900">Recent Reviews</h2>
          <Link 
            to="/reviews" 
            className="font-poppins text-primary hover:text-secondary font-medium transition-colors"
          >
            View All Reviews
          </Link>
        </div>
        
        {/* Empty or Grid State */}
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <p className="font-poppins text-lg">No reviews yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentReviewsSection;