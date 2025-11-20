import { Link, useLocation } from "react-router-dom";
import "../styles/NavigationBar.css";

function NavigationBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Mostrar barra solo en estas rutas
  const showNav = ["/library", "/reviews", "/profile"].includes(currentPath);
  if (!showNav) return null;

  // Botones excluyendo la ruta actual
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Library", path: "/library" },
    { name: "Reviews", path: "/reviews" },
    { name: "Profile", path: "/profile" },
  ].filter(item => item.path !== currentPath);

  return (
    <header className="navbar-glass">
      <div className="nav-content">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-text">SCSX</span>
          <span className="logo-dot">•</span>
          <span className="logo-text2">Studio</span>
        </Link>

        {/* Navegación */}
        <nav className="nav-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={currentPath === item.path ? "active nav-btn" : "nav-btn"}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default NavigationBar;
