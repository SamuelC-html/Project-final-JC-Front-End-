// =======================
// 🔐 Servicio de Autenticación
// =======================

const API_URL = "http://localhost:3000/api/users";

// 🧠 Registrar usuario
export async function registerUser(nombre, email, password) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error al registrar usuario");

    return data; // { message, token, userId }
  } catch (error) {
    console.error("❌ Error en registerUser:", error);
    throw error;
  }
}

// 🔑 Iniciar sesión
export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");

    // ✅ Guardar token e ID de usuario
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);

    return data;
  } catch (error) {
    console.error("❌ Error en loginUser:", error);
    throw error;
  }
}

// 🧾 Obtener usuario actual (si hay sesión)
export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return null;

    const user = await res.json();
    return user;
  } catch (error) {
    console.error("❌ Error al obtener usuario actual:", error);
    return null;
  }
}

// 🚪 Cerrar sesión
export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}