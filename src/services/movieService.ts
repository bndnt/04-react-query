import axios from "axios";
import type { Movie } from "../types/movie";
const BASE_URL = "https://api.themoviedb.org/3";
export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const response = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //   console.log(response.data.results);

  return response.data.results;
}
