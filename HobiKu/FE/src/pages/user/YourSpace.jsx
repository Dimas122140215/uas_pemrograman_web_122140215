import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MediaCard from '../../components/common/MediaCard';
import ProgressTracker from '../../components/media/ProgressTracker';
import { updateProgress, markAsCompleted } from '../../store/trackingSlice';

const YourSpace = () => {
  const [activeTab, setActiveTab] = useState('Tracked');

  const trackedMedia = useSelector((state) => state.tracking.trackedMedia);
  const completedMedia = useSelector((state) => state.tracking.completedMedia);
  const planToWatchMedia = useSelector((state) => state.tracking.planToWatchMedia);

  const dispatch = useDispatch();

  const handleUpdateProgress = (id, newProgress) => {
    dispatch(updateProgress({ id, newProgress }));
  };

  const handleMarkAsCompleted = (id) => {
    dispatch(markAsCompleted(id));
  };

  const getFilteredItems = () => {
    switch (activeTab) {
      case 'Tracked':
        return trackedMedia;
      case 'Completed':
        return completedMedia;
      case 'Plan to Watch':
        return planToWatchMedia;
      default:
        return trackedMedia;
    }
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <ul className="flex space-x-8 font-poppins text-sm md:text-base">
            {['Tracked', 'Completed', 'Plan to Watch'].map(tab => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`inline-block py-2 px-1 border-b-2 ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Grid of Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <MediaCard key={item.id} media={item}>
                {item.status !== 'Completed' && (
                  <>
                    <ProgressTracker 
                      media={item}
                      onUpdateProgress={(newVal) => handleUpdateProgress(item.id, newVal)}
                    />

                    <button
                      onClick={() => handleMarkAsCompleted(item.id)}
                      className="mt-2 text-xs font-poppins text-green-600 underline"
                    >
                      Mark as Completed
                    </button>
                  </>
                )}
              </MediaCard>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 font-poppins mt-4">No items in this category.</p>
          )}
        </div>

        {/* Add New Media Button */}
        <div className="flex justify-center mt-6">
          <button className="px-6 py-2 bg-lightBlue text-secondary rounded-lg font-poppins font-medium hover:bg-primary hover:text-white transition-colors">
            + Add New Media
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourSpace;