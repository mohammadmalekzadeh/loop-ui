import { apiPost } from "../api";

export async function login(phone: string): Promise<any> {
  return apiPost("auth/login", { phone });
}

export async function verify(phone: string, otp: string): Promise<any> {
  return apiPost("auth/verify", { phone, otp_code: otp });
}

export interface SignupData {
  name: string;
  phone: string;
  role: string;
}

export async function signup({ name, phone, role }: SignupData): Promise<any> {
  return apiPost("auth/signup", { phone, name, role });
}
