import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { emails } from "@/lib/mock-data";
import { Inbox as InboxIcon, Send, Calendar, Filter } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Global Inbox — AuraCRM" },
      {
        name: "description",
        content:
          "Unified email inbox with AI-flagged urgency badges and date filtering.",
      },
      { property: "og:title", content: "Global Inbox — AuraCRM" },
      {
        property: "og:description",
        content: "Every client conversation, contextually understood.",
      },
    ],
  }),
  component: InboxPage,
});

function InboxPage() {
  const [folder, setFolder] = useState<"inbox" | "sent">("inbox");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(emails[0].id);

  const filtered = emails
    .filter((e) => e.folder === folder)
    .filter((e) => (dateFilter ? e.date === dateFilter : true));

  const selected = filtered.find((e) => e.id === selectedId) ?? filtered[0];

  return (
    <AppShell>
      <div className="float-in">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Global inbox
        </p>
        <h1 className="text-3xl md:text-4xl font-display tracking-tight">
          Every conversation, <span className="gold-text italic">understood</span>.
        </h1>
      </div>

      <div className="glass-panel rounded-2xl mt-8 overflow-hidden float-in">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-3 border-b border-border flex-wrap">
          <div className="inline-flex bg-muted/60 rounded-lg p-1">
            <button
              onClick={() => setFolder("inbox")}
              className={`inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-xs font-medium transition-colors ${
                folder === "inbox" ? "bg-card shadow-soft" : "text-muted-foreground"
              }`}
            >
              <InboxIcon className="h-3.5 w-3.5" /> Inbox
            </button>
            <button
              onClick={() => setFolder("sent")}
              className={`inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-xs font-medium transition-colors ${
                folder === "sent" ? "bg-card shadow-soft" : "text-muted-foreground"
              }`}
            >
              <Send className="h-3.5 w-3.5" /> Sent
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="h-8 pl-8 pr-2 rounded-lg bg-muted/60 border border-transparent text-xs focus:bg-card focus:border-border outline-none"
              />
            </div>
            {dateFilter && (
              <button
                onClick={() => setDateFilter("")}
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                <Filter className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] min-h-[520px]">
          {/* Email list */}
          <div className="border-r border-border overflow-y-auto max-h-[640px]">
            {filtered.length === 0 && (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No emails for this filter.
              </div>
            )}
            {filtered.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelectedId(e.id)}
                className={`w-full text-left p-4 border-b border-border/60 transition-colors ${
                  selected?.id === e.id ? "bg-muted/70" : "hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-sm truncate ${e.unread ? "font-semibold" : "font-medium"}`}>
                    {e.from}
                  </span>
                  <span className="text-[10px] text-muted-foreground shrink-0">{e.date}</span>
                </div>
                <p className={`text-xs mb-2 truncate ${e.unread ? "text-foreground" : "text-muted-foreground"}`}>
                  {e.subject}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-muted-foreground truncate">
                    {e.fromCompany}
                  </span>
                  <UrgencyBadge urgency={e.urgency} />
                </div>
              </button>
            ))}
          </div>

          {/* Reader */}
          <div className="p-6 md:p-8">
            {selected ? (
              <article>
                <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                  <div>
                    <h2 className="font-display text-2xl leading-tight">{selected.subject}</h2>
                    <p className="text-sm text-muted-foreground mt-1.5">
                      <span className="font-medium text-foreground">{selected.from}</span> ·{" "}
                      {selected.fromCompany} · {selected.date}
                    </p>
                  </div>
                  <UrgencyBadge urgency={selected.urgency} />
                </div>
                <div className="prose prose-sm max-w-none whitespace-pre-line text-foreground/85 leading-relaxed">
                  {selected.body}
                </div>

                <div
                  className="mt-8 rounded-xl p-4 border border-border/60"
                  style={{ background: "color-mix(in oklab, var(--gold) 7%, var(--card))" }}
                >
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    AuraCRM suggestion
                  </div>
                  <p className="text-sm">
                    {selected.urgency === "high"
                      ? "Reply within 4 hours — this account is showing time-sensitive language."
                      : selected.urgency === "medium"
                      ? "Schedule a brief reply today and propose 2 meeting times."
                      : "Add to weekly nurture sequence — no immediate action required."}
                  </p>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
