// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import MediaSection from '../components/home/MediaSection';

const mockGames = [
  {
    id: '1',
    title: 'Elden Ring',
    type: 'Game',
    coverImage: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/d/v/5/large-elden-ring-video-game-posters-13x19-inch-300-gsm-paper-original-imagwquwwezmejzb.jpeg?q=20&crop=false',
    rating: 4.8,
    status: 'Playing',
    progress: 75,
    total: 100
  },
  {
    id: '2',
    title: 'Cyberpunk 2077',
    type: 'Game',
    coverImage: 'https://cdn.europosters.eu/image/1300/102945.jpg',
    rating: 4.1,
    status: 'Plan to Play',
    progress: 0,
    total: 100
  }
];

const mockFilms = [
  {
    id: '1',
    title: 'Oppenheimer',
    type: 'Film',
    coverImage: 'https://upload.wikimedia.org/wikipedia/id/4/4a/Oppenheimer_%28film%29.jpg',
    rating: 4.7,
    status: 'Watching'
  }
];

const mockAnime = [
  {
    id: '1',
    title: 'Attack on Titan Final Season',
    type: 'Anime',
    coverImage: 'https://cdn.europosters.eu/image/1300/216782.jpg',
    rating: 4.9,
    status: 'Completed'
  }
];

const Home = () => {
  const [games, setGames] = useState([]);
  const [films, setFilms] = useState([]);
  const [anime, setAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setGames(mockGames);
      setFilms(mockFilms);
      setAnime(mockAnime);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <HeroSection />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin h-12 w-12 border-t-2 border-primary mx-auto"></div>
            <p className="mt-4 font-poppins text-gray-600">Loading content...</p>
          </div>
        </div>
      ) : (
        <>
          <MediaSection 
            title="Trending Games" 
            items={games} 
            viewAllLink="/media/games" 
          />
          
          <MediaSection 
            title="Popular Films" 
            items={films} 
            viewAllLink="/media/films" 
          />
          
          <MediaSection 
            title="Top Anime" 
            items={anime} 
            viewAllLink="/media/anime" 
          />
        </>
      )}
    </>
  );
};

export default Home;