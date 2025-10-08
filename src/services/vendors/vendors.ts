import { apiGet } from "../api";

export interface VendorFilters {
  rate?: string;
  is_work?: boolean;
  newest?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export async function getVendors(
  filters: VendorFilters = {}
): Promise<ApiResponse> {
  const params = new URLSearchParams();

  if (filters.rate) params.append("rate", filters.rate);
  if (filters.is_work !== undefined)
    params.append("is_work", String(filters.is_work));
  if (filters.newest !== undefined)
    params.append("newest", String(filters.newest));

  const query = params.toString();
  const endpoint = query ? `vendors?${query}` : "vendors";

  return apiGet(endpoint);
}

export async function getVendorsProducts(
  id: string
): Promise<ApiResponse> {
  return apiGet(`vendors/products/${id}`);
}
