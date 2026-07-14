import { NextResponse } from "next/server";
import { resolveApproval, type ApprovalStatus } from "@/lib/agent-operations";
import { marketingAuthError } from "@/lib/marketing-route-auth";

const RESOLUTIONS: Exclude<ApprovalStatus, "pending">[] = ["approved", "rejected"];

export async function PATCH(req: Request, ctx: { params: { id: string } }) {
  const denied = marketingAuthError();
  if (denied) return denied;

  let body: { status?: Exclude<ApprovalStatus, "pending">; resolutionNote?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.status || !RESOLUTIONS.includes(body.status)) {
    return NextResponse.json({ error: "Invalid approval status" }, { status: 400 });
  }
  if (body.resolutionNote && body.resolutionNote.length > 2_000) {
    return NextResponse.json({ error: "Resolution note is too long" }, { status: 400 });
  }

  const approval = resolveApproval(ctx.params.id, body.status, body.resolutionNote);
  if (!approval) {
    return NextResponse.json({ error: "Approval not found or already resolved" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, approval });
}
