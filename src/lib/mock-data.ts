export type DealStatus = "active" | "pending" | "pipeline";
export type Urgency = "high" | "medium" | "low";

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  avatarColor: string;
  value: number;
  status: DealStatus;
  urgency: Urgency;
  stage: string;
  probability: number;
  lastContact: string;
  recommendation: string;
  needs: string[];
  budget: string;
  timeline: string;
}

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Eleanor Whitfield",
    company: "Northwind Capital",
    email: "eleanor@northwind.co",
    avatarColor: "#C9A96A",
    value: 184000,
    status: "active",
    urgency: "high",
    stage: "Negotiation",
    probability: 78,
    lastContact: "2h ago",
    recommendation: "Schedule technical review with their CTO before Friday — they referenced a competing vendor twice.",
    needs: ["SSO / SAML", "Custom data residency (EU)", "Dedicated CSM"],
    budget: "$180K–220K ARR",
    timeline: "Sign by end of Q3",
  },
  {
    id: "c2",
    name: "Marcus Aldridge",
    company: "Stellar Logistics",
    email: "m.aldridge@stellar.io",
    avatarColor: "#7C9885",
    value: 96500,
    status: "pending",
    urgency: "medium",
    stage: "Proposal",
    probability: 54,
    lastContact: "1d ago",
    recommendation: "Send the SOC2 report and a 30-day pilot offer — procurement is asking for compliance docs.",
    needs: ["SOC2 Type II", "API access", "Onboarding support"],
    budget: "$80K–110K ARR",
    timeline: "Pilot in 3 weeks",
  },
  {
    id: "c3",
    name: "Priya Raman",
    company: "Helix Health",
    email: "priya@helixhealth.com",
    avatarColor: "#A86B7A",
    value: 240000,
    status: "active",
    urgency: "high",
    stage: "Discovery",
    probability: 62,
    lastContact: "5h ago",
    recommendation: "Loop in solutions engineering — HIPAA and BAA terms came up in last call.",
    needs: ["HIPAA / BAA", "Audit logs", "Role-based access"],
    budget: "$220K–260K ARR",
    timeline: "Decision in 6 weeks",
  },
  {
    id: "c4",
    name: "Theodore Lin",
    company: "Maple & Co.",
    email: "theo@mapleco.com",
    avatarColor: "#6B89A8",
    value: 42000,
    status: "pipeline",
    urgency: "low",
    stage: "Qualification",
    probability: 28,
    lastContact: "4d ago",
    recommendation: "Nurture with case study from a similar mid-market retailer — not ready to buy yet.",
    needs: ["Reporting dashboards", "Slack integration"],
    budget: "$35K–50K ARR",
    timeline: "Q1 next year",
  },
  {
    id: "c5",
    name: "Sofia Andersson",
    company: "Kintsu Studio",
    email: "sofia@kintsu.studio",
    avatarColor: "#B8956F",
    value: 68000,
    status: "active",
    urgency: "medium",
    stage: "Proposal",
    probability: 71,
    lastContact: "3h ago",
    recommendation: "Send the tailored proposal today — she explicitly asked for pricing before her board meeting Thursday.",
    needs: ["White-label", "Premium support"],
    budget: "$60K–75K ARR",
    timeline: "Decision next week",
  },
  {
    id: "c6",
    name: "Daniel Okafor",
    company: "Vanta Robotics",
    email: "d.okafor@vanta.ai",
    avatarColor: "#8A7CA8",
    value: 155000,
    status: "pending",
    urgency: "high",
    stage: "Negotiation",
    probability: 66,
    lastContact: "30m ago",
    recommendation: "Competitor pricing surge detected — match their volume discount or risk losing the deal.",
    needs: ["Volume discount", "Annual prepay terms", "Quarterly business reviews"],
    budget: "$140K–170K ARR",
    timeline: "Close this month",
  },
];

export interface Alert {
  id: string;
  type: "competitor" | "engagement" | "buying-signal" | "risk";
  title: string;
  detail: string;
  customer: string;
  time: string;
}

