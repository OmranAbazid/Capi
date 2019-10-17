import { get, put, post, del } from "request";

export async function getProduct(id) {
  const response = await get(`/api/products/${id}`);

  return await response.json();
}

export async function createProduct(payload) {
  const response = await post(`/api/products/`, payload);

  return await response.json();
}

export async function updateProduct(id, payload) {
  const response = await put(`/api/products/${id}`, payload);

  return await response.json();
}

export async function deleteProduct(id) {
  const response = await del(`/api/products/${id}`);

  return response;
}

export async function deleteProductImage(productId, imageId) {
  const response = await del(`/api/products/${productId}/images/${imageId}`);

  return response;
}
