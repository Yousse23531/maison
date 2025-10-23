const Database = require('better-sqlite3');
const fs = require('fs');

function getDb(filePath) {
  const exists = fs.existsSync(filePath);
  const db = new Database(filePath);
  if (!exists) {
    migrate(db);
  } else {
    migrate(db);
  }
  return db;
}

function migrate(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      role TEXT NOT NULL,
      password_hash TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS reservations (
      id TEXT PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      contact TEXT,
      email TEXT,
      phone TEXT,
      reservation_type TEXT,
      check_in TEXT,
      check_out TEXT,
      message TEXT,
      status TEXT,
      created_at TEXT,
      confirmed_dates TEXT
    );
    CREATE TABLE IF NOT EXISTS blocked_dates (
      date TEXT PRIMARY KEY
    );
  `);
  // Attempt to add columns if migrating an existing DB; ignore errors if they already exist
  try { 
    db.exec("ALTER TABLE reservations ADD COLUMN email TEXT"); 
  } catch (e) {
    // Column already exists, ignore
  }
  try { 
    db.exec("ALTER TABLE reservations ADD COLUMN phone TEXT"); 
  } catch (e) {
    // Column already exists, ignore
  }
}

module.exports = { getDb };


