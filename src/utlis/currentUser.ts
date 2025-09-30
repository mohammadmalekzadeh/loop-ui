import { apiGet } from "../services/api";

interface User {
  id: string;
  name: string;
  phone: string;
  role: string;
}

export async function getCurrentUser(): Promise<User> {
  const token = localStorage.getItem("token");
  return apiGet<User>("users/me", token);
}
