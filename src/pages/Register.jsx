// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/auth";
import "../styles/Register.css";
import AuthHeader from "../components/AuthHeader";

export default function Register() {
  const [username, setUsername] = useState(""); // <-- cambiado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!username || !email || !password) {  // <-- cambiado
      setMsg("Completa todos los campos");
      return;
    }

    try {
      await registerUser({
        username: username.trim(), // <-- cambiado
        email: email.trim().toLowerCase(),
        password,
      });
      navigate("/login");
    } catch (err) {
      setMsg(err.message || "Error");
    }
  };

  return (
    <div className="register-page">
      <AuthHeader />
      <div className="register-container">
        <h2 className="register-title">Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            className="register-input"
            placeholder="Nombre de usuario" // <-- cambiado
            value={username}               // <-- cambiado
            onChange={(e) => setUsername(e.target.value)} // <-- cambiado
          />

          <input
            className="register-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="register-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="register-btn" type="submit">
            Registrarse
          </button>
        </form>

        {msg && <p className="register-error">{msg}</p>}

        <p className="register-login-text">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="register-login-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
