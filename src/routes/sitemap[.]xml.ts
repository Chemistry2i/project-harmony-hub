import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const staticPaths = ["/", "/about", "/products", "/services", "/contact", "/quote"];
        const urls = [
          ...staticPaths.map((p) => ({ loc: `${origin}${p}`, priority: p === "/" ? "1.0" : "0.8" })),
          ...products.map((p) => ({
            loc: `${origin}/products/${p.slug}`,
            priority: "0.7",
          })),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc><changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
