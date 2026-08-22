import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SmartImage } from "@/components/site/SmartImage";
import { getProduct, products } from "@/data/products";

const DEFAULT_SIDE_IMAGE =
  "https://images.unsplash.com/photo-1581093458891-9f3039cf6f1a?q=80&w=1200&auto=format&fit=crop";

const STORAGE_KEY = "livan.quote.selection";

const REAGENT_KITS = ["Included", "Extended (3mo)", "None"] as const;
const SERVICE_PLANS = [
  "Standard warranty only",
  "Essential care (annual service)",
  "Priority care (48h response)",
] as const;
const INSTALL_OPTIONS = [
  "Installation & training required",
  "Installation only",
  "Delivery only",
] as const;

type StoredSelection = {
  slug: string;
  quantity: number;
  reagentKit: string;
  servicePlan: string;
  installation: string;
  removed: boolean;
};

type QuoteSearch = { product?: string | undefined };

export const Route = createFileRoute("/quote/")({
  validateSearch: (search: Record<string, unknown>): QuoteSearch => ({
    product: typeof search["product"] === "string" ? search["product"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Request a Quote | Livan Lab Supplies Uganda Limited" },
      {
        name: "description",
        content:
          "Request an institutional quotation for laboratory and diagnostic equipment. A Livan specialist responds within 24 hours.",
      },
      {
        name: "keywords",
        content:
          "laboratory quotation Uganda, equipment quote, diagnostic equipment quotation, institutional supply, laboratory procurement, Kampala",
      },
      { name: "author", content: "Wambogo Hassan Sadat" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Request a Quote | Livan Lab Supplies Uganda Limited" },
      {
        property: "og:description",
        content: "Tell us your requirements and receive a tailored quotation within 24 hours.",
      },
      { property: "og:url", content: "https://www.livanlabs.com/quote" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_UG" },
      { property: "og:site_name", content: "Livan Lab Supplies Uganda Limited" },
    ],
    links: [{ rel: "canonical", href: "https://www.livanlabs.com/quote" }],
  }),
  component: QuotePage,
});

const steps = ["Contact", "Products", "Details"];

function QuotePage() {
  const { product: slug } = Route.useSearch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const fallback = getProduct(slug ?? "") ?? products[4];
  const [selectedSlug, setSelectedSlug] = useState(fallback?.slug ?? "");
  const [quantity, setQuantity] = useState(1);
  const [reagentKit, setReagentKit] = useState<string>(REAGENT_KITS[0]);
  const [servicePlan, setServicePlan] = useState<string>(SERVICE_PLANS[0]);
  const [installation, setInstallation] = useState<string>(INSTALL_OPTIONS[0]);
  const [removed, setRemoved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const item = getProduct(selectedSlug);

  // Restore the previous selection (unless the URL explicitly names a product).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<StoredSelection>;
        if (!slug && typeof saved.slug === "string" && getProduct(saved.slug)) {
          setSelectedSlug(saved.slug);
          setRemoved(Boolean(saved.removed));
        }
        if (typeof saved.quantity === "number" && saved.quantity > 0) setQuantity(saved.quantity);
        if (typeof saved.reagentKit === "string") setReagentKit(saved.reagentKit);
        if (typeof saved.servicePlan === "string") setServicePlan(saved.servicePlan);
        if (typeof saved.installation === "string") setInstallation(saved.installation);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist the selection so it survives reloads and navigation.
  useEffect(() => {
    if (!hydrated) return;
    try {
      const payload: StoredSelection = {
        slug: selectedSlug,
        quantity,
        reagentKit,
        servicePlan,
        installation,
        removed,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* storage unavailable */
    }
  }, [hydrated, selectedSlug, quantity, reagentKit, servicePlan, installation, removed]);

  const buildMailto = () => {
    const form = document.getElementById("quote-form") as HTMLFormElement | null;
    if (!form) return;
    const fd = new FormData(form);
    const fullName = String(fd.get("fullName") ?? "");
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const institution = String(fd.get("institution") ?? "");
    const location = String(fd.get("location") ?? "");
    const message = String(fd.get("message") ?? "");
    const annualVolume = String(fd.get("annualVolume") ?? "");
    const timeline = String(fd.get("timeline") ?? "");

    const items =
      !removed && item
        ? `${item.name} (${item.sku}) x${Math.max(1, quantity)} | reagent kit: ${reagentKit} | service plan: ${servicePlan} | ${installation}`
        : "None";

    const body = [
      "New quotation request from website:",
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      `Institution: ${institution || "-"}`,
      `Location: ${location || "-"}`,
      `Annual Volume: ${annualVolume || "-"}`,
      `Timeline: ${timeline || "-"}`,
      `Message: ${message || "-"}`,
      `Items: ${items}`,
    ].join("\n");

    const subject = `Quotation Request ${institution ? `- ${institution}` : ""}`.trim();
    const mailto = `mailto:elizabethnalweyiso2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    navigate({ to: "/quote/submitted" });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    buildMailto();
  };

  const activeItem = !removed && item ? item : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow pt-20">
        <div className="container-page grid grid-cols-1 gap-10 py-14 lg:grid-cols-3">
          <aside className="flex flex-col gap-8 lg:col-span-1">
            <div>
              <h2 className="mb-3 text-2xl font-bold text-primary">Procurement Excellence</h2>
              <p className="text-sm text-muted-foreground">
                Partnering with LIVAN ensures precision in every order. Our quote process is
                designed to capture your exacting requirements.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: "science",
                  title: "Expert Consultation",
                  body: "Our specialists review technical specs to ensure optimal equipment matching.",
                },
                {
                  icon: "calculate",
                  title: "Customized Pricing",
                  body: "Volume discounts and institutional pricing tiers applied automatically.",
                },
                {
                  icon: "local_shipping",
                  title: "Logistics Support",
                  body: "End-to-end supply chain management for sensitive reagents and hardware.",
                },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">{f.icon}</span>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-primary">{f.title}</h3>
                    <p className="text-xs text-muted-foreground">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <SmartImage
              src={activeItem ? activeItem.image : DEFAULT_SIDE_IMAGE}
              alt={activeItem ? activeItem.name : "Livan laboratory procurement"}
              className="h-72 w-full rounded-xl"
              imgClassName="object-cover"
            />

            {activeItem && (
              <div className="card-surface p-5">
                <span className="eyebrow">{activeItem.brand}</span>
                <h3 className="mb-1 text-base font-semibold text-primary">{activeItem.name}</h3>
                <p className="mb-4 text-xs text-muted-foreground">{activeItem.short}</p>
                <dl className="grid grid-cols-1 gap-2 text-xs">
                  <SummaryRow label="SKU" value={activeItem.sku} />
                  <SummaryRow label="Indicative price" value={activeItem.priceRange} />
                  <SummaryRow label="Availability" value={activeItem.availability} />
                  <SummaryRow label="Lead time" value={activeItem.leadTime} />
                  <SummaryRow label="Warranty" value={activeItem.warranty} />
                  <SummaryRow label="Quantity" value={`${Math.max(1, quantity)} unit(s)`} />
                </dl>
                <Link
                  to="/products/$slug"
                  params={{ slug: activeItem.slug }}
                  className="mt-4 inline-flex text-xs font-semibold text-secondary hover:underline"
                >
                  View full product page
                </Link>
              </div>
            )}
          </aside>

          <section className="lg:col-span-2">
            <div className="mb-8 flex items-center gap-4">
              {steps.map((label, i) => {
                const n = i + 1;
                const active = n <= step;
                return (
                  <div key={label} className="flex flex-1 items-center gap-3">
                    <div
                      className={
                        active
                          ? "flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground"
                          : "flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm font-semibold text-muted-foreground"
                      }
                    >
                      {n}
                    </div>
                    <span
                      className={
                        active
                          ? "text-sm font-semibold text-primary"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {label}
                    </span>
                    {n < steps.length && <div className="h-px flex-grow bg-border" />}
                  </div>
                );
              })}
            </div>

            <form id="quote-form" className="card-surface p-8" onSubmit={onSubmit}>
              <div className={step === 1 ? "" : "hidden"}>
                <h2 className="mb-1 text-xl font-semibold text-primary">Contact Information</h2>
                <p className="mb-8 text-sm text-muted-foreground">
                  Please provide your primary institutional contact details.
                </p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field name="fullName" label="Full Name" placeholder="Dr. Jane Doe" />
                  <Field
                    name="email"
                    label="Institutional Email"
                    placeholder="jdoe@institution.ac.ug"
                    type="email"
                  />
                  <Field
                    name="phone"
                    label="Phone Number"
                    placeholder="+256 700 000 000"
                    type="tel"
                    required={false}
                  />
                  <Field
                    name="institution"
                    label="Lab/Institution Name"
                    placeholder="National Research Facility"
                  />
                  <div className="md:col-span-2">
                    <Field
                      name="location"
                      label="Facility Location"
                      placeholder="e.g., B8, Ivory Plaza, Wilson Rd, Kampala"
                      required={false}
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button type="button" className="btn-primary" onClick={() => setStep(2)}>
                    Next <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className={step === 2 ? "" : "hidden"}>
                <h2 className="mb-1 text-xl font-semibold text-primary">Product Selection</h2>
                <p className="mb-8 text-sm text-muted-foreground">
                  Review your selected item, configure variants and adjust quantities. Your
                  selection is saved automatically.
                </p>

                {activeItem ? (
                  <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface-low p-5 md:flex-row">
                    <SmartImage
                      src={activeItem.image}
                      alt={activeItem.name}
                      className="h-32 w-full rounded-lg md:w-40 md:shrink-0"
                      imgClassName="object-cover"
                    />
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="eyebrow">
                            {activeItem.brand} · {activeItem.category}
                          </span>
                          <h3 className="text-lg font-semibold text-primary">{activeItem.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            SKU: {activeItem.sku} · {activeItem.priceRange}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRemoved(true)}
                          aria-label="Remove item"
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>

                      <p className="mt-3 text-sm text-muted-foreground">{activeItem.short}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Tag icon="inventory_2" text={activeItem.availability} />
                        <Tag icon="schedule" text={activeItem.leadTime} />
                        <Tag icon="verified_user" text={activeItem.warranty} />
                      </div>

                      <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {activeItem.specs.slice(0, 4).map((s) => (
                          <div
                            key={s.label}
                            className="rounded-lg border border-border bg-surface px-3 py-2"
                          >
                            <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
                              {s.label}
                            </dt>
                            <dd className="text-xs font-medium text-primary">{s.value}</dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            className="mb-2 block text-xs font-medium text-primary"
                            htmlFor="quantity"
                          >
                            Quantity
                          </label>
                          <div className="flex h-11 items-center overflow-hidden rounded-lg border border-input bg-surface">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                              className="flex h-full w-11 items-center justify-center text-muted-foreground hover:bg-surface-low hover:text-primary"
                            >
                              <span className="material-symbols-outlined text-base">remove</span>
                            </button>
                            <input
                              id="quantity"
                              type="number"
                              min={1}
                              value={quantity}
                              onChange={(e) =>
                                setQuantity(Math.max(1, Number(e.target.value) || 1))
                              }
                              className="h-full w-full border-x border-input bg-surface text-center text-sm outline-none"
                            />
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQuantity((q) => q + 1)}
                              className="flex h-full w-11 items-center justify-center text-muted-foreground hover:bg-surface-low hover:text-primary"
                            >
                              <span className="material-symbols-outlined text-base">add</span>
                            </button>
                          </div>
                        </div>

                        <Variant
                          id="reagentKit"
                          label="Reagent Starter Kit"
                          value={reagentKit}
                          onChange={setReagentKit}
                          options={[...REAGENT_KITS]}
                        />
                        <Variant
                          id="servicePlan"
                          label="Service Plan"
                          value={servicePlan}
                          onChange={setServicePlan}
                          options={[...SERVICE_PLANS]}
                        />
                        <Variant
                          id="installation"
                          label="Installation & Training"
                          value={installation}
                          onChange={setInstallation}
                          options={[...INSTALL_OPTIONS]}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      No items selected yet. Choose a product below or browse the catalog.
                    </p>
                    {item && (
                      <button
                        type="button"
                        className="btn-outline mt-4"
                        onClick={() => setRemoved(false)}
                      >
                        Restore {item.name}
                      </button>
                    )}
                  </div>
                )}

                <div className="mt-5">
                  <label
                    className="mb-2 block text-xs font-medium text-primary"
                    htmlFor="catalog-item"
                  >
                    Select an item from the catalog
                  </label>
                  <select
                    id="catalog-item"
                    className="h-11 w-full rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-secondary"
                    value={selectedSlug}
                    onChange={(e) => {
                      setSelectedSlug(e.target.value);
                      setRemoved(false);
                    }}
                  >
                    {products.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-8 flex justify-between">
                  <button type="button" className="btn-outline" onClick={() => setStep(1)}>
                    <span className="material-symbols-outlined text-base">arrow_back</span> Back
                  </button>
                  <button type="button" className="btn-primary" onClick={() => setStep(3)}>
                    Next <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className={step === 3 ? "" : "hidden"}>
                <h2 className="mb-1 text-xl font-semibold text-primary">Procurement Details</h2>
                <p className="mb-8 text-sm text-muted-foreground">
                  Help us understand your timeline and specific requirements.
                </p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-primary">
                      Estimated Annual Volume (Tests)
                    </label>
                    <select
                      name="annualVolume"
                      className="h-12 w-full rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-secondary"
                    >
                      <option>&lt; 10,000</option>
                      <option>10,000 - 50,000</option>
                      <option>50,000 - 100,000</option>
                      <option>&gt; 100,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-primary">
                      Required Delivery Timeline
                    </label>
                    <select
                      name="timeline"
                      className="h-12 w-full rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-secondary"
                    >
                      <option>Immediate (1-2 weeks)</option>
                      <option>Standard (3-4 weeks)</option>
                      <option>Future Project Q3</option>
                      <option>Future Project Q4</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-primary">
                      Technical Requirements &amp; Notes
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Please detail any specific LIS integration needs, power requirements, or installation constraints..."
                      className="w-full rounded-lg border border-input bg-surface px-4 py-3 text-sm outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                {activeItem && (
                  <div className="mt-6 rounded-lg border border-border bg-surface-low p-4">
                    <h3 className="mb-2 text-sm font-semibold text-primary">Your selection</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeItem.name} ({activeItem.sku}) × {Math.max(1, quantity)} · Reagent kit:{" "}
                      {reagentKit} · Service plan: {servicePlan} · {installation}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex items-start gap-3 rounded-lg bg-surface-low p-4">
                  <span className="material-symbols-outlined text-secondary">info</span>
                  <p className="text-xs text-muted-foreground">
                    By submitting this request, a LIVAN specialist will contact you within 24 hours
                    to discuss your configuration and provide a detailed quotation including
                    logistics and installation.
                  </p>
                </div>

                <div className="mt-8 flex justify-between">
                  <button type="button" className="btn-outline" onClick={() => setStep(2)}>
                    <span className="material-symbols-outlined text-base">arrow_back</span> Back
                  </button>
                  <button type="submit" className="btn-primary">
                    Submit Request
                    <span className="material-symbols-outlined text-base">send</span>
                  </button>
                </div>
              </div>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Prefer to browse first?{" "}
              <Link to="/products" className="font-semibold text-secondary hover:underline">
                Return to the catalog
              </Link>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-1 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-primary">{value}</dd>
    </div>
  );
}

function Tag({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-[11px] text-muted-foreground">
      <span className="material-symbols-outlined text-sm text-secondary">{icon}</span>
      {text}
    </span>
  );
}

function Variant({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-primary" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-secondary"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Field({
  label,
  placeholder,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-primary" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-input bg-surface px-4 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/15"
      />
    </div>
  );
}
