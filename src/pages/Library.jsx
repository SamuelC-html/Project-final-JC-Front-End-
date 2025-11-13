import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameForm from "../components/GameForm";
import GameList from "../components/GameList";
import "../styles/LibraryPage.css";

function LibraryPage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  // 🔐 Verificar si el usuario está logueado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // si no hay token, redirige
    }
  }, [navigate]);

  const handleEdit = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = () => {
    setSelectedGame(null);
    setRefreshKey((prev) => prev + 1); // fuerza recarga
  };

  return (
    <div className="app-container">
      <h1 className="main-title">🎮 Mi Biblioteca de Videojuegos</h1>

      <GameForm selectedGame={selectedGame} onSave={handleSave} />

      <GameList key={refreshKey} onEdit={handleEdit} />
    </div>
  );
}

export default LibraryPage;