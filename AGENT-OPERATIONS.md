# Agent operations

`/tools/marketing/operations` is an internal, authenticated control plane for AxisForge Labs workflow agents. It keeps event intake, opportunities, projects, approvals, and agent-run history together in `data/operations/control-plane.json`.

## Autonomy policy

| Risk class | Policy |
| --- | --- |
| `internal` | Agent can prepare internal artifacts; operator reviews exceptions. |
| `low_risk_external` | Agent prepares the action; pre-approved routine messages may later be sent by a bounded integration. |
| `commercial_commitment` | Founder approves before any send or CRM stage carrying a commitment. |
| `financial`, `legal`, `production` | Never auto-execute. A human must approve and perform the external action. |

The application creates drafts and audit records only. It does not send mail, change a CRM, issue invoices, accept terms, modify credentials, or deploy production changes.

## Event relay

Send normalized events to `POST /api/operations/events`. Use a unique, stable provider event ID as `idempotencyKey`; retrying the same event is safe.

```json
{
  "type": "booking",
  "idempotencyKey": "cal-booking-123",
  "occurredAt": "2026-07-13T18:30:00.000Z",
  "contactEmail": "buyer@example.com",
  "company": "Example Co",
  "payload": {
    "message": "We need an internal lead-routing workflow."
  }
}
```

For the internal dashboard, the existing `MARKETING_DASHBOARD_SECRET` session authorizes requests. For an automation relay, set `OPERATIONS_WEBHOOK_SECRET` and use it only as the `x-operations-webhook-secret` request header. Do not expose it in client-side code.

Before connecting a provider directly, add that provider's signed-webhook verification adapter. The shared secret is appropriate only for a trusted relay such as n8n or Make.com, with the relay itself verifying provider signatures.

## Current workflow behavior

- `booking`, `inbound_message`, and `scope_submission` create/update an opportunity, calculate a transparent rules-based fit score, and queue a founder-reviewed qualification brief.
- `payment` creates a kickoff-stage project, marks a matched opportunity as won, and queues a kickoff package.
- `acceptance` starts the 14-day support window for a matched project and queues a launch follow-up.
- `support_request` queues a bug-versus-change triage item.
- Manual packages support growth, discovery, proposal, delivery, client success, operations, and quality templates.

The first production connection should be run in shadow mode: send real events, inspect the queued output, and approve manually. Expand to low-risk external actions only after reviewing at least 10–20 representative examples per workflow.

## Evaluation gate

`POST /api/operations/evaluations` checks a batch of 10–20 reviewed examples before a workflow receives more autonomy:

```json
{
  "examples": [
    {
      "id": "discovery-001",
      "expectedRisk": "commercial_commitment",
      "actualRisk": "commercial_commitment",
      "hasHumanGate": true,
      "containsUnverifiedClaim": false
    }
  ]
}
```

Use real, redacted workflow examples. A batch only passes a policy check when the risk label is correct, non-internal work has a human gate, and the reviewer has found no unverified claim. Semantic usefulness and client-specific accuracy remain a human review responsibility.
