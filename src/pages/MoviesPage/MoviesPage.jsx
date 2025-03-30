import css from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../movieService";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../movieService";
import Search from "../../components/Search/Search";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [debouncedQuery] = useDebounce(query, 300);

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (query) {
      async function getMovies() {
        try {
          setIsLoading(true);
          setError(false);
          const data = await searchMovies(query);
          setMovies(data);
        } catch {
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }

      getMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {error && <b>Whoops there was an error, please try again</b>}
      <Search onSubmit={handleSubmit} />
      {filteredMovies.length > 0 && <MovieList movies={filteredMovies} />}
      {isLoading && <b>Loading movies...</b>}
      {debouncedQuery && filteredMovies.length === 0 && <p>No movies found.</p>}
    </div>
  );
}
