import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { StatsBand } from "@/components/site/CountUp";

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
    icon: "labs",
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

const deepDives = [
  {
    id: "hospitals",
    eyebrow: "Sector 01",
    title: "Hospitals & Referral Facilities",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    alt: "Hospital laboratory technologist operating a clinical chemistry analyser",
    intro:
      "Regional referral and private hospitals run 24-hour laboratories where downtime directly affects patient outcomes. We configure haematology, chemistry and immunoassay lines that match daily test volumes, then keep them running with reagent scheduling and preventative maintenance.",
    needs: [
      "Full blood count, chemistry and CD4 workflows with matched reagent supply",
      "Backup instruments and rental cover during major servicing",
      "Cold-chain delivery for reagents and controls to upcountry facilities",
      "On-site training for laboratory technologists and biomedical engineers",
    ],
    kit: ["Mindray BC-20s / CL-900i", "Urit chemistry analysers", "Blood bank refrigerators"],
  },
  {
    id: "medical-labs",
    eyebrow: "Sector 02",
    title: "Private Medical Laboratories",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    alt: "Private diagnostic laboratory bench with sample racks and pipettes",
    intro:
      "Independent labs compete on turnaround time and menu breadth. We help owners phase capital purchases, start with high-yield tests, and expand into molecular diagnostics once volumes justify the investment.",
    needs: [
      "Instrument bundles sized for 40–300 samples per day",
      "Flexible payment and staged delivery for new branches",
      "Consumables re-order contracts with priority stock allocation",
      "ISO 15189 documentation support and calibration certificates",
    ],
    kit: ["GeneXpert IV", "Binocular microscopes", "Bench centrifuges & incubators"],
  },
  {
    id: "research",
    eyebrow: "Sector 03",
    title: "Research Institutions & NGOs",
    image:
      "https://images.unsplash.com/photo-1745420052756-1b1c294a6420?auto=format&fit=crop&w=1200&q=80",
    alt: "Scientist conducting research in a modern laboratory",
    intro:
      "Grant-funded programmes need audit-ready procurement, precise specifications and documented delivery timelines. We supply against donor tender specifications and provide the paperwork required for grant reporting.",
    needs: [
      "Specification writing support for tenders and donor budgets",
      "Analytical balances, biosafety cabinets and -20°C/-80°C storage",
      "Traceable calibration and installation qualification reports",
      "Consolidated shipments to reduce clearing and freight costs",
    ],
    kit: ["Class II biosafety cabinets", "Analytical balances", "Molecular consumables"],
  },
  {
    id: "education",
    eyebrow: "Sector 04",
    title: "Universities, Colleges & Schools",
    image:
      "https://images.unsplash.com/photo-1758685734062-165cc0094e61?auto=format&fit=crop&w=1200&q=80",
    alt: "Teacher and student conducting science experiment in a school laboratory",
    intro:
      "Teaching laboratories buy in cohorts and need equipment that survives heavy student use. We supply durable, repairable instruments with locally available spares and practical training kits mapped to the curriculum.",
    needs: [
      "Bulk microscope, glassware and reagent packages per intake",
      "Termly delivery schedules aligned to the academic calendar",
      "Spare parts kits and technician refresher training",
      "Budget-tier alternatives with the same core specification",
    ],
    kit: ["Student microscopes", "Glassware & consumable sets", "Hot air ovens and water baths"],
  },
];

const procurement = [
  {
    step: "01",
    title: "Requirement review",
    body: "We review your test menu, daily volumes, power and bench space, then shortlist instruments that fit both workload and budget.",
  },
  {
    step: "02",
    title: "Specification & quotation",
    body: "You receive a written specification, indicative UGX pricing, lead time and warranty terms within 24 hours — suitable for tender or board approval.",
  },
  {
    step: "03",
    title: "Supply & installation",
    body: "Goods are cleared, delivered and installed by our engineers, with calibration and installation reports handed over to your quality officer.",
  },
  {
    step: "04",
    title: "Training & aftercare",
    body: "Staff training, reagent scheduling and preventative maintenance visits keep the laboratory compliant and running with minimal downtime.",
  },
];

