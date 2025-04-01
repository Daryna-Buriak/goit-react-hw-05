import css from "./MovieDetailsPage.module.css";
import {
  fetchMovieById,
  fetchMovieReviews,
  fetchMovieCast,
} from "../../movieService";
import { NavLink, Outlet, useParams } from "react-router";
import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import MovieInfo from "../../components/MovieInfo/MovieInfo";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkRef = useRef(location.state?.from || "/");
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    if (location.state?.from) {
      backLinkRef.current = location.state.from;
    }
  }, [location.state?.from]);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovie();
    if (movieId) {
      getMovie();
    }
  }, [movieId]);

  const handleCastClick = async () => {
    if (!showCast) {
      try {
        const castData = await fetchMovieCast(movieId);
        setCast(castData);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    }
    setShowCast(!showCast);
  };

  const handleReviewsClick = async () => {
    if (!showReviews) {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    setShowReviews(!showReviews);
  };

  if (!movie) return <b>Movie not found...</b>;

  return (
    <div>
      <button
        className={css.backBttn}
        onClick={() => navigate(backLinkRef.current)}
      >
        ← Go Back
      </button>

      {isLoading && <b>Loading...</b>}
      {error && <b>Error...</b>}

      {movie && <MovieInfo movie={movie} />}

      <div className={css.addInfoBlock}>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>

        <Suspense fallback={<p>Loading...</p>}>
          <div>
            <Outlet />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
