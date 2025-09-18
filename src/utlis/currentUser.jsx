// src/services/auth.js
import { apiGet } from "../routes";

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  return apiGet("users/me", token);
}
