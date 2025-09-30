import { apiGet, apiPost, apiPut } from "../api";

export async function getRequests(filters = {}, token) {
  const params = new URLSearchParams();

  if (filters.status) params.append("status", filters.status);
  if (filters.date) params.append("date", filters.date);
  if (filters.code) params.append("code", filters.code);

  const query = params.toString();
  const endpoint = query ? `request/show?${query}` : "request/show";

  return apiGet(endpoint, token);
}

export async function createRequest(data, token) {
  return apiPost("request/create", data, token);
}

export async function updateRequestStatus(id, status, token) {
  return apiPut(`request/update/${id}?status_value=${status}`, {}, token);
}

export async function sendRate(requestId, rate, token) {
  return apiPost(`request/${requestId}?rate=${rate}`, {}, token);
}
