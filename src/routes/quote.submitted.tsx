import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/quote/submitted")({
  validateSearch: (search: Record<string, unknown>): { ref?: string | undefined } => ({
    ref: typeof search["ref"] === "string" ? search["ref"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Quote Request Submitted | Livan Lab Supplies Uganda" },
      {
        name: "description",
        content:
          "Your quotation request has been received. A Livan Lab Supplies specialist will respond within 24 hours.",
      },
      { property: "og:title", content: "Quote Request Submitted | Livan Lab Supplies Uganda" },
      {
        property: "og:description",
        content: "We have received your request for quotation and will respond within 24 hours.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Submitted,
});

const steps = [
  { n: 1, title: "Technical Review", body: "Our specialists verify configuration compatibility." },
  {
    n: 2,
    title: "Customized Quote",
    body: "We will prepare a detailed pricing proposal within 24 hours.",
  },
  {
    n: 3,
    title: "Consultation",
    body: "Optionally schedule a call to finalize details and logistics.",
  },
];

function Submitted() {
  const { ref } = Route.useSearch();
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-low p-6 md:p-12">
      <div className="w-full max-w-3xl card-surface p-8 shadow-[0_8px_24px_rgba(11,31,51,0.06)] md:p-12">
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface-high text-teal">
            <span className="material-symbols-outlined filled text-[32px]">check_circle</span>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-primary md:text-4xl">
            Thank You for Your Request
          </h1>
          <p className="text-muted-foreground">We have received your request for quotation.</p>
        </div>

        <div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-lg border border-border bg-surface-low p-6 md:flex-row">
          <div>
            <p className="eyebrow mb-1">Reference Number</p>
            <p className="text-xl font-bold text-secondary">{ref ?? "Pending assignment"}</p>
          </div>
          <div>
            <p className="eyebrow mb-1">Status</p>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/15 px-3 py-1 text-sm font-medium text-secondary">
              <span className="h-2 w-2 rounded-full bg-teal" />
              Pending Review
            </span>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="mb-6 border-b border-border pb-2 text-lg font-semibold text-primary">
            What Happens Next
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-low font-semibold text-secondary">
                  {s.n}
                </div>
                <h3 className="text-sm font-semibold text-primary">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 rounded-lg border border-border p-6">
          <h2 className="eyebrow mb-4 border-b border-border pb-2">Request Highlights Included</h2>
          <ul className="space-y-4">
            {[
              {
                icon: "verified",
                title: "Expert Consultation",
                body: "Access to our specialized product technical team.",
              },
              {
                icon: "local_shipping",
                title: "Logistics Support",
                body: "Priority handling and specialized transport planning if required.",
              },
            ].map((h) => (
              <li key={h.title} className="flex items-start gap-3">
                <span className="material-symbols-outlined filled mt-0.5 text-teal">{h.icon}</span>
                <div>
                  <span className="block text-sm font-medium text-primary">{h.title}</span>
                  <span className="text-xs text-muted-foreground">{h.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/products" className="btn-primary">
            Return to Catalog
          </Link>
          <Link to="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
