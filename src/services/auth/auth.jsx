import { apiPost } from "../api";

export async function login(phone) {
  return apiPost("auth/login", { phone });
}

export async function verify(phone, otp) {
  return apiPost("auth/verify", { phone, otp_code: otp });
}

export async function signup({ name, phone, role }) {
  return apiPost("auth/signup", { phone, name, role });
}