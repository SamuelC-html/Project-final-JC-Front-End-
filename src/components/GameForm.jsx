import { useState, useEffect } from "react";
import "./GameForm.css";

function GameForm({ selectedGame, onSave }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [completado, setCompletado] = useState(false);
  const [horasJugadas, setHorasJugadas] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    if (selectedGame) {
      setTitulo(selectedGame.titulo);
      setDescripcion(selectedGame.descripcion || "");
      setPlataforma(selectedGame.plataforma || "");
      setCompletado(selectedGame.completado || false);
      setHorasJugadas(selectedGame.horasJugadas || "");
      setCalificacion(selectedGame.calificacion || 0);
      setImagen(selectedGame.imagen || "");
    } else {
      clearForm();
    }
  }, [selectedGame]);

  const clearForm = () => {
    setTitulo("");
    setDescripcion("");
    setPlataforma("");
    setCompletado(false);
    setHorasJugadas("");
    setCalificacion(0);
    setImagen("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("Debes iniciar sesión.");

    const method = selectedGame ? "PUT" : "POST";
    const url = selectedGame
      ? `http://localhost:3000/api/games/${selectedGame._id}`
      : `http://localhost:3000/api/games`;

    const body = {
      titulo,
      descripcion,
      plataforma,
      completado,
      horasJugadas: Number(horasJugadas),
      calificacion: Number(calificacion),
      imagen,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al guardar el juego");

      clearForm();
      onSave();
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Hubo un problema al guardar el juego.");
    }
  };

  return (
    <div className="game-form-container">
      <h2 className="form-title">
        {selectedGame ? "Editar juego" : "Agregar juego"}
      </h2>

      <form onSubmit={handleSubmit} className="game-form">
        <label className="form-label">Título *</label>
        <input
          className="form-input"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label className="form-label">Descripción</label>
        <textarea
          className="form-textarea"
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <label className="form-label">Plataforma</label>
        <input
          className="form-input"
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
        />

        <label className="form-checkbox">
          Completado
          <input
            type="checkbox"
            checked={completado}
            onChange={(e) => setCompletado(e.target.checked)}
          />
        </label>

        <label className="form-label">Horas jugadas</label>
        <input
          className="form-input"
          type="number"
          min="0"
          value={horasJugadas}
          onChange={(e) => setHorasJugadas(e.target.value)}
        />

        <label className="form-label">Calificación (0 a 5)</label>
        <input
          className="form-input"
          type="number"
          min="0"
          max="5"
          step="0.5"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
        />

        <label className="form-label">URL de imagen</label>
        <input
          className="form-input"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        <button type="submit" className="button-primary form-submit">
          {selectedGame ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
  );
}

export default GameForm;
