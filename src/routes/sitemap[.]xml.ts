import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const origin = "https://www.livanlabs.com";
        const staticPaths = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/about", priority: "0.9", changefreq: "monthly" },
          { path: "/products", priority: "0.9", changefreq: "weekly" },
          { path: "/industries", priority: "0.8", changefreq: "monthly" },
          { path: "/services", priority: "0.8", changefreq: "monthly" },
          { path: "/contact", priority: "0.7", changefreq: "monthly" },
          { path: "/quote", priority: "0.7", changefreq: "monthly" },
        ];
        const urls: {
          loc: string;
          priority: string;
          changefreq: string;
          image?: string;
        }[] = [
          ...staticPaths.map((p) => ({
            loc: `${origin}${p.path}`,
            priority: p.priority,
            changefreq: p.changefreq,
          })),
          ...products.map((p) => ({
            loc: `${origin}/products/${p.slug}`,
            priority: "0.8",
            changefreq: "weekly",
            image: p.image,
          })),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map((u) => {
    const imageTag = u.image
      ? `  <image:image><image:loc>${u.image.startsWith("http") ? u.image : origin + u.image}</image:loc></image:image>`
      : "";
    return `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    ${imageTag}
  </url>`;
  })
  .join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
