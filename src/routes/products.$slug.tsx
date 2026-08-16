import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct, products } from "@/data/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} | Livan Lab Supplies Uganda`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description.slice(0, 155) },
        { property: "og:image", content: product.image },
        { name: "twitter:image", content: product.image },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${product.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://www.livanlabs.com/products/${product.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            sku: product.sku,
            image: product.image,
            description: product.description,
            brand: { "@type": "Brand", name: product.brand },
            category: product.category,
            offers: {
              "@type": "Offer",
              priceCurrency: "UGX",
              availability:
                product.availability === "In Stock"
                  ? "https://schema.org/InStock"
                  : product.availability === "Low Stock"
                    ? "https://schema.org/LimitedAvailability"
                    : "https://schema.org/PreOrder",
              seller: { "@type": "Organization", name: "Livan Lab Supplies Uganda Limited" },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: `/products/${product.slug}`,
              },
            ],
          }),
        },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const related = products
    .filter((p) => p.slug !== product.slug && p.group === product.group)
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow pt-20">
        <div className="container-page py-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
          >
            <Link to="/" className="hover:text-secondary">
              Home
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <Link to="/products" className="hover:text-secondary">
              Products
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="font-medium text-primary">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface-low">
              <img
                src={product.image}
                alt={product.name}
                className="h-full max-h-[520px] w-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div>
                {product.badge && (
                  <span className="mb-4 inline-block rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
                    {product.badge}
                  </span>
                )}
                <h1 className="mb-2 text-3xl font-bold text-primary md:text-4xl">{product.name}</h1>
                <p className="text-sm text-muted-foreground">
                  SKU: {product.sku} · {product.brand} · {product.category}
                </p>
              </div>
              <p className="text-muted-foreground">{product.description}</p>
              <dl className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-surface-low p-5 sm:grid-cols-2">
                {[
                  { label: "Availability", value: product.availability },
                  { label: "Lead time", value: product.leadTime },
                  { label: "Warranty", value: product.warranty },
                ].map((row) => (
                  <div key={row.label}>
                    <dt className="eyebrow mb-1">{row.label}</dt>
                    <dd className="text-sm font-semibold text-primary">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <p className="eyebrow mb-2">Typical applications</p>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/quote" search={{ product: product.slug }} className="btn-primary">
                  <span className="material-symbols-outlined filled text-base">request_quote</span>
                  Request a Quote
                </Link>
                <Link to="/contact" className="btn-outline">
                  <span className="material-symbols-outlined text-base">help</span>
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="card-surface overflow-hidden lg:col-span-2">
              <div className="border-b border-border px-6 py-5">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <span className="material-symbols-outlined text-secondary">settings</span>
                  Technical Specifications
                </h2>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((s) => (
                    <tr key={s.label} className="border-b border-border last:border-0">
                      <th className="w-1/2 px-6 py-4 text-left font-medium text-muted-foreground">
                        {s.label}
                      </th>
                      <td className="px-6 py-4 text-primary">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-8">
              <div className="card-surface p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <span className="material-symbols-outlined text-secondary">star</span>
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="material-symbols-outlined filled text-base text-teal">
                        check_circle
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-surface p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <span className="material-symbols-outlined text-secondary">folder_open</span>
                  Resource Center
                </h3>
                <div className="flex flex-col gap-3">
                  {["Technical Data Sheet (PDF)", "User Manual (PDF)"].map((r) => (
                    <Link
                      key={r}
                      to="/contact"
                      className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-primary hover:border-secondary hover:text-secondary"
                    >
                      <span>{r}</span>
                      <span className="material-symbols-outlined text-base">download</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 text-2xl font-bold text-primary">Related Products</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
