import { NextResponse } from "next/server";
import {
  createApproval,
  type AgentRun,
  type ApprovalRisk,
} from "@/lib/agent-operations";
import { aiOperationsDraft } from "@/lib/marketing-ai";
import { marketingAuthError } from "@/lib/marketing-route-auth";

type WorkflowRequest = {
  workflow?: AgentRun["workflow"];
  title?: string;
  context?: string;
  opportunityId?: string;
  projectId?: string;
};

const WORKFLOW_RISKS: Record<AgentRun["workflow"], ApprovalRisk> = {
  growth: "low_risk_external",
  discovery: "commercial_commitment",
  proposal: "commercial_commitment",
  delivery: "low_risk_external",
  client_success: "low_risk_external",
  operations: "financial",
  quality: "internal",
};

const WORKFLOW_TEMPLATES: Record<AgentRun["workflow"], string> = {
  growth:
    "Draft a concise, personalized next step. Use only verified company context, honor opt-outs and cadence caps, and do not claim an outcome that is not evidenced.",
  discovery:
    "Create a discovery brief: stated problem, systems involved, approval owner, success signal, unknowns, fit risks, and recommended next question. Do not promise scope or timeline.",
  proposal:
    "Draft a bounded proposal outline: problem, in-scope work, exclusions, integrations, approval gate, acceptance criteria, timeline assumptions, and change-order boundary. Do not send without founder approval.",
  delivery:
    "Prepare a kickoff or delivery package: access checklist, milestone plan, risks, client update, QA checklist, and handoff requirements. Do not request credentials or deploy.",
  client_success:
    "Draft a status, support, or expansion response. Distinguish a defect from a new requested capability and escalate scope ambiguity.",
  operations:
    "Prepare an internal finance/capacity brief. Reconcile evidence, identify exceptions, and draft—not execute—financial or vendor actions.",
  quality:
    "Turn the provided scope into happy-path and edge-case checks. Include a human-approval verification and a fallback for an unavailable dependency.",
};

export async function POST(req: Request) {
  const denied = marketingAuthError();
  if (denied) return denied;

  let body: WorkflowRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const workflow = body.workflow;
  if (!workflow || !(workflow in WORKFLOW_TEMPLATES)) {
    return NextResponse.json({ error: "Invalid workflow" }, { status: 400 });
  }
  const title = body.title?.trim();
  const context = body.context?.trim();
  if (!title || !context || title.length > 180 || context.length > 4_000) {
    return NextResponse.json({ error: "A title and concise context are required" }, { status: 400 });
  }

  let draft = `${WORKFLOW_TEMPLATES[workflow]}\n\nContext:\n${context}`;
  try {
    draft = (await aiOperationsDraft(workflow, WORKFLOW_TEMPLATES[workflow], context)) ?? draft;
  } catch {
    // The deterministic template remains a safe fallback when the model is unavailable.
  }

  const approval = createApproval({
    risk: WORKFLOW_RISKS[workflow],
    title,
    draft,
    opportunityId: body.opportunityId,
    projectId: body.projectId,
    workflow,
  });
  return NextResponse.json({ ok: true, approval }, { status: 201 });
}
