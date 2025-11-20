import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "../styles/ReviewList.css";

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Error cargando reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="review-grid">
      {reviews.map((r) => (
        <ReviewCard key={r._id} review={r} />
      ))}
    </div>
  );
}

export default ReviewList;