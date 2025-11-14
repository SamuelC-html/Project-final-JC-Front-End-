import { useState, useEffect } from "react";

function GameForm({ selectedGame, onSave }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [completado, setCompletado] = useState(false);
  const [horasJugadas, setHorasJugadas] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [imagen, setImagen] = useState("");

  // Si llega un juego para editar, llenar el formulario
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
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#111",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "500px",
        margin: "20px auto",
        border: "2px solid #00ff66",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#00ff66" }}>
        {selectedGame ? "Editar juego" : "Agregar juego"}
      </h2>

      <label>Título *</label>
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <label>Descripción</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows={3}
        style={{
          backgroundColor: "#111",
          border: "1px solid #00ff66",
          color: "#0f0",
          borderRadius: "5px",
          padding: "10px",
          width: "100%",
        }}
      />

      <label>Plataforma</label>
      <input
        value={plataforma}
        onChange={(e) => setPlataforma(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={completado}
          onChange={(e) => setCompletado(e.target.checked)}
          style={{ marginRight: "8px" }}
        />
        Completado
      </label>

      <label>Horas jugadas</label>
      <input
        type="number"
        min="0"
        value={horasJugadas}
        onChange={(e) => setHorasJugadas(e.target.value)}
      />

      <label>Calificación (0 a 5 estrellas)</label>
      <input
        type="number"
        min="0"
        max="5"
        step="0.5"
        value={calificacion}
        onChange={(e) => setCalificacion(e.target.value)}
      />

      <label>URL de imagen</label>
      <input value={imagen} onChange={(e) => setImagen(e.target.value)} />

      <button type="submit" style={{ marginTop: "15px" }}>
        {selectedGame ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}

export default GameForm;
