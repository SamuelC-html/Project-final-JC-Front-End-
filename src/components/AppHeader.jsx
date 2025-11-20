import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

export default function AppHeader() {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  // Páginas donde NO debe aparecer el Header
  const hiddenRoutes = ["/", "/login", "/register"];

  if (!isAuthenticated || hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
}
