import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll helper (works even if CSS scroll-behavior no funciona)
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Focus for accessibility
      el.setAttribute("tabindex", "-1");
      el.focus();
      // remove tabindex after focus to keep markup clean
      window.setTimeout(() => el.removeAttribute("tabindex"), 1000);
    }
  };

  useEffect(() => {
    // Sections to observe
    const sections = ["hero", "about", "features"];
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -40% 0px", // trigger when section is ~60% into view
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={`navbar-glass ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-content">
        <Link to="/" className="logo">
          <span className="logo-text">SCSX</span>
          <span className="logo-dot">•</span>
          <span className="logo-text2">Studio</span>
        </Link>

        <div className="nav-links">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className={active === "hero" ? "active" : ""}
          >
            Inicio
          </a>

          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "about")}
            className={active === "about" ? "active" : ""}
          >
            Sobre
          </a>

          <a
            href="#features"
            onClick={(e) => handleNavClick(e, "features")}
            className={active === "features" ? "active" : ""}
          >
            Características
          </a>
        </div>

        {isAuthenticated ? (
          <Link to="/library" className="nav-btn">
            Mi Biblioteca
          </Link>
        ) : (
          <Link to="/login" className="nav-btn">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
