import { apiGet, apiPost, apiPut } from "../index";

export async function getVendors(filters = {}) {
    const params = new URLSearchParams();

  if (filters.rate) params.append("rate", filters.rate);
  if (filters.is_work !== undefined) params.append("is_work", filters.is_work);

  const query = params.toString();
  const endpoint = query ? `vendors?${query}` : "vendors";

  return apiGet(endpoint);
}

export async function getVendorsProducts(id) {
  return apiGet(`vendors/products/${id}`);
}
