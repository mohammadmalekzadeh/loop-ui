import { apiGet, apiPost, apiPut } from "../index";

export async function getUserDashboard(token) {
  return apiGet("profile/user", token);
}

export async function updateUserInfo(data, token) {
  return apiPut("update/user", data, token);
}

export async function updateVendorsInfo(data, token) {
  return apiPut("update/vendors", data, token);
}
