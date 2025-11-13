import { useState, useEffect } from "react";
import api from "../services/api";
import "./GameForm.css";

const GameForm = ({ selectedGame, onSave }) => {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    genero: "",
    plataforma: "",
    imagen: "",
  });

  useEffect(() => {
    if (selectedGame) {
      setForm(selectedGame);
    } else {
      resetForm();
    }
  }, [selectedGame]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedGame) {
        await api.put(`/games/${selectedGame._id}`, form);
        alert("Juego actualizado correctamente ✅");
      } else {
        await api.post("/games", form);
        alert("Juego agregado exitosamente 🎮");
      }
      onSave();
      resetForm();
    } catch (error) {
      console.error("Error al guardar el juego:", error.message);
      alert("Error al guardar el juego. Intenta nuevamente.");
    }
  };

  const resetForm = () => {
    setForm({
      titulo: "",
      descripcion: "",
      genero: "",
      plataforma: "",
      imagen: "",
    });
  };

  return (
    <div className="form-container">
      <h2>{selectedGame ? "Editar Juego" : "Agregar Juego"}</h2>

      <form onSubmit={handleSubmit} className="game-form">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <input
          type="text"
          name="genero"
          placeholder="Género"
          value={form.genero}
          onChange={handleChange}
        />

        <input
          type="text"
          name="plataforma"
          placeholder="Plataforma"
          value={form.plataforma}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen (opcional)"
          value={form.imagen}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit" className="btn-save">
            {selectedGame ? "💾 Actualizar" : "➕ Agregar"}
          </button>

          {selectedGame && (
            <button
              type="button"
              onClick={resetForm}
              className="btn-cancel"
            >
              ✖ Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GameForm;
