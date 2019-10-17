import { get } from "request";

export async function logout() {
  return await get("/ajax/logout");
}
