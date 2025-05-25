// src/pages/user/Profile.jsx
import { useState } from 'react';
import MediaCard from '../../components/common/MediaCard';

const Profile = () => {
  const user = {
    username: 'GamerX',
    email: 'gamerx@example.com',
    joined: '2022-03-15'
  };

  const allMedia = [
    {
      id: '1',
      title: 'Elden Ring',
      imageUrl: '/api/placeholder/200/300',
      status: 'Completed',
      type: 'Game'
    },
    {
      id: '2',
      title: 'Attack on Titan',
      imageUrl: '/api/placeholder/200/300',
      status: 'Watching',
      type: 'Anime'
    },
    {
      id: '3',
      title: 'Cyberpunk 2077',
      imageUrl: '/api/placeholder/200/300',
      status: 'Plan to Play',
      type: 'Game'
    },
    {
      id: '4',
      title: 'Oppenheimer',
      imageUrl: '/api/placeholder/200/300',
      status: 'Watching',
      type: 'Film'
    }
  ];

  const trackedItems = allMedia.filter(item => item.status !== 'Completed');
  const completedItems = allMedia.filter(item => item.status === 'Completed');

  const [activeTab, setActiveTab] = useState('tracked');

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="w-20 h-20 bg-lightBlue rounded-full flex items-center justify-center text-2xl font-bold text-secondary mb-4 md:mb-0 md:mr-6">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-raleway text-2xl text-gray-800">{user.username}</h2>
              <p className="font-poppins text-gray-600">{user.email}</p>
              <p className="font-poppins text-sm text-gray-500 mt-1">
                Joined: {new Date(user.joined).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="font-raleway text-lg text-gray-800 mb-2">Tracking</h3>
            <p className="font-poppins text-3xl text-primary">{trackedItems.length}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="font-raleway text-lg text-gray-800 mb-2">Completed</h3>
            <p className="font-poppins text-3xl text-primary">{completedItems.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <ul className="flex -mb-px space-x-8">
            <li>
              <button
                onClick={() => setActiveTab('tracked')}
                className={`font-poppins inline-block py-2 border-b-2 ${
                  activeTab === 'tracked'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Tracked
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('completed')}
                className={`font-poppins inline-block py-2 border-b-2 ${
                  activeTab === 'completed'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Completed
              </button>
            </li>
          </ul>
        </div>

        {/* Grid View */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(activeTab === 'tracked' ? trackedItems : completedItems).map((item) => (
              <MediaCard key={item.id} media={item} showProgress={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;