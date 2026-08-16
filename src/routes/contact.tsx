import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { submitLead } from "@/lib/leads.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Livan Lab Supplies Uganda Limited" },
      {
        name: "description",
        content:
          "Contact Livan Lab Supplies Uganda Limited for laboratory equipment enquiries, technical support, servicing and procurement assistance.",
      },
      { property: "og:title", content: "Contact Livan Lab Supplies Uganda Limited" },
      {
        property: "og:description",
        content: "Talk to our specialists about equipment supply, installation and servicing.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const send = useServerFn(submitLead);
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    try {
      const res = await send({
        data: {
          type: "contact" as const,
          fullName: String(fd.get("fullName") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          institution: String(fd.get("institution") ?? ""),
          message: String(fd.get("message") ?? ""),
          items: [],
        },
      });
      setReference(res.reference);
      toast.success("Message received", {
        description: `Our team has been notified. Reference ${res.reference}.`,
      });
      form.reset();
    } catch (err) {
      toast.error("We could not send your message", {
        description: err instanceof Error ? err.message : "Please try again or call our office.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow pt-20">
        <section className="border-b border-border bg-surface py-16">
          <div className="container-page max-w-4xl">
            <Reveal>
              <div className="eyebrow mb-3">Contact</div>
              <h1 className="mb-5 text-4xl font-bold text-primary md:text-5xl">Get in Touch</h1>
              <p className="text-lg text-muted-foreground">
                Our technical and procurement teams are available to advise on equipment selection,
                servicing schedules and institutional supply agreements.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="container-page grid grid-cols-1 gap-10 py-20 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-1">
            {[
              { icon: "mail", label: "Email", value: "info@livanlabsupplies.co.ug" },
              { icon: "call", label: "Phone", value: "+256 700 000 000" },
              {
                icon: "chat",
                label: "WhatsApp",
                value: "+256 700 000 000",
                href: "https://wa.me/256700000000",
              },
              { icon: "location_on", label: "Office", value: "Kampala, Uganda" },
              { icon: "schedule", label: "Hours", value: "Mon – Fri, 8:00 – 17:00 EAT" },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <div className="flex items-start gap-4 card-surface p-5">
                  <span className="material-symbols-outlined filled text-secondary">{c.icon}</span>
                  <div>
                    <p className="eyebrow mb-1">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-secondary hover:underline"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-primary">{c.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <form className="card-surface p-8 lg:col-span-2" onSubmit={onSubmit}>
            <h2 className="mb-6 text-xl font-semibold text-primary">Send us a message</h2>
            {reference && (
              <div className="mb-6 rounded-lg border border-teal/40 bg-teal/10 p-4 text-sm text-primary">
                Thank you — your enquiry has been logged as{" "}
                <span className="font-semibold text-secondary">{reference}</span>. A specialist will
                respond within one business day.
              </div>
            )}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field name="fullName" label="Full Name" placeholder="Dr. Jane Doe" required />
              <Field
                name="email"
                label="Email"
                placeholder="jdoe@institution.ac.ug"
                type="email"
                required
              />
              <Field
                name="institution"
                label="Institution"
                placeholder="National Research Facility"
              />
              <Field name="phone" label="Phone Number" placeholder="+256 700 000 000" type="tel" />
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-primary" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell us about the equipment or support you need..."
                className="w-full rounded-lg border border-input bg-surface px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/15"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
                <span className="material-symbols-outlined text-base">
                  {sending ? "progress_activity" : "send"}
                </span>
              </button>
              <Link to="/quote" className="btn-outline">
                Request a Quote instead
              </Link>
            </div>
          </form>
        </section>

        <section className="container-page pb-20">
          <div className="card-surface overflow-hidden">
            <iframe
              title="Livan Lab Supplies Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.755043393518!2d32.5825!3d0.3476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb0e0e5e5e5d%3A0x5e5e5e5e5e5e5e5e!2sKampala%2C%20Uganda!5e0!3m2!1sen!2sug!4v1690000000000"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>
        </section>
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
  required,
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
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-input bg-surface px-4 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/15"
      />
    </div>
  );
}
