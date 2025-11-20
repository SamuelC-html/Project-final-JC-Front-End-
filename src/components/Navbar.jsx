import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className={`navbar-glass ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-content">
        <Link to="/" className="logo">
          <span className="logo-text">SCSX</span>
          <span className="logo-dot">•</span>
          <span className="logo-text2">Studio</span>
        </Link>

        <div className="nav-links">
          {!isAuthenticated && (
            <>
              <a href="#hero" className={active === "hero" ? "active" : ""}>
                Inicio
              </a>
              <a href="#about" className={active === "about" ? "active" : ""}>Sobre</a>
              <a href="#features" className={active === "features" ? "active" : ""}>Características</a>
            </>
          )}
        </div>

        {/* BOTÓN DERECHO */}
        {isAuthenticated ? (
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        ) : (
          <div style={{ display: "flex", gap: "12px" }}>
            <Link to="/devs" className="nav-btn devs-btn">
              Desarrolladores
            </Link>
                
            <Link to="/login" className="nav-btn">
              Iniciar Sesión
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
