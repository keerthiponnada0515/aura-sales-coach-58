import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/UrgencyBadge";
import { customers as initialCustomers } from "@/lib/mock-data";
import { Trash2, Mail, AlertCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/lobby")({
  head: () => ({
    meta: [
      { title: "Customer Lobby — AuraCRM" },
      {
        name: "description",
        content: "Manage your entire customer network with live status tracking.",
      },
      { property: "og:title", content: "Customer Lobby — AuraCRM" },
      {
        property: "og:description",
        content: "Your CRM database, beautifully organized.",
      },
    ],
  }),
  component: Lobby,
});

function Lobby() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const remove = (id: string) => {
    setCustomers((c) => c.filter((x) => x.id !== id));
    setPendingDelete(null);
  };

  return (
    <AppShell>
      <div className="float-in">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Customer lobby
        </p>
        <h1 className="text-3xl md:text-4xl font-display tracking-tight">
          Your network, <span className="gold-text italic">at a glance</span>.
        </h1>
      </div>

      <div className="glass-panel rounded-2xl mt-8 overflow-hidden float-in">
        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Stage</th>
                <th className="px-6 py-4 font-medium">Value</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-border/60 hover:bg-muted/40 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
                        style={{ background: c.avatarColor }}
                      >
                        {c.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{c.company}</td>
                  <td className="px-6 py-4">{c.stage}</td>
                  <td className="px-6 py-4 font-medium tabular-nums">
                    ${(c.value / 1000).toFixed(0)}K
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        title="Email"
                        className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setPendingDelete(c.id)}
                        title="Delete"
                        className="h-8 w-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground text-sm">
                    No customers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border/60">
          {customers.map((c) => (
            <div key={c.id} className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
                  style={{ background: c.avatarColor }}
                >
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm truncate">{c.name}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  <div className="text-xs text-muted-foreground">{c.company}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {c.stage} · ${(c.value / 1000).toFixed(0)}K
                    </span>
                    <button
                      onClick={() => setPendingDelete(c.id)}
                      className="h-8 w-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete confirmation */}
      {pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl p-6 max-w-sm w-full bg-card">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg leading-tight">Remove customer?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This will delete the customer record and cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setPendingDelete(null)}
                className="flex-1 h-10 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80"
              >
                Cancel
              </button>
              <button
                onClick={() => remove(pendingDelete)}
                className="flex-1 h-10 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
