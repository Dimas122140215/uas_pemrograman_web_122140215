import { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import MediaSection from '../components/home/MediaSection';
import RecentReviewsSection from '../components/home/RecentReviewsSection';

// Temporary mock data until API is connected
const mockGames = [
  { id: 1, title: 'Elden Ring', imageUrl: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/d/v/5/large-elden-ring-video-game-posters-13x19-inch-300-gsm-paper-original-imagwquwwezmejzb.jpeg?q=20&crop=false', rating: 4.8, year: 2022 },
  { id: 2, title: 'Cyberpunk 2077', imageUrl: 'https://cdn.europosters.eu/image/1300/102945.jpg', rating: 4.1, year: 2020 },
  { id: 3, title: 'Red Dead Redemption 2', imageUrl: 'https://m.media-amazon.com/images/I/516zoHa0d0L._AC_UF1000,1000_QL80_.jpg', rating: 4.9, year: 2018 },
  { id: 4, title: 'Breath of the Wild', imageUrl: 'https://m.media-amazon.com/images/I/61gEETe5-wL._AC_UF894,1000_QL80_.jpg', rating: 4.9, year: 2017 },
  { id: 5, title: 'God of War Ragnarök', imageUrl: 'https://ae01.alicdn.com/kf/S2ee185e7f1064ed2bb9414f206475ce8B.jpg', rating: 4.7, year: 2022 }
];

const mockFilms = [
  { id: 1, title: 'Dune: Part Two', imageUrl: 'https://xl.movieposterdb.com/24_01/2024/15239678/xl_dune-part-two-movie-poster_e27e32f3.jpg', rating: 4.5, year: 2024 },
  { id: 2, title: 'Oppenheimer', imageUrl: 'https://upload.wikimedia.org/wikipedia/id/4/4a/Oppenheimer_%28film%29.jpg', rating: 4.7, year: 2023 },
  { id: 3, title: 'Everything Everywhere All at Once', imageUrl: 'https://upload.wikimedia.org/wikipedia/id/1/1e/Everything_Everywhere_All_at_Once.jpg', rating: 4.6, year: 2022 },
  { id: 4, title: 'Thunderbolts', imageUrl: 'https://cdn.marvel.com/content/1x/thunderboltsposter.jpeg', rating: 4.2, year: 2025 },
  { id: 5, title: 'Sinner', imageUrl: 'https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_.jpg', rating: 4.9, year: 2025 }
];

const mockAnime = [
  { id: 1, title: 'Attack on Titan: Final Season', imageUrl: 'https://cdn.europosters.eu/image/1300/216782.jpg', rating: 4.9, year: 2023 },
  { id: 2, title: 'Demon Slayer: Kimetsu no Yaiba', imageUrl: 'https://images-cdn.ubuy.co.id/634cbc08480a4356f856e6f3-clearly-uzui-tengen-and-his-wives-anime.jpg', rating: 4.8, year: 2019 },
  { id: 3, title: 'Jujutsu Kaisen', imageUrl: 'https://images-cdn.ubuy.co.id/633feb8bd279163476374ad1-japan-anime-manga-poster-jujutsu.jpg', rating: 4.7, year: 2020 },
  { id: 4, title: 'Chainsaw Man', imageUrl: 'https://m.media-amazon.com/images/I/81iZCUeRLXL.jpg', rating: 4.5, year: 2022 },
  { id: 5, title: 'Spy x Family', imageUrl: 'https://m.media-amazon.com/images/I/71hLhOtVm4L.jpg', rating: 4.6, year: 2022 }
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
    content: 'Elden Ring is a masterpiece. The open world is breathtaking and the combat is as challenging as ever.',
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
  const [games, setGames] = useState([]);
  const [films, setFilms] = useState([]);
  const [anime, setAnime] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
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
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <HeroSection />

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 font-poppins text-gray-600">Loading content...</p>
          </div>
        </div>
      )}

      {isError && (
        <div className="py-20 text-center">
          <h3 className="font-raleway text-xl text-red-600 mb-4">Failed to load content</h3>
          <p className="font-poppins text-gray-600 mb-4">There was a problem loading the latest media and reviews.</p>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-poppins"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && (
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
    </>
  );
};

export default Home;