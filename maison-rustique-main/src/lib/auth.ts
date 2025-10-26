export type Role = 'ADMIN' | 'MANAGER' | 'GUEST';

export function mapEmailToRoleLocally(email: string): Role {
  const admin = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@maison.com').toLowerCase();
  const manager = (import.meta.env.VITE_MANAGER_EMAIL || 'manager@maison.com').toLowerCase();
  const e = (email || '').toLowerCase();
  if (e === admin || e === 'admin') return 'ADMIN';
  if (e === manager || e === 'manager') return 'MANAGER';
  return 'GUEST';
}

export function saveToken(token: string) {
  localStorage.setItem('serene_token', token);
}

export function clearToken() {
  localStorage.removeItem('serene_token');
}

export function getToken() {
  return localStorage.getItem('serene_token');
}


