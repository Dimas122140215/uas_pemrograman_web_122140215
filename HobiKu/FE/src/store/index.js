import { configureStore } from '@reduxjs/toolkit';
import trackingReducer from './trackingSlice';

export const store = configureStore({
  reducer: {
    tracking: trackingReducer,
  },
});