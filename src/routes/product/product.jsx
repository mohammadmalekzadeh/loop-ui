import { apiGet, apiPut, apiPost, apiDelete } from "..";

export async function getProducts() {
  return apiGet("products/");
}

export async function postProducts(data, token) {
  return apiPost("products/create", data, token);
}

export async function deleteProducts(id, token) {
  return apiDelete(`products/delete/${id}`, token);
}
