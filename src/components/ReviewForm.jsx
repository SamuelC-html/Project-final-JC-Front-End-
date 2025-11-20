import { useState, useEffect } from "react";
import "../styles/ReviewForm.css";

function ReviewForm({ onCreated }) {
  const [games, setGames] = useState([]);
  const [gameTitle, setGameTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  // Cargar juegos del usuario
  const fetchGames = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/games", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setGames(data);
    } catch (error) {
      console.error("Error cargando juegos:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gameTitle || !comment.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ gameTitle, comment, rating })
      });

      const data = await res.json();

      if (res.ok) {
        setGameTitle("");
        setComment("");
        setRating(5);
        if (onCreated) onCreated();
      } else {
        console.error(data);
        alert("Error al crear la review.");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo crear la review.");
    }

    setLoading(false);
  };

  return (
    <div className="review-form-container">
      <h2>📝 Crear Review</h2>

      <form className="review-form" onSubmit={handleSubmit}>
        
        <div>
          <label>Juego de tu biblioteca</label>
          <select
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
          >
            <option value="">-- Selecciona un juego --</option>
            {games.map((g) => (
              <option key={g._id} value={g.titulo}>
                {g.titulo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Calificación</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5}>⭐ 5</option>
            <option value={4}>⭐ 4</option>
            <option value={3}>⭐ 3</option>
            <option value={2}>⭐ 2</option>
            <option value={1}>⭐ 1</option>
          </select>
        </div>

        <div>
          <label>Comentario</label>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu opinión del juego"
          />
        </div>

        <button disabled={loading} className="btn-review-save">
          {loading ? "Guardando..." : "Publicar Review"}
        </button>

      </form>
    </div>
  );
}

export default ReviewForm;