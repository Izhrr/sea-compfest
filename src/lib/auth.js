import jwt from "jsonwebtoken";
import sanitizeHtml from "sanitize-html";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// Ambil token dari cookie
export function getTokenFromRequest(request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

// Verifikasi token
export function getUserFromRequest(request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function requireRole(request, role = "user") {
  const user = getUserFromRequest(request);
  if (!user) return { error: "Unauthorized", status: 401 };
  if (role && user.role !== role) return { error: "Forbidden", status: 403 };
  return { user };
}

// Input validation & sanitization
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function validatePhone(phone) {
  return /^(\+62|0)[0-9]{9,13}$/.test(phone);
}
export function sanitizeInput(input) {
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} });
}