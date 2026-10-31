import { createAuthClient } from "better-auth/react";
export const serverUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");
export const authClient = createAuthClient({
  baseURL: serverUrl,
  fetchOptions: { credentials: "include" },
});
