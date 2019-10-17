import { get, del } from "request";
export async function getProducts() {
  const res = await get("/api/products");

  return await res.json();
}

export async function deleteProduct(id) {
  const response = await del(`/api/products/${id}`);

  return response;
}
