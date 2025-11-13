import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header-container">
      <div className="header-logo" onClick={() => navigate("/")}>
        🎮 <span className="logo-text">SCSXStudio</span>
      </div>

      <nav className="header-nav">
        <Link to="/" className="nav-link">Inicio</Link>
        {isLoggedIn ? (
          <>
            <Link to="/library" className="nav-link">Mi Biblioteca</Link>
            <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Iniciar sesión</Link>
            <Link to="/register" className="nav-link">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;