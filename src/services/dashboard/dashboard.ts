import { apiGet, apiPut } from "../api";

export interface UserUpdateData {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  [key: string]: any;
}

export interface VendorUpdateData {
  name?: string;
  description?: string;
  category?: string;
  [key: string]: any;
}

export async function getUserDashboard(token: string): Promise<any> {
  return apiGet("profile/user", token);
}

export async function updateUserInfo(
  data: UserUpdateData,
  token: string
): Promise<any> {
  return apiPut("profile/update/user", data, token);
}

export async function updateVendorsInfo(
  data: VendorUpdateData,
  token: string
): Promise<any> {
  return apiPut("profile/update/vendors", data, token);
}
