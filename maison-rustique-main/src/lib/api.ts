function inferApiBase() {
  try {
    const loc: any = window.location;
    if (loc && loc.port === '5173') return `${loc.protocol}//${loc.hostname}:5174`;
  } catch {}
  return '';
}
export const API_BASE = (((import.meta as any).env && (import.meta as any).env.VITE_API_URL) as string) || inferApiBase();

function authHeader() {
  const token = localStorage.getItem('serene_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export const api = {
  login: (email: string, password: string) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  createReservation: (payload: any) => request('/api/reservations', { method: 'POST', body: JSON.stringify(payload) }),
  listReservations: () => request('/api/reservations'),
  getReservation: (id: string) => request(`/api/reservations/${id}`),
  deleteReservation: (id: string) => request(`/api/reservations/${id}`, { method: 'DELETE' }),
  confirmReservation: (id: string, confirmedDates: string[]) => request(`/api/reservations/${id}/confirm`, { method: 'POST', body: JSON.stringify({ confirmedDates }) }),
  cancelReservation: (id: string) => request(`/api/reservations/${id}/cancel`, { method: 'POST' }),
  listConfirmedForManager: () => request('/api/reservations/confirmed'),
  listReservationsConfirmedForManager: () => request('/api/reservations/confirmed'),
  getCalendarDates: () => request('/api/calendar/dates'),
  emailDiagnostics: () => request('/api/_email/diagnostics'),
  emailTest: () => request('/api/_email/test', { method: 'POST' }),
  // aliases matching provided pages
  listReservationsAdmin: () => request('/api/reservations'),
  getReservationAdmin: (id: string) => request(`/api/reservations/${id}`),
  confirmReservationAdmin: (id: string, confirmedDates: string[]) => request(`/api/reservations/${id}/confirm`, { method: 'POST', body: JSON.stringify({ confirmedDates }) }),
  deleteReservationAdmin: (id: string) => request(`/api/reservations/${id}`, { method: 'DELETE' }),
  resetDemo: () => request('/api/admin/reset', { method: 'POST' }),
  seedDemo: () => request('/api/admin/seed-demo', { method: 'POST' }),
};

export function setAuthToken(token: string) {
  localStorage.setItem('serene_token', token);
}
