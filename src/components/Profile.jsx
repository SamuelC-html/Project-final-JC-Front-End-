import { useEffect, useState } from "react";
import api from "../api/axios";   // ⬅ usamos axios configurado
import ProfileAvatar from "../components/ProfileAvatar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState("");

  const token = localStorage.getItem("token");

  // ==========================
  // 🔹 Cargar usuario DESDE BACKEND
  // ==========================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
        setNewDisplayName(res.data.user.displayName);

        // Guardar localmente
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      }
    };

    if (token) fetchUser();
  }, []);

  if (!user) return <p>Cargando perfil...</p>;

  // ==========================
  // 🔹 ACTUALIZAR DISPLAY NAME
  // ==========================
  const updateDisplayName = async () => {
    try {
      const res = await api.put(
        "/auth/profile/update",
        { displayName: newDisplayName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Nombre público actualizado");
    } catch (err) {
      alert(err.response?.data?.message || "Error al actualizar nombre");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-10">

      <h1 className="text-3xl font-bold text-center">
        Perfil de {user.displayName}
      </h1>

      {/* Avatar */}
      <div className="border rounded-2xl p-6 shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">Avatar</h2>
        <ProfileAvatar setUser={setUser} />
      </div>

      {/* Información del usuario */}
      <div className="border rounded-2xl p-6 shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">Información del Usuario</h2>

        {/* Username (solo lectura) */}
        <div className="mb-5">
          <label className="font-semibold">Nombre de Perfil (username)</label>
          <input
            type="text"
            value={user.username}
            readOnly
            className="block w-full mt-2 p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Display Name */}
        <div className="mb-5">
          <label className="font-semibold">Nombre Público (displayName)</label>
          <input
            type="text"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            className="block w-full mt-2 p-2 border rounded-lg"
          />

          <button
            onClick={updateDisplayName}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded-xl"
          >
            Guardar Nombre Público
          </button>
        </div>

        {/* Email */}
        <p className="mt-8 text-gray-600">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>

      {/* Stats */}
      <div className="border rounded-2xl p-6 shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 border rounded-lg">
            <p className="text-2xl font-bold">{user.totalReviews}</p>
            <p className="text-gray-600 text-sm">Reviews</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-2xl font-bold">{user.totalComments}</p>
            <p className="text-gray-600 text-sm">Comentarios</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-2xl font-bold">{user.totalKarma}</p>
            <p className="text-gray-600 text-sm">Karma Total</p>
          </div>
        </div>
      </div>
    </div>
  );
}