export const alerts: Alert[] = [
  {
    id: "a1",
    type: "competitor",
    title: "Competitor surge",
    detail: "Northwind Capital visited a competitor's pricing page 4 times today.",
    customer: "Eleanor Whitfield",
    time: "12m ago",
  },
  {
    id: "a2",
    type: "buying-signal",
    title: "Strong buying signal",
    detail: "Stellar Logistics opened the proposal 6 times and forwarded internally.",
    customer: "Marcus Aldridge",
    time: "1h ago",
  },
  {
    id: "a3",
    type: "engagement",
    title: "Engagement drop",
    detail: "Maple & Co. has not opened the last 3 emails — risk of going cold.",
    customer: "Theodore Lin",
    time: "3h ago",
  },
  {
    id: "a4",
    type: "risk",
    title: "Renewal at risk",
    detail: "Helix Health champion changed roles — identify a new sponsor.",
    customer: "Priya Raman",
    time: "Today",
  },
];

export interface Email {
  id: string;
  from: string;
  fromCompany: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  urgency: Urgency;
  unread: boolean;
  folder: "inbox" | "sent";
}

export const emails: Email[] = [
  {
    id: "e1",
    from: "Eleanor Whitfield",
    fromCompany: "Northwind Capital",
    subject: "Need API access this week — urgent",
    preview: "Hi — our infra team is ready to integrate, but we need sandbox API access by Wednesday…",
    body: "Hi,\n\nOur infra team is ready to integrate, but we need sandbox API access by Wednesday at the latest — otherwise we'll have to push our launch by a sprint.\n\nCan you arrange this today?\n\nBest,\nEleanor",
    date: "2025-04-18",
    urgency: "high",
    unread: true,
    folder: "inbox",
  },
  {
    id: "e2",
    from: "Marcus Aldridge",
    fromCompany: "Stellar Logistics",
    subject: "Re: Proposal v2 — a few questions",
    preview: "Thanks for the revised proposal. The pricing looks reasonable, but I have three questions…",
    body: "Thanks for the revised proposal. The pricing looks reasonable, but I have three questions about the implementation timeline and the SLA tiers. Can we set up a 20-min call this week?",
    date: "2025-04-17",
    urgency: "medium",
    unread: true,
    folder: "inbox",
  },
  {
    id: "e3",
    from: "Sofia Andersson",
    fromCompany: "Kintsu Studio",
    subject: "Loved the demo!",
    preview: "Just wanted to say the team really enjoyed the walkthrough yesterday…",
    body: "Just wanted to say the team really enjoyed the walkthrough yesterday. I'll bring it up with the board on Thursday — please send over the formal proposal by Wednesday EOD.",
    date: "2025-04-17",
    urgency: "medium",
    unread: false,
    folder: "inbox",
  },
  {
    id: "e4",
    from: "Theodore Lin",
    fromCompany: "Maple & Co.",
    subject: "Circling back next quarter",
    preview: "Appreciate the follow-ups but we're freezing new vendor evals until Q1…",
    body: "Appreciate the follow-ups but we're freezing new vendor evaluations until Q1. Happy to revisit then.",
    date: "2025-04-15",
    urgency: "low",
    unread: false,
    folder: "inbox",
  },
  {
    id: "s1",
    from: "AuraCRM (you)",
    fromCompany: "Helix Health",
    subject: "Meeting confirmed: Discovery call",
    preview: "Your meeting with Priya Raman is confirmed for Thursday at 14:00 GMT…",
    body: "Your meeting with Priya Raman is confirmed for Thursday at 14:00 GMT.\n\nGoogle Meet: https://meet.google.com/aura-xnpq-rlm",
    date: "2025-04-16",
    urgency: "low",
    unread: false,
    folder: "sent",
  },
];

export const pipelineByStage = [
  { stage: "Qualification", value: 42 },
  { stage: "Discovery", value: 240 },
  { stage: "Proposal", value: 165 },
  { stage: "Negotiation", value: 339 },
  { stage: "Closed Won", value: 412 },
];

export const weeklyTrend = [
  { day: "Mon", deals: 4, ai: 12 },
  { day: "Tue", deals: 6, ai: 18 },
  { day: "Wed", deals: 5, ai: 15 },
  { day: "Thu", deals: 9, ai: 22 },
  { day: "Fri", deals: 7, ai: 19 },
  { day: "Sat", deals: 3, ai: 8 },
  { day: "Sun", deals: 2, ai: 6 },
];
