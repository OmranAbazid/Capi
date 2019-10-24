import { get, del } from "request";

export async function getOrders() {
  const res = await get("/api/orders");

  return await res.json();
}

export async function deleteOrder(id) {
  const response = await del(`/api/orders/${id}`);

  return response;
}
