import Navbar from "../components/Navbar";

function Landing() {
  return (
    <div>
      <Navbar />
      <section style={{ textAlign: "center", marginTop: "100px" }}>
        <h1 style={{ fontSize: "3em", color: "#00ff66" }}>🎮 Bienvenido a SCSXStudio</h1>
        <p style={{ maxWidth: "600px", margin: "20px auto", lineHeight: "1.6" }}>
          Tu biblioteca personal de videojuegos. Guarda tus títulos, califícalos y
          lleva registro de tus horas jugadas. ¡Todo en un solo lugar!
        </p>
        <div style={{ marginTop: "30px" }}>
          <a href="/register">
            <button>Comenzar ahora</button>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Landing;