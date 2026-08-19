import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "@/data/products";

/**
 * Generates a branded, printable PDF datasheet for a product entirely in the
 * browser (no server round-trip) and triggers the download.
 */
export function DatasheetButton({
  product,
  className = "btn-outline",
}: {
  product: Product;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    setBusy(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 48;
      let y = 56;

      // Header band
      doc.setFillColor(15, 37, 69);
      doc.rect(0, 0, pageWidth, 96, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("LIVAN LAB SUPPLIES UGANDA LIMITED", margin, 46);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(
        "Product Datasheet · B8 Ivory Plaza, Wilson Rd, Kampala · +256 772 248260",
        margin,
        66,
      );

      y = 140;
      doc.setTextColor(15, 37, 69);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text(doc.splitTextToSize(product.name, pageWidth - margin * 2), margin, y);
      y += 26;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(90, 100, 115);
      doc.text(`SKU ${product.sku}  |  ${product.brand}  |  ${product.category}`, margin, y);
      y += 24;

      doc.setTextColor(40, 48, 60);
      doc.setFontSize(11);
      const desc = doc.splitTextToSize(product.description, pageWidth - margin * 2);
      doc.text(desc, margin, y);
      y += desc.length * 15 + 14;

      const section = (title: string) => {
        if (y > 720) {
          doc.addPage();
          y = 72;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(15, 37, 69);
        doc.text(title, margin, y);
        y += 8;
        doc.setDrawColor(0, 128, 160);
        doc.setLineWidth(1.5);
        doc.line(margin, y, margin + 48, y);
        y += 18;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10.5);
        doc.setTextColor(40, 48, 60);
      };

      const row = (label: string, value: string) => {
        if (y > 780) {
          doc.addPage();
          y = 72;
        }
        doc.setTextColor(90, 100, 115);
        doc.text(label, margin, y);
        doc.setTextColor(20, 28, 40);
        const lines = doc.splitTextToSize(value, pageWidth - margin * 2 - 170);
        doc.text(lines, margin + 170, y);
        y += lines.length * 14 + 4;
      };

      section("Commercial Information");
      row("Indicative price", product.priceRange);
      row("Availability", product.availability);
      row("Lead time", product.leadTime);
      row("Warranty", product.warranty);
      y += 10;

      section("Technical Specifications");
      product.specs.forEach((s) => row(s.label, s.value));
      y += 10;

      section("Key Features");
      product.features.forEach((f) => {
        const lines = doc.splitTextToSize(`•  ${f}`, pageWidth - margin * 2);
        if (y > 780) {
          doc.addPage();
          y = 72;
        }
        doc.text(lines, margin, y);
        y += lines.length * 14 + 2;
      });
      y += 10;

      section("Typical Applications");
      const apps = doc.splitTextToSize(product.applications.join(" · "), pageWidth - margin * 2);
      doc.text(apps, margin, y);
      y += apps.length * 14 + 24;

      if (y > 740) {
        doc.addPage();
        y = 72;
      }
      doc.setFillColor(240, 245, 250);
      doc.roundedRect(margin, y, pageWidth - margin * 2, 64, 6, 6, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 37, 69);
      doc.text("Request a formal quotation", margin + 16, y + 26);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(70, 80, 95);
      doc.text(
        "www.livanlabs.com/quote  ·  wambogohassan63@gmail.com  ·  +256 772 248260",
        margin + 16,
        y + 46,
      );

      doc.setFontSize(8);
      doc.setTextColor(130, 138, 150);
      doc.text(
        "Specifications and pricing are indicative and subject to confirmation at quotation stage.",
        margin,
        doc.internal.pageSize.getHeight() - 32,
      );

      doc.save(`Livan-Datasheet-${product.sku}.pdf`);
      toast.success("Datasheet downloaded", { description: `${product.name} (PDF)` });
    } catch {
      toast.error("Could not generate the datasheet. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button type="button" onClick={handleDownload} disabled={busy} className={className}>
      <span className="material-symbols-outlined text-base">
        {busy ? "hourglass_top" : "download"}
      </span>
      {busy ? "Preparing…" : "Download Datasheet (PDF)"}
    </button>
  );
}
