import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const services = [
  {
    icon: "science",
    title: "Laboratory Equipment Supply",
    body: "Sourcing high-quality instruments from world-leading manufacturers, matched to your workload and budget.",
  },
  {
    icon: "settings_suggest",
    title: "Equipment Installation",
    body: "Professional setup, calibration and configuration of diagnostic and scientific apparatus on site.",
  },
  {
    icon: "build",
    title: "Maintenance & Servicing",
    body: "Scheduled preventative maintenance and responsive technical support to ensure minimal downtime.",
  },
  {
    icon: "architecture",
    title: "Laboratory Setup Support",
    body: "Expert guidance on design, workflow and equipment selection for new or expanding laboratories.",
  },
  {
    icon: "search",
    title: "Product Sourcing",
    body: "Dedicated support for locating specialised scientific instruments, reagents and consumables.",
  },
  {
    icon: "local_shipping",
    title: "Logistics Support",
    body: "End-to-end supply chain management for sensitive reagents and heavy laboratory hardware.",
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Laboratory Services | Livan Lab Supplies Uganda" },
      {
        name: "description",
        content:
          "Equipment supply, installation, preventative maintenance, laboratory setup support, sourcing and logistics from Livan Lab Supplies Uganda Limited.",
      },
      { property: "og:title", content: "Laboratory Services | Livan Lab Supplies Uganda" },
      {
        property: "og:description",
        content:
          "Technical support and consultation that keeps your laboratory efficient, compliant and reliable.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow pt-20">
        <section className="border-b border-border bg-surface py-16">
          <div className="container-page max-w-4xl">
            <div className="eyebrow mb-3">Services</div>
            <h1 className="mb-5 text-4xl font-bold text-primary md:text-5xl">
              Our Professional Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Beyond supplying equipment, we provide comprehensive technical support and
              consultation to ensure your laboratory operations are efficient, compliant, and
              reliable.
            </p>
          </div>
        </section>

        <section className="container-page py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="group flex flex-col card-surface p-8 hover:shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10 transition-colors group-hover:bg-secondary">
                  <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-secondary-foreground">
                    {s.icon}
                  </span>
                </div>
                <h2 className="mb-3 text-lg font-semibold text-primary">{s.title}</h2>
                <p className="flex-grow text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <StatsBand
              stats={[
                { value: 48, suffix: "h", label: "Average response to a fault" },
                { value: 12, suffix: " mo", label: "Standard warranty cover" },
                { value: 4, suffix: "x/yr", label: "Preventative service visits" },
                { value: 98, suffix: "%", label: "On-time delivery rate" },
              ]}
            />
          </div>

          <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <div className="eyebrow mb-3">Service delivery</div>
              <h2 className="mb-4 text-3xl font-bold text-primary">How an engagement runs</h2>
              <p className="mb-8 text-muted-foreground">
                Whether you are commissioning a new laboratory or replacing a single analyser, the
                work follows the same disciplined sequence so that budgets, timelines and
                compliance documents are all accounted for.
              </p>
              <ol className="flex flex-col gap-6">
                {process.map((p) => (
                  <li key={p.title} className="flex gap-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-sm font-bold text-secondary">
                      {p.step}
                    </span>
                    <div>
                      <h3 className="mb-1 text-base font-semibold text-primary">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card-surface p-8 md:p-10">
              <div className="eyebrow mb-3">Support plans</div>
              <h2 className="mb-6 text-2xl font-bold text-primary">Maintenance contracts</h2>
              <div className="flex flex-col gap-5">
                {plans.map((plan) => (
                  <div key={plan.name} className="rounded-xl border border-border p-6">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-primary">{plan.name}</h3>
                      <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                        {plan.response}
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">{plan.body}</p>
                    <ul className="flex flex-col gap-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="material-symbols-outlined text-base text-secondary">
                            check
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-outline mt-6 w-full text-sm">
                Talk to a service engineer
              </Link>
            </div>
          </div>

          <div className="mt-20 max-w-3xl">
            <div className="eyebrow mb-3">Service FAQ</div>
            <h2 className="mb-8 text-3xl font-bold text-primary">Common questions</h2>
            <div className="flex flex-col gap-4">
              {serviceFaqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-primary">
                    {f.q}
                    <span className="material-symbols-outlined text-secondary transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-5 rounded-2xl bg-primary p-12 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              Planning a new laboratory or upgrade?
            </h2>
            <p className="max-w-2xl text-primary-foreground/75">
              Share your requirements and a Livan specialist will respond within 24 hours with a
              tailored configuration and quotation.
            </p>
            <Link to="/quote" className="btn-primary">
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
