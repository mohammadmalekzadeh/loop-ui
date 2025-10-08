import { apiGet, apiPost, apiPut } from "../api";

export interface RequestFilters {
  status?: string;
  date?: string;
  code?: string;
}

export interface RequestData {
  [key: string]: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export async function getRequests(
  filters: RequestFilters = {},
  token?: string
): Promise<ApiResponse> {
  const params = new URLSearchParams();

  if (filters.status) params.append("status", filters.status);
  if (filters.date) params.append("date", filters.date);
  if (filters.code) params.append("code", filters.code);

  const query = params.toString();
  const endpoint = query ? `request/show?${query}` : "request/show";

  return apiGet(endpoint, token);
}

export async function createRequest(
  data: RequestData,
  token?: string
): Promise<ApiResponse> {
  return apiPost("request/create", data, token);
}

export async function updateRequestStatus(
  id: string,
  status: string,
  token?: string
): Promise<ApiResponse> {
  return apiPut(`request/update/${id}?status_value=${status}`, {}, token);
}

export async function sendRate(
  requestId: string,
  rate: number,
  token?: string
): Promise<ApiResponse> {
  return apiPost(`request/${requestId}?rate=${rate}`, {}, token);
}
