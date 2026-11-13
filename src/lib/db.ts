import Database from "better-sqlite3";
import path from "path";

let dbInstance: Database.Database | null = null;
let isInMemoryFallback = false;

// Fallback in-memory store for serverless environments (Vercel)
interface ContactRecord {
  id: number;
  receipt_id: string;
  name: string;
  email: string;
  company?: string | null;
  role?: string | null;
  message: string;
  ip_hash: string;
  created_at: string;
}

const memoryContacts: ContactRecord[] = [
  {
    id: 1,
    receipt_id: "MMS-REC-2026-SEEDED",
    name: "Dr. Sarah Chen",
    email: "schen@deepmind.com",
    company: "Google DeepMind",
    role: "Staff Research Engineer",
    message: "Initial inquiry logged into system.",
    ip_hash: "127.0.0.1",
    created_at: new Date().toISOString(),
  },
];

let visitorCountMemory = 1845;

export function getDb(): Database.Database | null {
  if (isInMemoryFallback) return null;
  if (dbInstance) return dbInstance;

  try {
    // Check if running in typical serverless read-only mode or if /tmp should be used
    const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
    const dbPath = isVercel ? path.join("/tmp", "portfolio.db") : path.join(process.cwd(), "portfolio.db");

    dbInstance = new Database(dbPath, { timeout: 4000 });
    dbInstance.pragma("journal_mode = WAL");
    initDb(dbInstance);
    return dbInstance;
  } catch (err) {
    console.warn("SQLite disk DB unavailable, falling back to in-memory safe store for Vercel:", err);
    isInMemoryFallback = true;
    return null;
  }
}

function initDb(db: Database.Database) {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        receipt_id TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        role TEXT,
        message TEXT NOT NULL,
        ip_hash TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS telemetry (
        key TEXT PRIMARY KEY,
        value INTEGER NOT NULL,
        description TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS rate_limits (
        ip_hash TEXT PRIMARY KEY,
        request_count INTEGER DEFAULT 1,
        window_start INTEGER NOT NULL
      );
    `);

    const seedTelemetry = [
      { key: "total_automated_tests", value: 807, description: "Passing unit & integration test suites" },
      { key: "vidura_sloc", value: 22423, description: "Total SLOC in flagship VIDURA agent" },
      { key: "total_production_projects", value: 6, description: "Full-stack and systems engineering repos" },
      { key: "visitor_count", value: 1845, description: "Recruiter & engineer profile visits" },
      { key: "hackathon_placement", value: 1, description: "1st Place among 97 national teams" },
      { key: "cold_auth_latency_ms", value: 800, description: "C-PAM Linux authentication cycle" },
    ];

    const checkStmt = db.prepare("SELECT key FROM telemetry WHERE key = ?");
    const insertStmt = db.prepare(
      "INSERT OR IGNORE INTO telemetry (key, value, description) VALUES (?, ?, ?)"
    );

    const insertMany = db.transaction((items) => {
      for (const item of items) {
        if (!checkStmt.get(item.key)) {
          insertStmt.run(item.key, item.value, item.description);
        }
      }
    });

    insertMany(seedTelemetry);
  } catch (e) {
    console.warn("Could not execute SQLite migrations:", e);
  }
}

export function saveContact(record: {
  receiptId: string;
  name: string;
  email: string;
  company?: string | null;
  role?: string | null;
  message: string;
  ipHash: string;
}) {
  const db = getDb();
  if (db) {
    try {
      const insertStmt = db.prepare(`
        INSERT INTO contacts (receipt_id, name, email, company, role, message, ip_hash)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      insertStmt.run(
        record.receiptId,
        record.name,
        record.email,
        record.company || null,
        record.role || null,
        record.message,
        record.ipHash
      );
      return;
    } catch (e) {
      console.warn("Failed to write to SQLite, saving to in-memory store:", e);
    }
  }

  // In-memory fallback
  memoryContacts.push({
    id: memoryContacts.length + 1,
    receipt_id: record.receiptId,
    name: record.name,
    email: record.email,
    company: record.company,
    role: record.role,
    message: record.message,
    ip_hash: record.ipHash,
    created_at: new Date().toISOString(),
  });
}

export function incrementVisitorCount(): number {
  visitorCountMemory += 1;
  const db = getDb();
  if (db) {
    try {
      const updateStmt = db.prepare(
        "UPDATE telemetry SET value = value + 1, updated_at = CURRENT_TIMESTAMP WHERE key = 'visitor_count'"
      );
      updateStmt.run();
      const row = db.prepare("SELECT value FROM telemetry WHERE key = 'visitor_count'").get() as { value: number } | undefined;
      if (row) return row.value;
    } catch {
      // ignore
    }
  }
  return visitorCountMemory;
}
