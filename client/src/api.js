// Tiny fetch wrapper. In dev, Vite proxies /api → localhost:5000.
// In prod, Express serves the built SPA on the same origin.

const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  getEvents:    () => request('/events'),
  getEvent:     (slug) => request(`/events/${encodeURIComponent(slug)}`),
  getSchedule:  (day) => request(`/schedule${day ? `?day=${day}` : ''}`),
  getSponsors:  () => request('/sponsors'),
  postContact:  (body) => request('/contacts', { method: 'POST', body: JSON.stringify(body) }),
  health:       () => request('/health'),
};
