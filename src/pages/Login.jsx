// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/auth";
import AuthHeader from "../components/AuthHeader";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!email || !password) {
      setMsg("Completa todos los campos");
      return;
    }

    try {
      await loginUser(email.trim().toLowerCase(), password);
      navigate("/home");
    } catch (err) {
      setMsg(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-page">
      <AuthHeader />

      <div className="login-container">
        <h2 className="login-title">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            className="login-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">
            Entrar
          </button>
        </form>

        {msg && <p className="login-error">{msg}</p>}

        <p className="login-register-text">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="login-register-link">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
