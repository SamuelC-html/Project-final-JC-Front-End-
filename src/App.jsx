import { useState } from "react";
import GameList from "./components/GameList";
import GameForm from "./components/GameForm";
import "./App.css"; // opcional, por si quieres estilos globales

function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: "smooth" }); // sube al formulario
  };

  const handleSave = () => {
    setSelectedGame(null);
    setRefreshKey((prev) => prev + 1); // fuerza que GameList recargue
  };

  return (
    <div className="app-container">
      <h1 className="main-title">🎮 Mi Biblioteca de Videojuegos</h1>

      <GameForm selectedGame={selectedGame} onSave={handleSave} />

      <GameList key={refreshKey} onEdit={handleEdit} />
    </div>
  );
}

export default App;
