import axios from 'axios';

// Use environment variable or fallback to local dev server
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:6543', // Replace with your Python backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Fetch trending media (for Home)
export const getTrendingGames = async () => {
  try {
    const response = await apiClient.get('/media/games');
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

// Fetch trending films (for Home)
export const getTrendingFilms = async () => {
  try {
    const response = await apiClient.get('/media/films');
    return response.data;
  } catch (error) {
    console.error('Error fetching films:', error);
    return [];
  }
};

// Fetch trending anime (for Home)
export const getTrendingAnime = async () => {
  try {
    const response = await apiClient.get('/media/anime');
    return response.data;
  } catch (error) {
    console.error('Error fetching anime:', error);
    return [];
  }
};

// Update media progress (used in YourSpace)
export const updateMediaProgress = async (type, id, progress) => {
  try {
    const response = await apiClient.post(`/media/${type}/${id}/progress`, { progress });
    return response.data;
  } catch (error) {
    console.error('Failed to update progress:', error);
    return null;
  }
};

// Submit review for media
export const submitMediaReview = async (type, id, reviewData) => {
  try {
    const response = await apiClient.post(`/media/${type}/${id}/review`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Failed to submit review:', error);
    return null;
  }
};