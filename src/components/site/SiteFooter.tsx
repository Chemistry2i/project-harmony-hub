import { Link } from "@tanstack/react-router";
import logo from "@/assets/livan-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page grid grid-cols-1 gap-10 py-14 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <div className="w-fit rounded-lg bg-white p-3">
            <img
              src={logo.url}
              alt="Livan Lab Supplies Uganda Limited"
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="max-w-xs text-sm text-primary-foreground/70">
            Laboratory, Diagnostic &amp; Scientific Solutions for modern healthcare and research.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="mb-2 text-sm font-bold">Company</h4>
          <Link className="text-sm text-primary-foreground/70 hover:text-primary-foreground" to="/about">
            About Us
          </Link>
          <Link className="text-sm text-primary-foreground/70 hover:text-primary-foreground" to="/services">
            Services
          </Link>
          <Link className="text-sm text-primary-foreground/70 hover:text-primary-foreground" to="/contact">
            Contact
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="mb-2 text-sm font-bold">Products</h4>
          <Link className="text-sm text-primary-foreground/70 hover:text-primary-foreground" to="/products">
            Product Catalog
          </Link>
          <Link className="text-sm text-primary-foreground/70 hover:text-primary-foreground" to="/quote">
            Request a Quote
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="mb-2 text-sm font-bold">Support</h4>
          <span className="text-sm text-primary-foreground/70">Technical Support</span>
          <span className="text-sm text-primary-foreground/70">Product Manuals</span>
          <span className="text-sm text-primary-foreground/70">Compliance</span>
        </div>

        <div className="col-span-1 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/20 pt-6 md:col-span-4 md:flex-row">
          <p className="text-xs text-primary-foreground/70">
            © {new Date().getFullYear()} LIVAN LAB SUPPLIES UGANDA LIMITED. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/70">
            Laboratory | Diagnostic | Scientific Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
