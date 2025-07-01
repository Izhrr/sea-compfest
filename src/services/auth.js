import axios from "axios";

export async function register({ fullName, email, password }) {
  return axios.post("/api/auth/register", { fullName, email, password });
}
export async function login({ email, password }) {
  return axios.post("/api/auth/login", { email, password });
}
export async function logout() {
  return axios.post("/api/auth/logout");
}