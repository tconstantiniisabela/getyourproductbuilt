import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export type OperationEventType =
  | "booking"
  | "inbound_message"
  | "scope_submission"
  | "payment"
  | "acceptance"
  | "support_request";

export type ApprovalRisk =
  | "internal"
  | "low_risk_external"
  | "commercial_commitment"
  | "financial"
  | "legal"
  | "production";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type OperationEvent = {
  id: string;
  type: OperationEventType;
  idempotencyKey: string;
  occurredAt: string;
  receivedAt: string;
  contactEmail?: string;
  company?: string;
  payload: Record<string, string>;
};

export type OpportunityStage = "new" | "qualified" | "proposal" | "won" | "lost";

export type Opportunity = {
  id: string;
  contactEmail?: string;
  company?: string;
  source: OperationEventType;
  stage: OpportunityStage;
  fitScore?: number;
  summary?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectStage = "kickoff" | "in_progress" | "acceptance" | "support" | "complete";

export type Project = {
  id: string;
  opportunityId?: string;
  name: string;
  stage: ProjectStage;
  depositReceivedAt?: string;
  supportEndsAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type Approval = {
  id: string;
  risk: ApprovalRisk;
  status: ApprovalStatus;
  title: string;
  draft: string;
  sourceEventId?: string;
  opportunityId?: string;
  projectId?: string;
  createdAt: string;
  resolvedAt?: string;
  resolutionNote?: string;
};

export type AgentRun = {
  id: string;
  workflow: "growth" | "discovery" | "proposal" | "delivery" | "client_success" | "operations" | "quality";
  status: "completed" | "needs_approval";
  summary: string;
  sourceEventId?: string;
  createdAt: string;
};

export type EvaluationExample = {
  id: string;
  expectedRisk: ApprovalRisk;
  actualRisk: ApprovalRisk;
  hasHumanGate: boolean;
  containsUnverifiedClaim: boolean;
};

type OperationData = {
  events: OperationEvent[];
  opportunities: Opportunity[];
  projects: Project[];
  approvals: Approval[];
  runs: AgentRun[];
};

const MAX_FIELD_LENGTH = 2_000;
const MAX_PAYLOAD_FIELDS = 20;
const MAX_EVENTS = 2_000;

function dataPath(): string {
  return path.join(process.cwd(), "data", "operations", "control-plane.json");
}

function readData(): OperationData {
  const file = dataPath();
  if (!fs.existsSync(file)) {
    return { events: [], opportunities: [], projects: [], approvals: [], runs: [] };
  }

  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as OperationData;
  } catch {
    throw new Error("Operations data is unreadable. Restore data/operations/control-plane.json from a backup.");
  }
}

function writeData(data: OperationData): void {
  const file = dataPath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporaryFile = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporaryFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  fs.renameSync(temporaryFile, file);
}

function now(): string {
  return new Date().toISOString();
}

function newId(): string {
  return crypto.randomUUID();
}

function sanitizeText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, MAX_FIELD_LENGTH) : undefined;
}

function sanitizePayload(payload: unknown): Record<string, string> {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return {};
  const entries = Object.entries(payload).slice(0, MAX_PAYLOAD_FIELDS);
  return Object.fromEntries(
    entries.flatMap(([key, value]) => {
      const cleanKey = key.replace(/[^a-zA-Z0-9_.-]/g, "").slice(0, 80);
      const cleanValue = sanitizeText(value);
      return cleanKey && cleanValue ? [[cleanKey, cleanValue]] : [];
    }),
  );
}

function findOpportunity(data: OperationData, contactEmail?: string, company?: string): Opportunity | undefined {
  const normalizedEmail = contactEmail?.toLowerCase();
  const normalizedCompany = company?.toLowerCase();
  return data.opportunities.find(
    (opportunity) =>
      (normalizedEmail && opportunity.contactEmail?.toLowerCase() === normalizedEmail) ||
      (normalizedCompany && opportunity.company?.toLowerCase() === normalizedCompany),
  );
}

function createRun(
  data: OperationData,
  workflow: AgentRun["workflow"],
  status: AgentRun["status"],
  summary: string,
  sourceEventId?: string,
): AgentRun {
  const run = { id: newId(), workflow, status, summary, sourceEventId, createdAt: now() };
  data.runs.push(run);
  return run;
}

function addApproval(
  data: OperationData,
  approval: Omit<Approval, "id" | "status" | "createdAt">,
): Approval {
  const item: Approval = { id: newId(), status: "pending", createdAt: now(), ...approval };
  data.approvals.push(item);
  return item;
}

function scoreFit(payload: Record<string, string>): number {
  const text = Object.values(payload).join(" ").toLowerCase();
  let score = 50;
  if (/(automation|workflow|internal tool|integration|lead|report)/.test(text)) score += 20;
  if (/(platform rebuild|transformation|unlimited|autonomous customer)/.test(text)) score -= 35;
  if (/(budget|timeline|approval|stakeholder)/.test(text)) score += 10;
  return Math.max(0, Math.min(100, score));
}

