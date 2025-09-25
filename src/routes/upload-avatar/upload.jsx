const API_URL = process.env.REACT_APP_API_URL

export async function uploadAvatar(data, token) {
    const res = await fetch(`${API_URL}upload-avatar/upload`, {
    method: "POST",
    credentials: "include",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: data,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("API Error:", res.status, errorData);
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}