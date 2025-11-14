import { useState, useEffect } from "react";

function GameList({ onEdit }) {
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
    const confirmDelete = confirm("¿Eliminar este juego?");
    if (!confirmDelete) return;

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
      console.error("❌ Error al eliminar:", error);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {games.length === 0 ? (
        <p style={{ textAlign: "center", color: "#999" }}>
          No hay juegos en tu biblioteca.
        </p>
      ) : (
        games.map((game) => (
          <div
            key={game._id}
            style={{
              backgroundColor: "#111",
              border: "2px solid #00ff66",
              borderRadius: "10px",
              padding: "15px",
              color: "#0f0",
              textAlign: "center",
            }}
          >
            {game.imagen && (
              <img
                src={game.imagen}
                alt={game.titulo}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              />
            )}

            <h3>{game.titulo}</h3>
            <p>{game.descripcion}</p>
            <p>
              <strong>Plataforma:</strong> {game.plataforma || "N/A"}
            </p>
            <p>
              <strong>Horas:</strong> {game.horasJugadas || 0}
            </p>
            <p>
              <strong>⭐ Calificación:</strong> {game.calificacion || 0}
            </p>
            <p>
              <strong>Completado:</strong> {game.completado ? "✅ Sí" : "❌ No"}
            </p>

            <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => onEdit(game)}>Editar</button>
              <button onClick={() => handleDelete(game._id)}>Eliminar</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default GameList;