const faqs = [
  {
    q: "Do you supply laboratories outside Kampala?",
    a: "Yes. We deliver countrywide and to neighbouring East African markets, including cold-chain transport for reagents and controls to upcountry health facilities.",
  },
  {
    q: "Can you respond to public tenders and donor procurements?",
    a: "We regularly supply against government and donor tender specifications, and can provide manufacturer authorisation letters, warranties, calibration certificates and compliance documentation.",
  },
  {
    q: "What after-sales support is included?",
    a: "Installation, commissioning and user training are included on major instruments, with warranty cover and optional annual preventative maintenance contracts thereafter.",
  },
  {
    q: "How long do deliveries take?",
    a: "Stocked consumables and reagents ship within 24–72 hours. Imported instruments typically arrive in 2–6 weeks depending on manufacturer lead time; the exact window is confirmed in your quotation.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve | Livan Lab Supplies Uganda" },
      {
        name: "description",
        content:
          "Livan Lab Supplies Uganda Limited serves hospitals, medical laboratories, research institutions, universities, schools and industrial laboratories across Uganda and East Africa.",
      },
      {
        name: "keywords",
        content:
          "laboratory equipment for hospitals, medical laboratories Uganda, research institutions, universities, schools, industrial laboratories, diagnostic equipment East Africa",
      },
      { name: "author", content: "Wambogo Hassan Sadat" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Industries We Serve | Livan Lab Supplies Uganda" },
      {
        property: "og:description",
        content:
          "From healthcare to agriculture, we supply laboratory and diagnostic solutions across a wide range of industries in Uganda and East Africa.",
      },
      { property: "og:url", content: "https://www.livanlabs.com/industries" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_UG" },
      { property: "og:site_name", content: "Livan Lab Supplies Uganda Limited" },
    ],
    links: [{ rel: "canonical", href: "https://www.livanlabs.com/industries" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd) }],
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

        <section className="container-page py-16">
          <StatsBand
            stats={[
              { value: 180, suffix: "+", label: "Institutions supplied" },
              { value: 17, suffix: "+", label: "Product lines" },
              { value: 24, suffix: "h", label: "Quotation turnaround" },
              { value: 98, suffix: "%", label: "On-time delivery" },
            ]}
          />
        </section>

        <section className="container-page pb-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {industries.map((ind, i) => (
              <Reveal key={ind.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:shadow-lg">
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
        </section>

        <section className="border-y border-border bg-surface-low py-20">
          <div className="container-page">
            <div className="mb-12 max-w-3xl">
              <div className="eyebrow mb-3">Sector deep dives</div>
              <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
                How we support each sector
              </h2>
              <p className="text-muted-foreground">
                Every laboratory has a different workload, compliance burden and budget cycle. These
                are the configurations, documents and support packages we build for the sectors we
                serve most often.
              </p>
            </div>

            <div className="flex flex-col gap-12">
              {deepDives.map((d, i) => (
                <Reveal key={d.id} delay={0.05}>
                  <article
                    id={d.id}
                    className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border border-border bg-surface lg:grid-cols-2"
                  >
                    <img
                      src={d.image}
                      alt={d.alt}
                      loading="lazy"
                      className={`h-64 w-full object-cover lg:h-full lg:min-h-[380px] ${
                        i % 2 === 1 ? "lg:order-2" : ""
                      }`}
                    />
                    <div className="p-8 md:p-10">
                      <div className="eyebrow mb-3">{d.eyebrow}</div>
                      <h3 className="mb-4 text-2xl font-bold text-primary">{d.title}</h3>
                      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                        {d.intro}
                      </p>
                      <ul className="mb-6 flex flex-col gap-3">
                        {d.needs.map((n) => (
                          <li key={n} className="flex gap-3 text-sm text-muted-foreground">
                            <span className="material-symbols-outlined text-base text-teal">
                              check_circle
                            </span>
                            <span>{n}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mb-6 flex flex-wrap gap-2">
                        {d.kit.map((k) => (
                          <span
                            key={k}
                            className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Link to="/products" className="btn-outline text-sm">
                          Browse matching equipment
                        </Link>
                        <Link to="/quote" className="btn-primary text-sm">
                          Request a quote
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page py-20">
          <div className="mb-12 max-w-3xl">
            <div className="eyebrow mb-3">Procurement process</div>
            <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
              From enquiry to a fully commissioned laboratory
            </h2>
            <p className="text-muted-foreground">
              A predictable four-stage process designed around institutional approval cycles and
              tender documentation requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {procurement.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-7">
                  <span className="mb-4 text-3xl font-bold text-secondary/30">{p.step}</span>
                  <h3 className="mb-2 text-base font-semibold text-primary">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-surface-low py-20">
          <div className="container-page max-w-3xl">
            <div className="eyebrow mb-3">FAQ</div>
            <h2 className="mb-8 text-3xl font-bold text-primary md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((f) => (
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
        </section>

        <section className="container-page py-20">
          <div className="flex flex-col items-center gap-5 rounded-2xl bg-primary p-12 text-center">
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
