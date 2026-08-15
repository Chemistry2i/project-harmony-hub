import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, productGroups, products } from "@/data/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Product Catalog | Livan Lab Supplies Uganda" },
      {
        name: "description",
        content:
          "Browse certified laboratory equipment, diagnostic analyzers, apparatus and consumables available from Livan Lab Supplies Uganda Limited.",
      },
      { property: "og:title", content: "Product Catalog | Livan Lab Supplies Uganda" },
      {
        property: "og:description",
        content:
          "High-precision laboratory and diagnostic solutions for clinical and scientific environments.",
      },
      { property: "og:image", content: products[0]?.image ?? "" },
      { name: "twitter:image", content: products[0]?.image ?? "" },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Products");

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchesCategory = category === "All Products" || p.category === category;
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      }),
    [query, category],
  );

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow pt-20">
        <section className="border-b border-border bg-surface py-16">
          <div className="container-page max-w-4xl">
            <h1 className="mb-5 text-4xl font-bold text-primary md:text-5xl">Product Catalog</h1>
            <p className="text-lg text-muted-foreground">
              Providing high-precision laboratory and diagnostic solutions for the rigorous demands
              of modern clinical and scientific environments. Explore our comprehensive inventory of
              certified equipment, apparatus, and analytical instruments.
            </p>
          </div>
        </section>

        <section className="sticky top-20 z-40 border-b border-border bg-surface/95 py-6 backdrop-blur-sm">
          <div className="container-page flex flex-col gap-5">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="relative w-full md:w-1/3">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  search
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by instrument name, brand, or SKU..."
                  className="h-12 w-full rounded-lg border border-input bg-surface pl-10 pr-4 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/15"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-primary">{filtered.length}</span> products
              </div>
            </div>
            <div className="flex w-full flex-wrap gap-3">
              {categories.map((c) => {
                const active = c === category;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={
                      active
                        ? "rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        : "rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-secondary hover:text-secondary"
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container-page py-20">
          {productGroups.map((group) => {
            const items = filtered.filter((p) => p.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group} className="mb-20 last:mb-0">
                <h2 className="mb-8 text-2xl font-bold text-primary md:text-3xl">{group}</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">
              No products match your search. Try a different term or category.
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
