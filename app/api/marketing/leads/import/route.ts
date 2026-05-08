import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";
import {
  appendEvents,
  loadLeads,
  newId,
  normalizeEmail,
  saveLeads,
} from "@/lib/marketing-store";

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    const row: Record<string, string> = {};
    header.forEach((h, j) => {
      row[h] = cols[j] ?? "";
    });
    rows.push(row);
  }
  return rows;
}

export async function POST(req: Request) {
  const denied = marketingAuthError();
  if (denied) return denied;

  const form = await req.formData();
  const file = form.get("file");
  const source = (form.get("source") as string)?.trim() || "csv-upload";

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  const text = await file.text();
  const rows = parseCsv(text);
  const leads = loadLeads();
  const existing = new Set(leads.map((l) => normalizeEmail(l.email)));
  const now = new Date().toISOString();
  let added = 0;

  for (const row of rows) {
    const email =
      row.email ||
      row["work email"] ||
      row["business email"] ||
      row["e-mail"] ||
      "";
    if (!email.includes("@")) continue;
    const norm = normalizeEmail(email);
    if (existing.has(norm)) continue;
    leads.push({
      id: newId(),
      email: norm,
      name: row.name || row.first_name || "",
      company: row.company || row.organization || "",
      title: row.title || row.role || "",
      source,
      segment: row.segment || row.vertical || "",
      status: "pending",
      createdAt: now,
    });
    existing.add(norm);
    added += 1;
  }

  saveLeads(leads);
  appendEvents([
    {
      id: newId(),
      type: "note",
      meta: { csvImported: added, source },
      at: now,
    },
  ]);

  return NextResponse.json({ ok: true, added, rows: rows.length });
}
