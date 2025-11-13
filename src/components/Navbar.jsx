import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <nav
      style={{
        backgroundColor: "#111",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid #00ff66",
      }}
    >
      <Link to="/" style={{ fontWeight: "bold", fontSize: "1.2em" }}>
        SCSXStudio
      </Link>

      <div style={{ display: "flex", gap: "15px" }}>
        {token ? (
          <>
            <Link to="/library">Biblioteca</Link>
            <button onClick={handleLogout}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;