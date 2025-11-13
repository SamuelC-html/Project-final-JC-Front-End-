import { useEffect, useState } from "react";
import api from "../services/api";
import "./GameList.css"; // 👈 Importamos los estilos

const GameList = ({ onEdit }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await api.get("/games");
      setGames(res.data);
    } catch (error) {
      console.error("Error al obtener los juegos:", error.message);
    }
  };

  const deleteGame = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este juego?")) return;
    try {
      await api.delete(`/games/${id}`);
      fetchGames();
    } catch (error) {
      console.error("Error al eliminar el juego:", error.message);
    }
  };

  return (
    <div className="games-container">
      <h2 className="games-title">🎮 Mi Biblioteca de Juegos</h2>

      <div className="games-grid">
        {games.length === 0 ? (
          <p>No hay juegos agregados todavía.</p>
        ) : (
          games.map((game) => (
            <div key={game._id} className="game-card">
              {game.imagen && (
                <img
                  src={game.imagen}
                  alt={game.titulo}
                  className="game-image"
                />
              )}
              <h3>{game.titulo}</h3>
              <p>{game.descripcion}</p>
              <p><b>Género:</b> {game.genero}</p>
              <p><b>Plataforma:</b> {game.plataforma}</p>

              <div className="game-buttons">
                <button
                  onClick={() => onEdit(game)}
                  className="btn-edit"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => deleteGame(game._id)}
                  className="btn-delete"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameList;
