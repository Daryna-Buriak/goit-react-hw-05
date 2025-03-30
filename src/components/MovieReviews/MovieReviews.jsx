import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../movieService";
import { useEffect, useState } from "react";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results || []);
      } catch (error) {
        setError("Failed to load reviews");
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  if (isLoading) return <p>Loading reviews...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </div>
  );
}
