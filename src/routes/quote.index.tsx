import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads.functions";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getProduct, products } from "@/data/products";

const SIDE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAZHemEP5sypsWxWSeeTb_UsUC9dt-dyFpEICvr9jhcf3VnYe1iRiduxS3Em4KHb1l46c9MAFTiNgCrB2xdTdAhA8KbCvcLKfKt3t1yrFdEXhA-WbOOxSnyWubEsCssA241SRzBW-UJSoB8O4CioEihBh8lDKAnByhySH9xjtT0GBhUHhZouBc56uGUIAnDrhcDM12DEII8dcz0cgA45CZMCGyBWYbtSVxYWyZ__nRwqQpiWFgf2oCj";

type QuoteSearch = { product?: string | undefined };

export const Route = createFileRoute("/quote/")({
  validateSearch: (search: Record<string, unknown>): QuoteSearch => ({
    product: typeof search["product"] === "string" ? search["product"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Request a Quote | Livan Lab Supplies Uganda" },
      {
        name: "description",
        content:
          "Request an institutional quotation for laboratory and diagnostic equipment. A Livan specialist responds within 24 hours.",
      },
      { property: "og:title", content: "Request a Quote | Livan Lab Supplies Uganda" },
      {
        property: "og:description",
        content: "Tell us your requirements and receive a tailored quotation within 24 hours.",
      },
    ],
  }),
  component: QuotePage,
});

const steps = ["Contact", "Products", "Details"];

function QuotePage() {
  const { product: slug } = Route.useSearch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const selected = slug ? getProduct(slug) : undefined;
  const [item, setItem] = useState(selected ?? products[4]);
  const [quantity, setQuantity] = useState(1);
  const [removed, setRemoved] = useState(false);
  const [sending, setSending] = useState(false);
  const send = useServerFn(submitLead);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSending(true);
    try {
      const res = await send({
        data: {
          type: "quote" as const,
          fullName: String(fd.get("fullName") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          institution: String(fd.get("institution") ?? ""),
          location: String(fd.get("location") ?? ""),
          message: String(fd.get("message") ?? ""),
          annualVolume: String(fd.get("annualVolume") ?? ""),
          timeline: String(fd.get("timeline") ?? ""),
          items:
            !removed && item
              ? [
                  {
                    name: item.name,
                    sku: item.sku,
                    quantity: Math.max(1, quantity),
                    reagentKit: String(fd.get("reagentKit") ?? "Included"),
                  },
                ]
              : [],
        },
      });
      toast.success("Quotation request submitted", {
        description: `Reference ${res.reference}. Our team has been notified.`,
      });
      navigate({ to: "/quote/submitted", search: { ref: res.reference } });
    } catch (err) {
      toast.error("Submission failed", {
        description: err instanceof Error ? err.message : "Please try again in a moment.",
      });
    } finally {
      setSending(false);
    }
  };

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
            <img
              src={SIDE_IMAGE}
              alt="Macro shot of clear laboratory pipettes on a clean white background"
              className="h-56 w-full rounded-xl object-cover"
              loading="lazy"
            />
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
                        active ? "text-sm font-semibold text-primary" : "text-sm text-muted-foreground"
                      }
                    >
                      {label}
                    </span>
                    {n < steps.length && <div className="h-px flex-grow bg-border" />}
                  </div>
                );
              })}
            </div>

            <form
              className="card-surface p-8"
              onSubmit={onSubmit}
            >
              {step === 1 && (
                <div>
                  <h2 className="mb-1 text-xl font-semibold text-primary">Contact Information</h2>
                  <p className="mb-8 text-sm text-muted-foreground">
                    Please provide your primary institutional contact details.
                  </p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field name="fullName" label="Full Name" placeholder="Dr. Jane Doe" />
                    <Field
                      label="Institutional Email"
                      placeholder="jdoe@institution.ac.ug"
                      type="email"
                    />
                    <Field name="phone" label="Phone Number" placeholder="+256 700 000 000" type="tel" required={false} />
                    <Field name="institution" label="Lab/Institution Name" placeholder="National Research Facility" />
                    <div className="md:col-span-2">
                      <Field name="location" label="Facility Location" placeholder="City, Country" required={false} />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button type="button" className="btn-primary" onClick={() => setStep(2)}>
                      Next <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="mb-1 text-xl font-semibold text-primary">Product Selection</h2>
                  <p className="mb-8 text-sm text-muted-foreground">
                    Review your selected items and adjust quantities.
                  </p>

                  {!removed && item ? (
                    <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface-low p-5 md:flex-row">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-full rounded-lg object-cover md:w-40"
                      />
                      <div className="flex-grow">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="eyebrow">{item.category}</span>
                            <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              SKU: {item.sku} | Base Configuration
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
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-xs font-medium text-primary">
                              Quantity
                            </label>
                            <input
                              type="number"
                              min={1}
                              value={quantity}
                              onChange={(e) => setQuantity(Number(e.target.value))}
                              className="h-11 w-full rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-secondary"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-xs font-medium text-primary">
                              Reagent Starter Kit
                            </label>
                            <select name="reagentKit" className="h-11 w-full rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-secondary">
                              <option>Included</option>
                              <option>Extended (3mo)</option>
                              <option>None</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                      No items selected yet. Add products from the catalog.
                    </p>
                  )}

                  <div className="mt-5">
                    <label className="mb-2 block text-xs font-medium text-primary">
                      Add another item from the catalog
                    </label>
                    <select
                      className="h-11 w-full rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-secondary"
                      value={item?.slug ?? ""}
                      onChange={(e) => {
                        setItem(getProduct(e.target.value));
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
              )}

              {step === 3 && (
                <div>
                  <h2 className="mb-1 text-xl font-semibold text-primary">Procurement Details</h2>
                  <p className="mb-8 text-sm text-muted-foreground">
                    Help us understand your timeline and specific requirements.
                  </p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">
                        Estimated Annual Volume (Tests)
                      </label>
                      <select name="annualVolume" className="h-12 w-full rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-secondary">
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
                      <select name="timeline" className="h-12 w-full rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-secondary">
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

                  <div className="mt-6 flex items-start gap-3 rounded-lg bg-surface-low p-4">
                    <span className="material-symbols-outlined text-secondary">info</span>
                    <p className="text-xs text-muted-foreground">
                      By submitting this request, a LIVAN specialist will contact you within 24
                      hours to discuss your configuration and provide a detailed quotation including
                      logistics and installation.
                    </p>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button type="button" className="btn-outline" onClick={() => setStep(2)}>
                      <span className="material-symbols-outlined text-base">arrow_back</span> Back
                    </button>
                    <button type="submit" className="btn-primary" disabled={sending}>
                      {sending ? "Submitting..." : "Submit Request"}
                      <span className="material-symbols-outlined text-base">
                        {sending ? "progress_activity" : "send"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
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

function Field({
  label,
  placeholder,
  name,
  type = "text",
  required = true,
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
