import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NavigationBar from "./components/NavigationBar";

import Landing from "./pages/Landing";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Devs from "./pages/Devs";
import ReviewPage from "./pages/ReviewPage";
import UserHome from "./pages/UserHome";
import Profile from "./pages/Profile";
import Estadisticas from "./pages/EstadisticasPage";

function App() {
  const location = useLocation();
  const authRoutes = ["/login", "/register", "/devs", "/library"];
  const hideLayout = authRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/devs" element={<Devs />} />
        <Route path="/estadisticas" element={ <ProtectedRoute><Estadisticas /></ProtectedRoute> }/>
        <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute> }/>
      </Routes>
    </>
  );
}

export default App;