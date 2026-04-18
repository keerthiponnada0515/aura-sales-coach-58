import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { UrgencyBadge, StatusBadge } from "@/components/UrgencyBadge";
import { customers } from "@/lib/mock-data";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Sales Insights — AuraCRM" },
      {
        name: "description",
        content:
          "AI-generated recommendations for every account. Move prospects through your pipeline with confidence.",
      },
      { property: "og:title", content: "Sales Insights — AuraCRM" },
      {
        property: "og:description",
        content: "Personalized next-best actions for every customer in your pipeline.",
      },
    ],
  }),
  component: Insights,
});

function Insights() {
  const [accepted, setAccepted] = useState<Set<string>>(new Set());

  return (
    <AppShell>
      <div className="float-in">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Sales insights
        </p>
        <h1 className="text-3xl md:text-4xl font-display tracking-tight">
          Next-best actions, <span className="gold-text italic">personalized</span>.
        </h1>
        <p className="text-muted-foreground mt-2 max-w-xl">
          AuraCRM analyses every interaction to surface the action most likely to advance each deal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        {customers.map((c, i) => {
          const isAccepted = accepted.has(c.id);
          return (
            <article
              key={c.id}
              className={`glass-panel rounded-2xl p-6 float-in float-in-${(i % 4) + 1} ${
                c.urgency === "high" ? "shimmer-border" : ""
              }`}
            >
              <header className="flex items-start gap-4 mb-4">
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center font-medium text-white shrink-0"
                  style={{ background: c.avatarColor }}
                >
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-lg leading-tight">{c.name}</h2>
                  <p className="text-sm text-muted-foreground">{c.company}</p>
                </div>
                <div className="flex flex-col gap-1.5 items-end">
                  <StatusBadge status={c.status} />
                  <UrgencyBadge urgency={c.urgency} />
                </div>
              </header>

              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div className="rounded-lg bg-muted/60 p-2.5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Stage
                  </div>
                  <div className="text-xs font-medium mt-0.5">{c.stage}</div>
                </div>
                <div className="rounded-lg bg-muted/60 p-2.5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Value
                  </div>
                  <div className="text-xs font-medium mt-0.5">${(c.value / 1000).toFixed(0)}K</div>
                </div>
                <div className="rounded-lg bg-muted/60 p-2.5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Win prob.
                  </div>
                  <div className="text-xs font-medium mt-0.5">{c.probability}%</div>
                </div>
              </div>

              <div
                className="rounded-xl p-4 border border-border/60 mb-4"
                style={{ background: "color-mix(in oklab, var(--gold) 7%, var(--card))" }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  <span className="text-[11px] uppercase tracking-wider font-medium text-gold-foreground/80">
                    AI recommendation
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{c.recommendation}</p>
              </div>

              <button
                onClick={() => setAccepted((s) => new Set(s).add(c.id))}
                disabled={isAccepted}
                className={`w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-medium transition-all ${
                  isAccepted
                    ? "bg-success/15 text-success cursor-default"
                    : "bg-charcoal text-charcoal-foreground hover:bg-charcoal/90 active:scale-[0.99]"
                }`}
              >
                {isAccepted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Accepted into pipeline
                  </>
                ) : (
                  <>
                    Accept customer <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}
