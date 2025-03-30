import css from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../movieService";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && <b>Loading...</b>}
      {error && <b>{error}</b>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
