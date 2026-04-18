import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { customers, alerts, weeklyTrend, pipelineByStage } from "@/lib/mock-data";
import {
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Target,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AuraCRM — AI Sales Assistant" },
      {
        name: "description",
        content:
          "Your AI sales coach. Track top deals, real-time alerts, and pipeline intelligence in one elegant workspace.",
      },
      { property: "og:title", content: "AuraCRM — AI Sales Assistant" },
      {
        property: "og:description",
        content:
          "Real-time pipeline intelligence, AI-generated next-best actions, and automated follow-ups.",
      },
    ],
  }),
  component: Dashboard,
});

const alertIcon = {
  competitor: AlertTriangle,
  engagement: TrendingUp,
  "buying-signal": Zap,
  risk: AlertTriangle,
} as const;

const alertTone = {
  competitor: "text-destructive bg-destructive/10",
  engagement: "text-warning-foreground bg-warning/15",
  "buying-signal": "text-success bg-success/10",
  risk: "text-destructive bg-destructive/10",
} as const;

function Dashboard() {
  const topDeals = [...customers].sort((a, b) => b.value - a.value).slice(0, 4);
  const totalPipeline = customers.reduce((sum, c) => sum + c.value, 0);
  const activeDeals = customers.filter((c) => c.status === "active").length;

  return (
    <AppShell>
      {/* Hero */}
      <div className="float-in">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-1">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Good morning, Jordan
            </p>
            <h1 className="text-3xl md:text-4xl font-display tracking-tight">
              Your pipeline,{" "}
              <span className="gold-text italic">intelligently</span> curated.
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="ticker-dot" /> Live · synced 2 minutes ago
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {[
          {
            label: "Pipeline value",
            value: `$${(totalPipeline / 1000).toFixed(0)}K`,
            delta: "+12.4%",
            icon: Target,
          },
          {
            label: "Active deals",
            value: activeDeals.toString(),
            delta: "+2 this week",
            icon: TrendingUp,
          },
          {
            label: "AI actions taken",
            value: "47",
            delta: "8 today",
            icon: Sparkles,
          },
          {
            label: "Win rate (30d)",
            value: "62%",
            delta: "+5.1%",
            icon: ArrowUpRight,
          },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className={`glass-panel rounded-2xl p-5 float-in float-in-${i + 1}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {kpi.label}
                </span>
                <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
              </div>
              <div className="font-display text-3xl tracking-tight">{kpi.value}</div>
              <div className="text-xs text-success mt-1.5 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> {kpi.delta}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 float-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl">Pipeline activity</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Deals moved & AI actions, last 7 days
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-charcoal" /> Deals
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gold" /> AI actions
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.78 0.13 80)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.78 0.13 80)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="charcoal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.21 0.012 60)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="oklch(0.21 0.012 60)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.89 0.012 85)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(0.48 0.012 60)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.48 0.012 60)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(1 0 0)",
                    border: "1px solid oklch(0.89 0.012 85)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    boxShadow: "0 8px 24px oklch(0.21 0.012 60 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="ai"
                  stroke="oklch(0.78 0.13 80)"
                  strokeWidth={2}
                  fill="url(#gold)"
                />
                <Area
                  type="monotone"
                  dataKey="deals"
                  stroke="oklch(0.21 0.012 60)"
                  strokeWidth={2}
                  fill="url(#charcoal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 float-in float-in-1">
          <h2 className="font-display text-xl">Pipeline by stage</h2>
          <p className="text-xs text-muted-foreground mt-0.5 mb-6">In thousands ($)</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineByStage} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.89 0.012 85)" vertical={false} />
                <XAxis dataKey="stage" stroke="oklch(0.48 0.012 60)" fontSize={10} tickLine={false} axisLine={false} interval={0} />
                <YAxis stroke="oklch(0.48 0.012 60)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(1 0 0)",
                    border: "1px solid oklch(0.89 0.012 85)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="value" fill="oklch(0.78 0.13 80)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top deals + alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 float-in">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl">Top deals to watch</h2>
            <span className="text-xs text-muted-foreground">Sorted by ARR potential</span>
          </div>
          <div className="space-y-3">
            {topDeals.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/60 transition-colors"
              >
                <div
                  className="h-11 w-11 rounded-full flex items-center justify-center font-medium text-sm text-white shrink-0"
                  style={{ background: c.avatarColor }}
                >
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground">· {c.company}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {c.stage} · {c.probability}% probability
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="font-display text-lg">${(c.value / 1000).toFixed(0)}K</div>
                  <UrgencyBadge urgency={c.urgency} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 float-in float-in-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold" />
              AI alert feed
            </h2>
          </div>
          <div className="space-y-4">
            {alerts.map((a) => {
              const Icon = alertIcon[a.type];
              return (
                <div key={a.id} className="flex gap-3">
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${alertTone[a.type]}`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">{a.title}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{a.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      {a.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
