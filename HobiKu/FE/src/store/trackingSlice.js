import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trackedMedia: [
    {
      id: '1',
      title: 'Elden Ring',
      type: 'Game',
      coverImage: '/api/placeholder/200/300',
      rating: 4.8,
      status: 'Watching',
      progress: 75,
      total: 100
    },
    {
      id: '2',
      title: 'Attack on Titan Final Season',
      type: 'Anime',
      coverImage: '/api/placeholder/200/300',
      rating: 4.9,
      status: 'Watching',
      progress: 60,
      total: 25
    }
  ],
  completedMedia: [
    {
      id: '3',
      title: 'Demon Slayer',
      type: 'Anime',
      coverImage: '/api/placeholder/200/300',
      rating: 4.8,
      status: 'Completed',
      progress: 100,
      total: 26
    }
  ],
  planToWatchMedia: [
    {
      id: '4',
      title: 'Oppenheimer',
      type: 'Film',
      coverImage: '/api/placeholder/200/300',
      rating: 4.7,
      status: 'Plan to Watch',
      progress: 0,
      total: 1
    }
  ]
};

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    updateProgress: (state, action) => {
      const { id, newProgress } = action.payload;
      const media = state.trackedMedia.find(item => item.id === id);
      if (media) {
        media.progress = newProgress;
      }
    },
    addMedia: (state, action) => {
      const newMedia = {
        ...action.payload,
        status: 'Watching',
        progress: 0,
        total: 100
      };
      state.trackedMedia.push(newMedia);
    },
    removeMedia: (state, action) => {
      const id = action.payload;
      state.trackedMedia = state.trackedMedia.filter(media => media.id !== id);
      state.planToWatchMedia = state.planToWatchMedia.filter(media => media.id !== id);
    },
    markAsCompleted: (state, action) => {
      const id = action.payload;
      const media = state.trackedMedia.find(item => item.id === id);
      if (media) {
        media.status = 'Completed';
        state.completedMedia.push(media);
        state.trackedMedia = state.trackedMedia.filter(item => item.id !== id);
      }
    }
  }
});

export default trackingSlice.reducer;
export const { updateProgress, addMedia, removeMedia, markAsCompleted } = trackingSlice.actions;