import { useEffect, useState } from "react";
import api from "../api/axios"; // IMPORTANTE: usar tu axios configurado
import "../styles/Profile.css";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [uploading, setUploading] = useState(false);

  // Obtener el perfil del backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data.user);
        setDisplayName(data.user.displayName);
        setAvatar(data.user.avatar || "");
      } catch (error) {
        console.log("Error cargando perfil:", error);
      }
    };

    fetchUser();
  }, []);

  // Subir avatar a Cloudinary
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);
      setAvatar(imageUrl);
    } catch (error) {
      console.error("Error subiendo avatar:", error);
      alert("No se pudo subir la imagen ❌");
    }

    setUploading(false);
  };

  // Guardar cambios en backend
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.put(
        "/auth/profile/update",
        { displayName, avatar },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(data.user);
      alert("Perfil actualizado correctamente ✔");
    } catch (error) {
      console.log("Error al guardar cambios:", error);
      alert("No se pudo actualizar el perfil ❌");
    }
  };

  if (!user) return <p className="loading-text">Cargando perfil...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Mi Perfil</h2>

        {/* Avatar */}
        <div className="avatar-preview">
          {avatar ? (
            <img src={avatar} alt="avatar" />
          ) : (
            <div className="avatar-placeholder">👤</div>
          )}
        </div>

        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarUpload}
        />

        <label htmlFor="avatarInput" className="profile-btn" style={{ marginBottom: "10px" }}>
          {uploading ? "Subiendo imagen..." : "Cambiar Avatar"}
        </label>

        <div className="profile-field">
          <label>Nombre visible:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <button onClick={handleUpdate} className="profile-btn">
          Guardar Cambios
        </button>

        <div className="profile-info">
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
}
