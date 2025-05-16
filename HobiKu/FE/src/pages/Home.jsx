import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import HeroSection from '../components/home/HeroSection';
import MediaSection from '../components/home/MediaSection';
import RecentReviewsSection from '../components/home/RecentReviewsSection';

// Temporary mock data until API is connected
const mockGames = [
  { 
    id: 1, 
    title: 'Elden Ring', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.8, 
    year: 2022 
  },
  { 
    id: 2, 
    title: 'Cyberpunk 2077', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.1, 
    year: 2020 
  },
  { 
    id: 3, 
    title: 'Red Dead Redemption 2', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.9, 
    year: 2018 
  },
  { 
    id: 4, 
    title: 'The Legend of Zelda: Breath of the Wild', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.9, 
    year: 2017 
  },
  { 
    id: 5, 
    title: 'God of War Ragnarök', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.7, 
    year: 2022 
  }
];

const mockFilms = [
  { 
    id: 1, 
    title: 'Dune: Part Two', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.5, 
    year: 2024 
  },
  { 
    id: 2, 
    title: 'Oppenheimer', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.7, 
    year: 2023 
  },
  { 
    id: 3, 
    title: 'Everything Everywhere All at Once', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.6, 
    year: 2022 
  },
  { 
    id: 4, 
    title: 'Poor Things', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.3, 
    year: 2023 
  },
  { 
    id: 5, 
    title: 'Past Lives', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.4, 
    year: 2023 
  }
];

const mockAnime = [
  { 
    id: 1, 
    title: 'Attack on Titan: Final Season', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.9, 
    year: 2023 
  },
  { 
    id: 2, 
    title: 'Demon Slayer: Kimetsu no Yaiba', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.8, 
    year: 2019 
  },
  { 
    id: 3, 
    title: 'Jujutsu Kaisen', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.7, 
    year: 2020 
  },
  { 
    id: 4, 
    title: 'Chainsaw Man', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.5, 
    year: 2022 
  },
  { 
    id: 5, 
    title: 'Spy x Family', 
    imageUrl: '/api/placeholder/200/300', 
    rating: 4.6, 
    year: 2022 
  }
];

const mockReviews = [
  {
    id: 1,
    username: 'GamerX',
    userAvatar: null,
    mediaTitle: 'Elden Ring',
    mediaId: 1,
    mediaType: 'Game',
    rating: 5,
    content: 'Elden Ring is a masterpiece. The open world is breathtaking and the combat is as challenging as ever. Definitely FromSoftware\'s magnum opus.',
    createdAt: '2023-05-10T14:30:00Z'
  },
  {
    id: 2,
    username: 'CinemaLover',
    userAvatar: null,
    mediaTitle: 'Oppenheimer',
    mediaId: 2,
    mediaType: 'Film',
    rating: 4.5,
    content: 'Nolan delivers again with this historical epic. Cillian Murphy\'s performance is captivating and the cinematography is outstanding.',
    createdAt: '2023-08-15T09:45:00Z'
  },
  {
    id: 3,
    username: 'AnimeFan01',
    userAvatar: null,
    mediaTitle: 'Attack on Titan: Final Season',
    mediaId: 1,
    mediaType: 'Anime',
    rating: 5,
    content: 'A perfect conclusion to one of the greatest anime series of all time. The animation, storytelling, and character development are all top-notch.',
    createdAt: '2023-12-03T18:20:00Z'
  }
];

const Home = () => {
  // In a real application, we would fetch this data from the API
  const [games, setGames] = useState([]);
  const [films, setFilms] = useState([]);
  const [anime, setAnime] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // const gamesResponse = await api.get('/media/games/trending');
        // const filmsResponse = await api.get('/media/films/trending');
        // const animeResponse = await api.get('/media/anime/trending');
        // const reviewsResponse = await api.get('/reviews/recent');

        // Using mock data instead
        setTimeout(() => {
          setGames(mockGames);
          setFilms(mockFilms);
          setAnime(mockAnime);
          setReviews(mockReviews);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <HeroSection />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading content...</p>
          </div>
        </div>
      ) : (
        <>
          <MediaSection 
            title="Trending Games" 
            mediaType="Game" 
            items={games} 
            viewAllLink="/media/games" 
          />
          
          <MediaSection 
            title="Popular Films" 
            mediaType="Film" 
            items={films}
            viewAllLink="/media/films" 
          />
          
          <MediaSection 
            title="Top Anime" 
            mediaType="Anime" 
            items={anime}
            viewAllLink="/media/anime" 
          />
          
          <RecentReviewsSection reviews={reviews} />
        </>
      )}
    </Layout>
  );
};

export default Home;