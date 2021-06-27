export const API_URL = "127.0.0.1:3000";

export const postFetch = (
  url: string,
  body: Object,
  extraOptions?: Partial<Request>
) =>
  fetch(`${API_URL}/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...extraOptions,
  });
