import { site, siteOrigin } from "@/lib/site";
import { marketingPackages, marketingSiteSummary, marketingVoice } from "@/lib/marketing";

export type WeeklyBrief = {
  linkedin: { title: string; body: string; suggestedSlotLabel: string }[];
  meta: string;
};

function fallbackWeeklyLinkedIn(promotionalCount: 1 | 2): WeeklyBrief {
  const slots = ["Post A (thought leadership)", "Post B (thought leadership)", "Post C (AxisForge Labs CTA)"];
  const promoLines = [
    `Why fixed-scope builds beat open-ended retainers when procurement needs a clean quote.`,
    `Three packages (${marketingPackages.map((p) => p.price).join(", ")})—pick the size of the problem, not the size of the agency.`,
  ];
  const tlBodies = [
    `AI isn’t a strategy slide—it’s a workflow change. We start from the decision a human makes today and ask what evidence the software needs before it acts.`,
    `Good PM discipline on small builds: one definition of done, visible checkpoints, and scope frozen after kickoff so leadership isn’t surprised by “Phase 7.”`,
  ];

  const posts = [];
  if (promotionalCount === 1) {
    posts.push({
      title: slots[0],
      body: tlBodies[0],
      suggestedSlotLabel: slots[0],
    });
    posts.push({
      title: slots[1],
      body: tlBodies[1],
      suggestedSlotLabel: slots[1],
    });
    posts.push({
      title: slots[2],
      body: `${promoLines[0]}\n\n${promoLines[1]}\n\nBook a short intro: ${site.calcomUrl}\n${siteOrigin()}`,
      suggestedSlotLabel: slots[2],
    });
  } else {
    posts.push({
      title: "Post A — AxisForge Labs services",
      body: `${promoLines[0]}\n\n${marketingSiteSummary()}`,
      suggestedSlotLabel: "Post A",
    });
    posts.push({
      title: "Post B — AI / PM",
      body: tlBodies[0],
      suggestedSlotLabel: "Post B",
    });
    posts.push({
      title: "Post C — AxisForge Labs proof",
      body: `${promoLines[1]}\n\nIf this resonates, book a short intro: ${site.calcomUrl}`,
      suggestedSlotLabel: "Post C",
    });
  }

  return {
    linkedin: posts,
    meta: `Fallback drafts (set OPENAI_API_KEY for richer variants). Voice: ${marketingVoice.pronouns}`,
  };
}

export async function generateWeeklyLinkedIn(opts: {
  promotionalCount: 1 | 2;
  apiKey?: string;
}): Promise<WeeklyBrief> {
  const key = opts.apiKey ?? process.env.OPENAI_API_KEY;
  if (!key) return fallbackWeeklyLinkedIn(opts.promotionalCount);

  const sys = [
    "You write LinkedIn posts for AxisForge Labs.",
    marketingVoice.pronouns,
    marketingVoice.topicsMix,
    `Avoid: ${marketingVoice.avoid.join("; ")}.`,
    "Exactly three posts. Two posts lean AI + product management insight; the remainder promote AxisForge Labs fixed-scope builds and link/booking CTA.",
    opts.promotionalCount === 2
      ? "Two posts must clearly advertise AxisForge Labs services and invite booking."
      : "Exactly one post must advertise AxisForge Labs services with CTA.",
    "Use short paragraphs and optional bullets; no hashtags spam.",
    marketingSiteSummary(),
  ].join("\n");

  const user = "Return JSON: {\"posts\":[{\"title\":\"\",\"body\":\"\"}]}";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        { role: "system", content: sys },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${t}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("OpenAI returned empty content");

  const parsed = JSON.parse(raw) as { posts?: { title: string; body: string }[] };
  const posts = parsed.posts ?? [];
  if (posts.length !== 3) {
    return fallbackWeeklyLinkedIn(opts.promotionalCount);
  }

  return {
    linkedin: posts.map((p, i) => ({
      title: p.title || `Post ${i + 1}`,
      body: p.body,
      suggestedSlotLabel: `Post ${i + 1}`,
    })),
    meta: "Generated via OpenAI",
  };
}

export type SocialBundle = {
  x: string;
  instagram: string;
  facebook: string;
  notes: string;
};

export async function generateSocialBundle(apiKey?: string): Promise<SocialBundle> {
  const key = apiKey ?? process.env.OPENAI_API_KEY;
  const base = marketingSiteSummary();
  if (!key) {
    return {
      x: `We ship fixed-scope internal tools and AI workflows—not endless retainers. ${base.split("\n")[1]} `,
      instagram:
        `Fixed price. Written definition of done. Handoff your team can run.\n\nAxisForge Labs — link in bio.\n\n${base}`,
      facebook:
        `Organizations hire AxisForge Labs when they need working software with procurement-friendly pricing (${marketingPackages.map((p) => p.price).join(", ")} tiers). Book a short intro via our site.`,
      notes: "Set OPENAI_API_KEY for tailored multi-platform variants.",
    };
  }

  const sys = [
    "You adapt marketing copy across platforms for AxisForge Labs.",
    marketingVoice.pronouns,
    base,
    "Produce distinct lengths: X <= 260 chars; IG caption with line breaks; FB 2–4 short paragraphs.",
    `No solo I/me voice; apply pronouns and avoid rules (${marketingVoice.avoid.join("; ")}).`,
  ].join("\n");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.65,
      messages: [
        { role: "system", content: sys },
        {
          role: "user",
          content:
            'Return JSON {"x":"","instagram":"","facebook":""} promoting the site/services subtly.',
        },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${t}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("OpenAI returned empty content");
  const parsed = JSON.parse(raw) as SocialBundle;
  return {
    x: parsed.x,
    instagram: parsed.instagram,
    facebook: parsed.facebook,
    notes: "Generated via OpenAI",
  };
}

export async function generateAnalyticsAdvice(summary: string, apiKey?: string): Promise<string> {
  const key = apiKey ?? process.env.OPENAI_API_KEY;
  if (!key) {
    return [
      "Without OPENAI_API_KEY: manually review reply rate vs sends; tighten subject lines if opens are low;",
      "if replies cluster on one segment, double down on that segment’s wording;",
      "stretch time between touches if unsubscribes tick up.",
    ].join("\n");
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You advise on B2B outreach tuning: tone, frequency, segmentation. Keep bullets concise.",
        },
        { role: "user", content: `Metrics snapshot:\n${summary}\n\nSuggest next experiments.` },
      ],
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${t}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? "";
}

export async function generateDailyDigest(summary: string, apiKey?: string): Promise<string> {
  const key = apiKey ?? process.env.OPENAI_API_KEY;
  if (!key) {
    return [
      "## Daily digest (offline mode)",
      "",
      summary,
      "",
      "Set OPENAI_API_KEY for narrative synthesis and prioritized next steps.",
    ].join("\n");
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.35,
      messages: [
        {
          role: "system",
          content:
            "You produce a short daily operating digest for AxisForge Labs growth work: what happened, what it implies, 3 next actions.",
        },
        { role: "user", content: summary },
      ],
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${t}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? "";
}
