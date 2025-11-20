import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileAvatar() {
  const [avatarUrl, setAvatarUrl] = useState(""); // Avatar actual del usuario
  const [preview, setPreview] = useState(null);  // Imagen seleccionada
  const [loading, setLoading] = useState(false);

  // Cargar avatar actual cuando abre el perfil
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.avatarUrl) {
      setAvatarUrl(user.avatarUrl);
    }
  }, []);

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  // Subir avatar a Cloudinary + guardar en DB
  const handleUpload = async () => {
    const file = document.getElementById("avatarInput").files[0];
    if (!file) return;

    setLoading(true);

    try {
      // 1) Subir archivo → Cloudinary
      const formData = new FormData();
      formData.append("avatar", file);

      const uploadRes = await axios.post(
        "http://localhost:3000/api/upload/avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = uploadRes.data.imageUrl;

      // 2) Guardar la URL del avatar en el usuario
      const token = localStorage.getItem("token");

      const saveRes = await axios.put(
        "http://localhost:3000/api/users/update-avatar",
        { avatarUrl: imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 3) Guardar en localStorage para mantener sesión actualizada
      localStorage.setItem("user", JSON.stringify(saveRes.data.user));

      // 4) Actualizar el estado local
      setAvatarUrl(imageUrl);
      setPreview(null);

      alert("Avatar actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al subir el avatar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 gap-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Actualizar Avatar</h1>

      <div className="flex flex-col items-center gap-4">
        <img
          src={preview || avatarUrl || "https://via.placeholder.com/150"}
          alt="avatar preview"
          className="w-40 h-40 rounded-full object-cover shadow-lg"
        />

        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 border rounded-lg"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white shadow-md"
        >
          {loading ? "Subiendo..." : "Guardar Avatar"}
        </button>
      </div>
    </div>
  );
}
