import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProductCard } from "@/components/site/ProductCard";
import { BrandMarquee } from "@/components/site/BrandMarquee";
import { IndustriesMarquee } from "@/components/site/IndustriesMarquee";
import { TestimonialsMarquee } from "@/components/site/TestimonialsMarquee";
import { WaveDivider } from "@/components/site/WaveDivider";
import { motion } from "framer-motion";
import { products, productGroups, brands } from "@/data/products";
import { Reveal } from "@/components/site/Reveal";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCtuq825gqTEGjMnxtePYBBDloBfw5V4aj17x_dwWJ1-2QUlTpcMmBUjF4lcK4Bv8fhypbF1aPADct0JkcO39mBW5vFtVUCtG36954CMxGfqR4xKt5jk7dNeZ8o9fIUr-Z-gTqm862ExKaOIWYzs5330EOTUbnONhYFxPf-zC8jhQrO-uypie9gUf504Kenz1LcGJGJ3TNnq2Zm7p7krcNhOakTRKny-qkF_yhg1C3l6vMTo7q8BaHn";

const HERO_BACKDROP =
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80";

const productCategories = [
  {
    name: "Laboratory Equipment",
    icon: "science",
    to: "/products",
    description:
      "Precision instruments including microscopes, centrifuges, incubators, balances and analytical equipment from leading global manufacturers.",
  },
  {
    name: "Diagnostic Equipment",
    icon: "biotech",
    to: "/products",
    description:
      "Clinical chemistry analyzers, hematology systems, immunoassay platforms, molecular diagnostics and point-of-care testing devices.",
  },
  {
    name: "Laboratory Apparatus",
    icon: "water_drop",
    to: "/products",
    description:
      "Borosilicate glassware, pipettes, safety cabinets, fume hoods and essential laboratory apparatus for daily workflows.",
  },
  {
    name: "Lab Consumables",
    icon: "inventory_2",
    to: "/products",
    description:
      "Sample collection systems, nitrile gloves, filter tips, culture media and other high-quality laboratory disposables.",
  },
  {
    name: "Chemicals & Reagents",
    icon: "science",
    to: "/products",
    description:
      "Analytical reagents, buffer solutions, stains and quality-control materials sourced from certified manufacturers.",
  },
];

