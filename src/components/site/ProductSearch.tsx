import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { searchProducts, products } from "@/data/products";

export function ProductSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  const results = useMemo(
    () => (query.trim() ? searchProducts(query).slice(0, 8) : products.slice(0, 6)),
    [query],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search products"
        className={
          className ??
          "flex h-10 items-center gap-2 rounded-lg border border-border bg-surface-low px-3 text-sm text-muted-foreground transition-colors hover:border-secondary hover:text-secondary"
        }
      >
        <span className="material-symbols-outlined text-base">search</span>
        <span className="hidden lg:inline">Search products</span>
        <kbd className="ml-1 hidden rounded border border-border px-1.5 py-0.5 text-[10px] lg:inline">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-primary/40 p-4 pt-24 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <span className="material-symbols-outlined text-muted-foreground">search</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search instruments, brands, SKUs or applications..."
                  className="h-14 w-full bg-transparent text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close search"
                  className="text-muted-foreground hover:text-primary"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="max-h-[55vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <p className="p-8 text-center text-sm text-muted-foreground">
                    No products match “{query}”. Try a brand or category.
                  </p>
                )}
                {results.map((p) => (
                  <Link
                    key={p.slug}
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-surface-low"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-grow">
                      <p className="truncate text-sm font-semibold text-primary">{p.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {p.brand} · {p.category} · {p.sku}
                      </p>
                    </div>
                    <span className="hidden shrink-0 text-xs font-medium text-secondary sm:inline">
                      {p.availability}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
                <span>{query.trim() ? `${results.length} result(s)` : "Popular products"}</span>
                <Link
                  to="/products"
                  onClick={() => setOpen(false)}
                  className="font-semibold text-secondary hover:underline"
                >
                  Browse full catalog
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
