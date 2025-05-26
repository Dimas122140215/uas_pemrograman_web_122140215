// src/components/media/ProgressTracker.jsx
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateProgress } from '../../store/trackingSlice';

const ProgressTracker = ({ media }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    dispatch(updateProgress({ id: media.id, newProgress: newValue }));
  };

  return (
    <div className="mt-3">
      <label className="block text-sm font-poppins text-gray-700 mb-1">
        Progress: {media.progress}%
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={media.progress}
        onChange={handleChange}
        className="w-full accent-primary"
      />
      
      <div className="flex justify-between text-xs font-poppins text-gray-500 mt-1">
        <span>0%</span>
        <span>{media.progress}%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

ProgressTracker.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired
};

export default ProgressTracker;