import { apiGet, apiPost, apiPut } from "../index";

export async function getRequests(filters = {}, token) {
  const params = new URLSearchParams();

  if (filters.status) params.append("status", filters.status);
  if (filters.date) params.append("date", filters.date);

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
