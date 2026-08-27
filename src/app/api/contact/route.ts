import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const CONTACTS_PATH = path.join(process.cwd(), "data", "contacts.json");

/**
 * POST /api/contact
 * Best-effort local log. Primary delivery is WhatsApp + Email from the client.
 * On Vercel (read-only FS) this still returns success so the form never fails.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const submission = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "",
      projectType: projectType || "",
      message,
      createdAt: new Date().toISOString(),
    };

    try {
      let contacts: typeof submission[] = [];
      try {
        const data = await fs.readFile(CONTACTS_PATH, "utf-8");
        contacts = JSON.parse(data);
      } catch {
        // File may not exist yet
      }

      contacts.push(submission);
      await fs.mkdir(path.dirname(CONTACTS_PATH), { recursive: true });
      await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts, null, 2));
    } catch {
      // Expected on serverless/read-only hosts — client still opens WhatsApp + Email
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
