import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerUser } from "../services/auth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await registerUser(username, email, password);
    if (success) navigate("/library");
  };

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "400px", margin: "80px auto" }}>
        <h2>Crear cuenta</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de usuario</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={{ marginTop: "15px" }}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;