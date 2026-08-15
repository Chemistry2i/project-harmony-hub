import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const ABOUT_HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAUR7c5hSkwlOHIOGQXP-SIXMM-JFSpUdKZ4DRwTiJct8idUnpwJw_6216QgCAdQNNgEzlWjVowrescJGJNExhEckps9Il2OAkB6_VylqeymBvkuHLyAVsD3N021URTHRUvZW1Cda4gwVWNKjNAdJau6koRB0SfNAIuoj6N3KYXAfbX1bX9_YNm2MXhhbdzigAobQNx7T3W4GjJOuu6eWEz51618gIiYTD4wrqtvlqWk90_YpnaLj9h";

const values = [
  { icon: "verified", title: "Quality", body: "Uncompromising standards in every product we deliver." },
  {
    icon: "published_with_changes",
    title: "Reliability",
    body: "Consistent, timely fulfillment of critical scientific needs.",
  },
  { icon: "school", title: "Professionalism", body: "Expertise and integrity in all our engagements." },
  {
    icon: "handshake",
    title: "Customer Focus",
    body: "Tailored solutions that prioritize institutional success.",
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
                  world-leading manufacturers and the specialized needs of regional institutions.
                </p>
                <p className="text-muted-foreground">
                  Our expertise extends beyond simple procurement. We offer technical advisory,
                  robust logistical support, and dedicated after-sales service to ensure that our
                  clients&apos; laboratories operate at peak efficiency and accuracy.
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
      </main>
      <SiteFooter />
    </div>
  );
}
