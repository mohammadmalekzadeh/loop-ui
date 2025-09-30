import { apiGet, apiPut, apiPost, apiDelete } from "../api";

export async function getProducts(filters = {}) {
  const params = new URLSearchParams();

  if (filters.type) params.append("type", filters.type);
  if (filters.shop_name) params.append("shop_name", filters.shop_name);
  if (filters.price) params.append("price", filters.price);
  if (filters.rate) params.append("rate", filters.rate);
  if (filters.is_popular !== undefined) params.append("is_popular", filters.is_popular);
  if (filters.newest !== undefined) params.append("newest", filters.newest);

  const query = params.toString();
  const endpoint = query ? `products?${query}` : "products";

  return apiGet(endpoint);
}

export async function postProducts(data, token) {
  return apiPost("products/create", data, token);
}

export async function updateActiveProducts(id, is_active, token) {
  return apiPut(`products/is_active/${id}?is_active=${is_active}`, {}, token);
}

export async function updateProducts(id, data, token) {
  return apiPut(`products/edit/${id}`, data, token);
}
