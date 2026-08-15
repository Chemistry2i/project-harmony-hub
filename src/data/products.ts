export type Product = {
  slug: string;
  name: string;
  category: string;
  group: "Laboratory Equipment" | "Diagnostic Equipment" | "Apparatus & Consumables";
  sku: string;
  badge?: string;
  short: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  features: string[];
};

export const products: Product[] = [
  {
    slug: "leica-dm500-microscope",
    name: "Leica DM500 Microscope",
    category: "Microscopy",
    group: "Laboratory Equipment",
    sku: "LEI-DM500-001",
    badge: "Certified",
    short: "Standard student and clinical microscope for life sciences.",
    description:
      "Advanced educational and clinical microscope with infinity-corrected optics and EZStore design for safe handling. Built for teaching laboratories and routine clinical work where durability and optical clarity matter.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCm_Uf3hqcbbNEzNxYo4hxyO7mqd-fJ5CIZ7ylG_tJi_VFaEUTiGgvrgyKh_Q31WkUBhIs0mDbQR6zplPShbPSaLaV4PwSETiTMGQ-Z2J_qaqV3x8JvdVhxDLTL0IYxnqZM1dlB7lQ389Wz40-REG9qrqB8kmJZ-eka_guz_0s_9k04r5nBYUG84yNAKi9TOy7NDXk_fq1n9MedibiYoEPVGxzM_h1o808zYYfiCyyI3vetPMCToI4u",
    specs: [
      { label: "Optics", value: "Infinity-corrected achromatic" },
      { label: "Magnification", value: "40x – 1000x" },
      { label: "Illumination", value: "LED, 30,000 hours" },
      { label: "Head", value: "Binocular, 30° inclined" },
    ],
    features: [
      "EZStore design for safe handling and storage.",
      "Energy-efficient LED illumination with even field coverage.",
      "Ergonomic controls suited to long teaching sessions.",
      "Rugged construction for high-traffic laboratories.",
    ],
  },
  {
    slug: "eppendorf-centrifuge-5424",
    name: "Eppendorf Centrifuge 5424",
    category: "Centrifugation",
    group: "Laboratory Equipment",
    sku: "EPP-5424-001",
    short: "High-speed microcentrifuge for molecular biology applications.",
    description:
      "Standard 24-place microcentrifuge offering high-speed performance up to 21,130 × g for molecular biology applications, with quiet operation and a compact bench footprint.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDH748zn1FhK8-yGZ4cpMsUpQnTyl028z5-gMk3BxEQs_iXE-33UtP5ZwWZweAaD1Vf6e3PDRr2a40xEXySedUKeij8sPodE6uwL6FkOmAjjJQXrJ7dJfKMUP4Ga9PNgGsEvG_7r8nRBhELW2Jpd0fuEF47IGaiwYeoRZxbNbiaCagSpRkkQtChrB5cIGqWClEwc_dqepg59aqsYh5pc4qIoJGnzIL284tTV6mxr0S4ABkorjN0k9cl",
    specs: [
      { label: "Capacity", value: "24 × 1.5/2.0 mL tubes" },
      { label: "Max RCF", value: "21,130 × g" },
      { label: "Max Speed", value: "15,000 rpm" },
      { label: "Noise Level", value: "< 50 dB" },
    ],
    features: [
      "Rapid acceleration and braking for short protocols.",
      "Aerosol-tight rotor lid options available.",
      "Soft-touch keypad with quick-run function.",
      "Compact footprint for crowded benches.",
    ],
  },
  {
    slug: "mettler-toledo-analytical-balance",
    name: "Mettler Toledo Analytical Balance",
    category: "Weighing",
    group: "Laboratory Equipment",
    sku: "MTL-AB-204",
    badge: "Precision",
    short: "Professional grade weighing for chemical analysis.",
    description:
      "High-precision analytical balance delivering accurate weighing results with built-in internal calibration and a draft shield designed for fast, unobstructed sample access.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTm4TndxPv3KcP_5xGgOWAK2h_JVU07gMe-BVrJ-UWE3bgF5CE9SPe8fIu9p3efJ6vzSSGr2tsmbqqTZsc4BdgaObATzTXtgMA0s1x7zQbwOT1IGrNsPU1YM6ab4XDxwgAf4wtuOPJdL__0QvigLl9WJbfaw6WnKcEX-8gM1dED8jpv_jxJ3ZCBDgoch4ryndEUczzYYvVYv-WBXLQ_2Y1WF_0Cm6SBqT95Yzn9_QNjrRz0MDj57Rr",
    specs: [
      { label: "Readability", value: "0.1 mg" },
      { label: "Capacity", value: "220 g" },
      { label: "Calibration", value: "Internal, fully automatic" },
      { label: "Stabilisation", value: "≤ 3 seconds" },
    ],
    features: [
      "Built-in internal calibration for audit-ready results.",
      "Draft shield with wide, easy-clean access.",
      "Overload protection and level guidance.",
      "Data output for LIMS and printer connectivity.",
    ],
  },
  {
    slug: "sysmex-xp-300-analyzer",
    name: "Sysmex XP-300 Analyzer",
    category: "Hematology",
    group: "Diagnostic Equipment",
    sku: "SYS-XP300-001",
    badge: "Urgent Stock",
    short: "Compact, automated 3-part differential analyzer for clinical testing.",
    description:
      "Automated 3-part differential hematology analyzer providing accurate CBC results for clinical laboratories, with low reagent consumption and a straightforward operator workflow.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTp8JpW-CiOlNvVMoWx1jlmgO-wQJBKhy-N1CUuDZ0b-YVctpqnOuSxp0su-lvhUOba6sgUk6vVJGorNluXH4TqZYqSJhXkMjSjc_IEUStY0R0wHYBgNJRk63J6FnDPQO72H1eLIz8LpmEuItqOaziwvyXwJ4exqlvbtvqckh3hrO56xUXhjrq8C9qJGYKyFleOpEw03WX-7GRlRNC2beeVqOLkWuus3sH6TNuHWPHs8NiKG56txlT",
    specs: [
      { label: "Throughput", value: "Up to 60 samples/hour" },
      { label: "Parameters", value: "19 parameters, 3-part diff" },
      { label: "Sample Volume", value: "20 µL whole blood" },
      { label: "Storage", value: "10,000 results with histograms" },
    ],
    features: [
      "Reliable 3-part differential for routine CBC.",
      "Low reagent consumption per test.",
      "Colour LCD with guided operation.",
      "Bi-directional LIS connectivity.",
    ],
  },
  {
    slug: "roche-cobas-c111-analyzer",
    name: "Roche Cobas c111 Analyzer",
    category: "Clinical Chemistry",
    group: "Diagnostic Equipment",
    sku: "RCH-C111-001",
    badge: "In Stock",
    short: "Reliable clinical chemistry solution for small-to-mid volume labs.",
    description:
      "The cobas c111 analyzer is a compact, highly efficient continuous random-access analyzer intended for the in vitro determination of clinical chemistry parameters in serum, plasma, urine, and whole blood. Designed specifically for small workload laboratories, it delivers the same high-quality results expected from larger Roche systems.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYKCsaVGPg7Hfh2qIpnRCmOQgjfPTAMFj2V3OPEauzf9uBfCgqZpaLscThaNvRkHDdZqZz505XIMghVBq3Msg46yy7T1X8lHD3wkCUeXuUfXUlU_U3PGu15bNJZruxHfcYriYBVZo6vTng58GzScNJuqhV_yee0sPAk1WlmGgxmwpN69VZ2cN56cBco1agUptMPlerorae_iFBlOfxFiMlWfwJbhnssST8YEEolp1RLOolN8XczSD4",
    specs: [
      { label: "Throughput", value: "Up to 100 tests/hour" },
      { label: "Sample Types", value: "Serum, plasma, urine, whole blood" },
      { label: "Dimensions (W x D x H)", value: "72 cm x 55 cm x 48 cm" },
      { label: "Weight", value: "Approx. 35 kg" },
      { label: "Interface", value: "Colour touch screen" },
      { label: "Operating Conditions", value: "15-32°C, 30-80% humidity" },
      {
        label: "Sample Barcode Types",
        value: "Code 128, Codabar (NW 7), Interleaved 2 of 5, Code 39",
      },
      { label: "Power Requirements", value: "100-240V AC, 50/60 Hz, 250VA" },
    ],
    features: [
      "Highly intuitive, easy-to-use interface reducing training time.",
      "Consolidated testing menu for diverse clinical chemistry needs.",
      "Delivers high-quality, reliable results consistent with larger systems.",
      "Compact footprint ideal for space-constrained laboratories.",
    ],
  },
  {
    slug: "mindray-bc-3000plus",
    name: "Mindray BC-3000Plus",
    category: "Hematology",
    group: "Diagnostic Equipment",
    sku: "MDR-BC3000-001",
    short: "Auto Hematology Analyzer with 3-part differentiation of WBC.",
    description:
      "Auto hematology analyzer with 3-part differentiation of WBC, delivering 19 parameters and three histograms for routine clinical screening in mid-volume laboratories.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPIFfMGgxkv96L0aQtTOAabokULgAxFECiIuSiYmR5NVMkOqlM5FKKKTRJ9e2Ruyrtf9oZVgFM2EXvYV8d0rIFHJD6jyuVdAXp5DzDZstInOjPalx4qd21ex8E0O5CoFsQzYIg-DvnXfOU7hs9KXCyFnvpJSdr5V65yaACD8qJ1p5Zd7FY5AGcEexdOFtQrFA4E8B7wJVZofmKJmkD2TLCkTTcOGBJZdZXlPe7zVEKot9AsJQds1mx",
    specs: [
      { label: "Throughput", value: "Up to 60 samples/hour" },
      { label: "Parameters", value: "19 parameters + 3 histograms" },
      { label: "Sample Volume", value: "13 µL whole blood" },
      { label: "Display", value: "Colour LCD with touch input" },
    ],
    features: [
      "3-part WBC differentiation for routine screening.",
      "Automatic cleaning and clog-clearing routines.",
      "Large onboard result storage.",
      "Simple reagent management.",
    ],
  },
  {
    slug: "abbott-panbio-covid-19-ag-rapid-test",
    name: "Abbott Panbio COVID-19 Ag Rapid Test",
    category: "Rapid Diagnostics",
    group: "Diagnostic Equipment",
    sku: "ABT-PANBIO-025",
    short: "Rapid antigen diagnostic kits for professional healthcare screening.",
    description:
      "High-performance rapid antigen diagnostic kits for professional healthcare screening, delivering results at the point of care within 15 minutes.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAeepDyquFcTo5TN9wpiQoP7rlsw7T1wSmkXaZ2LV825JS-L0zqauTG8_2tMfAcWqFR1HtjlbI43s3TC6iZK2sigYMTt9C-YVpn1n53r0_Q5rDF8idloQkOocGIb-A0nD5fsHc__XnD4kx-SBPIgH0yzEt5M3AHo8wPU1hc5GT2qzcaFKs_QKi9E4lRt8BN0koYPAUn-Dt625KqvUIiQPb2W2Q-Stf4bTNHC_jIgDUchqQKiF6eYjb6",
    specs: [
      { label: "Result Time", value: "15 minutes" },
      { label: "Pack Size", value: "25 tests per kit" },
      { label: "Sample Type", value: "Nasopharyngeal swab" },
      { label: "Storage", value: "2-30°C" },
    ],
    features: [
      "Point-of-care format requiring no instrumentation.",
      "Clear visual read-out for fast triage.",
      "Room-temperature storage simplifies logistics.",
      "Professional-use kit with full documentation.",
    ],
  },
  {
    slug: "pyrex-erlenmeyer-flask-set",
    name: "Pyrex Erlenmeyer Flask Set",
    category: "Glassware",
    group: "Apparatus & Consumables",
    sku: "PYX-ERL-SET",
    badge: "Available",
    short: "Borosilicate glass, heavy duty.",
    description:
      "Heavy-duty borosilicate glass Erlenmeyer flask set with durable graduations, suited to heating, mixing, and titration workflows in teaching and analytical laboratories.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCx5SCgaDm87SM43JRYtoxyvLEoYMuzGh0Em7RuAD-DVtWQKiCeuLH5bwEf82hj8LpVITFfX43kWnmA_rXjOdQueVAV7GAWs-SfoKwipPQIuOMVR3hY8FDyLVPCgrdJhRXhp8vuLW2HlH3gK9Lg_J5a2_n2GNxRafh5P2aa1LcxKeXmUQJEe9-sRkw5cMJKOwSkCed2Rjcrtd1xv8uw-XIwb3valaUmpInN5ygbst8cFE9R0DgvQEjP",
    specs: [
      { label: "Material", value: "Borosilicate 3.3 glass" },
      { label: "Sizes", value: "50, 100, 250, 500, 1000 mL" },
      { label: "Graduations", value: "Permanent white enamel" },
      { label: "Autoclavable", value: "Yes" },
    ],
    features: [
      "Thermal-shock resistant borosilicate construction.",
      "Uniform wall thickness for even heating.",
      "Durable, legible graduation marks.",
      "Set covers common working volumes.",
    ],
  },
  {
    slug: "thermo-scientific-pipette-kit",
    name: "Thermo Scientific Pipette Kit",
    category: "Liquid Handling",
    group: "Apparatus & Consumables",
    sku: "THM-PIP-KIT",
    short: "Variable volume micropipettes.",
    description:
      "Variable-volume micropipette kit covering routine pipetting ranges, with lightweight ergonomics and autoclavable lower assemblies for contamination control.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDn6Zki3KDp5U8T4szZR4fj_3cxWp5qWZUDu3zsTMQ7cE7KGdDG9MfRB2Mjjh_TITFtJkzDOscUuM0QhmYi_mXFfLvQdc00JZ1u4wqGm0HRJMKgBlNLNi1MCJBZa83j_9OkNqNI0xbaquYiJc6aJuGKkv21Ba9RJCIcII_N_iWGw2SvT8HDbeQ8PhSrOH_9NiaA1vtu90i0gqVUGYJsh-YXy7aGNrfX-8kPLYYrVKGxZ56x3sxEcEEr",
    specs: [
      { label: "Ranges", value: "0.5-10, 10-100, 100-1000 µL" },
      { label: "Accuracy", value: "Within ISO 8655 limits" },
      { label: "Autoclavable", value: "Lower assembly, 121°C" },
      { label: "Kit Contents", value: "3 pipettes, stand, tips" },
    ],
    features: [
      "Lightweight design reduces operator fatigue.",
      "Clear volume display with locking adjustment.",
      "Autoclavable lower assembly.",
      "Includes stand and starter tip racks.",
    ],
  },
];

export const productGroups = [
  "Laboratory Equipment",
  "Diagnostic Equipment",
  "Apparatus & Consumables",
] as const;

export const categories = [
  "All Products",
  "Microscopy",
  "Centrifugation",
  "Hematology",
  "Clinical Chemistry",
  "Weighing",
  "Glassware",
  "Liquid Handling",
  "Rapid Diagnostics",
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
