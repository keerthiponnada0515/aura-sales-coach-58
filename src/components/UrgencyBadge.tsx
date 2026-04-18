import type { Urgency } from "@/lib/mock-data";

const styles: Record<Urgency, { bg: string; dot: string; label: string }> = {
  high: { bg: "bg-destructive/10 text-destructive", dot: "bg-destructive", label: "High" },
  medium: { bg: "bg-warning/15 text-warning-foreground", dot: "bg-warning", label: "Medium" },
  low: { bg: "bg-success/10 text-success", dot: "bg-success", label: "Low" },
};

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const s = styles[urgency];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${s.bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export function StatusBadge({ status }: { status: "active" | "pending" | "pipeline" }) {
  const map = {
    active: { bg: "bg-success/10 text-success", label: "Active" },
    pending: { bg: "bg-warning/15 text-warning-foreground", label: "Pending" },
    pipeline: { bg: "bg-muted text-muted-foreground", label: "In Pipeline" },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${s.bg}`}
    >
      {s.label}
    </span>
  );
}
