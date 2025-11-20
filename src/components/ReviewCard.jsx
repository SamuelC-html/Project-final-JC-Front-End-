import "../styles/ReviewCard.css";

function ReviewCard({ review }) {
  const username = review.username || "Usuario";
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="review-card">
      {/* Usuario */}
      <div className="review-user">
        {review.avatar ? (
          <img src={review.avatar} className="review-avatar" />
        ) : (
          <div className="review-avatar-initial">{initial}</div>
        )}

        <div className="review-user-info">
          <p className="review-username">{review.username}</p>
          <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Contenido */}
      <h3 className="review-game">{review.gameTitle}</h3>
      <p className="review-comment">{review.comment}</p>

      {/* Estrellas */}
      <p className="review-rating">⭐ {review.rating}/5</p>
    </div>
  );
}

export default ReviewCard;