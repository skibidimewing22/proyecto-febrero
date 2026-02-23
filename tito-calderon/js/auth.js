const LS_SESSION = "tito_session_v1";

// Admin demo (cambialo si querés)
const ADMIN_EMAIL = "admin@tito.com";
const ADMIN_PASS = "admin123";

function getSession() {
  return JSON.parse(localStorage.getItem(LS_SESSION)) || null;
}

function isAdmin() {
  const s = getSession();
  return s && s.role === "admin";
}

function login(email, pass) {
  const e = (email || "").trim().toLowerCase();
  const p = pass || "";
  if (e === ADMIN_EMAIL && p === ADMIN_PASS) {
    localStorage.setItem(LS_SESSION, JSON.stringify({ email: e, role: "admin" }));
    return { ok: true };
  }
  return { ok: false, error: "Email o contraseña incorrectos" };
}

function logout() {
  localStorage.removeItem(LS_SESSION);
}