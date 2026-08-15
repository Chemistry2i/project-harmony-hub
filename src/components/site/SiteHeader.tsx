import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/livan-logo.png.asset.json";
import { ProductSearch } from "@/components/site/ProductSearch";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Livan Lab Supplies home">
          <img
            src={logo.url}
            alt="Livan Lab Supplies Uganda Limited"
            className="h-14 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-secondary"
              activeProps={{ className: "text-secondary font-semibold border-b-2 border-secondary pb-1" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ProductSearch />
          <Link to="/quote" className="btn-primary">
            Request a Quote
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ProductSearch className="p-2 text-primary" />
          <button
          className="p-2 text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-surface md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm font-medium text-muted-foreground hover:bg-surface-low hover:text-secondary"
                activeProps={{ className: "text-secondary font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/quote" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
