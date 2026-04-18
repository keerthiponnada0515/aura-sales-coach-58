import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { customers } from "@/lib/mock-data";
import { CalendarClock, Video, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/scheduler")({
  head: () => ({
    meta: [
      { title: "Smart Follow-ups — AuraCRM" },
      {
        name: "description",
        content:
          "Schedule meetings, generate Google Meet links, and send branded invites in one click.",
      },
      { property: "og:title", content: "Smart Follow-ups — AuraCRM" },
      {
        property: "og:description",
        content: "Effortless meeting scheduling with auto-generated invites.",
      },
    ],
  }),
  component: Scheduler,
});

const slots = ["09:00", "10:30", "13:00", "14:30", "16:00"];

function Scheduler() {
  const [customerId, setCustomerId] = useState(customers[0].id);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [time, setTime] = useState("10:30");
  const [sent, setSent] = useState(false);

  const customer = customers.find((c) => c.id === customerId)!;
  const meetCode = `aura-${customer.id}-${time.replace(":", "")}`;
  const meetLink = `https://meet.google.com/${meetCode}`;

  return (
    <AppShell>
      <div className="float-in">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Follow-up scheduler
        </p>
        <h1 className="text-3xl md:text-4xl font-display tracking-tight">
          Book the next touchpoint, <span className="gold-text italic">instantly</span>.
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-8">
        {/* Form */}
        <div className="lg:col-span-3 glass-panel rounded-2xl p-6 md:p-8 float-in">
          <div className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                Customer
              </label>
              <select
                value={customerId}
                onChange={(e) => {
                  setCustomerId(e.target.value);
                  setSent(false);
                }}
                className="w-full h-12 rounded-xl bg-card border border-border px-4 text-sm focus:ring-2 focus:ring-ring/30 outline-none"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.company}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setSent(false);
                  }}
                  className="w-full h-12 rounded-xl bg-card border border-border px-4 text-sm focus:ring-2 focus:ring-ring/30 outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Time
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setTime(s);
                        setSent(false);
                      }}
                      className={`h-12 rounded-xl text-xs font-medium transition-all ${
                        time === s
                          ? "bg-charcoal text-charcoal-foreground"
                          : "bg-muted/60 hover:bg-muted text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-4 border border-border/60 flex items-center gap-3"
              style={{ background: "color-mix(in oklab, var(--gold) 8%, var(--card))" }}
            >
              <div className="h-10 w-10 rounded-lg bg-card flex items-center justify-center shrink-0">
                <Video className="h-4 w-4 text-gold" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Auto-generated
                </div>
                <div className="text-sm font-medium truncate">{meetLink}</div>
              </div>
            </div>

            <button
              onClick={() => setSent(true)}
              disabled={sent}
              className={`w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-medium transition-all ${
                sent
                  ? "bg-success/15 text-success cursor-default"
                  : "bg-charcoal text-charcoal-foreground hover:bg-charcoal/90 active:scale-[0.99]"
              }`}
            >
              {sent ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Invitation sent to {customer.email}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send invitation
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview card */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 float-in float-in-1">
          <div className="flex items-center gap-2 mb-4">
            <CalendarClock className="h-4 w-4 text-gold" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Invite preview
            </span>
          </div>

          <div className="rounded-xl bg-card border border-border p-5 shadow-soft">
            <p className="text-xs text-muted-foreground mb-3">
              From: AuraCRM &lt;hello@auracrm.app&gt;
            </p>
            <h3 className="font-display text-lg leading-tight mb-3">
              Meeting with {customer.name.split(" ")[0]} — {date}
            </h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              Hi {customer.name.split(" ")[0]},
              <br />
              <br />
              Confirming our meeting on{" "}
              <strong>
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}{" "}
                at {time}
              </strong>
              .
              <br />
              <br />
              Join via Google Meet:{" "}
              <span className="text-gold underline decoration-gold/40">{meetLink}</span>
              <br />
              <br />
              Looking forward to it!
              <br />— Jordan
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