function createOpportunityForEvent(data: OperationData, event: OperationEvent): Opportunity {
  const existing = findOpportunity(data, event.contactEmail, event.company);
  if (existing) {
    existing.updatedAt = now();
    return existing;
  }

  const opportunity: Opportunity = {
    id: newId(),
    contactEmail: event.contactEmail,
    company: event.company,
    source: event.type,
    stage: "new",
    createdAt: now(),
    updatedAt: now(),
  };
  data.opportunities.push(opportunity);
  return opportunity;
}

function processEvent(data: OperationData, event: OperationEvent): void {
  if (event.type === "booking" || event.type === "inbound_message" || event.type === "scope_submission") {
    const opportunity = createOpportunityForEvent(data, event);
    const fitScore = scoreFit(event.payload);
    opportunity.fitScore = fitScore;
    opportunity.summary =
      event.payload.problem ?? event.payload.message ?? event.payload.notes ?? "New inbound opportunity awaiting review.";
    opportunity.updatedAt = now();

    addApproval(data, {
      risk: "commercial_commitment",
      title: `Review ${event.type.replace("_", " ")} from ${opportunity.company ?? opportunity.contactEmail ?? "new contact"}`,
      draft: `Fit score: ${fitScore}/100\n\nSummary: ${opportunity.summary}\n\nRecommended next step: review fit, then approve a discovery response or decline.`,
      sourceEventId: event.id,
      opportunityId: opportunity.id,
    });
    createRun(data, event.type === "scope_submission" ? "proposal" : "discovery", "needs_approval", "Created a founder-reviewed qualification brief.", event.id);
    return;
  }

  if (event.type === "payment") {
    const opportunity = findOpportunity(data, event.contactEmail, event.company);
    const projectName = event.payload.projectName ?? event.company ?? "Client project";
    const project: Project = {
      id: newId(),
      opportunityId: opportunity?.id,
      name: projectName,
      stage: "kickoff",
      depositReceivedAt: event.payload.paymentKind === "deposit" ? event.receivedAt : undefined,
      createdAt: now(),
      updatedAt: now(),
    };
    data.projects.push(project);
    if (opportunity) {
      opportunity.stage = "won";
      opportunity.updatedAt = now();
    }
    addApproval(data, {
      risk: "low_risk_external",
      title: `Approve kickoff package for ${project.name}`,
      draft: `Deposit/payment event received. Prepare the access checklist, kickoff message, project channel, and first milestone plan. Do not send access requests until approved.`,
      sourceEventId: event.id,
      opportunityId: opportunity?.id,
      projectId: project.id,
    });
    createRun(data, "delivery", "needs_approval", "Created a kickoff package after the payment event.", event.id);
    return;
  }

  if (event.type === "acceptance") {
    const project = data.projects.find((item) => item.name.toLowerCase() === (event.payload.projectName ?? "").toLowerCase());
    if (project) {
      const supportEnds = new Date(event.receivedAt);
      supportEnds.setUTCDate(supportEnds.getUTCDate() + 14);
      project.stage = "support";
      project.supportEndsAt = supportEnds.toISOString();
      project.updatedAt = now();
    }
    addApproval(data, {
      risk: "low_risk_external",
      title: `Approve launch follow-up${project ? ` for ${project.name}` : ""}`,
      draft: `Acceptance was recorded. Confirm launch support, communicate the support-window end date, and schedule a testimonial request only after a successful outcome.`,
      sourceEventId: event.id,
      projectId: project?.id,
    });
    createRun(data, "client_success", "needs_approval", "Started the acceptance and support-window workflow.", event.id);
    return;
  }

  const project = data.projects.find((item) => item.name.toLowerCase() === (event.payload.projectName ?? "").toLowerCase());
  addApproval(data, {
    risk: "internal",
    title: `Triage support request${project ? ` for ${project.name}` : ""}`,
    draft: `Classify this request against the written scope: broken behavior is a bug; new capability is a change request. Draft a response and escalate scope ambiguity.`,
    sourceEventId: event.id,
    projectId: project?.id,
  });
  createRun(data, "client_success", "needs_approval", "Queued support triage with bug-versus-change guidance.", event.id);
}

export function listOperations(): OperationData {
  return readData();
}

export function ingestOperationEvent(input: {
  type: OperationEventType;
  idempotencyKey: string;
  occurredAt?: string;
  contactEmail?: string;
  company?: string;
  payload?: unknown;
}): { event: OperationEvent; duplicate: boolean } {
  const data = readData();
  const existing = data.events.find((event) => event.idempotencyKey === input.idempotencyKey);
  if (existing) return { event: existing, duplicate: true };

  const event: OperationEvent = {
    id: newId(),
    type: input.type,
    idempotencyKey: input.idempotencyKey.slice(0, 160),
    occurredAt: input.occurredAt && !Number.isNaN(Date.parse(input.occurredAt)) ? input.occurredAt : now(),
    receivedAt: now(),
    contactEmail: sanitizeText(input.contactEmail)?.toLowerCase(),
    company: sanitizeText(input.company),
    payload: sanitizePayload(input.payload),
  };
  data.events = [...data.events, event].slice(-MAX_EVENTS);
  processEvent(data, event);
  writeData(data);
  return { event, duplicate: false };
}

