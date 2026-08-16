import { Link } from "@tanstack/react-router";

const industriesRow1 = [
  {
    icon: "local_hospital",
    title: "Hospitals & Healthcare Facilities",
    description:
      "We supply diagnostic analyzers, haematology systems, chemistry reagents and consumables to support clinical laboratories delivering patient-centred care across Uganda.",
  },
  {
    icon: "biotech",
    title: "Medical Laboratories",
    description:
      "From routine pathology to specialised diagnostics, we equip private and public medical laboratories with reliable instruments and ongoing technical support.",
  },
  {
    icon: "microscope",
    title: "Research Institutions",
    description:
      "We provide advanced analytical balances, precision microscopes, molecular diagnostics and scientific apparatus for cutting-edge research programmes.",
  },
  {
    icon: "school",
    title: "Universities & Colleges",
    description:
      "Supporting teaching laboratories with durable student microscopes, clinical centrifuges, glassware sets and practical training kits aligned to curricula.",
  },
];

const industriesRow2 = [
  {
    icon: "menu_book",
    title: "Schools",
    description:
      "Supplying secondary and A-Level science laboratories with robust, budget-friendly equipment designed for heavy classroom use and curriculum requirements.",
  },
  {
    icon: "precision_manufacturing",
    title: "Industrial Laboratories",
    description:
      "Delivering heavy-duty testing equipment, quality-control instrumentation and calibration tools for manufacturing, food processing and mining sectors.",
  },
  {
    icon: "eco",
    title: "Agricultural & Environmental Labs",
    description:
      "Providing soil-testing kits, water-analysis equipment, environmental monitoring instruments and field-ready diagnostics for agri-research organisations.",
  },
  {
    icon: "science",
    title: "Diagnostic & Scientific Organisations",
    description:
      "Partnering with national health programmes, research networks and specialised diagnostic centres for molecular testing, immunoassay and pathology solutions.",
  },
];

function IndustryCard({ industry }: { industry: (typeof industriesRow1)[0] }) {
  return (
    <div className="flex w-[280px] shrink-0 flex-col items-center gap-4 rounded-xl border border-border bg-surface p-6 text-center transition-all duration-300 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
        <span className="material-symbols-outlined text-2xl text-secondary">{industry.icon}</span>
      </div>
      <h3 className="text-sm font-semibold text-primary">{industry.title}</h3>
      <p className="text-xs text-muted-foreground">{industry.description}</p>
      <Link to="/industries" className="btn-outline mt-auto w-full text-xs">
        Learn More
      </Link>
    </div>
  );
}

export function IndustriesMarquee() {
  const row1Items = [...industriesRow1, ...industriesRow1];
  const row2Items = [...industriesRow2, ...industriesRow2];

  return (
    <div className="flex flex-col gap-6">
      <div className="group relative overflow-hidden">
        <div className="flex animate-marquee-left whitespace-nowrap">
          {row1Items.map((ind, i) => (
            <div key={`row1-${ind.title}-${i}`} className="mx-3">
              <IndustryCard industry={ind} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface-low to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface-low to-transparent" />
      </div>

      <div className="group relative overflow-hidden">
        <div className="flex animate-marquee-right whitespace-nowrap">
          {row2Items.map((ind, i) => (
            <div key={`row2-${ind.title}-${i}`} className="mx-3">
              <IndustryCard industry={ind} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface-low to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface-low to-transparent" />
      </div>
    </div>
  );
}
