// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL

// فانکشن عمومی GET
export async function apiGet(endpoint, token = null) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("API Error:", res.status, errorData);
        throw new Error(`Error: ${res.status}`);
    }
  return res.json();
}

// فانکشن عمومی POST
export async function apiPost(endpoint, data, token = null) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("API Error:", res.status, errorData);
        throw new Error(`Error: ${res.status}`);
    }
  return res.json();
}
