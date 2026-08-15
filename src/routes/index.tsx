import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProductCard } from "@/components/site/ProductCard";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Reveal } from "@/components/site/Reveal";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCtuq825gqTEGjMnxtePYBBDloBfw5V4aj17x_dwWJ1-2QUlTpcMmBUjF4lcK4Bv8fhypbF1aPADct0JkcO39mBW5vFtVUCtG36954CMxGfqR4xKt5jk7dNeZ8o9fIUr-Z-gTqm862ExKaOIWYzs5330EOTUbnONhYFxPf-zC8jhQrO-uypie9gUf504Kenz1LcGJGJ3TNnq2Zm7p7krcNhOakTRKny-qkF_yhg1C3l6vMTo7q8BaHn";

const services = [
  {
    icon: "science",
    title: "Laboratory Equipment Supply",
    body: "Sourcing high-quality instruments from world-leading manufacturers.",
  },
  {
    icon: "settings_suggest",
    title: "Equipment Installation",
    body: "Professional setup and configuration of diagnostic and scientific apparatus.",
  },
  {
    icon: "build",
    title: "Maintenance & Servicing",
    body: "Scheduled preventative maintenance and technical support to ensure minimal downtime.",
  },
  {
    icon: "architecture",
    title: "Laboratory Setup Support",
    body: "Expert guidance on design, workflow, and equipment selection for new or expanding labs.",
  },
  {
    icon: "search",
    title: "Product Sourcing",
    body: "Dedicated support for finding specialized scientific instruments and consumables.",
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
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
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
          </Reveal>
        </section>

        <section className="bg-surface py-20">
          <Reveal className="container-page">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">Featured Products</h2>
              <p className="max-w-2xl text-muted-foreground">
                Discover our range of high-precision laboratory and diagnostic equipment from
                world-leading manufacturers.
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

        <section className="border-y border-border bg-surface-low py-20">
          <div className="container-page">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="mb-3 text-3xl font-bold text-primary md:text-4xl">
                Our Professional Services
              </h2>
              <p className="max-w-3xl text-muted-foreground">
                Beyond supplying equipment, we provide comprehensive technical support and
                consultation to ensure your laboratory operations are efficient, compliant, and
                reliable.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10 transition-colors group-hover:bg-secondary">
                    <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-secondary-foreground">
                      {s.icon}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-primary">{s.title}</h3>
                  <p className="mb-6 flex-grow text-sm text-muted-foreground">{s.body}</p>
                  <Link
                    to="/contact"
                    className="mt-auto inline-flex items-center text-sm font-semibold text-secondary hover:text-primary"
                  >
                    Inquire
                    <span className="material-symbols-outlined ml-1 text-base">arrow_forward</span>
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
