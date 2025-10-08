import { apiGet, apiPut, apiPost, apiDelete } from "../api";

export interface ProductFilters {
  type?: string;
  shop_name?: string;
  price?: string;
  rate?: string;
  is_popular?: boolean;
  newest?: boolean;
}

export interface ProductData {
  id?: string;
  name?: string;
  price?: number;
  description?: string;
  type?: string;
  image?: string;
  [key: string]: any;
}

export async function getProducts(filters: ProductFilters = {}): Promise<any> {
  const params = new URLSearchParams();

  if (filters.type) params.append("type", filters.type);
  if (filters.shop_name) params.append("shop_name", filters.shop_name);
  if (filters.price) params.append("price", filters.price);
  if (filters.rate) params.append("rate", filters.rate);
  if (filters.is_popular !== undefined)
    params.append("is_popular", String(filters.is_popular));
  if (filters.newest !== undefined)
    params.append("newest", String(filters.newest));

  const query = params.toString();
  const endpoint = query ? `products?${query}` : "products";

  return apiGet(endpoint);
}

export async function postProducts(
  data: ProductData,
  token: string
): Promise<any> {
  return apiPost("products/create", data, token);
}

export async function updateActiveProducts(
  id: string,
  is_active: boolean,
  token: string
): Promise<any> {
  return apiPut(`products/is_active/${id}?is_active=${is_active}`, {}, token);
}

export async function updateProducts(
  id: string,
  data: ProductData,
  token: string
): Promise<any> {
  return apiPut(`products/edit/${id}`, data, token);
}
