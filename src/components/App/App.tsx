import { useQuery, keepPreviousData } from "@tanstack/react-query";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./App.module.css";
// import toast, { Toaster } from "react-hot-toast";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";

function App() {
  // const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const { data, isLoading, isError, isSuccess, error, isPlaceholderData } =
    useQuery({
      queryKey: ["movies", query, page],
      queryFn: () => fetchMovies(query, page),
      enabled: query.trim() !== "",
      placeholderData: keepPreviousData,
      staleTime: 1000,
    });
  const handleSearch = async (query: string) => {
    setQuery(query);
    setPage(1);

    // try {
    //   setLoading(true);
    //   setError(null);
    //   setMovies([]);
    //   const data = await fetchMovies(query);
    //   // Сортировка по рейтингу: от высоких к низким
    //   const sortedByRating = data.sort((a, b) => {
    //     // Если рейтинг отсутствует, считаем как 0
    //     const ratingA = a.vote_average || 0;
    //     const ratingB = b.vote_average || 0;
    //     return ratingB - ratingA; // от высокого к низкому
    //   });
    //   setMovies(sortedByRating);
    //   if (sortedByRating.length === 0) {
    //     toast.error("No movies found for your request.");
    //   }
    // } catch (err) {
    //   if (axios.isAxiosError(err)) {
    //     setError(err.response?.data?.status_message || err.message);
    //   } else if (err instanceof Error) {
    //     setError(err.message);
    //   } else {
    //     setError("Unknown error occurred");
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };
  // const handlePageChange = ({ selected }: { selected: number }) => {
  //   setPage(selected + 1);
  // };
  const openModal = (movie: Movie) => {
    setCurrentMovie(movie);
  };

  const closeModal = () => {
    setCurrentMovie(null);
  };
  useEffect(() => {
    if (isSuccess && !isPlaceholderData && data?.results.length === 0) {
      toast.error(`No movies found for your request "${query}" 😕`);
    }
  }, [isSuccess, isPlaceholderData, data, query]);
  const totalPages = data?.total_pages ?? 0;
  return (
    <div>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />

      {isSuccess && (
        <>
          {data?.results.length > 0 && (
            <>
              <MovieGrid movies={data.results} onSelect={openModal} />
              {totalPages > 1 && (
                <ReactPaginate
                  breakLabel="..."
                  onPageChange={({ selected }) => setPage(selected + 1)}
                  pageRangeDisplayed={5}
                  pageCount={totalPages}
                  nextLabel="→"
                  previousLabel="←"
                  forcePage={page - 1}
                  containerClassName={css.pagination}
                  activeClassName={css.active}
                  marginPagesDisplayed={1}
                />
              )}
            </>
          )}
        </>
      )}

      {isError && <ErrorMessage error={error.message} />}
      {currentMovie && <MovieModal movie={currentMovie} onClose={closeModal} />}
    </div>
  );
}

export default App;
