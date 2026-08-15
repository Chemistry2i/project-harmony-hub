import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

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
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow pt-20">
        <section className="border-b border-border bg-surface py-16">
          <div className="container-page max-w-4xl">
            <div className="eyebrow mb-3">Contact</div>
            <h1 className="mb-5 text-4xl font-bold text-primary md:text-5xl">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Our technical and procurement teams are available to advise on equipment selection,
              servicing schedules and institutional supply agreements.
            </p>
          </div>
        </section>

        <section className="container-page grid grid-cols-1 gap-10 py-20 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-1">
            {[
              { icon: "mail", label: "Email", value: "info@livanlabsupplies.co.ug" },
              { icon: "call", label: "Phone", value: "+256 700 000 000" },
              { icon: "location_on", label: "Office", value: "Kampala, Uganda" },
              { icon: "schedule", label: "Hours", value: "Mon – Fri, 8:00 – 17:00 EAT" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 card-surface p-5">
                <span className="material-symbols-outlined filled text-secondary">{c.icon}</span>
                <div>
                  <p className="eyebrow mb-1">{c.label}</p>
                  <p className="text-sm font-medium text-primary">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="card-surface p-8 lg:col-span-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="mb-6 text-xl font-semibold text-primary">Send us a message</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Full Name" placeholder="Dr. Jane Doe" />
              <Field label="Email" placeholder="jdoe@institution.ac.ug" type="email" />
              <Field label="Institution" placeholder="National Research Facility" />
              <Field label="Phone Number" placeholder="+256 700 000 000" type="tel" />
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-primary">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us about the equipment or support you need..."
                className="w-full rounded-lg border border-input bg-surface px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/15"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary">
                Send Message
                <span className="material-symbols-outlined text-base">send</span>
              </button>
              <Link to="/quote" className="btn-outline">
                Request a Quote instead
              </Link>
            </div>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-primary">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-input bg-surface px-4 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/15"
      />
    </div>
  );
}
