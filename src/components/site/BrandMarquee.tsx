export function BrandMarquee({ brands }: { brands: string[] }) {
  const items = [...brands, ...brands];
  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="mx-6 flex h-16 min-w-[160px] items-center justify-center rounded-lg border border-border bg-surface px-6 text-sm font-semibold text-muted-foreground"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
