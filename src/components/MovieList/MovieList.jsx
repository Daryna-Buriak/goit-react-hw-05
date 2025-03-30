import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();

  if (movies.length === 0) {
    return <p>No movies found</p>;
  }

  return (
    <ul className={css.moviesList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.moviesItem}>
          <Link to={`/movie/${movie.id}`} state={{ from: location }}>
            <p className={css.movieTitle}>{movie.title}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={css.movieposter}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
