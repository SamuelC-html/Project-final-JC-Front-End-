import { useState, useEffect, useMemo } from "react";
import "./GameList.css";

function GameList({ onEdit, query }) {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3000/api/games", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setGames(data);
    } catch (error) {
      console.error("❌ Error al obtener juegos:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este juego?")) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/api/games/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setGames((prev) => prev.filter((game) => game._id !== id));
      }
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  // 🔍 Filtrado limpio y eficiente
  const filteredGames = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return games;
    return games.filter((game) =>
      game.titulo.toLowerCase().includes(q)
    );
  }, [games, query]);

  return (
    <div className="game-list-container">
      {filteredGames.length === 0 ? (
        <p className="empty-list-text">No hay juegos que coincidan con la búsqueda.</p>
      ) : (
        filteredGames.map((game) => (
          <div key={game._id} className="game-card">
            {game.imagen && (
              <img src={game.imagen} alt={game.titulo} className="game-image" />
            )}

            <h3 className="game-title">{game.titulo}</h3>

            {game.descripcion && (
              <p className="game-description">{game.descripcion}</p>
            )}

            <p className="game-detail">
              <strong>Plataforma:</strong> {game.plataforma || "N/A"}
            </p>
            <p className="game-detail">
              <strong>Horas jugadas:</strong> {game.horasJugadas || 0}
            </p>
            <p className="game-detail">
              <strong>Calificación:</strong> ⭐ {game.calificacion || 0}
            </p>
            <p className="game-detail">
              <strong>Completado:</strong>{" "}
              {game.completado ? "✅ Sí" : "❌ No"}
            </p>

            <div className="game-actions">
              <button
                className="button-primary"
                onClick={() => onEdit(game)}
              >
                Editar
              </button>

              <button
                className="button-primary button-danger"
                onClick={() => handleDelete(game._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default GameList;
