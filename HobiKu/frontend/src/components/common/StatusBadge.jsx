import { useState } from 'react';

const StatusBadge = ({ status, onChange }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const cycleStatuses = () => {
    const statuses = ['Plan to Watch', 'Watching', 'Completed'];
    const currentIndex = statuses.indexOf(currentStatus);
    const newIndex = (currentIndex + 1) % statuses.length;
    const newStatus = statuses[newIndex];
    setCurrentStatus(newStatus);
    if (onChange) onChange(newStatus);
  };

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'Completed': return 'bg-green-500';
      case 'Watching':
      case 'Playing': return 'bg-primary';
      case 'Plan to Watch':
      case 'Plan to Play': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <span 
      className={`${getStatusColor()} text-white text-sm px-2 py-1 rounded-full font-poppins cursor-pointer`}
      onClick={cycleStatuses}
    >
      {currentStatus}
    </span>
  );
};

export default StatusBadge;