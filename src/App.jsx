import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const location = useLocation();
  const authRoutes = ["/login", "/register"];
  const hideLayout = authRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
