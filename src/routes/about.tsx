import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";

const ABOUT_HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAUR7c5hSkwlOHIOGQXP-SIXMM-JFSpUdKZ4DRwTiJct8idUnpwJw_6216QgCAdQNNgEzlWjVowrescJGJNExhEckps9Il2OAkB6_VylqeymBvkuHLyAVsD3N021URTHRUvZW1Cda4gwVWNKjNAdJau6koRB0SfNAIuoj6N3KYXAfbX1bX9_YNm2MXhhbdzigAobQNx7T3W4GjJOuu6eWEz51618gIiYTD4wrqtvlqWk90_YpnaLj9h";

const values = [
  {
    icon: "verified",
    title: "Quality",
    body: "We adhere to stringent selection criteria for every product, ensuring that instruments meet international performance standards and are accompanied by proper certification, warranties and calibration documentation.",
  },
  {
    icon: "published_with_changes",
    title: "Reliability",
    body: "Timely delivery and consistent stock availability are central to our service. We understand that laboratory delays impact patient care, research timelines and academic schedules.",
  },
  {
    icon: "school",
    title: "Professionalism",
    body: "Our team combines scientific knowledge with commercial integrity, providing honest advice, transparent pricing and clear communication at every stage of the procurement process.",
  },
  {
    icon: "handshake",
    title: "Customer Focus",
    body: "We invest in long-term institutional relationships rather than one-off transactions, offering responsive after-sales support, maintenance contracts and re-order priority for returning clients.",
  },
];

const leadership = [
  {
    name: "Nalweyiso Elizabeth",
    role: "Sales Manager",
    initials: "NE",
  },
  {
    name: "Nabatanzi Veronica",
    role: "Head of Laboratory Operations",
    initials: "NV",
  },
];

const certifications = [
  "ISO 9001:2015 Quality Management",
  "ISO 13485 Medical Device Distribution",
  "Authorised Distributor – Leading Global Manufacturers",
  "Certified Installation & Calibration Partner",
  "Compliant with UNBS Standards for Laboratory Equipment",
];

