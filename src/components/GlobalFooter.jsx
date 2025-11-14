import React from "react";
import { Link } from "react-router-dom";
import "../styles/GlobalFooter.css";

const GlobalFooter = () => {
  return (
    <footer className="global-footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3 className="footer-title">SCSXStudio</h3>
          <p className="footer-text">Tu biblioteca gamer personal.</p>
        </div>

        <div className="footer-links">
          <Link to="/" className="footer-link">Inicio</Link>
          <Link to="/login" className="footer-link">Iniciar sesión</Link>
          <Link to="/register" className="footer-link">Registrarse</Link>
        </div>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} SCSXStudio — Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default GlobalFooter;
