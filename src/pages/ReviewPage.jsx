import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import "../styles/Review.css";

function ReviewsPage() {
  return (
    <div className="reviews-page">
      <div className="reviews-left">
        <ReviewForm />
      </div>

      <div className="reviews-right">
        <ReviewList />
      </div>
    </div>
  );
}

export default ReviewsPage;