const timeline = [
  {
    year: "2016",
    title: "Foundation",
    body: "Livan Lab Supplies Uganda Limited was established with a focus on laboratory and diagnostic equipment supply.",
  },
  {
    year: "2018",
    title: "Regional Expansion",
    body: "Expanded distribution network to serve hospitals and research institutions across East Africa.",
  },
  {
    year: "2020",
    title: "Service Division",
    body: "Launched dedicated installation, maintenance and calibration services to support institutional clients.",
  },
  {
    year: "2023",
    title: "Product Range Growth",
    body: "Broadened catalogue to include molecular diagnostics, analytical chemistry and laboratory consumables.",
  },
  {
    year: "2025",
    title: "Strategic Partnerships",
    body: "Strengthened partnerships with leading global manufacturers for certified in-country technical support.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Livan Lab Supplies Uganda Limited" },
      {
        name: "description",
        content:
          "Livan Lab Supplies Uganda Limited is a premier provider of scientific and diagnostic solutions, linking world-leading manufacturers with regional institutions.",
      },
      { property: "og:title", content: "About Livan Lab Supplies Uganda Limited" },
      {
        property: "og:description",
        content:
          "Empowering scientific excellence in Uganda through reliable laboratory, diagnostic and scientific solutions.",
      },
      { property: "og:image", content: ABOUT_HERO },
      { name: "twitter:image", content: ABOUT_HERO },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow pt-20">
        <section className="relative flex min-h-[520px] items-center overflow-hidden bg-primary">
          <img
            src={ABOUT_HERO}
            alt="Pristine modern scientific laboratory with stainless steel benches and diagnostic equipment"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="container-page relative z-10 py-20">
            <div className="max-w-3xl">
              <span className="mb-6 inline-block rounded-full bg-teal/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
                About Us
              </span>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-primary-foreground md:text-5xl">
                Empowering Scientific Excellence in Uganda
              </h1>
              <p className="max-w-2xl text-lg text-primary-foreground/80">
                Providing reliable, high-precision laboratory, diagnostic, and scientific solutions
                to advance healthcare and research across East Africa.
              </p>
            </div>
          </div>
        </section>

        <section className="container-page py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card-surface flex flex-col justify-between p-8 transition-shadow duration-300 hover:shadow-lg md:col-span-2 md:p-10">
              <div>
                <h2 className="mb-3 text-2xl font-bold text-primary md:text-3xl">Who We Are</h2>
                <div className="mb-8 h-1 w-16 bg-secondary" />
                <p className="mb-6 text-muted-foreground">
                  LIVAN LAB SUPPLIES UGANDA LIMITED is a premier provider of comprehensive
                  scientific and diagnostic solutions. Operating at the intersection of medical
                  innovation and rigorous quality control, we serve as a vital link between
                  world-leading manufacturers and the specialised needs of regional institutions.
                </p>
                <p className="mb-6 text-muted-foreground">
                  Our expertise extends beyond simple procurement. We offer technical advisory,
                  robust logistical support, and dedicated after-sales service to ensure that our
                  clients&apos; laboratories operate at peak efficiency and accuracy.
                </p>
                <p className="text-muted-foreground">
                  We work closely with procurement teams, laboratory managers and technical staff to
                  understand workload patterns, compliance requirements and budget constraints. This
                  consultative approach allows us to recommend equipment configurations, reagent
                  schedules and service contracts that maximise uptime and protect institutional
                  investments over the long term.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="flex items-start gap-4 rounded-xl border border-border bg-surface-low p-5"
                >
                  <span className="material-symbols-outlined filled text-secondary">{v.icon}</span>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-primary">{v.title}</h3>
                    <p className="text-xs text-muted-foreground">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface-low py-20">
          <div className="container-page grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal className="card-surface p-8 md:p-10">
              <h2 className="mb-3 text-2xl font-bold text-primary md:text-3xl">Our Mission</h2>
              <div className="mb-6 h-1 w-16 bg-secondary" />
              <p className="text-muted-foreground">
                To empower healthcare, research and education across East Africa by delivering
                reliable, high-precision laboratory and diagnostic solutions with unmatched
                technical support. We aim to bridge the gap between global scientific innovation and
                local institutional needs, ensuring that every laboratory we serve has access to
                equipment, reagents and expertise that meet international standards.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="card-surface p-8 md:p-10">
              <h2 className="mb-3 text-2xl font-bold text-primary md:text-3xl">Our Vision</h2>
              <div className="mb-6 h-1 w-16 bg-secondary" />
              <p className="text-muted-foreground">
                To be the most trusted partner for scientific and diagnostic procurement in the
                region, enabling institutions to achieve excellence in testing, diagnosis and
                discovery. We envision a future where every hospital, research centre and
                educational institution in East Africa can source laboratory solutions locally with
                the same confidence as leading international facilities.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="container-page py-20">
          <Reveal>
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">Leadership</h2>
              <p className="max-w-3xl text-muted-foreground">
                Our leadership team combines scientific expertise, commercial experience and a
                shared commitment to raising laboratory standards across the region.
              </p>
            </div>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-6">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="flex flex-col items-center gap-4 rounded-xl border border-border bg-surface p-6 text-center transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                  <span className="text-lg font-bold text-secondary">{person.initials}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary">{person.name}</h3>
                  <p className="text-xs text-muted-foreground">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-surface-low py-20">
          <div className="container-page">
            <Reveal>
              <div className="mb-12 flex flex-col items-center text-center">
                <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">
                  Certifications & Compliance
                </h2>
                <p className="max-w-3xl text-muted-foreground">
                  We maintain recognised certifications and partnerships that assure our clients of
                  quality, reliability and regulatory compliance.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {certifications.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:shadow-lg"
                >
                  <span className="material-symbols-outlined text-secondary">verified</span>
                  <p className="text-sm font-medium text-primary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page py-20">
          <Reveal>
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">Our Journey</h2>
              <p className="max-w-3xl text-muted-foreground">
                From our founding to the present, Livan has grown steadily alongside the
                institutions we serve.
              </p>
            </div>
          </Reveal>
          <div className="relative border-l border-border pl-8">
            {timeline.map((item, i) => (
              <div key={item.year} className="mb-10 last:mb-0">
                <div className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-secondary" />
                <p className="text-sm font-bold text-secondary">{item.year}</p>
                <h3 className="mb-1 text-base font-semibold text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-page py-20">
          <Reveal>
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">What We Do</h2>
              <p className="max-w-3xl text-muted-foreground">
                We provide end-to-end support for laboratory and diagnostic procurement, from
                initial consultation through to installation, training and ongoing maintenance.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Equipment Supply",
                body: "We source and supply certified laboratory and diagnostic instruments from reputable global manufacturers, ensuring genuine products with full manufacturer warranties and local technical support.",
              },
              {
                title: "Technical Consultation",
                body: "Our specialists assess workload, throughput requirements and compliance obligations to recommend equipment configurations that match each institution&apos;s specific operational profile.",
              },
              {
                title: "Installation & Commissioning",
                body: "We coordinate on-site installation, calibration and operator training to ensure that new equipment reaches productive use quickly and performs to specification from day one.",
              },
              {
                title: "Maintenance & Servicing",
                body: "Preventive maintenance programmes, responsive repairs and annual certification services keep laboratory hardware reliable, compliant and within manufacturer specifications.",
              },
              {
                title: "Reagent & Consumable Supply",
                body: "We manage the continuous supply of reagents, culture media, sample collection systems and disposables, reducing procurement overhead and eliminating stock-out risk.",
              },
              {
                title: "Laboratory Setup Support",
                body: "For new or expanding facilities, we advise on workflow design, equipment selection, safety requirements and budget phasing to deliver functional, compliant laboratory environments.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="mb-3 text-base font-semibold text-primary">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
