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
