import { NextResponse } from "next/server";
import {
  evaluateApprovalExamples,
  type ApprovalRisk,
  type EvaluationExample,
} from "@/lib/agent-operations";
import { marketingAuthError } from "@/lib/marketing-route-auth";

const RISKS: ApprovalRisk[] = [
  "internal",
  "low_risk_external",
  "commercial_commitment",
  "financial",
  "legal",
  "production",
];

function isExample(value: unknown): value is EvaluationExample {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const example = value as Partial<EvaluationExample>;
  return (
    typeof example.id === "string" &&
    RISKS.includes(example.expectedRisk as ApprovalRisk) &&
    RISKS.includes(example.actualRisk as ApprovalRisk) &&
    typeof example.hasHumanGate === "boolean" &&
    typeof example.containsUnverifiedClaim === "boolean"
  );
}

export async function POST(req: Request) {
  const denied = marketingAuthError();
  if (denied) return denied;

  let body: { examples?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body.examples) || !body.examples.every(isExample)) {
    return NextResponse.json({ error: "Examples do not match the evaluation schema" }, { status: 400 });
  }
  const result = evaluateApprovalExamples(body.examples);
  if (!result.validBatch) {
    return NextResponse.json({ error: "Provide 10–20 representative examples", result }, { status: 400 });
  }
  return NextResponse.json({ ok: true, result });
}
