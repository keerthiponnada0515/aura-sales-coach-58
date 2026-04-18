import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  CalendarClock,
  Inbox,
  FileText,
  Users,
  Search,
  Bell,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/insights", label: "Sales Insights", icon: Sparkles },
  { to: "/scheduler", label: "Follow-ups", icon: CalendarClock },
  { to: "/inbox", label: "Inbox", icon: Inbox },
  { to: "/summarizer", label: "Summarizer", icon: FileText },
  { to: "/lobby", label: "Customer Lobby", icon: Users },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="px-6 py-7 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span
              className="h-9 w-9 rounded-xl flex items-center justify-center font-display text-lg font-semibold text-sidebar-primary-foreground"
              style={{ background: "var(--gradient-gold)" }}
            >
              A
            </span>
            <div className="leading-tight">
              <div className="font-display text-lg tracking-tight">AuraCRM</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/60">
                Sales Intelligence
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                <span className="font-medium">{item.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="glass-panel rounded-xl p-4 bg-sidebar-accent/40 border-sidebar-border">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-sidebar-primary" />
              <span className="text-xs font-medium text-sidebar-accent-foreground">
                AI Coach
              </span>
            </div>
            <p className="text-xs text-sidebar-foreground/70 leading-relaxed">
              3 high-priority deals need attention this week.
            </p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/75 border-b border-border">
          <div className="flex items-center gap-4 px-5 md:px-8 h-16">
            <div className="md:hidden flex items-center gap-2">
              <span
                className="h-8 w-8 rounded-lg flex items-center justify-center font-display text-sm font-semibold"
                style={{ background: "var(--gradient-gold)", color: "var(--gold-foreground)" }}
              >
                A
              </span>
              <span className="font-display text-base">AuraCRM</span>
            </div>

            <div className="flex-1 max-w-xl hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search customers, deals, emails…"
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/60 border border-transparent focus:bg-card focus:border-border focus:ring-2 focus:ring-ring/30 outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button className="relative h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                <Bell className="h-4 w-4" strokeWidth={1.75} />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gold ring-2 ring-background" />
              </button>
              <div className="h-10 w-10 rounded-full bg-charcoal text-charcoal-foreground flex items-center justify-center text-sm font-medium">
                JM
              </div>
            </div>
          </div>

          {/* mobile nav */}
          <nav className="md:hidden flex gap-1 px-3 pb-3 overflow-x-auto">
            {nav.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full transition-colors ${
                    active
                      ? "bg-charcoal text-charcoal-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="flex-1 px-5 md:px-8 py-6 md:py-10">{children}</main>
      </div>
    </div>
  );
}
