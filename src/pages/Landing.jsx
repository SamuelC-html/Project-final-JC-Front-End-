import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyToken } from "../services/auth";
import { motion } from "framer-motion";

import "../styles/Landing.css";

const Landing = () => {
  // Verificar si el usuario está logueado mediante token
const [isLogged, setIsLogged] = useState(false);

useEffect(() => {
  const check = async () => {
    const result = await verifyToken();
    setIsLogged(result);
  };
  check();
}, []);

  return (
    <div className="landing-container">
      {/* ===== HERO PRINCIPAL ===== */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Bienvenido a <span>SCSXStudio</span>
          </h1>
          <p className="hero-subtitle">
            Tu biblioteca personal de videojuegos, organizada con estilo.
          </p>

          <div className="hero-buttons">
            <a href="/home" className="hero-btn primary">GameTracker</a>
            <a href="/register" className="hero-btn secondary">Crear Cuenta</a>
          </div>
        </div>
      </section>
      {/* ===== ABOUT SECTION ===== */}
      <section className="about-section" id="about">
        <div className="about-container">

          <h2 className="about-title">¿Qué es SCSXStudio?</h2>

          <p className="about-description">
            SCSXStudio es tu espacio personal para organizar, calificar y llevar
            control total de tus videojuegos favoritos. Diseñado para ofrecerte una
            experiencia rápida, visualmente moderna y completamente segura.
          </p>

          <div className="about-cards">
            <div className="about-card">
              <h3>Tu Biblioteca en un Solo Lugar</h3>
              <p>Guarda tus juegos, plataformas y progreso sin importar cuántos títulos tengas.</p>
            </div>

            <div className="about-card">
              <h3>Calificaciones y Horas Jugadas</h3>
              <p>Mantén un registro detallado de tus sesiones, logros y nivel de disfrute.</p>
            </div>

            <div className="about-card">
              <h3>Hecho para Gamers</h3>
              <p>Una interfaz rápida, brillante y minimalista pensada para que todo se sienta natural.</p>
            </div>
          </div>

        </div>
      </section>
      {/* ===== FEATURES SECTION ===== */}
      <section className="features-section" id="features">
        <h2 className="features-title">Características Destacadas</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3>Gestión Completa</h3>
            <p>Organiza todos tus videojuegos con datos como progreso, horas y calificación.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Rápido y Fluido</h3>
            <p>Una interfaz optimizada para cargar y navegar sin demoras.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Seguro</h3>
            <p>Tus datos están protegidos gracias a un backend con autenticación JWT.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Calificación de Juegos</h3>
            <p>Asigna estrellas y evalúa cada título de forma intuitiva.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🕒</div>
            <h3>Registro de Horas</h3>
            <p>Lleva un control detallado del tiempo que inviertes en tus juegos.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Totalmente Responsive</h3>
            <p>Compatible con móviles, tablets y monitores grandes.</p>
          </div>

        </div>
      </section>      
      {/* ===== CTA SECTION ===== */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">¡Empieza a construir tu biblioteca hoy!</h2>
          <p className="cta-sub">
            Organiza todos tus videojuegos en un solo lugar, con estilo.
          </p>

          <div className="cta-buttons">
            {isLogged ? (
              <a href="/home" className="cta-btn cta-primary">
                Ingresar al GameTracker
              </a>
            ) : (
              <>
                <a href="/register" className="cta-btn cta-primary">
                  Crear cuenta
                </a>
                <a href="/login" className="cta-btn cta-secondary">
                  Iniciar sesión
                </a>
              </>
            )}
          </div>
        </div>
      </section>
        {/* ===== FOOTER SECTION ===== */}
      <section className="footer-section">
        <div className="footer-container">

          <div className="footer-column">
            <h3 className="footer-title">SCSXStudio</h3>
            <p className="footer-text">
              Una biblioteca digital moderna para organizar tus videojuegos como un profesional.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-subtitle">Navegación</h4>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/library">Biblioteca</a></li>
              <li><a href="/login">Ingresar</a></li>
              <li><a href="/register">Registrar nuevo usuario</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-subtitle">Información</h4>
            <ul>
              <li><a href="#">Centro de ayuda</a></li>
              <li><a href="#">Política de privacidad</a></li>
              <li><a href="#">Términos del servicio</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-subtitle">Desarrolladores</h4>

            <div className="dev-block">
              <p className="dev-name">Samuel Cano</p>
              <div className="dev-socials">
                <a href="https://instagram.com/samuelcan0" target="_blank">Instagram</a>
                <a href="https://github.com/SamuelC-html" target="_blank">GitHub</a>
                <a href="https://samuelc-html.github.io/Proyecto-Portafolio-JC/" target="_blank">Portafolio</a>
              </div>
            </div>

            <div className="dev-block">
              <p className="dev-name">Sergio Gutiérrez</p>
              <div className="dev-socials">
                <a href="https://instagram.com/" target="_blank">Instagram</a>
                <a href="https://github.com/" target="_blank">GitHub</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 SCSXStudio. Todos los derechos reservados.</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