export function resolveApproval(
  id: string,
  status: Exclude<ApprovalStatus, "pending">,
  resolutionNote?: string,
): Approval | null {
  const data = readData();
  const approval = data.approvals.find((item) => item.id === id);
  if (!approval || approval.status !== "pending") return null;

  approval.status = status;
  approval.resolvedAt = now();
  approval.resolutionNote = sanitizeText(resolutionNote);
  createRun(
    data,
    approval.risk === "financial" ? "operations" : approval.projectId ? "delivery" : "proposal",
    "completed",
    `${status === "approved" ? "Approved" : "Rejected"}: ${approval.title}`,
  );
  writeData(data);
  return approval;
}

export function createApproval(input: {
  risk: ApprovalRisk;
  title: string;
  draft: string;
  opportunityId?: string;
  projectId?: string;
  workflow?: AgentRun["workflow"];
}): Approval {
  const data = readData();
  const approval = addApproval(data, {
    risk: input.risk,
    title: sanitizeText(input.title) ?? "Untitled approval",
    draft: sanitizeText(input.draft) ?? "",
    opportunityId: input.opportunityId,
    projectId: input.projectId,
  });
  if (input.workflow) {
    createRun(data, input.workflow, "needs_approval", `Prepared a draft package: ${approval.title}`);
  }
  writeData(data);
  return approval;
}

export function buildOperationsBrief(referenceDate = new Date()): string {
  const data = readData();
  const nowMs = referenceDate.getTime();
  const activeOpportunities = data.opportunities.filter((item) => !["won", "lost"].includes(item.stage));
  const staleOpportunities = activeOpportunities.filter(
    (item) => nowMs - Date.parse(item.updatedAt) > 5 * 24 * 60 * 60 * 1_000,
  );
  const activeProjects = data.projects.filter((item) => item.stage !== "complete");
  const supportExpiring = activeProjects.filter(
    (item) => item.supportEndsAt && Date.parse(item.supportEndsAt) - nowMs <= 3 * 24 * 60 * 60 * 1_000,
  );
  const pendingByRisk = data.approvals
    .filter((item) => item.status === "pending")
    .reduce<Record<string, number>>((counts, item) => {
      counts[item.risk] = (counts[item.risk] ?? 0) + 1;
      return counts;
    }, {});
  const paymentCents = data.events
    .filter((item) => item.type === "payment")
    .reduce((sum, item) => {
      const amount = Number.parseInt(item.payload.amountCents ?? "0", 10);
      return sum + (Number.isFinite(amount) ? amount : 0);
    }, 0);

  return [
    "## Weekly operations brief",
    "",
    `- Active opportunities: ${activeOpportunities.length}`,
    `- Stale opportunities (no activity in 5+ days): ${staleOpportunities.length}`,
    `- Active projects: ${activeProjects.length}`,
    `- Support windows ending in 3 days: ${supportExpiring.length}`,
    `- Recorded payment volume: $${(paymentCents / 100).toFixed(2)}`,
    `- Pending approvals: ${Object.entries(pendingByRisk).map(([risk, count]) => `${risk} ${count}`).join(", ") || "none"}`,
    "",
    "Suggested review:",
    staleOpportunities.length ? "- Review stale opportunities and decide whether to follow up, re-engage later, or close-lost." : "- No stale opportunity follow-up is due.",
    supportExpiring.length ? "- Confirm that expiring support-window issues are triaged before the deadline." : "- No support windows are close to expiry.",
    "- Review every commercial, financial, legal, and production approval before acting.",
  ].join("\n");
}

/**
 * Validates a 10–20 example review batch before autonomy is expanded. This is
 * deliberately policy-focused: semantic output quality still requires human
 * review of real examples from the workflow being automated.
 */
export function evaluateApprovalExamples(examples: EvaluationExample[]): {
  validBatch: boolean;
  passed: number;
  failed: number;
  passRate: number;
  failures: string[];
} {
  const validBatch = examples.length >= 10 && examples.length <= 20;
  const failures: string[] = [];
  let passed = 0;
  for (const example of examples) {
    const passes =
      example.expectedRisk === example.actualRisk &&
      (example.actualRisk === "internal" || example.hasHumanGate) &&
      !example.containsUnverifiedClaim;
    if (passes) {
      passed += 1;
    } else {
      failures.push(example.id);
    }
  }
  return {
    validBatch,
    passed,
    failed: examples.length - passed,
    passRate: examples.length ? passed / examples.length : 0,
    failures,
  };
}
