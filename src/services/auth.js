// src/services/auth.js
const API_URL = "http://localhost:3000/api/users";

export async function registerUser(userData) {
  // userData = { username, email, password }  <-- actualizado
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al registrar");
  return data;
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");

  if (data.token) localStorage.setItem("token", data.token);
  if (data.user?.id) localStorage.setItem("userId", data.user.id);

  return data;
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) return null;
  return await res.json();
}

export async function verifyToken() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const res = await fetch(`${API_URL}/verify`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return false;

    const data = await res.json();
    return data.valid === true;
  } catch (error) {
    console.error("❌ Error verificando token:", error);
    return false;
  }
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}
