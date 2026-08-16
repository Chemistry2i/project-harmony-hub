import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { value: 0 };
    gsap.to(obj, {
      value: to,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.value).toLocaleString()}${suffix}`;
      },
    });
  }, [to, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

export function StatsBand({
  stats,
}: {
  stats: { value: number; suffix?: string; prefix?: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border bg-surface p-8 md:grid-cols-4 md:p-10">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-3xl font-bold text-secondary md:text-4xl">
            <CountUp to={s.value} suffix={s.suffix} prefix={s.prefix} />
          </div>
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
