import { Link } from "react-router-dom";
import "../styles/AuthHeader.css";

export default function AuthHeader() {
  return (
    <header className="auth-header">
      <div className="auth-header-content">

        {/* LOGO */}
        <Link to="/" className="auth-logo">
          <span className="logo-text">SCSX</span>
          <span className="logo-dot">•</span>
          <span className="logo-text2">Studio</span>
        </Link>

        {/* LINKS */}
        <nav className="auth-nav">
          <Link to="/devs" className="auth-link">Desarrolladores</Link>
          <Link to="/" className="auth-link">Inicio</Link>
        </nav>

      </div>
    </header>
  );
}
