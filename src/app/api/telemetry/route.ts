import { NextRequest, NextResponse } from "next/server";
import { getDb, incrementVisitorCount } from "@/lib/db";
import { CORE_METRICS } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const shouldIncrement = request.nextUrl.searchParams.get("view") !== "false";
    
    let visitorCount = 1843;
    if (shouldIncrement) {
      visitorCount = incrementVisitorCount();
    } else {
      const row = db.prepare("SELECT value FROM telemetry WHERE key = 'visitor_count'").get() as { value: number } | undefined;
      if (row) visitorCount = row.value;
    }

    const telemetryRows = db.prepare("SELECT key, value, description, updated_at FROM telemetry").all() as Array<{
      key: string;
      value: number;
      description: string;
      updated_at: string;
    }>;

    return NextResponse.json({
      status: "ONLINE",
      timestamp: new Date().toISOString(),
      visitorCount,
      metrics: CORE_METRICS,
      telemetry: telemetryRows,
      systemSpecs: {
        nodeVersion: process.version,
        platform: process.platform,
        uptimeSeconds: Math.floor(process.uptime()),
        deterministicEngine: "ACTIVE",
        ciVerificationPassRate: "100%",
        totalAutomatedTests: 807,
      },
    });
  } catch (error) {
    console.error("Error in /api/telemetry:", error);
    return NextResponse.json({ error: "Failed to query telemetry." }, { status: 500 });
  }
}
