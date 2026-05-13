import { Link, useSearchParams } from "react-router-dom";
import { Check, Clock, Mail, ShieldCheck, LogOut, HelpCircle } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Check,
    title: "Registration submitted",
    desc: "Your credentials and organisational details have been received.",
    status: "Completed · Just now",
    state: "done" as const,
  },
  {
    n: "02",
    icon: Clock,
    title: "Identity & affiliation check",
    desc: "Our team is verifying your identity and National Society affiliation.",
    status: "In progress · Est. 1–2 business days",
    state: "active" as const,
  },
  {
    n: "03",
    icon: ShieldCheck,
    title: "Access granted",
    desc: "You will receive a sign-in link once your account has been approved.",
    status: "Waiting",
    state: "pending" as const,
  },
];

export default function PendingApprovalPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "your-email@example.com";

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent font-display text-sm font-bold text-accent-foreground">
              +
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold">IFRC</span>
              <span className="block text-xs text-muted-foreground">Int'l Federation</span>
            </span>
          </Link>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Account pending review
            </span>
            <Link to="/about" className="hover:text-foreground">About</Link>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {/* Status badge */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            <Clock className="h-3.5 w-3.5" />
            Access under review
          </span>

          <h1 className="mt-8 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Thank you for registering with the IFRC network.
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Your details are being verified by our team — you will be notified by email
            once access has been granted.
          </p>
        </div>

        {/* Email confirmation */}
        <div className="mt-10 flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <Mail className="h-5 w-5" />
          </div>
          <div className="text-sm">
            <p className="text-foreground">
              A confirmation was sent to{" "}
              <span className="font-semibold text-primary">{email}</span>.
            </p>
            <p className="mt-1 text-muted-foreground">
              Check your inbox — including your spam folder.
            </p>
          </div>
        </div>

        {/* Approval process */}
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Approval process</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">What happens next</h2>

          <ol className="mt-8 space-y-4">
            {steps.map((s) => {
              const isDone = s.state === "done";
              const isActive = s.state === "active";
              return (
                <li
                  key={s.n}
                  className={`relative flex gap-5 rounded-2xl border p-6 transition ${
                    isActive
                      ? "border-accent/40 bg-accent/5 shadow-[var(--shadow-elegant)]"
                      : "border-border bg-card"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-sm font-semibold ${
                      isDone
                        ? "bg-primary text-primary-foreground"
                        : isActive
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {isDone ? <s.icon className="h-5 w-5" /> : s.n}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                      {isActive && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                          In progress
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                    <p
                      className={`mt-3 text-xs font-medium ${
                        isDone
                          ? "text-primary"
                          : isActive
                          ? "text-accent"
                          : "text-muted-foreground"
                      }`}
                    >
                      {s.status}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Footer help */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <a
            href="mailto:support@ifrc.org"
            className="inline-flex items-center gap-2 font-medium text-foreground hover:text-accent"
          >
            <HelpCircle className="h-4 w-4" />
            Questions? Contact IFRC support
          </a>
          <div className="flex items-center gap-5">
            <Link to="/about" className="hover:text-foreground">About</Link>
            <button className="inline-flex items-center gap-1.5 hover:text-foreground">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
