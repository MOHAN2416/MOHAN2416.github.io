import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Candidate or recruiter name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json({ error: "Message must be at least 5 characters long." }, { status: 400 });
    }

    // IP Fingerprint for Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);

    const db = getDb();
    const now = Math.floor(Date.now() / 1000);
    const windowSeconds = 600; // 10 minute window

    const rateRow = db.prepare("SELECT * FROM rate_limits WHERE ip_hash = ?").get(ipHash) as
      | { ip_hash: string; request_count: number; window_start: number }
      | undefined;

    if (rateRow) {
      if (now - rateRow.window_start < windowSeconds) {
        if (rateRow.request_count >= 8) {
          return NextResponse.json(
            { error: "Rate limit reached. Please wait a few minutes before submitting another message." },
            { status: 429 }
          );
        }
        db.prepare("UPDATE rate_limits SET request_count = request_count + 1 WHERE ip_hash = ?").run(ipHash);
      } else {
        db.prepare("UPDATE rate_limits SET request_count = 1, window_start = ? WHERE ip_hash = ?").run(now, ipHash);
      }
    } else {
      db.prepare("INSERT INTO rate_limits (ip_hash, request_count, window_start) VALUES (?, 1, ?)").run(ipHash, now);
    }

    // Unique verification receipt ID
    const randomHex = crypto.randomBytes(4).toString("hex").toUpperCase();
    const receiptId = `MMS-REC-${new Date().getFullYear()}-${randomHex}`;

    const insertStmt = db.prepare(`
      INSERT INTO contacts (receipt_id, name, email, company, role, message, ip_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      receiptId,
      name.trim(),
      email.trim(),
      company ? company.trim() : null,
      role ? role.trim() : null,
      message.trim(),
      ipHash
    );

    return NextResponse.json(
      {
        success: true,
        receiptId,
        timestamp: new Date().toISOString(),
        message: "Your message has been securely recorded into Mohan's portfolio database. A response will be dispatched promptly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json({ error: "Internal server error occurred while processing message." }, { status: 500 });
  }
}
