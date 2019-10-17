import { post } from "request";

export async function login(email, password) {
  try {
    const response = await post("/ajax/login", { email, password });
    const token = await response.json();

    return token;
  } catch (e) {
    return {
      errorMessage: await e.text()
    };
  }
}