const industries = [
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

const whyLivan = [
  {
    icon: "verified",
    title: "Quality",
    body: "Every product we supply is sourced from certified manufacturers and meets rigorous international standards for accuracy, durability and safety in laboratory environments.",
  },
  {
    icon: "schedule",
    title: "Reliable Supply",
    body: "We maintain strategic stock of high-demand instruments and consumables, backed by dependable logistics to ensure your laboratory never faces unnecessary downtime.",
  },
  {
    icon: "support_agent",
    title: "Professional Support",
    body: "Our technical team provides installation guidance, preventive maintenance planning and troubleshooting support to keep your equipment performing at specification.",
  },
  {
    icon: "category",
    title: "Wide Product Range",
    body: "From analytical balances to molecular diagnostics, glassware to reagents, we offer a comprehensive catalogue so institutions can source from a single trusted partner.",
  },
  {
    icon: "handshake",
    title: "Customer Focus",
    body: "We build long-term relationships with clients, offering responsive communication, transparent quotations and after-sales service from enquiry through delivery and beyond.",
  },
];

const testimonials = [
  {
    quote:
      "Livan has been our primary laboratory supplier for three years. Their technical team understands the demands of a busy clinical laboratory and consistently delivers quality instruments on time.",
    name: "Dr. Sarah Nakamya",
    role: "Head of Laboratory",
    institution: "Kampala International Hospital",
  },
  {
    quote:
      "The GeneXpert IV system was delivered, installed and commissioned within two weeks. The training provided by Livan engineers ensured our team were confident operators from day one.",
    name: "Mr. James Ochieng",
    role: "Laboratory Manager",
    institution: "Infectious Diseases Institute",
  },
  {
    quote:
      "As a teaching institution, we need durable equipment that can withstand heavy student use. Livan's student microscopes and centrifuges have performed exceptionally well across multiple cohorts.",
    name: "Dr. Mary Katusiime",
    role: "Dean, School of Biomedical Sciences",
    institution: "Mbarara University of Science and Technology",
  },
  {
    quote:
      "Their reagent supply reliability has transformed our inventory management. No more stock-outs disrupting testing schedules, and their pricing is competitive for the quality we receive.",
    name: "Ms. Patricia Atim",
    role: "Chief Laboratory Technologist",
    institution: "Mulago National Referral Hospital",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Livan Lab Supplies Uganda | Laboratory & Diagnostic Equipment",
      },
      {
        name: "description",
        content:
          "Livan Lab Supplies Uganda Limited supplies laboratory equipment, diagnostic instruments and scientific apparatus to healthcare, research and educational institutions.",
      },
      {
        property: "og:title",
        content: "Livan Lab Supplies Uganda | Laboratory & Diagnostic Equipment",
      },
      {
        property: "og:description",
        content:
          "Precision laboratory equipment, diagnostic instruments and scientific solutions across Uganda and East Africa.",
      },
      { property: "og:image", content: HERO_IMAGE },
      { name: "twitter:image", content: HERO_IMAGE },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow pt-20">
        <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-surface">
          <div className="absolute inset-0">
            <img
              src={HERO_BACKDROP}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-[0.14]"
            />
          </div>
          <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15" />

          <div className="container-page relative z-10 w-full">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <motion.div
                className="flex flex-col items-start gap-5 py-16 lg:col-span-6 lg:pr-10"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-high px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-teal" />
                  <span className="eyebrow">Uganda&apos;s Premier Supplier</span>
                </div>
                <h1 className="text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-6xl">
                  LIVAN LAB SUPPLIES{" "}
                  <span className="block font-light text-secondary">UGANDA LIMITED</span>
                </h1>
                <h2 className="text-xl font-medium text-secondary">
                  Laboratory, Diagnostic &amp; Scientific Solutions
                </h2>
                <p className="mt-2 max-w-lg border-l-2 border-border pl-4 text-base text-muted-foreground">
                  Supplying precision laboratory equipment, advanced diagnostic instruments,
                  scientific apparatus, and comprehensive laboratory solutions to healthcare,
                  research, and educational institutions across the region.
                </p>
                <div className="mt-4 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                  <Link to="/products" className="btn-primary w-full sm:w-auto">
                    Explore Products
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                  <Link to="/quote" className="btn-outline w-full sm:w-auto">
                    Request a Quote
                  </Link>
                </div>
                <div className="mt-8 flex w-full max-w-lg items-center gap-4 border-t border-border pt-6">
                  <div className="flex -space-x-3">
                    {["verified", "biotech", "local_shipping"].map((i) => (
                      <div
                        key={i}
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface bg-surface-high"
                      >
                        <span className="material-symbols-outlined text-base text-muted-foreground">
                          {i}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong className="block text-primary">Certified Partners</strong>
                    Trusted by leading institutions
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-8 h-[52vh] w-full overflow-hidden rounded-3xl shadow-2xl lg:col-span-6 lg:mt-0 lg:h-[78vh]"
              >
                <img
                  src={HERO_IMAGE}
                  alt="Modern clinical laboratory with diagnostic equipment and a microscope on a stainless steel bench"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="glass-card absolute bottom-8 left-8 right-8 flex items-center justify-between rounded-xl p-5">
                  <div>
                    <p className="text-sm font-bold text-primary">Precision Instruments</p>
                    <p className="text-xs text-muted-foreground">ISO Certified Accuracy</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                    <span className="material-symbols-outlined text-secondary">
                      precision_manufacturing
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <WaveDivider />

        <section className="bg-surface py-20">
          <Reveal className="container-page">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">Who We Are</h2>
              <p className="max-w-3xl text-muted-foreground">
                LIVAN LAB SUPPLIES UGANDA LIMITED is a premier provider of comprehensive scientific
                and diagnostic solutions. Operating at the intersection of medical innovation and
                rigorous quality control, we serve as a vital link between world-leading
                manufacturers and the specialised needs of regional institutions across Uganda and
                East Africa.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="card-surface flex flex-col justify-between p-8 transition-shadow duration-300 hover:shadow-lg md:col-span-2 md:p-10">
                <div>
                  <h3 className="mb-4 text-xl font-bold text-primary">
                    Specialist in Laboratory & Diagnostic Solutions
                  </h3>
                  <div className="mb-8 h-1 w-16 bg-secondary" />
                  <p className="mb-6 text-muted-foreground">
                    Our expertise extends beyond simple procurement. We offer technical advisory,
                    robust logistical support, and dedicated after-sales service to ensure that our
                    clients&apos; laboratories operate at peak efficiency and accuracy. From
                    teaching institutions to national reference hospitals, we understand the
                    demanding requirements of modern scientific environments and deliver solutions
                    that meet international standards.
                  </p>
                  <p className="text-muted-foreground">
                    We work closely with procurement teams, laboratory managers and technical staff
                    to understand workload patterns, compliance requirements and budget constraints.
                    This consultative approach allows us to recommend equipment configurations,
                    reagent schedules and service contracts that maximise uptime and protect
                    institutional investments over the long term.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 rounded-xl border border-border bg-surface-low p-5">
                  <span className="material-symbols-outlined filled text-secondary">groups</span>
                  <div>
                    <h4 className="mb-1 text-sm font-bold text-primary">Customers We Serve</h4>
                    <p className="text-xs text-muted-foreground">
                      Hospitals, research institutes, universities, schools, industrial labs and
                      agricultural facilities across Uganda and the wider East African region.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-surface-low p-5">
                  <span className="material-symbols-outlined filled text-secondary">shield</span>
                  <div>
                    <h4 className="mb-1 text-sm font-bold text-primary">Quality Commitment</h4>
                    <p className="text-xs text-muted-foreground">
                      Every product is validated against manufacturer specifications and accompanied
                      by proper documentation, warranties and calibration certificates where
                      required.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-surface-low p-5">
                  <span className="material-symbols-outlined filled text-secondary">
                    engineering
                  </span>
                  <div>
                    <h4 className="mb-1 text-sm font-bold text-primary">Technical Expertise</h4>
                    <p className="text-xs text-muted-foreground">
                      Our team includes specialists with hands-on laboratory experience, enabling
                      informed recommendations rather than generic catalogue selling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="border-y border-border bg-surface-low py-20">
          <Reveal className="container-page">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">
                Our Product Categories
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                We maintain a comprehensive inventory organised into five core categories, ensuring
                that institutions can source the full spectrum of laboratory requirements from a
                single partner.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {productCategories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.to}
                  className="group flex flex-col items-center gap-4 rounded-xl border border-border bg-surface p-8 text-center transition-all duration-300 hover:shadow-lg hover:border-secondary"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10 transition-colors group-hover:bg-secondary">
                    <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-secondary-foreground">
                      {cat.icon}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-primary">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                  <span className="btn-outline mt-2 w-full text-xs">View Products</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
        <WaveDivider />

        <section className="bg-surface py-20">
          <Reveal className="container-page">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">
                Featured Products
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                A selection of certified instruments from world-leading manufacturers, trusted by
                laboratories across Uganda and East Africa for precision, reliability and
                after-sales support.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Link to="/products" className="btn-outline">
                View full catalog
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </Reveal>
        </section>
        <WaveDivider />

        <section className="border-y border-border bg-surface-low py-20">
          <Reveal className="container-page">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">
                Industries We Serve
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                We partner with institutions across multiple sectors, delivering tailored laboratory
                and diagnostic solutions that address the specific operational, regulatory and
                budgetary realities of each industry.
              </p>
            </div>
            <IndustriesMarquee />
          </Reveal>
        </section>

        <section className="bg-surface py-20">
          <Reveal className="container-page">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">Why Choose LIVAN</h2>
              <p className="max-w-2xl text-muted-foreground">
                We have built our reputation on consistent delivery, technical competence and
                genuine partnership with the institutions we serve. Here is what sets us apart.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
              {whyLivan.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-4 rounded-xl border border-border bg-surface p-6 text-center transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                    <span className="material-symbols-outlined text-2xl text-secondary">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.body}</p>
                  <Link to="/contact" className="btn-outline mt-auto w-full text-xs">
                    Talk to Us
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
        <WaveDivider />

        <section className="border-y border-border bg-surface-low py-20">
          <Reveal className="container-page">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">
                Brands & Partners
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                We represent and distribute an expanding portfolio of internationally recognised
                manufacturers, ensuring that every quotation reflects genuine stock, manufacturer
                warranties and in-country technical support.
              </p>
            </div>
            <BrandMarquee brands={brands} />
          </Reveal>
        </section>
        <WaveDivider />

        <section className="bg-surface py-20">
          <Reveal className="container-page">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">
                What Our Clients Say
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                Trusted by leading hospitals, research institutions and universities across Uganda
                and East Africa.
              </p>
            </div>
            <TestimonialsMarquee />
          </Reveal>
        </section>
        <WaveDivider />

        <section className="relative overflow-hidden border-y border-border bg-surface-low py-20">
          <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-60" />
          <Reveal className="container-page relative">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow mb-3">Laboratory supplies in Uganda</p>
              <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
                Your trusted laboratory equipment supplier in Kampala and across East Africa
              </h2>
              <p className="text-muted-foreground">
                Livan Lab Supplies Uganda Limited supplies clinical laboratory equipment, diagnostic
                analyzers, microscopes, centrifuges, reagents and consumables to hospitals, medical
                laboratories, universities, schools and industrial testing facilities. Every
                quotation includes manufacturer warranties, installation, operator training and
                preventive maintenance options so your laboratory stays accurate, compliant and
                productive.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "Diagnostic equipment supply",
                  body: "Clinical chemistry, haematology, immunoassay and molecular diagnostic platforms from certified global manufacturers, delivered and commissioned nationwide.",
                  to: "/products" as const,
                  cta: "Browse the catalogue",
                },
                {
                  title: "Laboratory installation & service",
                  body: "Site preparation advice, installation, calibration, operator training and scheduled preventive maintenance delivered by our in-country engineers.",
                  to: "/services" as const,
                  cta: "See our services",
                },
                {
                  title: "Sectors we supply",
                  body: "Hospitals, research institutes, universities, schools, agricultural and industrial laboratories across Uganda and the wider East African region.",
                  to: "/industries" as const,
                  cta: "Industries we serve",
                },
              ].map((item) => (
                <div key={item.title} className="card-surface flex flex-col gap-3 p-7">
                  <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  <Link
                    to={item.to}
                    className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-secondary hover:underline"
                  >
                    {item.cta}
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
        <WaveDivider flip />

        <section className="bg-surface py-20">
          <Reveal className="container-page">
            <div className="flex flex-col items-center gap-6 rounded-2xl bg-primary p-12 text-center">
              <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
                Ready to request a quote?
              </h2>
              <p className="max-w-2xl text-primary-foreground/75">
                Tell us what you need and a Livan specialist will respond within 24 hours with a
                tailored quotation.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/quote" className="btn-primary">
                  Request a Quote
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
