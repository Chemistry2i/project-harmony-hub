import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden card-surface transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(11,31,51,0.08)]">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block h-64 overflow-hidden bg-surface-low"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-grow flex-col p-6">
        <div className="eyebrow mb-2">
          {product.brand} · {product.category}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-primary">
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="hover:text-secondary"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mb-4 flex-grow text-sm text-muted-foreground">{product.short}</p>
        <Link to="/quote" search={{ product: product.slug }} className="btn-outline w-full">
          Request a Quote
        </Link>
      </div>
    </article>
  );
}
