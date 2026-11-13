import { NextRequest, NextResponse } from "next/server";
import { saveContact } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role, message } = body;

    // Strict input validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Recruiter or contact name is required." }, { status: 400 });
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

    // Unique verification receipt ID
    const randomHex = crypto.randomBytes(4).toString("hex").toUpperCase();
    const receiptId = `MMS-REC-${new Date().getFullYear()}-${randomHex}`;

    // Save contact safely (Vercel read-only safe)
    saveContact({
      receiptId,
      name: name.trim(),
      email: email.trim(),
      company: company ? company.trim() : null,
      role: role ? role.trim() : null,
      message: message.trim(),
      ipHash,
    });

    // Optional Resend email dispatch if configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Portfolio Recruiter <onboarding@resend.dev>",
            to: ["mohana21062007@gmail.com"],
            subject: `[Portfolio Inquiry] ${name} from ${company || "Prospective Team"}`,
            text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nRole: ${role || "N/A"}\nMessage:\n${message}\n\nReceipt: ${receiptId}`,
          }),
        });
      } catch (err) {
        console.warn("Resend email dispatch error (non-fatal):", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        status: "received",
        receiptId,
        timestamp: new Date().toISOString(),
        message: "Your message has been sent successfully. Mohan will get back to you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json({ error: "Internal server error occurred while processing message." }, { status: 500 });
  }
}
