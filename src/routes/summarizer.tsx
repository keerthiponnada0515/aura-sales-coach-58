import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { customers } from "@/lib/mock-data";
import { FileText, CalendarClock, Sparkles, Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/summarizer")({
  head: () => ({
    meta: [
      { title: "Account Summarizer — AuraCRM" },
      {
        name: "description",
        content:
          "Generate concise account briefs and tailored proposals in seconds.",
      },
      { property: "og:title", content: "Account Summarizer — AuraCRM" },
      {
        property: "og:description",
        content: "Close deals faster with AI-generated briefs and proposals.",
      },
    ],
  }),
  component: Summarizer,
});

function Summarizer() {
  const [customerId, setCustomerId] = useState(customers[0].id);
  const customer = customers.find((c) => c.id === customerId)!;

  // mock proposal items
  const items = customer.needs.map((need, i) => ({
    line: need,
    price: 12_000 + i * 7_500,
  }));
  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <AppShell>
      <div className="float-in">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Account summarizer
        </p>
        <h1 className="text-3xl md:text-4xl font-display tracking-tight">
          Brief & propose, <span className="gold-text italic">in seconds</span>.
        </h1>
      </div>

      <div className="mt-8">
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-full md:w-auto h-11 rounded-xl bg-card border border-border px-4 text-sm focus:ring-2 focus:ring-ring/30 outline-none"
        >
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} — {c.company}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {/* Brief */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 float-in">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Account brief
            </span>
          </div>

          <h2 className="font-display text-2xl mb-1">{customer.company}</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Champion: {customer.name} · {customer.email}
          </p>

          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                Needs
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {customer.needs.map((n) => (
                  <span
                    key={n}
                    className="text-xs px-2.5 py-1 rounded-full bg-muted/70 text-foreground/80"
                  >
                    {n}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                Budget
              </dt>
              <dd className="font-medium">{customer.budget}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                Timeline
              </dt>
              <dd className="font-medium">{customer.timeline}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                Recommended next step
              </dt>
              <dd className="leading-relaxed">{customer.recommendation}</dd>
            </div>
          </dl>

          <button className="mt-6 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-charcoal text-charcoal-foreground text-sm font-medium hover:bg-charcoal/90 active:scale-[0.99] transition-all">
            <CalendarClock className="h-4 w-4" /> Schedule meeting
          </button>
        </div>

        {/* Proposal */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 float-in float-in-1">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gold" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Tailored proposal
              </span>
            </div>
            <button className="text-xs inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <Download className="h-3.5 w-3.5" /> PDF
            </button>
          </div>

          <h2 className="font-display text-2xl mb-1">Proposal for {customer.company}</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Generated {new Date().toLocaleDateString()}
          </p>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-3 bg-muted/50 grid grid-cols-[1fr_auto] text-[11px] uppercase tracking-wider text-muted-foreground">
              <span>Line item</span>
              <span>Annual</span>
            </div>
            {items.map((it) => (
              <div
                key={it.line}
                className="px-4 py-3.5 grid grid-cols-[1fr_auto] items-center text-sm border-t border-border/60"
              >
                <span>{it.line}</span>
                <span className="font-medium tabular-nums">
                  ${it.price.toLocaleString()}
                </span>
              </div>
            ))}
            <div
              className="px-4 py-4 grid grid-cols-[1fr_auto] items-center text-sm border-t border-border"
              style={{ background: "color-mix(in oklab, var(--gold) 8%, var(--card))" }}
            >
              <span className="font-medium">Total ARR</span>
              <span className="font-display text-xl tabular-nums">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
