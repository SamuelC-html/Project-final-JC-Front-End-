import "../styles/Devs.css";

export default function Devs() {
  return (
    <div className="devs-page">
      <h1 className="devs-title">El Equipo de SCSXStudio</h1>

      <section className="devs-grid">
        <div className="devs-profile">
          <img src="/Foto_Samuel.jpg" alt="Samuel Cano" className="devs-img" />
          <h2>Samuel Cano</h2>
          <p>Full Stack Developer</p>
          <p>
            Estudiante de Ingeniería Mecánica apasionado por el desarrollo de software y la innovación, con experiencia en distintos proyectos enfocados en el desarrollo de aplicaciones webs, así como estudios de usabilidad y pruebas de usuario.
          </p>
            <div className="devs-socials">
              <a href="https://github.com/SamuelC-html" target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" />
              </a>

              <a href="https://www.instagram.com/samuelcan0/" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" alt="Instagram" />
              </a>
            </div>

        </div>

        <div className="devs-profile">
          <img src="/Foto_Sergio.jpg" alt="Sergio Gutierrez" className="devs-img" />
          <h2>Sergio Gutiérrez</h2>
          <p>Full Stack Developer</p>
          <p>
            Responsable del backend con Node.js, rutas, seguridad, arquitectura API
            y conexión con MongoDB.
          </p>
            <div className="devs-socials">
              <a href="https://github.com/Sergio16JovenTi" target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" />
              </a>
    
              <a href="https://www.instagram.com/serg_iog7?igsh=MXFmbWQ2bDF4MXB3MQ==" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" alt="Instagram" />
              </a>
            </div>
        </div>
      </section>
        <div className="devs-back-container">
          <a href="/" className="devs-back-btn">Volver al Inicio</a>
        </div>
    </div>
  );
}
