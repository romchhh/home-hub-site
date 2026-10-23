/**
 * Cross-check catalogue against Straj Drive folder + Danapris PDF structure.
 * Run: npx tsx scripts/verify-catalog.mts
 */
import { entranceDoorsRaw } from "../src/data/entranceDoors.generated";
import { getStaticCatalogSeed } from "../src/data/models";

/** Folder names from Straj Drive (Oct 2026). */
const STRAJ_DRIVE_FOLDERS = [
  "Alba",
  "Alliance",
  "Bastion",
  "Bianca",
  "Bristol",
  "Bristol + Side Light",
  "Calypso",
  "Crystal",
  "Dallas",
  "Domino",
  "Eclipse",
  "Estra double",
  "Hilton",
  "Infinity",
  "Interval",
  "Olivia",
  "Palmyra",
  "Paradise",
  "Party BS",
  "Rio double",
  "Rio S",
  "Rio S Loft",
  "Rio S Loft + Side Light",
  "S Loft - Rio x 2",
  "Siena",
  "Slim S",
  "Sonata",
  "Valetta",
  "Vavilon",
  "Vega Maxi",
  "Viena",
];

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\+/g, " ")
    .trim();
}

const strajSite = entranceDoorsRaw.map((m) => m.name);
const strajDrive = STRAJ_DRIVE_FOLDERS;
const strajMissing = strajDrive.filter((d) => !strajSite.some((s) => norm(s) === norm(d)));
const strajExtra = strajSite.filter((s) => !strajDrive.some((d) => norm(d) === norm(s)));

const seed = getStaticCatalogSeed();
const byCat = {
  entrance: seed.filter((p) => p.category === "entrance"),
  interior: seed.filter((p) => p.category === "interior"),
  hidden: seed.filter((p) => p.category === "hidden"),
  flooring: seed.filter((p) => p.category === "flooring"),
};

const pricedInSeed = seed.filter((p) => p.price_sek > 0);
const strajRefPrices = entranceDoorsRaw.reduce(
  (acc, m) => {
    acc[m.slug] = m.priceSek;
    return acc;
  },
  {} as Record<string, number>,
);

console.log("=== Straj (Drive folder vs site) ===");
console.log(`Drive folders: ${strajDrive.length}, site models: ${strajSite.length}`);
if (strajMissing.length) console.log("Missing on site:", strajMissing);
else console.log("All Drive Straj folders present on site.");
if (strajExtra.length) console.log("Extra on site (not in Drive list):", strajExtra);

console.log("\n=== Danapris PDF structure (expected 13 + 11 + flooring) ===");
console.log(
  `Interior: ${byCat.interior.length} (expect 13), Hidden: ${byCat.hidden.length} (expect 11), Flooring: ${byCat.flooring.length}`,
);
console.log(
  "Interior:",
  byCat.interior.map((p) => p.name).join(", "),
);
console.log(
  "Hidden:",
  byCat.hidden.map((p) => p.name).join(", "),
);

console.log("\n=== Prices (public site) ===");
console.log(
  `Seed price_sek > 0: ${pricedInSeed.length} (expect 0 until admin sets prices).`,
);
console.log("Straj reference tiers in entranceDoors.generated.ts:", {
  standard: 28900,
  doubleOrSide: 34900,
  counts: entranceDoorsRaw.reduce(
    (acc, m) => {
      const k = String(m.priceSek);
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  ),
});
console.log("\nStraj per-model reference (SEK, for admin — not shown on site while price_sek=0):");
for (const [slug, sek] of Object.entries(strajRefPrices).sort()) {
  console.log(`  ${slug}: ${sek}`);
}

console.log(
  "\nNote: Danapris list/prices in PDF must be checked manually — download PDFs from Drive and compare names/descriptions in src/data/models.ts.",
);
