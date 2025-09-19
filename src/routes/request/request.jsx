import { apiGet, apiPost, apiPut } from "../index";

export async function getRequests(token) {
  return apiGet("request/show", token);
}

export async function createRequest(data, token) {
  return apiPost("request/create", data, token);
}

export async function updateRequestStatus(id, status, token) {
  return apiPut(`request/update/${id}?status=${status}`, {}, token);
}
