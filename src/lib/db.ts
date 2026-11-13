import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "portfolio.db");

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(dbPath);
    dbInstance.pragma("journal_mode = WAL");
    initDb(dbInstance);
  }
  return dbInstance;
}

function initDb(db: Database.Database) {
  // Contacts table
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

  // Telemetry & metrics table
  db.exec(`
    CREATE TABLE IF NOT EXISTS telemetry (
      key TEXT PRIMARY KEY,
      value INTEGER NOT NULL,
      description TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Rate limiting table
  db.exec(`
    CREATE TABLE IF NOT EXISTS rate_limits (
      ip_hash TEXT PRIMARY KEY,
      request_count INTEGER DEFAULT 1,
      window_start INTEGER NOT NULL
    );
  `);

  // Seed default telemetry if not present
  const seedTelemetry = [
    { key: "total_automated_tests", value: 807, description: "Passing unit & integration test suites" },
    { key: "vidura_sloc", value: 22423, description: "Total SLOC in flagship VIDURA agent" },
    { key: "total_production_projects", value: 6, description: "Full-stack and systems engineering repos" },
    { key: "visitor_count", value: 1842, description: "Recruiter & engineer profile visits" },
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
}

export function incrementVisitorCount(): number {
  const db = getDb();
  const updateStmt = db.prepare(
    "UPDATE telemetry SET value = value + 1, updated_at = CURRENT_TIMESTAMP WHERE key = 'visitor_count'"
  );
  updateStmt.run();
  
  const row = db.prepare("SELECT value FROM telemetry WHERE key = 'visitor_count'").get() as { value: number } | undefined;
  return row ? row.value : 1843;
}
