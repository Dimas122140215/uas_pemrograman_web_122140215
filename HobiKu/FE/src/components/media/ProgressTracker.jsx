// src/components/media/ProgressTracker.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';

const ProgressTracker = ({ media, onUpdateProgress }) => {
  const [progress, setProgress] = useState(media.progress || 0);
  const total = media.total || 100;

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setProgress(newValue);
    if (onUpdateProgress) {
      onUpdateProgress(newValue);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 className="font-raleway text-xl text-gray-800 mb-4">Track Progress</h3>
      
      <div className="mb-2">
        <label className="block text-sm font-poppins text-gray-700 mb-1">
          Progress: {progress}%
        </label>
        <input
          type="range"
          min="0"
          max={total}
          value={progress}
          onChange={handleChange}
          className="w-full accent-primary"
        />
      </div>

      {/* ✅ Now we use 'total' */}
      <div className="flex justify-between text-sm font-poppins text-gray-500 mt-1">
        <span>0%</span>
        <span>{progress}%</span>
        <span>100%</span>
      </div>

      {/* Optional: Show numeric progress */}
      <p className="text-right text-xs font-poppins text-gray-400 mt-1">
        Episode {progress} / {total}
      </p>
    </div>
  );
};

ProgressTracker.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    progress: PropTypes.number,
    total: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateProgress: PropTypes.func,
};

export default ProgressTracker;