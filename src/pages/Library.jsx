import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameForm from "../components/GameForm";
import GameList from "../components/GameList";
import SearchBar from "../components/SearchBar"; // ← nuevo
import "../styles/LibraryPage.css";
import "../styles/PageLayout.css";

function LibraryPage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [query, setQuery] = useState(""); // ← estado del buscador
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleEdit = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = () => {
    setSelectedGame(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
    
    <div className="page-layout">
      <h1 className="main-title"></h1>

      <SearchBar query={query} onChange={setQuery} /> {/* Buscador */}

      <GameForm selectedGame={selectedGame} onSave={handleSave} />

      <GameList key={refreshKey} onEdit={handleEdit} query={query} />
    </div>
    </>
    
  );
}

export default LibraryPage;
