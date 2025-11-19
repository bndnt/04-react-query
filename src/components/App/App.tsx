import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import axios from "axios";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      setMovies([]);
      const data = await fetchMovies(query);
      // Сортировка по рейтингу: от высоких к низким
      const sortedByRating = data.sort((a, b) => {
        // Если рейтинг отсутствует, считаем как 0
        const ratingA = a.vote_average || 0;
        const ratingB = b.vote_average || 0;
        return ratingB - ratingA; // от высокого к низкому
      });

      setMovies(sortedByRating);

      if (sortedByRating.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.status_message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  const openModal = (movie: Movie) => {
    setCurrentMovie(movie);
  };

  const closeModal = () => {
    setCurrentMovie(null);
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={(movie) => openModal(movie)} />
      )}
      {error && <ErrorMessage error={error} />}
      {currentMovie && <MovieModal movie={currentMovie} onClose={closeModal} />}
    </div>
  );
}

export default App;
