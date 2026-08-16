import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";

const industries = [
  {
    icon: "local_hospital",
    title: "Hospitals & Healthcare Facilities",
    body: "Supporting clinical laboratories with reliable diagnostic equipment and consumables for patient care.",
  },
  {
    icon: "biotech",
    title: "Medical Laboratories",
    body: "Equipping private and public labs with precision instruments for accurate diagnostics.",
  },
  {
    icon: "microscope",
    title: "Research Institutions",
    body: "Providing advanced analytical equipment and scientific apparatus for cutting-edge research.",
  },
  {
    icon: "school",
    title: "Universities & Colleges",
    body: "Supplying teaching laboratories with durable microscopes, centrifuges and practical training kits.",
  },
  {
    icon: "menu_book",
    title: "Schools",
    body: "Supporting secondary and A-Level science laboratories with robust, budget-friendly equipment.",
  },
  {
    icon: "precision_manufacturing",
    title: "Industrial Laboratories",
    body: "Delivering heavy-duty testing and quality-control instrumentation for manufacturing sectors.",
  },
  {
    icon: "eco",
    title: "Agricultural & Environmental Labs",
    body: "Providing soil-testing, water-analysis and environmental monitoring equipment.",
  },
  {
    icon: "science",
    title: "Diagnostic & Scientific Organizations",
    body: "Partnering with national programmes for molecular diagnostics, immunoassay and pathology.",
  },
];

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve | Livan Lab Supplies Uganda" },
      {
        name: "description",
        content:
          "Livan Lab Supplies Uganda Limited serves hospitals, medical laboratories, research institutions, universities, schools and industrial laboratories.",
      },
      { property: "og:title", content: "Industries We Serve | Livan Lab Supplies Uganda" },
      {
        property: "og:description",
        content:
          "From healthcare to agriculture, we supply laboratory and diagnostic solutions across a wide range of industries in Uganda and East Africa.",
      },
    ],
  }),
  component: Industries,
});

function Industries() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow pt-20">
        <section className="border-b border-border bg-surface py-16">
          <div className="container-page max-w-4xl">
            <div className="eyebrow mb-3">Industries</div>
            <h1 className="mb-5 text-4xl font-bold text-primary md:text-5xl">
              Industries We Serve
            </h1>
            <p className="text-lg text-muted-foreground">
              We partner with institutions across Uganda and East Africa, supplying laboratory
              equipment, diagnostic instruments and scientific solutions tailored to each
              sector&apos;s unique requirements.
            </p>
          </div>
        </section>

        <section className="container-page py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {industries.map((ind, i) => (
              <Reveal key={ind.title} delay={i * 0.06}>
                <div className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <span className="material-symbols-outlined text-2xl text-secondary">
                      {ind.icon}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-primary">{ind.title}</h3>
                  <p className="text-sm text-muted-foreground">{ind.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center gap-5 rounded-2xl bg-primary p-12 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              Ready to upgrade your laboratory?
            </h2>
            <p className="max-w-2xl text-primary-foreground/75">
              Tell us about your institution and requirements. A Livan specialist will respond
              within 24 hours with a tailored proposal.
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
