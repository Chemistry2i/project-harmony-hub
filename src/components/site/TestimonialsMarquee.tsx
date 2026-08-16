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

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="flex h-[340px] w-[340px] shrink-0 flex-col whitespace-normal break-words rounded-xl border border-border bg-surface p-7 text-left transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-1 text-secondary">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="material-symbols-outlined text-base">
            star
          </span>
        ))}
      </div>
      <p className="mb-6 flex-grow overflow-hidden text-sm leading-relaxed text-muted-foreground italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-auto border-t border-border pt-4">
        <p className="text-sm font-semibold text-primary">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        <p className="text-xs text-muted-foreground">{testimonial.institution}</p>
      </div>
    </div>
  );
}

export function TestimonialsMarquee() {
  const items = [...testimonials, ...testimonials];
  return (
    <div className="group relative overflow-hidden">
      <div className="flex w-max animate-marquee-left">
        {items.map((t, i) => (
          <div key={`testimonial-${t.name}-${i}`} className="mx-3">
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent" />
    </div>
  );
}
