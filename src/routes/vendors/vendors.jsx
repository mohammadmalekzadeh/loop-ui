import { apiGet, apiPost, apiPut } from "../index";

export async function getVendors() {
  return apiGet("vendors/");
}

export async function getVendorsProducts(id) {
  return apiGet(`vendors/products/${id}`);
}
