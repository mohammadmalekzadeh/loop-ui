import { apiGet, apiPut, apiPost } from "..";

export async function getProducts() {
  return apiGet("products/");
}