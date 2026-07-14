"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Approval = {
  id: string;
  risk: string;
  status: string;
  title: string;
  draft: string;
  createdAt: string;
};

type OperationsBoot = {
  events: Array<{ id: string; type: string; company?: string; contactEmail?: string; receivedAt: string }>;
  opportunities: Array<{ id: string; company?: string; contactEmail?: string; stage: string; fitScore?: number; summary?: string }>;
  projects: Array<{ id: string; name: string; stage: string; depositReceivedAt?: string; supportEndsAt?: string }>;
  approvals: Approval[];
  runs: Array<{ id: string; workflow: string; status: string; summary: string; createdAt: string }>;
};

const fieldClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

async function errorMessage(response: Response): Promise<string> {
  const body = (await response.json().catch(() => null)) as { error?: string } | null;
  return body?.error ?? response.statusText;
}

export function OperationsDashboard() {
  const [data, setData] = useState<OperationsBoot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [eventType, setEventType] = useState("booking");
  const [eventCompany, setEventCompany] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const [eventContext, setEventContext] = useState("");
  const [workflow, setWorkflow] = useState("discovery");
  const [workflowTitle, setWorkflowTitle] = useState("");
  const [workflowContext, setWorkflowContext] = useState("");
  const [brief, setBrief] = useState<string | null>(null);

  const load = useCallback(async () => {
    const response = await fetch("/api/operations/bootstrap", { credentials: "include" });
    if (!response.ok) throw new Error(await errorMessage(response));
    setData((await response.json()) as OperationsBoot);
  }, []);

  useEffect(() => {
    load().catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to load operations."));
  }, [load]);

  async function createEvent(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const response = await fetch("/api/operations/events", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: eventType,
        idempotencyKey: `${eventType}-${crypto.randomUUID()}`,
        company: eventCompany || undefined,
        contactEmail: eventEmail || undefined,
        payload: { message: eventContext, projectName: eventCompany },
      }),
    });
    if (!response.ok) {
      setError(await errorMessage(response));
      return;
    }
    setEventCompany("");
    setEventEmail("");
    setEventContext("");
    setNotice("Event recorded. The appropriate workflow created its approval item.");
    await load();
  }

  async function createWorkflow(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const response = await fetch("/api/operations/workflows", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workflow, title: workflowTitle, context: workflowContext }),
    });
    if (!response.ok) {
      setError(await errorMessage(response));
      return;
    }
    setWorkflowTitle("");
    setWorkflowContext("");
    setNotice("Draft package queued for approval.");
    await load();
  }

  async function resolve(id: string, status: "approved" | "rejected") {
    setError(null);
    const response = await fetch(`/api/operations/approvals/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      setError(await errorMessage(response));
      return;
    }
    setNotice(`Approval ${status}.`);
    await load();
  }

  async function generateBrief() {
    setError(null);
    const response = await fetch("/api/operations/brief", { credentials: "include" });
    if (!response.ok) {
      setError(await errorMessage(response));
      return;
    }
    const body = (await response.json()) as { brief: string };
    setBrief(body.brief);
  }

  const pendingApprovals = data?.approvals.filter((approval) => approval.status === "pending") ?? [];

  return (
    <main className="container max-w-6xl space-y-8 py-12 pb-24">
      <header className="flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Internal — AxisForge Labs</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Agent operations</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Shared pipeline, delivery, client-success, and operations control plane. Agents prepare work; approval
            policies govern external, financial, legal, and production actions.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/tools/marketing">Growth dashboard</Link>
        </Button>
      </header>

      {error ? <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
      {notice ? <p className="rounded-md border border-primary/30 bg-primary/5 p-3 text-sm">{notice}</p> : null}

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Pending approvals", pendingApprovals.length],
          ["Open opportunities", data?.opportunities.filter((item) => !["won", "lost"].includes(item.stage)).length ?? 0],
          ["Active projects", data?.projects.filter((item) => item.stage !== "complete").length ?? 0],
          ["Recent agent runs", data?.runs.length ?? 0],
        ].map(([label, value]) => (
          <Card key={String(label)}>
            <CardContent className="p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
              <p className="mt-2 text-3xl font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Record a business event</CardTitle>
            <CardDescription>Use this endpoint target for Cal.com, Stripe, forms, email, and support integrations.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={createEvent}>
              <select className={fieldClass} value={eventType} onChange={(event) => setEventType(event.target.value)}>
                <option value="booking">Booking</option>
                <option value="inbound_message">Inbound message</option>
                <option value="scope_submission">Scope submission</option>
                <option value="payment">Payment</option>
                <option value="acceptance">Acceptance</option>
                <option value="support_request">Support request</option>
              </select>
              <input className={fieldClass} value={eventCompany} onChange={(event) => setEventCompany(event.target.value)} placeholder="Company or project name" />
              <input className={fieldClass} type="email" value={eventEmail} onChange={(event) => setEventEmail(event.target.value)} placeholder="Contact email (optional)" />
              <textarea className={`${fieldClass} min-h-28`} value={eventContext} onChange={(event) => setEventContext(event.target.value)} placeholder="Verified context, request, or note" required />
              <Button type="submit">Record event and run workflow</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prepare an agent work package</CardTitle>
            <CardDescription>Creates an auditable draft in the approval queue. It does not perform the external action.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={createWorkflow}>
              <select className={fieldClass} value={workflow} onChange={(event) => setWorkflow(event.target.value)}>
                <option value="growth">Growth</option>
                <option value="discovery">Discovery</option>
                <option value="proposal">Scope and proposal</option>
                <option value="delivery">Kickoff and delivery</option>
                <option value="client_success">Client success</option>
                <option value="operations">Finance and operations</option>
                <option value="quality">Quality</option>
              </select>
              <input className={fieldClass} value={workflowTitle} onChange={(event) => setWorkflowTitle(event.target.value)} placeholder="Action title" required />
              <textarea className={`${fieldClass} min-h-28`} value={workflowContext} onChange={(event) => setWorkflowContext(event.target.value)} placeholder="Verified operating context" required />
              <Button type="submit">Create draft package</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Weekly operating brief</h2>
            <p className="mt-1 text-sm text-muted-foreground">Deterministic summary of pipeline hygiene, capacity, support windows, payments, and pending risk.</p>
          </div>
          <Button variant="outline" onClick={generateBrief}>Generate brief</Button>
        </div>
        {brief ? <pre className="mt-4 whitespace-pre-wrap rounded-md border border-border bg-muted/20 p-5 font-sans text-sm leading-relaxed">{brief}</pre> : null}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Approval queue</h2>
        <p className="mt-1 text-sm text-muted-foreground">No external commitment should bypass this queue unless its risk policy explicitly permits it.</p>
        <div className="mt-4 space-y-3">
          {pendingApprovals.length === 0 ? (
            <p className="rounded-md border border-border p-4 text-sm text-muted-foreground">No pending approvals.</p>
          ) : pendingApprovals.map((approval) => (
            <Card key={approval.id}>
              <CardContent className="p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">{approval.risk.replaceAll("_", " ")}</p>
                    <h3 className="mt-1 font-semibold">{approval.title}</h3>
                    <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">{approval.draft}</pre>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button size="sm" onClick={() => resolve(approval.id, "approved")}>Approve</Button>
                    <Button size="sm" variant="outline" onClick={() => resolve(approval.id, "rejected")}>Reject</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
