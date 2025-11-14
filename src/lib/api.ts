const rawBaseUrl =
  import.meta.env.VITE_BACKEND_URL ??
  import.meta.env.VITE_API_BASE_URL

const API_BASE_URL = rawBaseUrl
  ? rawBaseUrl.replace(/\/$/, "")
  : "http://localhost:8000";

export const PORTFOLIO_ENDPOINT = `${API_BASE_URL}/api/portfolio/`;

export const CONTACT_MESSAGE_ENDPOINT = `${API_BASE_URL}/api/contact-messages/`;

export const jsonFetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export type ContactMessagePayload = {
  name: string;
  email: string;
  project: string;
  message: string;
};

export const postContactMessage = async (
  payload: ContactMessagePayload
): Promise<void> => {
  const response = await fetch(CONTACT_MESSAGE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let detail = `Request failed with status ${response.status}`;
    try {
      const data = await response.json();
      if (data?.detail) {
        detail = data.detail as string;
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(detail);
  }
};

