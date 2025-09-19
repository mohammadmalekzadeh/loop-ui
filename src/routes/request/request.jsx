import { apiGet, apiPost } from "../index";

export async function getRequests(token) {
  return apiGet("request/show", token);
}

export async function createRequest(data, token) {
  return apiPost("request/create", data, token);
}
