const API_URL = process.env.REACT_APP_API_URL as string;

export async function uploadAvatar(
  data: FormData,
  token?: string | null
): Promise<any> {
  const res = await fetch(`${API_URL}upload-avatar/upload`, {
    method: "POST",
    credentials: "include",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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