/**
 * Heuristic posting windows for US + Western Europe engagement (business audiences).
 * Not personalized to your followers — use analytics later to refine.
 */

export type SuggestedSlot = {
  label: string;
  /** ISO local-ish description for humans */
  whenUtcApprox: string;
  tzHint: string;
};

/** Next three weekdays starting from `from` with paired US-East + WEU-friendly descriptions */
export function nextLinkedInSlots(from = new Date(), count = 3): SuggestedSlot[] {
  const slots: SuggestedSlot[] = [];
  const d = new Date(from);
  while (slots.length < count) {
    const wd = d.getUTCDay();
    if (wd !== 0 && wd !== 6) {
      slots.push({
        label: `Weekday slot ${slots.length + 1}`,
        whenUtcApprox: `${d.toISOString().slice(0, 10)} — target ~13:30 UTC (morning US East + early afternoon Western Europe overlap)`,
        tzHint:
          "Aim for 08:30–10:30 America/New_York and 14:00–16:00 Europe/Berlin on the same calendar day where possible.",
      });
    }
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return slots;
}

export const platformHints = {
  linkedin: nextLinkedInSlots()[0]?.tzHint ?? "",
  x: "Short windows: weekday mornings US-East; experiment with EU lunch (12:00–13:00 CET).",
  instagram:
    "Often evenings local to audience; test 18:00–21:00 CET mid-week plus US-East lunch.",
  facebook:
    "Similar to LinkedIn for B2B; slightly broader daytime windows on weekdays.",
} as const;
