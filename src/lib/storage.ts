// Local storage fallback for offline/failed API calls

const KEY = 'local_reservations';

export type Reservation = {
  id: string;
  first_name: string;
  last_name: string;
  contact: string;
  reservation_type?: string;
  check_in?: string;
  check_out?: string;
  message?: string;
  status: 'en attente' | 'confirmé';
  created_at: string;
  confirmed_dates: string[];
};

function readAll(): Reservation[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function writeAll(items: Reservation[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export const localStore = {
  add(res: Reservation) {
    const all = readAll();
    all.unshift(res);
    writeAll(all);
  },
  list(): Reservation[] {
    return readAll();
  },
  get(id: string): Reservation | undefined {
    return readAll().find(r => r.id === id);
  },
  update(id: string, updater: (r: Reservation) => Reservation) {
    const all = readAll();
    const idx = all.findIndex(r => r.id === id);
    if (idx >= 0) {
      all[idx] = updater(all[idx]);
      writeAll(all);
    }
  },
  delete(id: string) {
    writeAll(readAll().filter(r => r.id !== id));
  },
  confirmedDates(): string[] {
    const dates = new Set<string>();
    for (const r of readAll()) {
      if (r.status === 'confirmé') {
        for (const d of r.confirmed_dates || []) dates.add(new Date(d).toISOString().split('T')[0]);
      }
    }
    return Array.from(dates);
  }
};


