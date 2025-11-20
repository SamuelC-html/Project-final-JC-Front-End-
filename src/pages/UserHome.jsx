import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/UserHome.css";

export default function UserHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cargar datos del usuario desde el backend usando el token
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user)) // user = { username, email }
        .catch(() => setUser(null));
    }
  }, []);

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="user-card">

          <div className="avatar-circle">
            {user?.username?.charAt(0).toUpperCase() || "👤"}
          </div>

          <h2 className="username">
            Bienvenido{user ? `, ${user.username}` : ""}
          </h2>

          <div className="sidebar-links">
            <Link to="/profile">⚙ Mi Perfil</Link>
            <Link to="/library">📚 Biblioteca</Link>
            <Link to="/reviews">⭐ Reseñas</Link>
          </div>
        </div>
      </aside>

      {/* FEED PRINCIPAL */}
      <main className="dashboard-feed">

        <Link to="/library" className="feed-card">
          <div className="feed-icon">📚</div>
          <div>
            <h3>Mi Biblioteca</h3>
            <p>Accede a tus juegos, progreso y favoritos.</p>
          </div>
        </Link>

        <Link to="/reviews" className="feed-card">
          <div className="feed-icon">⭐</div>
          <div>
            <h3>Reseñas</h3>
            <p>Administra tus opiniones y califica tus juegos.</p>
          </div>
        </Link>

        <Link to="/profile" className="feed-card">
          <div className="feed-icon">👤</div>
          <div>
            <h3>Mi Perfil</h3>
            <p>Modifica tu información personal y ajustes.</p>
          </div>
        </Link>

      </main>
    </div>
  );
}
