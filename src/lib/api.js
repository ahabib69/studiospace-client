import { serverUrl } from "./auth";
export async function api(path, options = {}) {
  const { retry = true, ...fetchOptions } = options;
  const res = await fetch(`${serverUrl}/api${path}`, {
    ...fetchOptions,
    credentials: "include",
    headers: {
      ...(fetchOptions.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...fetchOptions.headers,
    },
  });
  // Renew the short-lived app JWT from the longer BetterAuth session once.
  if (res.status === 401 && retry && !["/token", "/logout"].includes(path)) {
    const renewed = await fetch(`${serverUrl}/api/token`, {
      method: "POST",
      credentials: "include",
    });
    if (renewed.ok) return api(path, { ...options, retry: false });
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(
      data.message || "Request failed. Please try again.",
    );
    error.status = res.status;
    throw error;
  }
  return data;
}
export const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
export const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];
export const categoryLabels = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];
export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
