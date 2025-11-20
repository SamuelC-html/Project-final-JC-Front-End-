const API_URL = "http://localhost:3000/api/reviews";

// Crear review
export async function createReview(text, imageUrl = "", gameId) {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text, imageUrl, gameId }),
  });

  return res.json();
}

// Obtener todas las reviews
export async function getAllReviews() {
  const res = await fetch(`${API_URL}/all`);
  return res.json();
}