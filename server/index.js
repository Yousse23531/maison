const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const { getDb } = require('./sqlite');
const { sendEmail, getEmailDiagnostics } = require('./mail');

const PORT = process.env.PORT ? Number(process.env.PORT) : 5174;
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@maison.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const MANAGER_EMAIL = process.env.MANAGER_EMAIL || 'manager@maison.com';
const MANAGER_PASSWORD = process.env.MANAGER_PASSWORD || 'manager123';

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'https://maison-rustique.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '1mb' }));

// Root + Health
app.get('/', (req, res) => res.type('text').send('Maison Rustique API running. Try GET /api/health'));
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Auth helpers
function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function authRequired(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

// Seed default users if missing
function ensureSeededUsers(db) {
  try {
    const hasAdmin = db.prepare('SELECT 1 FROM users WHERE email = ?').get(ADMIN_EMAIL);
    if (!hasAdmin) {
      db.prepare('INSERT INTO users (email, role, password_hash) VALUES (?, ?, ?)')
        .run(ADMIN_EMAIL, 'ADMIN', ADMIN_PASSWORD);
    }
    const hasManager = db.prepare('SELECT 1 FROM users WHERE email = ?').get(MANAGER_EMAIL);
    if (!hasManager) {
      db.prepare('INSERT INTO users (email, role, password_hash) VALUES (?, ?, ?)')
        .run(MANAGER_EMAIL, 'MANAGER', MANAGER_PASSWORD);
    }
    // username-style
    const hasAdminUser = db.prepare('SELECT 1 FROM users WHERE email = ?').get('admin');
    if (!hasAdminUser) db.prepare('INSERT INTO users (email, role, password_hash) VALUES (?, ?, ?)').run('admin', 'ADMIN', ADMIN_PASSWORD);
    const hasManagerUser = db.prepare('SELECT 1 FROM users WHERE email = ?').get('manager');
    if (!hasManagerUser) db.prepare('INSERT INTO users (email, role, password_hash) VALUES (?, ?, ?)').run('manager', 'MANAGER', MANAGER_PASSWORD);
  } catch (e) {
    console.log('Database already initialized or error:', e.message);
  }
}

// Init DB
const db = getDb(path.resolve(process.cwd(), 'data.sqlite'));
ensureSeededUsers(db);

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(401).json({ error: 'Invalid credentials' });
  try {
    ensureSeededUsers(db);
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user || user.password_hash !== password) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken({ email: user.email, role: user.role });
    return res.json({ token, role: user.role });
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

// Reservations helpers
function normalizeDateOnly(iso) {
  const d = new Date(iso);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function expandToDays(dates) {
  return (dates || []).map(normalizeDateOnly);
}

// Create reservation (public)
app.post('/api/reservations', (req, res) => {
  const r = req.body || {};
  const id = r.id || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const now = new Date().toISOString();
  try {
    db.prepare(`INSERT INTO reservations (id, first_name, last_name, contact, email, phone, reservation_type, check_in, check_out, message, status, created_at, confirmed_dates)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(
        id,
        r.first_name || r.firstName || '',
        r.last_name || r.lastName || '',
        r.contact || r.email || r.phone || '',
        r.email || r.contact || '',
        r.phone || r.contact || '',
        r.reservation_type || r.reservationType || '',
        r.check_in || r.checkIn || '',
        r.check_out || r.checkOut || '',
        r.message || '',
        'en attente',
        now,
        JSON.stringify([])
      );
    // notify admin
    sendEmail({ to: ADMIN_EMAIL, subject: 'nouvelle reservation', text: `Nouvelle réservation ${id}` })
      .then(sent => res.status(201).json({ ok: true, emailSent: sent }))
      .catch(() => res.status(201).json({ ok: true, emailSent: false }));
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

// Admin: list all
app.get('/api/reservations', authRequired, requireRole('ADMIN'), (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM reservations ORDER BY created_at DESC').all();
    return res.json(rows);
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

// Admin: get by id
app.get('/api/reservations/:id', authRequired, requireRole('ADMIN'), (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM reservations WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    return res.json(row);
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

// Admin: delete (only if not confirmed)
app.delete('/api/reservations/:id', authRequired, requireRole('ADMIN'), (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM reservations WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    if (row.status === 'confirmé') return res.status(400).json({ error: 'Cannot delete confirmed reservation' });
    db.prepare('DELETE FROM reservations WHERE id = ?').run(req.params.id);
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

// Admin: confirm reservation
app.post('/api/reservations/:id/confirm', authRequired, requireRole('ADMIN'), (req, res) => {
  try {
    let { confirmedDates } = req.body || {};
    const row = db.prepare('SELECT * FROM reservations WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    if (row.status === 'confirmé') return res.status(400).json({ error: 'Already confirmed' });
    // Auto-generate date range if not provided: inclusive range [check_in, check_out]
    if (!Array.isArray(confirmedDates) || confirmedDates.length === 0) {
      const start = new Date(row.check_in);
      const end = new Date(row.check_out);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: 'Missing or invalid dates' });
      }
      const days = [];
      const cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      const endUtc = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));
      while (cursor <= endUtc) {
        days.push(new Date(cursor));
        cursor.setUTCDate(cursor.getUTCDate() + 1);
      }
      confirmedDates = days.map(d => d.toISOString());
    }
    const normalized = expandToDays(confirmedDates);
    // conflict check
    const others = db.prepare("SELECT confirmed_dates FROM reservations WHERE status = 'confirmé'").all();
    const occupied = new Set();
    for (const o of others) {
      try {
        const arr = JSON.parse(o.confirmed_dates || '[]');
        for (const d of arr) occupied.add(normalizeDateOnly(d));
      } catch {}
    }
    const conflict = normalized.some(d => occupied.has(d));
    if (conflict) return res.status(409).json({ error: 'Date conflict' });
    db.prepare("UPDATE reservations SET status = 'confirmé', confirmed_dates = ? WHERE id = ?")
      .run(JSON.stringify(normalized), req.params.id);
    sendEmail({ to: MANAGER_EMAIL, subject: 'Réservation confirmée', text: `Réservation confirmée ${req.params.id}` })
      .then(sent => res.json({ ok: true, emailSent: sent }))
      .catch(() => res.json({ ok: true, emailSent: false }));
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

// Admin: cancel a confirmed reservation (set back to en attente)
app.post('/api/reservations/:id/cancel', authRequired, requireRole('ADMIN'), (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM reservations WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    if (row.status !== 'confirmé') return res.status(400).json({ error: 'Not confirmed' });
    db.prepare("UPDATE reservations SET status = 'en attente', confirmed_dates = ? WHERE id = ?")
      .run(JSON.stringify([]), req.params.id);
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

// Manager: list confirmed
app.get('/api/reservations/confirmed', authRequired, requireRole('MANAGER'), (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM reservations WHERE status = 'confirmé' ORDER BY created_at DESC").all();
    return res.json(rows);
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

// Public calendar dates
app.get('/api/calendar/dates', (req, res) => {
  try {
    const confirmedRows = db.prepare("SELECT confirmed_dates FROM reservations WHERE status = 'confirmé'").all();
    const pendingRows = db.prepare("SELECT check_in, check_out FROM reservations WHERE status = 'en attente'").all();
    const blockedRows = db.prepare("SELECT date FROM blocked_dates").all();

    const confirmedDates = [];
    for (const r of confirmedRows) {
      try {
        const arr = JSON.parse(r.confirmed_dates || '[]');
        for (const d of arr) confirmedDates.push(normalizeDateOnly(d));
      } catch {}
    }

    const pendingDates = [];
    for (const r of pendingRows) {
      try {
        const start = new Date(r.check_in);
        const end = new Date(r.check_out);
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          const days = [];
          const cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
          const endUtc = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));
          while (cursor <= endUtc) {
            days.push(new Date(cursor));
            cursor.setUTCDate(cursor.getUTCDate() + 1);
          }
          for (const d of days) pendingDates.push(normalizeDateOnly(d.toISOString()));
        }
      } catch {}
    }

    const blockedDates = Array.from(new Set((blockedRows || []).map(r => r.date)));
    return res.json({
      confirmedDates: Array.from(new Set(confirmedDates)),
      pendingDates: Array.from(new Set(pendingDates)),
      blockedDates
    });
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

// Admin: reset database reservations (demo prep)
app.post('/api/admin/reset', authRequired, requireRole('ADMIN'), (req, res) => {
  try {
    db.exec('DELETE FROM reservations;');
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

// Admin: seed a demo confirmed reservation to visualize calendar
app.post('/api/admin/seed-demo', authRequired, requireRole('ADMIN'), (req, res) => {
  try {
    const now = new Date();
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), Math.max(1, now.getUTCDate())));
    const end = new Date(start);
    end.setUTCDate(start.getUTCDate() + 2);
    const id = `${Date.now()}-demo`;
    const createdAt = new Date().toISOString();
    db.prepare(`INSERT INTO reservations (id, first_name, last_name, contact, email, phone, reservation_type, check_in, check_out, message, status, created_at, confirmed_dates)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(id, 'Demo', 'Client', 'demo@maison.com', 'demo@maison.com', '', 'demo', start.toISOString(), end.toISOString(), 'Demo seed', 'en attente', createdAt, JSON.stringify([]));
    const dates = [];
    const cursor = new Date(start);
    while (cursor <= end) { dates.push(new Date(cursor).toISOString()); cursor.setUTCDate(cursor.getUTCDate() + 1); }
    const normalized = dates.map(d => normalizeDateOnly(d));
    db.prepare("UPDATE reservations SET status = 'confirmé', confirmed_dates = ? WHERE id = ?").run(JSON.stringify(normalized), id);
    return res.json({ ok: true, id, dates: normalized });
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

// Email diagnostics
app.get('/api/_email/diagnostics', (req, res) => {
  return res.json(getEmailDiagnostics());
});

app.post('/api/_email/test', async (req, res) => {
  try {
    const ok = await sendEmail({ to: ADMIN_EMAIL, subject: 'Test', text: 'Test email' });
    return res.json({ ok });
  } catch (e) {
    return res.json({ ok: false });
  }
});

// Admin blocked dates endpoints
app.get('/api/blocked-dates', authRequired, requireRole('ADMIN'), (req, res) => {
  try {
    const rows = db.prepare('SELECT date FROM blocked_dates ORDER BY date ASC').all();
    return res.json({ dates: rows.map(r => r.date) });
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

app.post('/api/blocked-dates', authRequired, requireRole('ADMIN'), (req, res) => {
  try {
    const { dates } = req.body || {};
    if (!Array.isArray(dates)) return res.status(400).json({ error: 'dates must be array' });
    const normalized = Array.from(new Set(dates.map(d => {
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return null;
      const yyyy = dt.getUTCFullYear();
      const mm = String(dt.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(dt.getUTCDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }).filter(Boolean)));
    const insert = db.prepare('INSERT OR IGNORE INTO blocked_dates (date) VALUES (?)');
    const tx = db.transaction((arr) => {
      for (const day of arr) insert.run(day);
    });
    tx(normalized);
    return res.json({ ok: true, added: normalized.length });
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

app.delete('/api/blocked-dates', authRequired, requireRole('ADMIN'), (req, res) => {
  try {
    const { dates } = req.body || {};
    if (!Array.isArray(dates)) return res.status(400).json({ error: 'dates must be array' });
    const del = db.prepare('DELETE FROM blocked_dates WHERE date = ?');
    const tx = db.transaction((arr) => {
      for (const day of arr) del.run(day);
    });
    tx(dates);
    return res.json({ ok: true, removed: dates.length });
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
