import { NextRequest, NextResponse } from "next/server";
import { incrementVisitorCount, getVisitorCount, getTelemetryRows } from "@/lib/db";
import { CORE_METRICS } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const shouldIncrement = request.nextUrl.searchParams.get("view") !== "false";
    const visitorCount = shouldIncrement ? incrementVisitorCount() : getVisitorCount();
    const telemetryRows = getTelemetryRows();

    return NextResponse.json({
      status: "HEALTHY",
      platform: "Vercel Serverless / Next.js 15",
      timestamp: new Date().toISOString(),
      visitorCount,
      metrics: CORE_METRICS,
      telemetry: telemetryRows,
      systemSpecs: {
        nodeVersion: process.version,
        platform: process.platform,
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
