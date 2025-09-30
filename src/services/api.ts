const API_URL = process.env.REACT_APP_API_URL as string;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions<T> {
  method: HttpMethod;
  endpoint: string;
  token?: string | null;
  data?: T;
}

async function request<TResponse, TData = unknown>({
  method,
  endpoint,
  token = null,
  data,
}: FetchOptions<TData>): Promise<TResponse> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("API Error:", res.status, errorData);
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}

export function apiGet<T>(endpoint: string, token?: string | null) {
  return request<T>({ method: "GET", endpoint, token });
}

export function apiPost<TResponse, TData = unknown>(
  endpoint: string,
  data: TData,
  token?: string | null
) {
  return request<TResponse, TData>({ method: "POST", endpoint, data, token });
}

export function apiPut<TResponse, TData = unknown>(
  endpoint: string,
  data: TData,
  token?: string | null
) {
  return request<TResponse, TData>({ method: "PUT", endpoint, data, token });
}

export function apiDelete<TResponse, TData = unknown>(
  endpoint: string,
  data?: TData,
  token?: string | null
) {
  return request<TResponse, TData>({ method: "DELETE", endpoint, data, token });
}