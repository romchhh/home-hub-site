import type { Locale } from "@/lib/i18n";
import { entranceDoorsRaw } from "@/data/entranceDoors.generated";

/** `"all"` or a category slug from the database / static catalogue. */
export type DoorCategory = "all" | (string & {});

export type CatalogCategoryOption = {
  slug: Exclude<DoorCategory, "all">;
  name: string;
  priority: number;
};

export type DoorColorOption = {
  hex: string;
  name: string;
};

export type DoorDetailBullet = {
  title: string;
  text: string;
};

export type DoorModel = {
  slug: string;
  name: string;
  image: string;
  gallery: string[];
  category: Exclude<DoorCategory, "all">;
  label: string;
  material: string;
  finish: string;
  hardware: string;
  colors: DoorColorOption[];
  description: string;
  detailIntro: string;
  detailBullets: DoorDetailBullet[];
  specs: { label: string; value: string }[];
  priceSek: number;
};

type Bilingual = [string, string];

const raw: {
  slug: string;
  name: string;
  image: string;
  gallery: string[];
  category: Exclude<DoorCategory, "all">;
  priceSek: number;
  label: Bilingual;
  material: Bilingual;
  finish: Bilingual;
  hardware: Bilingual;
  colors: { hex: string; name: Bilingual }[];
  description: Bilingual;
  detailIntro: Bilingual;
  detailBullets: { title: Bilingual; text: Bilingual }[];
  specs: { label: Bilingual; value: Bilingual }[];
}[] = [
  {
    slug: "aurelia-01",
    name: "Aurelia 01",
    image: "/images/doors/aurelia-01/01.jpg",
    gallery: ["/images/doors/aurelia-01/01.jpg", "/images/doors/aurelia-01/02.jpg", "/images/doors/aurelia-01/03.jpg", "/images/doors/aurelia-01/04.jpg", "/images/doors/aurelia-01/05.jpg"],
    category: "interior",
    priceSek: 17900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Målad Art Decor-dörr med diskret dekorativ accent — ren silhuett för moderna interiörer.", "Painted Art Decor door with a discreet decorative accent — a clean silhouette for modern interiors."],
    detailIntro: ["Art Decor Aurelia 01, målad. Måttanpassad innerdörr från Danapris Doors med koplanär karm och dolda beslag.", "Art Decor Aurelia 01, painted. Made-to-measure interior door from Danapris Doors with a coplanar frame and concealed hardware."],
        detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x1100x40 mm", "custom, up to 2680x1100x40 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard", "RAL Standard"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
    ],
  },
  {
    slug: "loft-m18",
    name: "Loft M18",
    image: "/images/doors/loft-m18/01.jpg",
    gallery: ["/images/doors/loft-m18/01.jpg", "/images/doors/loft-m18/02.jpg"],
    category: "interior",
    priceSek: 16900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "painted"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Loft M18 med fräst dekorlinje — industriell känsla i målad MDF med dolda beslag.", "Loft M18 with a milled decorative line — an industrial look in painted MDF with concealed hardware."],
    detailIntro: ["Loft M18, målad. Innerdörr med fräst dekor och standardutrustning för dold montering.", "Loft M18, painted. Interior door with milled décor and standard concealed fitting hardware."],
    detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x900 eller 2500x1100 mm", "custom, up to 2680x900 or 2500x1100 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "painted"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard", "RAL Standard"] },
      { label: ["Karm", "Frame"], value: ["Sammanställt från tillverkarens webbplats. Priser ingår inte. 7 / 18", "Compiled from the manufacturer website. Prices are not included. 1 / 18"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
        ],
      },
      {
    slug: "vetro-01",
    name: "Ventro 01",
    image: "/images/doors/vetro-01/01.jpg",
    gallery: ["/images/doors/vetro-01/01.jpg"],
    category: "interior",
    priceSek: 18900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Art Decor Ventro 01 med glasinsats — ljusgenomsläpp och tydlig grafisk linje.", "Art Decor Ventro 01 with a glass insert — light and a clear graphic line."],
    detailIntro: ["Art Decor Ventro 01. Innerdörr med glasinsats — finns i målad och fanérad variant.", "Art Decor Ventro 01. Interior door with a glass insert — available painted or veneered."],
        detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x1100x40 mm", "custom, up to 2680x1100x40 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard", "RAL Standard"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
        ],
      },
      {
    slug: "aura-02",
    name: "Aura 02",
    image: "/images/doors/aura-02/01.jpg",
    gallery: ["/images/doors/aura-02/01.jpg", "/images/doors/aura-02/02.jpg", "/images/doors/aura-02/03.jpg"],
    category: "interior",
    priceSek: 17900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Aura 02 i Art Decor-kollektionen — mjukt uttryck, målad yta och koplanär karm.", "Aura 02 from the Art Decor collection — a soft expression, painted finish and coplanar frame."],
    detailIntro: ["Art Decor Aura 02, målad. Måttanpassad dörr med koplanär karmtyp 1 eller 3.", "Art Decor Aura 02, painted. Made-to-measure door with coplanar frame type 1 or 3."],
        detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x1100x40 mm", "custom, up to 2680x1100x40 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard", "RAL Standard"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
    ],
  },
  {
    slug: "loft-m12",
    name: "Loft M12",
    image: "/images/doors/loft-m12/01.jpg",
    gallery: ["/images/doors/loft-m12/01.jpg", "/images/doors/loft-m12/02.jpg", "/images/doors/loft-m12/03.jpg"],
    category: "interior",
    priceSek: 16900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Loft M12 med fräsning — stram loft-look för samtida hem.", "Loft M12 with milling — a crisp loft look for contemporary homes."],
    detailIntro: ["Loft M12, målad. Kompakt loft-modell med fräsning och dolda gångjärn.", "Loft M12, painted. Compact loft model with milling and concealed hinges."],
        detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x900 eller 2500x1100 mm", "custom, up to 2680x900 or 2500x1100 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard", "RAL Standard"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
    ],
  },
  {
    slug: "loft-08",
    name: "Loft 08",
    image: "/images/doors/loft-08/01.jpg",
    gallery: ["/images/doors/loft-08/01.jpg", "/images/doors/loft-08/02.jpg", "/images/doors/loft-08/03.jpg"],
    category: "interior",
    priceSek: 15900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Loft 08 — enkel, målad loft-dörr med dolda gångjärn och magnetlås.", "Loft 08 — a simple painted loft door with concealed hinges and a magnetic lock."],
    detailIntro: ["Loft 08, målad. Ren loft-silhuett för projekt där dörren ska vara lugn och tydlig.", "Loft 08, painted. A clean loft silhouette where the door should stay calm and clear."],
    detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x900 eller 2500x1100 mm", "custom, up to 2680x900 or 2500x1100 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard", "RAL Standard"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
    ],
  },
  {
    slug: "cossa-01",
    name: "Cosa 01",
    image: "/images/doors/cossa-01/01.jpg",
    gallery: ["/images/doors/cossa-01/01.jpg", "/images/doors/cossa-01/02.jpg", "/images/doors/cossa-01/03.jpg"],
    category: "interior",
    priceSek: 18900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Neo Classic Cosa 01 — klassiska proportioner i modern, målad finish.", "Neo Classic Cosa 01 — classic proportions in a modern painted finish."],
    detailIntro: ["Neo Classic Cosa 01, målad. Klassisk form i modern Art/Neo Classic-linje.", "Neo Classic Cosa 01, painted. Classic form in a modern Art/Neo Classic line."],
        detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x1100x40/45 mm", "custom, up to 2680x1100x40/45 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard", "RAL Standard"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
    ],
  },
  {
    slug: "art-decor-trend",
    name: "Art Decor Trend",
    image: "/images/doors/art-decor-trend/01.jpg",
    gallery: ["/images/doors/art-decor-trend/01.jpg"],
    category: "interior",
    priceSek: 17900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Art Decor Trend — stilren målad dörr med tydlig dekorativ profil.", "Art Decor Trend — a clean painted door with a clear decorative profile."],
    detailIntro: ["Art Decor Trend, målad. Dekorativ profil för samtida interiörer.", "Art Decor Trend, painted. Decorative profile for contemporary interiors."],
        detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x1100x40 mm", "custom, up to 2680x1100x40 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard", "RAL Standard"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
    ],
  },
  {
    slug: "vetro-plus-05",
    name: "Ventro Plus 05",
    image: "/images/doors/vetro-plus-05/01.jpg",
    gallery: ["/images/doors/vetro-plus-05/01.jpg"],
    category: "interior",
    priceSek: 19900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Ventro Plus 05 med glas — mer ljus och ett mer uttalat Art Decor-uttryck.", "Ventro Plus 05 with glass — more light and a stronger Art Decor expression."],
    detailIntro: ["Art Decor Ventro Plus 05. Glasdörr med mer närvaro — målad eller fanérad.", "Art Decor Ventro Plus 05. A glass door with more presence — painted or veneered."],
        detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x1100x40 mm", "custom, up to 2680x1100x40 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL 9003", "RAL 9003"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
    ],
  },
  {
    slug: "venta-01",
    name: "Venta 01",
    image: "/images/doors/venta-01/01.jpg",
    gallery: ["/images/doors/venta-01/01.jpg"],
    category: "interior",
    priceSek: 18900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Neo Classic Venta 01 — tidlös panelkänsla i målad MDF.", "Neo Classic Venta 01 — a timeless panel feel in painted MDF."],
    detailIntro: ["Neo Classic Venta 01, målad. Panelinspirerad dörr för klassiska och moderna rum.", "Neo Classic Venta 01, painted. Panel-inspired door for classic and modern rooms."],
        detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x900 eller 2500x1100 mm", "custom, up to 2680x900 or 2500x1100 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard", "RAL Standard"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
    ],
  },
  {
    slug: "venta-03",
    name: "Venta 03",
    image: "/images/doors/venta-03/01.jpg",
    gallery: ["/images/doors/venta-03/01.jpg"],
    category: "interior",
    priceSek: 18900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Neo Classic Venta 03 — klassisk rytm med moderna, dolda beslag.", "Neo Classic Venta 03 — classic rhythm with modern concealed hardware."],
    detailIntro: ["Neo Classic Venta 03, målad. Rikare panelrytm i samma Neo Classic-familj.", "Neo Classic Venta 03, painted. A richer panel rhythm in the same Neo Classic family."],
        detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x900 eller 2500x1100 mm", "custom, up to 2680x900 or 2500x1100 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard", "RAL Standard"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
    ],
  },
  {
    slug: "queen",
    name: "Queen",
    image: "/images/doors/queen/01.jpg",
    gallery: ["/images/doors/queen/01.jpg"],
    category: "interior",
    priceSek: 19900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Art Decor Queen — uttrycksfull profil för premiuminteriörer.", "Art Decor Queen — an expressive profile for premium interiors."],
    detailIntro: ["Art Decor Queen. Expressiv modell för premiumprojekt — målad eller fanérad.", "Art Decor Queen. Expressive model for premium projects — painted or veneered."],
        detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2100x800x40 mm", "custom, up to 2100x800x40 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard", "RAL Standard"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
    ],
  },
  {
    slug: "art-decor-rondo",
    name: "Art Decor Rondo",
    image: "/images/doors/art-decor-rondo/01.jpg",
    gallery: ["/images/doors/art-decor-rondo/01.jpg"],
    category: "interior",
    priceSek: 18900,
    label: ["Innerdörr", "Interior door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Dolda gångjärn Hafele · Magnetlås AGB Polaris", "Hafele concealed hinges · AGB Polaris magnetic lock"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
    ],
    description: ["Art Decor Rondo — mjuka rundade former i målad eller fanérad finish.", "Art Decor Rondo — soft rounded forms in a painted or veneered finish."],
    detailIntro: ["Art Decor Rondo. Mjuka linjer och rundade former — målad eller fanérad.", "Art Decor Rondo. Soft lines and rounded forms — painted or veneered."],
        detailBullets: [
      {
        title: ["Koplanär karm", "Coplanar frame"],
        text: ["Karm typ 1 håller dörrblad och foder i samma plan — en ren, grafisk kontur mot väggen.", "Type 1 keeps the leaf and casing in one plane — a clean graphic outline against the wall."],
      },
      {
        title: ["Dörrblad i MDF", "MDF door leaf"],
        text: ["Stomme av fingerskarvat furuvirke med MDF-yta, målad i RAL Standard eller valfri RAL/NCS.", "Finger-jointed pine frame with an MDF face, painted in RAL Standard or any RAL/NCS colour."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag på karmen.", "Hafele concealed hinges as standard — a discreet fit without visible frame hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["AGB Polaris magnetlås i matt krom ingår; svart, vit, guld eller brons som tillval.", "AGB Polaris magnetic lock in matt chrome is included; black, white, gold or bronze optional."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2680x900 eller 2500x1100 mm", "custom, up to 2680x900 or 2500x1100 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående (höger/vänster)", "outward (right/left hand)"] },
      { label: ["Dörrbladets stomme", "Leaf frame"], value: ["furuvirke", "pine timber"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Dörrbladets färg", "Leaf colour"], value: ["RAL Standard / RAL / NCS", "RAL Standard / RAL / NCS"] },
      { label: ["Karm", "Frame"], value: ["Karmens material furuvirke", "Frame material pine timber"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] },
    ],
  },
  {
    slug: "own-doors-primed-chrome",
    name: "Own Doors Primed Chrome",
    image: "/images/doors/own-doors-primed-chrome/01.jpg",
    gallery: ["/images/doors/own-doors-primed-chrome/01.jpg", "/images/doors/own-doors-primed-chrome/02.jpg", "/images/doors/own-doors-primed-chrome/03.jpg", "/images/doors/own-doors-primed-chrome/04.jpg", "/images/doors/own-doors-primed-chrome/05.jpg"],
    category: "hidden",
    priceSek: 24900,
    label: ["Dold dörr", "Concealed door"],
    material: ["MDF", "MDF"],
    finish: ["grundfärg, klar för slutbehandling", "primer, ready for finishing"],
    hardware: ["Kantlist matt krom · Universal 45 · Hafele dolda gångjärn", "Matt chrome edge trim · Universal 45 · Hafele concealed hinges"],
    colors: [
      { hex: "#f7f7f2", name: ["Vit grund", "White primer"] },
      { hex: "#c8c8c8", name: ["Matt krom", "Matt chrome"] }
    ],
    description: ["Dörr med dold montering — grundad MDF med aluminiumkantlist i matt krom.", "Concealed-installation door — primed MDF with a matt chrome aluminium edge trim."],
    detailIntro: ["Vlasni Dveri (Own Doors), grundad. Aluminiumkarm Universal 45, Hafele magnetlås och dolda gångjärn ingår.", "Vlasni Dveri (Own Doors), primed. Universal 45 aluminium frame, Hafele magnetic lock and concealed hinges included."],
    detailBullets: [
      {
        title: ["Dold montering", "Concealed installation"],
        text: ["Aluminiumkarm utan synliga foder — dörrbladet ligger i väggens plan.", "Aluminium frame without visible casing — the leaf sits flush with the wall plane."],
      },
      {
        title: ["Kantlist", "Edge trim"],
        text: ["Matt krom aluminiumkantlist ger en skarp, hållbar kontur.", "Matt chrome aluminium edge trim gives a sharp, durable outline."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag.", "Hafele concealed hinges as standard — a discreet fit without visible hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["Hafele eller AGB Polaris magnetlås ingår i standardsetet.", "Hafele or AGB Polaris magnetic lock is included in the standard set."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["600/700/800 × 2000 mm", "600/700/800 × 2000 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående/inåtgående (höger/vänster)", "outward/inward (right/left hand)"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["grundfärg, klar för slutbehandling", "primer, ready for finishing"] },
      { label: ["Kantlist", "Edge trim"], value: ["Matt krom", "Matt chrome"] },
      { label: ["Karm", "Frame"], value: ["Universal 45 · aluminium · matt krom", "Universal 45 · aluminium · matt chrome"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] }
    ],
  },
  {
    slug: "own-doors-primed-black",
    name: "Own Doors Primed Black",
    image: "/images/doors/own-doors-primed-black/01.jpg",
    gallery: ["/images/doors/own-doors-primed-black/01.jpg", "/images/doors/own-doors-primed-black/02.jpg", "/images/doors/own-doors-primed-black/03.jpg", "/images/doors/own-doors-primed-black/04.jpg", "/images/doors/own-doors-primed-black/05.jpg"],
    category: "hidden",
    priceSek: 24900,
    label: ["Dold dörr", "Concealed door"],
    material: ["MDF", "MDF"],
    finish: ["grundfärg, klar för slutbehandling", "primer, ready for finishing"],
    hardware: ["Kantlist svart · Universal 45 · Hafele svart", "Black edge trim · Universal 45 · Hafele black"],
    colors: [
      { hex: "#f7f7f2", name: ["Vit grund", "White primer"] },
      { hex: "#1a1a1a", name: ["Svart RAL 9005", "Black RAL 9005"] }
    ],
    description: ["Dörr med dold montering — grundad MDF med svart aluminiumkantlist och karm.", "Concealed-installation door — primed MDF with black aluminium edge trim and frame."],
    detailIntro: ["Vlasni Dveri (Own Doors), grundad med svart profil. Ljudisolering 42 dB. Svart Hafele-beslag som standard.", "Vlasni Dveri (Own Doors), primed with a black profile. Sound insulation 42 dB. Black Hafele hardware as standard."],
    detailBullets: [
      {
        title: ["Dold montering", "Concealed installation"],
        text: ["Aluminiumkarm utan synliga foder — dörrbladet ligger i väggens plan.", "Aluminium frame without visible casing — the leaf sits flush with the wall plane."],
      },
      {
        title: ["Kantlist", "Edge trim"],
        text: ["Svart aluminiumkantlist ger en skarp, hållbar kontur.", "Black aluminium edge trim gives a sharp, durable outline."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag.", "Hafele concealed hinges as standard — a discreet fit without visible hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["Hafele eller AGB Polaris magnetlås ingår i standardsetet.", "Hafele or AGB Polaris magnetic lock is included in the standard set."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["600/700/800 × 2000 mm", "600/700/800 × 2000 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående/inåtgående (höger/vänster)", "outward/inward (right/left hand)"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["grundfärg, klar för slutbehandling", "primer, ready for finishing"] },
      { label: ["Kantlist", "Edge trim"], value: ["Svart", "Black"] },
      { label: ["Karm", "Frame"], value: ["Universal 45 · aluminium · svart", "Universal 45 · aluminium · black"] },
      { label: ["Ljudisolering", "Sound insulation"], value: ["42 dB", "42 dB"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] }
    ],
  },
  {
    slug: "own-doors-painted",
    name: "Own Doors Painted",
    image: "/images/doors/own-doors-painted/01.jpg",
    gallery: ["/images/doors/own-doors-painted/01.jpg", "/images/doors/own-doors-painted/02.jpg", "/images/doors/own-doors-painted/03.jpg", "/images/doors/own-doors-painted/04.jpg", "/images/doors/own-doors-painted/05.jpg"],
    category: "hidden",
    priceSek: 26900,
    label: ["Dold dörr", "Concealed door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Kantlist aluminium · Alum Wood 40/45 · Hafele / AGB Polaris", "Aluminium edge trim · Alum Wood 40/45 · Hafele / AGB Polaris"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
      { hex: "#1a1a1a", name: ["RAL 9005", "RAL 9005"] }
    ],
    description: ["Dörr med dold montering — målad MDF med aluminiumkantlist, valfri RAL/NCS.", "Concealed-installation door — painted MDF with aluminium edge trim, any RAL/NCS."],
    detailIntro: ["Vlasni Dveri (Own Doors), målad. Måttanpassad upp till 2100×900 mm. Karm Alum Wood 40 eller 45.", "Vlasni Dveri (Own Doors), painted. Made to measure up to 2100×900 mm. Alum Wood 40 or 45 frame."],
    detailBullets: [
      {
        title: ["Dold montering", "Concealed installation"],
        text: ["Aluminiumkarm utan synliga foder — dörrbladet ligger i väggens plan.", "Aluminium frame without visible casing — the leaf sits flush with the wall plane."],
      },
      {
        title: ["Kantlist", "Edge trim"],
        text: ["Aluminium / RAL 9005 aluminiumkantlist ger en skarp, hållbar kontur.", "Aluminium / RAL 9005 aluminium edge trim gives a sharp, durable outline."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag.", "Hafele concealed hinges as standard — a discreet fit without visible hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["Hafele eller AGB Polaris magnetlås ingår i standardsetet.", "Hafele or AGB Polaris magnetic lock is included in the standard set."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2100×900 mm", "custom, up to 2100×900 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående/inåtgående (höger/vänster)", "outward/inward (right/left hand)"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Kantlist", "Edge trim"], value: ["Aluminium / RAL 9005", "Aluminium / RAL 9005"] },
      { label: ["Karm", "Frame"], value: ["Alum Wood 40 / 45 · aluminium", "Alum Wood 40 / 45 · aluminium"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] }
    ],
  },
  {
    slug: "alum-wood-primed",
    name: "Alum Wood Primed",
    image: "/images/doors/alum-wood-primed/01.jpg",
    gallery: ["/images/doors/alum-wood-primed/01.jpg", "/images/doors/alum-wood-primed/02.jpg", "/images/doors/alum-wood-primed/03.jpg", "/images/doors/alum-wood-primed/04.jpg", "/images/doors/alum-wood-primed/05.jpg"],
    category: "hidden",
    priceSek: 23900,
    label: ["Dold dörr", "Concealed door"],
    material: ["MDF", "MDF"],
    finish: ["grundfärg, klar för slutbehandling", "primer, ready for finishing"],
    hardware: ["Kantlist aluminium · Alum Wood 40 / Universal 45", "Aluminium edge trim · Alum Wood 40 / Universal 45"],
    colors: [
      { hex: "#f7f7f2", name: ["Vit grund", "White primer"] },
      { hex: "#c8c8c8", name: ["Matt krom", "Matt chrome"] }
    ],
    description: ["Alum Wood med dold montering — grundad yta, klar för målning på plats eller i fabrik.", "Alum Wood concealed door — primed surface, ready for painting on site or at the factory."],
    detailIntro: ["Alum Wood, grundad med kantlist. Leveranstid karm ca 14 dagar, blad ca 30 dagar. Ljudisolering 42 dB.", "Alum Wood, primed with edge trim. Lead time frame ~14 days, leaf ~30 days. Sound insulation 42 dB."],
    detailBullets: [
      {
        title: ["Dold montering", "Concealed installation"],
        text: ["Aluminiumkarm utan synliga foder — dörrbladet ligger i väggens plan.", "Aluminium frame without visible casing — the leaf sits flush with the wall plane."],
      },
      {
        title: ["Kantlist", "Edge trim"],
        text: ["Matt krom / RAL aluminiumkantlist ger en skarp, hållbar kontur.", "Matt chrome / RAL aluminium edge trim gives a sharp, durable outline."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag.", "Hafele concealed hinges as standard — a discreet fit without visible hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["Hafele eller AGB Polaris magnetlås ingår i standardsetet.", "Hafele or AGB Polaris magnetic lock is included in the standard set."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2750×800 eller 2500×1100 mm", "custom, up to 2750×800 or 2500×1100 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående/inåtgående (höger/vänster)", "outward/inward (right/left hand)"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["grundfärg, klar för slutbehandling", "primer, ready for finishing"] },
      { label: ["Kantlist", "Edge trim"], value: ["Matt krom / RAL", "Matt chrome / RAL"] },
      { label: ["Karm", "Frame"], value: ["Alum Wood 40 / Universal 45 · aluminium", "Alum Wood 40 / Universal 45 · aluminium"] },
      { label: ["Ljudisolering", "Sound insulation"], value: ["42 dB", "42 dB"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] }
    ],
  },
  {
    slug: "alum-wood-painted",
    name: "Alum Wood Painted",
    image: "/images/doors/alum-wood-painted/01.jpg",
    gallery: ["/images/doors/alum-wood-painted/01.jpg", "/images/doors/alum-wood-painted/02.jpg", "/images/doors/alum-wood-painted/03.jpg", "/images/doors/alum-wood-painted/04.jpg", "/images/doors/alum-wood-painted/05.jpg"],
    category: "hidden",
    priceSek: 25900,
    label: ["Dold dörr", "Concealed door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Kantlist aluminium · Alum Wood 40 / Universal 45 · AGB Polaris", "Aluminium edge trim · Alum Wood 40 / Universal 45 · AGB Polaris"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f0e6c8", name: ["RAL 1015", "RAL 1015"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#c4c8cc", name: ["RAL 7047", "RAL 7047"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
      { hex: "#1a1a1a", name: ["RAL 9005", "RAL 9005"] }
    ],
    description: ["Alum Wood med dold montering — målad MDF och aluminiumprofil för en flush känsla mot väggen.", "Alum Wood concealed door — painted MDF and an aluminium profile for a flush feel against the wall."],
    detailIntro: ["Alum Wood, målad. Stora format upp till 2750×800 eller 2500×1100 mm. Valfri RAL Standard / RAL / NCS.", "Alum Wood, painted. Large formats up to 2750×800 or 2500×1100 mm. Any RAL Standard / RAL / NCS."],
    detailBullets: [
      {
        title: ["Dold montering", "Concealed installation"],
        text: ["Aluminiumkarm utan synliga foder — dörrbladet ligger i väggens plan.", "Aluminium frame without visible casing — the leaf sits flush with the wall plane."],
      },
      {
        title: ["Kantlist", "Edge trim"],
        text: ["Aluminium / RAL 9005 aluminiumkantlist ger en skarp, hållbar kontur.", "Aluminium / RAL 9005 aluminium edge trim gives a sharp, durable outline."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag.", "Hafele concealed hinges as standard — a discreet fit without visible hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["Hafele eller AGB Polaris magnetlås ingår i standardsetet.", "Hafele or AGB Polaris magnetic lock is included in the standard set."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2750×800 eller 2500×1100 mm", "custom, up to 2750×800 or 2500×1100 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående/inåtgående (höger/vänster)", "outward/inward (right/left hand)"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Kantlist", "Edge trim"], value: ["Aluminium / RAL 9005", "Aluminium / RAL 9005"] },
      { label: ["Karm", "Frame"], value: ["Alum Wood 40 / Universal 45 · aluminium", "Alum Wood 40 / Universal 45 · aluminium"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] }
    ],
  },
  {
    slug: "alum-wood-veneered",
    name: "Alum Wood Veneered",
    image: "/images/doors/alum-wood-veneered/01.jpg",
    gallery: ["/images/doors/alum-wood-veneered/01.jpg", "/images/doors/alum-wood-veneered/02.jpg", "/images/doors/alum-wood-veneered/03.jpg", "/images/doors/alum-wood-veneered/04.jpg", "/images/doors/alum-wood-veneered/05.jpg"],
    category: "hidden",
    priceSek: 28900,
    label: ["Dold dörr", "Concealed door"],
    material: ["MDF", "MDF"],
    finish: ["faner", "veneer"],
    hardware: ["Aluminiumkantlist · Alum Wood 40/45", "Aluminium edge trim · Alum Wood 40/45"],
    colors: [
      { hex: "#c4a882", name: ["Ek natur", "Oak natural"] },
      { hex: "#8b6914", name: ["Ek mörk", "Oak dark"] },
      { hex: "#a09080", name: ["Valnöt", "Walnut"] },
      { hex: "#d4c4a8", name: ["Ask", "Ash"] }
    ],
    description: ["Alum Wood med dold montering — äkta faner i 65 alternativ, med aluminiumkantlist.", "Alum Wood concealed door — real veneer in 65 options, with an aluminium edge trim."],
    detailIntro: ["Alum Wood, fanerad. Välj bland 65 faneralternativ. Måttanpassad upp till 2750×800 eller 2500×1100 mm.", "Alum Wood, veneered. Choose among 65 veneer options. Made to measure up to 2750×800 or 2500×1100 mm."],
    detailBullets: [
      {
        title: ["Dold montering", "Concealed installation"],
        text: ["Aluminiumkarm utan synliga foder — dörrbladet ligger i väggens plan.", "Aluminium frame without visible casing — the leaf sits flush with the wall plane."],
      },
      {
        title: ["Kantlist", "Edge trim"],
        text: ["Aluminium aluminiumkantlist ger en skarp, hållbar kontur.", "Aluminium aluminium edge trim gives a sharp, durable outline."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag.", "Hafele concealed hinges as standard — a discreet fit without visible hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["Hafele eller AGB Polaris magnetlås ingår i standardsetet.", "Hafele or AGB Polaris magnetic lock is included in the standard set."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2750×800 eller 2500×1100 mm", "custom, up to 2750×800 or 2500×1100 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående/inåtgående (höger/vänster)", "outward/inward (right/left hand)"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["faner", "veneer"] },
      { label: ["Kantlist", "Edge trim"], value: ["Aluminium", "Aluminium"] },
      { label: ["Karm", "Frame"], value: ["Alum Wood · aluminium", "Alum Wood · aluminium"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] }
    ],
  },
  {
    slug: "vlasni-dveri-primed",
    name: "Vlasni Dveri Primed",
    image: "/images/doors/vlasni-dveri-primed/01.jpg",
    gallery: ["/images/doors/vlasni-dveri-primed/01.jpg", "/images/doors/vlasni-dveri-primed/02.jpg", "/images/doors/vlasni-dveri-primed/03.jpg", "/images/doors/vlasni-dveri-primed/04.jpg", "/images/doors/vlasni-dveri-primed/05.jpg"],
    category: "hidden",
    priceSek: 23900,
    label: ["Dold dörr", "Concealed door"],
    material: ["MDF", "MDF"],
    finish: ["grundfärg, klar för slutbehandling", "primer, ready for finishing"],
    hardware: ["Kantlist · aluminiumkarm · Hafele", "Edge trim · aluminium frame · Hafele"],
    colors: [
      { hex: "#f7f7f2", name: ["Vit grund", "White primer"] },
      { hex: "#c8c8c8", name: ["Matt krom", "Matt chrome"] }
    ],
    description: ["Vlasni Dveri med dold montering — grundad yta för slutmålning efter installation.", "Vlasni Dveri concealed door — primed surface for final painting after installation."],
    detailIntro: ["VLASNI DVERI, grundad med kantlist. Aluminiumkarm för flush montering utan synliga foder.", "VLASNI DVERI, primed with edge trim. Aluminium frame for flush installation without visible casing."],
    detailBullets: [
      {
        title: ["Dold montering", "Concealed installation"],
        text: ["Aluminiumkarm utan synliga foder — dörrbladet ligger i väggens plan.", "Aluminium frame without visible casing — the leaf sits flush with the wall plane."],
      },
      {
        title: ["Kantlist", "Edge trim"],
        text: ["Aluminium aluminiumkantlist ger en skarp, hållbar kontur.", "Aluminium aluminium edge trim gives a sharp, durable outline."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag.", "Hafele concealed hinges as standard — a discreet fit without visible hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["Hafele eller AGB Polaris magnetlås ingår i standardsetet.", "Hafele or AGB Polaris magnetic lock is included in the standard set."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat", "custom"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående/inåtgående (höger/vänster)", "outward/inward (right/left hand)"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["grundfärg, klar för slutbehandling", "primer, ready for finishing"] },
      { label: ["Kantlist", "Edge trim"], value: ["Aluminium", "Aluminium"] },
      { label: ["Karm", "Frame"], value: ["Aluminium · dold montering", "Aluminium · concealed installation"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] }
    ],
  },
  {
    slug: "vlasni-dveri-painted-alum",
    name: "Vlasni Dveri Painted Alum",
    image: "/images/doors/vlasni-dveri-painted-alum/01.jpg",
    gallery: ["/images/doors/vlasni-dveri-painted-alum/01.jpg", "/images/doors/vlasni-dveri-painted-alum/02.jpg"],
    category: "hidden",
    priceSek: 27900,
    label: ["Dold dörr", "Concealed door"],
    material: ["MDF", "MDF"],
    finish: ["målad", "paint"],
    hardware: ["Alum Unique 43/51 · aluminiumstomme", "Alum Unique 43/51 · aluminium frame"],
    colors: [
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#1a1a1a", name: ["RAL 9005", "RAL 9005"] }
    ],
    description: ["Vlasni Dveri med dold montering — målad, aluminiumstomme Alum Unique 43 eller 51.", "Vlasni Dveri concealed door — painted, Alum Unique 43 or 51 aluminium frame."],
    detailIntro: ["VLASNI DVERI, målad med aluminiumkarm. Upp till 2200×1100×43 mm eller 2500×1100×51 mm. Garanti 120 månader.", "VLASNI DVERI, painted with aluminium frame. Up to 2200×1100×43 mm or 2500×1100×51 mm. 120-month warranty."],
    detailBullets: [
      {
        title: ["Dold montering", "Concealed installation"],
        text: ["Aluminiumkarm utan synliga foder — dörrbladet ligger i väggens plan.", "Aluminium frame without visible casing — the leaf sits flush with the wall plane."],
      },
      {
        title: ["Kantlist", "Edge trim"],
        text: ["Matt krom / RAL aluminiumkantlist ger en skarp, hållbar kontur.", "Matt chrome / RAL aluminium edge trim gives a sharp, durable outline."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag.", "Hafele concealed hinges as standard — a discreet fit without visible hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["Hafele eller AGB Polaris magnetlås ingår i standardsetet.", "Hafele or AGB Polaris magnetic lock is included in the standard set."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 2200×1100×43 eller 2500×1100×51 mm", "custom, up to 2200×1100×43 or 2500×1100×51 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående/inåtgående (höger/vänster)", "outward/inward (right/left hand)"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["målad", "paint"] },
      { label: ["Kantlist", "Edge trim"], value: ["Matt krom / RAL", "Matt chrome / RAL"] },
      { label: ["Karm", "Frame"], value: ["Alum Unique 43 / 51 · aluminium", "Alum Unique 43 / 51 · aluminium"] },
      { label: ["Garanti", "Warranty"], value: ["120 månader", "120 months"] }
    ],
  },
  {
    slug: "alum-premium-glass",
    name: "Alum Premium Glass",
    image: "/images/doors/alum-premium-glass/01.jpg",
    gallery: ["/images/doors/alum-premium-glass/01.jpg", "/images/doors/alum-premium-glass/02.jpg", "/images/doors/alum-premium-glass/03.jpg", "/images/doors/alum-premium-glass/04.jpg", "/images/doors/alum-premium-glass/05.jpg"],
    category: "hidden",
    priceSek: 32900,
    label: ["Dold dörr", "Concealed door"],
    material: ["MDF", "MDF"],
    finish: ["lackerat glas", "painted glass"],
    hardware: ["Alum Premium 55 · kantlist matt krom", "Alum Premium 55 · matt chrome edge trim"],
    colors: [
      { hex: "#1a1a1a", name: ["Svart RAL 9005", "Black RAL 9005"] },
      { hex: "#f7f7f2", name: ["Vit", "White"] },
      { hex: "#c8c8c8", name: ["Matt krom", "Matt chrome"] }
    ],
    description: ["Alum Premium med dold montering — lackerat glas, stora format och 15 års garanti.", "Alum Premium concealed door — painted glass, large formats and a 15-year warranty."],
    detailIntro: ["Alum Premium, lackerat glas. Upp till 3150×900×55 eller 2800×1100×55 mm. Ljudisolering 42 dB.", "Alum Premium, painted glass. Up to 3150×900×55 or 2800×1100×55 mm. Sound insulation 42 dB."],
    detailBullets: [
      {
        title: ["Dold montering", "Concealed installation"],
        text: ["Aluminiumkarm utan synliga foder — dörrbladet ligger i väggens plan.", "Aluminium frame without visible casing — the leaf sits flush with the wall plane."],
      },
      {
        title: ["Kantlist", "Edge trim"],
        text: ["Matt krom aluminiumkantlist ger en skarp, hållbar kontur.", "Matt chrome aluminium edge trim gives a sharp, durable outline."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag.", "Hafele concealed hinges as standard — a discreet fit without visible hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["Hafele eller AGB Polaris magnetlås ingår i standardsetet.", "Hafele or AGB Polaris magnetic lock is included in the standard set."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat, upp till 3150×900×55 eller 2800×1100×55 mm", "custom, up to 3150×900×55 or 2800×1100×55 mm"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående/inåtgående (höger/vänster)", "outward/inward (right/left hand)"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["lackerat glas", "painted glass"] },
      { label: ["Kantlist", "Edge trim"], value: ["Matt krom", "Matt chrome"] },
      { label: ["Karm", "Frame"], value: ["Alum Premium 55 · aluminium · matt krom", "Alum Premium 55 · aluminium · matt chrome"] },
      { label: ["Ljudisolering", "Sound insulation"], value: ["42 dB", "42 dB"] },
      { label: ["Garanti", "Warranty"], value: ["15 år", "15 years"] }
    ],
  },
  {
    slug: "alum-unique-glass",
    name: "Alum Unique Glass",
    image: "/images/doors/alum-unique-glass/01.jpg",
    gallery: ["/images/doors/alum-unique-glass/01.jpg"],
    category: "hidden",
    priceSek: 31900,
    label: ["Dold dörr", "Concealed door"],
    material: ["MDF", "MDF"],
    finish: ["lackerat glas", "painted glass"],
    hardware: ["Alum Unique 43/51 · aluminiumkantlist", "Alum Unique 43/51 · aluminium edge trim"],
    colors: [
      { hex: "#f7f7f2", name: ["RAL 9010", "RAL 9010"] },
      { hex: "#f5f0e6", name: ["RAL 9001", "RAL 9001"] },
      { hex: "#e8e0c8", name: ["RAL 1013", "RAL 1013"] },
      { hex: "#8a9096", name: ["RAL 7045", "RAL 7045"] },
      { hex: "#1a1a1a", name: ["RAL 9005", "RAL 9005"] }
    ],
    description: ["Alum Unique med dold montering — lackerat glas i valfri RAL, med aluminiumprofil.", "Alum Unique concealed door — painted glass in any RAL, with an aluminium profile."],
    detailIntro: ["Alum Unique, lackerat glas. Karm Alum Unique 43 eller 51. Glasfärger från vit till svart RAL.", "Alum Unique, painted glass. Alum Unique 43 or 51 frame. Glass colours from white to black RAL."],
    detailBullets: [
      {
        title: ["Dold montering", "Concealed installation"],
        text: ["Aluminiumkarm utan synliga foder — dörrbladet ligger i väggens plan.", "Aluminium frame without visible casing — the leaf sits flush with the wall plane."],
      },
      {
        title: ["Kantlist", "Edge trim"],
        text: ["Matt krom / RAL aluminiumkantlist ger en skarp, hållbar kontur.", "Matt chrome / RAL aluminium edge trim gives a sharp, durable outline."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag.", "Hafele concealed hinges as standard — a discreet fit without visible hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["Hafele eller AGB Polaris magnetlås ingår i standardsetet.", "Hafele or AGB Polaris magnetic lock is included in the standard set."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat", "custom"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående/inåtgående (höger/vänster)", "outward/inward (right/left hand)"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["lackerat glas", "painted glass"] },
      { label: ["Kantlist", "Edge trim"], value: ["Matt krom / RAL", "Matt chrome / RAL"] },
      { label: ["Karm", "Frame"], value: ["Alum Unique 43 / 51 · aluminium", "Alum Unique 43 / 51 · aluminium"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] }
    ],
  },
  {
    slug: "alum-wood-glass",
    name: "Alum Wood Glass",
    image: "/images/doors/alum-wood-glass/01.jpg",
    gallery: ["/images/doors/alum-wood-glass/01.jpg"],
    category: "hidden",
    priceSek: 30900,
    label: ["Dold dörr", "Concealed door"],
    material: ["MDF", "MDF"],
    finish: ["lackerat glas", "painted glass"],
    hardware: ["Alum Unique 43/51 · aluminiumkantlist", "Alum Unique 43/51 · aluminium edge trim"],
    colors: [
      { hex: "#f7f7f2", name: ["Vit RAL 9010", "White RAL 9010"] },
      { hex: "#f5f0e6", name: ["Gräddvit RAL 9001", "Cream RAL 9001"] },
      { hex: "#e8e0c8", name: ["Pärlvit RAL 1013", "Pearl RAL 1013"] },
      { hex: "#8a9096", name: ["Telegrå RAL 7045", "Telegrey RAL 7045"] },
      { hex: "#1a1a1a", name: ["Svart RAL 9005", "Black RAL 9005"] }
    ],
    description: ["Alum Wood med dold montering — lackerat glas och aluminiumkarm för en ren, minimalistisk yta.", "Alum Wood concealed door — painted glass and an aluminium frame for a clean, minimalist plane."],
    detailIntro: ["Alum Wood, lackerat glas. Valfri glaskulör (RAL 9010, 9001, 1013, 7045, 9005 m.fl.). Karm Alum Unique 43/51.", "Alum Wood, painted glass. Choice of glass colours (RAL 9010, 9001, 1013, 7045, 9005 and more). Alum Unique 43/51 frame."],
    detailBullets: [
      {
        title: ["Dold montering", "Concealed installation"],
        text: ["Aluminiumkarm utan synliga foder — dörrbladet ligger i väggens plan.", "Aluminium frame without visible casing — the leaf sits flush with the wall plane."],
      },
      {
        title: ["Kantlist", "Edge trim"],
        text: ["Matt krom / RAL aluminiumkantlist ger en skarp, hållbar kontur.", "Matt chrome / RAL aluminium edge trim gives a sharp, durable outline."],
      },
      {
        title: ["Dolda gångjärn", "Concealed hinges"],
        text: ["Hafele dolda gångjärn som standard — diskret montage utan synliga beslag.", "Hafele concealed hinges as standard — a discreet fit without visible hardware."],
      },
      {
        title: ["Magnetlås", "Magnetic lock"],
        text: ["Hafele eller AGB Polaris magnetlås ingår i standardsetet.", "Hafele or AGB Polaris magnetic lock is included in the standard set."],
      },
    ],
    specs: [
      { label: ["Dörrbladets storlek", "Leaf size"], value: ["måttanpassat", "custom"] },
      { label: ["Öppning", "Opening"], value: ["utåtgående/inåtgående (höger/vänster)", "outward/inward (right/left hand)"] },
      { label: ["Dörrbladets material", "Leaf material"], value: ["MDF", "MDF"] },
      { label: ["Dörrbladets ytfinish", "Leaf finish"], value: ["lackerat glas", "painted glass"] },
      { label: ["Kantlist", "Edge trim"], value: ["Matt krom / RAL", "Matt chrome / RAL"] },
      { label: ["Karm", "Frame"], value: ["Alum Unique 43 / 51 · aluminium", "Alum Unique 43 / 51 · aluminium"] },
      { label: ["Garanti", "Warranty"], value: ["12 månader", "12 months"] }
    ],
  },
  {
    slug: "enstav",
    name: "Enstav",
    image: "/images/floors/enstav/01.jpg",
    gallery: [
      "/images/floors/enstav/01.jpg",
      "/images/floors/enstav/02.jpg",
      "/images/floors/enstav/03.jpg",
    ],
    category: "flooring",
    priceSek: 2_190,
    label: ["Golv", "Flooring"],
    material: ["Ingenjörsparkett ek/valnöt/ask", "Engineered parquet oak/walnut/ash"],
    finish: ["UV-lack eller olja", "UV lacquer or oil"],
    hardware: ["Läggning: 1-stav, parallell", "Laying: 1-strip, parallel"],
    colors: [
      { hex: "#cbb89a", name: ["Naturlig ek", "Natural oak"] },
      { hex: "#a89478", name: ["Varm ek", "Warm oak"] },
      { hex: "#8a7358", name: ["Rökig ek", "Smoky oak"] },
    ],
    description: [
      "1 stav — minimalistisk planka med med not och spont på alla fyra sidor.",
      "1-strip — a minimalist plank with with tongue and groove on all four sides.",
    ],
    detailIntro: [
      "Enstav är flerskiktsparkett för raka, lugna golvytor. Ytskikt 3–6 mm ek, valnöt eller ask på plywoodbas — stabilt även vid temperatur- och fuktväxlingar, och kompatibelt med golvvärme upp till 28 °C.",
      "Enstav is engineered parquet for calm, straight floors. Top layer 3–6 mm oak, walnut or ash on plywood — stable through climate swings, and compatible with underfloor heating up to 28 °C.",
    ],
    detailBullets: [
      {
        title: ["Bredder & längder", "Widths & lengths"],
        text: [
          "100–300 mm bredd · 500–2 490 mm längd · specialmått på beställning.",
          "100–300 mm width · 500–2 490 mm length · custom sizes on request.",
        ],
      },
      {
        title: ["Stabil konstruktion", "Stable build"],
        text: [
          "Läggs direkt på avjämnat underlag med lim — utan underlagsmatta.",
          "Installed directly onto screed with adhesive — no underlay needed.",
        ],
      },
      {
        title: ["Golvvärme", "Underfloor heating"],
        text: [
          "Godkänt upp till 28 °C på termostaten.",
          "Approved up to 28 °C on the thermostat.",
        ],
      },
    ],
    specs: [
      { label: ["Tjocklek", "Thickness"], value: ["11–22 mm (std 15 mm)", "11–22 mm (std 15 mm)"] },
      { label: ["Bredd", "Width"], value: ["100 / 120 / 150 / 190 / 220 / 260 / 300 mm", "100 / 120 / 150 / 190 / 220 / 260 / 300 mm"] },
      { label: ["Längd", "Length"], value: ["500–1 500 / 990–2 490 mm", "500–1 500 / 990–2 490 mm"] },
      { label: ["Fog", "Joint"], value: ["Not och spont", "Tongue and groove"] },
      { label: ["Golvvärme", "Underfloor heating"], value: ["Ja, upp till 28 °C", "Yes, up to 28 °C"] },
    ],
  },
  {
    slug: "chevron",
    name: "Chevron",
    image: "/images/floors/chevron/01.jpg",
    gallery: [
      "/images/floors/chevron/01.jpg",
      "/images/floors/chevron/02.jpg",
      "/images/floors/chevron/03.jpg",
      "/images/floors/chevron/04.jpg",
    ],
    category: "flooring",
    priceSek: 2_490,
    label: ["Golv", "Flooring"],
    material: ["Ingenjörsparkett ek/valnöt/ask", "Engineered parquet oak/walnut/ash"],
    finish: ["UV-lack eller olja", "UV lacquer or oil"],
    hardware: ["Chevron 45° / 60°", "Chevron 45° / 60°"],
    colors: [
      { hex: "#d4c4ad", name: ["Naturlig ek", "Natural oak"] },
      { hex: "#c4b49a", name: ["Honungsek", "Honey oak"] },
      { hex: "#b5a48a", name: ["Varm sand", "Warm sand"] },
    ],
    description: [
      "Chevron — plankor som möts i spets under 45° eller 60°. Ett exklusivt parkettmönster för öppna ytor.",
      "Chevron — planks meeting at a point at 45° or 60°. An exclusive parquet pattern for open spaces.",
    ],
    detailIntro: [
      "Chevron skapas genom att plankorna läggs i 45° eller 60°. Passar kök, hallar och sammanhängande boytor. Flerskiktskonstruktion med not och spont, anpassad för golvvärme.",
      "Chevron is created by laying planks at 45° or 60°. Suited to kitchens, halls and continuous living areas. Engineered build with tongue and groove, ready for underfloor heating.",
    ],
    detailBullets: [
      {
        title: ["45° eller 60°", "45° or 60°"],
        text: [
          "Välj vinkel efter rummets riktning och ljusinsläpp.",
          "Choose the angle to suit room direction and daylight.",
        ],
      },
      {
        title: ["Fyrdubbelt möte", "Quadruple meeting"],
        text: [
          "Även layout med fyra plankor i möte för rikare mönster.",
          "Also available as a four-plank meeting layout for a richer pattern.",
        ],
      },
      {
        title: ["Specialmått", "Custom sizes"],
        text: [
          "Standardbredder 100 / 120 / 150 mm — individuella mått på beställning.",
          "Standard widths 100 / 120 / 150 mm — custom dimensions on request.",
        ],
      },
    ],
    specs: [
      { label: ["Tjocklek", "Thickness"], value: ["11–22 mm (std 15 mm)", "11–22 mm (std 15 mm)"] },
      { label: ["Bredd", "Width"], value: ["100 / 120 / 150 mm", "100 / 120 / 150 mm"] },
      { label: ["Längd 45°", "Length 45°"], value: ["640 / 620 / 600 mm", "640 / 620 / 600 mm"] },
      { label: ["Längd 60°", "Length 60°"], value: ["690 / 680 / 660 mm", "690 / 680 / 660 mm"] },
      { label: ["Golvvärme", "Underfloor heating"], value: ["Ja, upp till 28 °C", "Yes, up to 28 °C"] },
    ],
  },
  {
    slug: "chevron-51",
    name: "Chevron 51°",
    image: "/images/floors/chevron-51/01.jpg",
    gallery: [
      "/images/floors/chevron-51/01.jpg",
      "/images/floors/chevron-51/02.jpg",
    ],
    category: "flooring",
    priceSek: 2_590,
    label: ["Golv", "Flooring"],
    material: ["Ingenjörsparkett ek/valnöt/ask", "Engineered parquet oak/walnut/ash"],
    finish: ["UV-lack eller olja", "UV lacquer or oil"],
    hardware: ["Chevron 51°", "Chevron 51°"],
    colors: [
      { hex: "#c8b89a", name: ["Naturlig ek", "Natural oak"] },
      { hex: "#b8a888", name: ["Ljus ek", "Light oak"] },
      { hex: "#9a8868", name: ["Varm ek", "Warm oak"] },
    ],
    description: [
      "Chevron 51° — unikt mönster där likstora plankor läggs i exakt 51° vinkel.",
      "Chevron 51° — a unique pattern where equal-size planks are laid at a precise 51° angle.",
    ],
    detailIntro: [
      "Chevron 51° ger ett stramt, rytmiskt uttryck som skiljer sig från klassisk 45°/60°-chevron. Samma tekniska bas: flerskiktsparkett, not och spont, golvvärme upp till 28 °C.",
      "Chevron 51° gives a crisp, rhythmic look distinct from classic 45°/60° chevron. Same technical base: engineered parquet, tongue and groove, underfloor heating up to 28 °C.",
    ],
    detailBullets: [
      {
        title: ["Exakt 51°", "Exact 51°"],
        text: [
          "Plankor av samma storlek i en precisionsvinkel.",
          "Equal-size planks at a precision angle.",
        ],
      },
      {
        title: ["Kompakta format", "Compact formats"],
        text: [
          "Bredd 120 / 150 mm · längd 380 / 350 mm.",
          "Width 120 / 150 mm · length 380 / 350 mm.",
        ],
      },
    ],
    specs: [
      { label: ["Tjocklek", "Thickness"], value: ["11–22 mm (std 15 mm)", "11–22 mm (std 15 mm)"] },
      { label: ["Bredd", "Width"], value: ["120 / 150 mm", "120 / 150 mm"] },
      { label: ["Längd", "Length"], value: ["380 / 350 mm", "380 / 350 mm"] },
      { label: ["Vinkel", "Angle"], value: ["51°", "51°"] },
      { label: ["Golvvärme", "Underfloor heating"], value: ["Ja, upp till 28 °C", "Yes, up to 28 °C"] },
    ],
  },
  {
    slug: "fiskben",
    name: "Fiskben",
    image: "/images/floors/fiskben/01.jpg",
    gallery: [
      "/images/floors/fiskben/01.jpg",
      "/images/floors/fiskben/02.jpg",
      "/images/floors/fiskben/03.jpg",
      "/images/floors/fiskben/04.jpg",
    ],
    category: "flooring",
    priceSek: 2_290,
    label: ["Golv", "Flooring"],
    material: ["Ingenjörsparkett ek/valnöt/ask", "Engineered parquet oak/walnut/ash"],
    finish: ["UV-lack eller olja", "UV lacquer or oil"],
    hardware: ["Fiskbens 90°", "Herringbone 90°"],
    colors: [
      { hex: "#cbb89a", name: ["Naturlig ek", "Natural oak"] },
      { hex: "#bba888", name: ["Ljus ek", "Light oak"] },
      { hex: "#a89478", name: ["Varm ek", "Warm oak"] },
    ],
    description: [
      "Fiskben — tidlös parkettklassiker med plankor lagda vinkelrätt i 90°.",
      "Herringbone — a timeless parquet classic with planks laid perpendicular at 90°.",
    ],
    detailIntro: [
      "Fiskben skapar ett karaktärsfullt, harmoniskt mönster för sovrum, vardagsrum och sammanhängande boytor. Även korgmönster och dubbelt fiskben finns som läggningsvarianter.",
      "Herringbone creates a characterful, balanced pattern for bedrooms, living rooms and continuous living areas. Basket weave and double herringbone are available as layout variants.",
    ],
    detailBullets: [
      {
        title: ["90° klassiker", "90° classic"],
        text: [
          "Perpendikulär läggning ger ett tydligt, balanserat mönster.",
          "Perpendicular installation creates a clear, balanced pattern.",
        ],
      },
      {
        title: ["Varianter", "Variants"],
        text: [
          "Korgmönster och dubbelt fiskben tillgängliga.",
          "Basket weave and double herringbone available.",
        ],
      },
      {
        title: ["Flera längder", "Multiple lengths"],
        text: [
          "495 / 610 / 750 mm — samt specialmått.",
          "495 / 610 / 750 mm — plus custom sizes.",
        ],
      },
    ],
    specs: [
      { label: ["Tjocklek", "Thickness"], value: ["11–22 mm (std 15 mm)", "11–22 mm (std 15 mm)"] },
      { label: ["Bredd", "Width"], value: ["100 / 120 / 150 mm", "100 / 120 / 150 mm"] },
      { label: ["Längd", "Length"], value: ["495 / 610 / 750 mm", "495 / 610 / 750 mm"] },
      { label: ["Mönster", "Pattern"], value: ["Fiskbens 90°", "Herringbone 90°"] },
      { label: ["Golvvärme", "Underfloor heating"], value: ["Ja, upp till 28 °C", "Yes, up to 28 °C"] },
    ],
  },
  {
    slug: "geometric",
    name: "Geometrisk parkett",
    image: "/images/floors/geometric/02.jpg",
    gallery: [
      "/images/floors/geometric/02.jpg",
      "/images/floors/geometric/03.jpg",
      "/images/floors/geometric/01.jpg",
    ],
    category: "flooring",
    priceSek: 3_490,
    label: ["Golv", "Flooring"],
    material: ["Modulär flerskiktsparkett", "Modular engineered parquet"],
    finish: ["UV-lack eller olja · 4 mm lamell", "UV lacquer or oil · 4 mm lamella"],
    hardware: ["Geometriska moduler", "Geometric modules"],
    colors: [
      { hex: "#c4b49a", name: ["Naturlig ek", "Natural oak"] },
      { hex: "#a89070", name: ["Varm ek", "Warm oak"] },
      { hex: "#8b7355", name: ["Mörkare ek", "Darker oak"] },
    ],
    description: [
      "Geometrisk parkett — konstnärliga modulmönster som Hexagon, Lotus, Basket Weave och fler.",
      "Geometric parquet — artistic modular patterns such as Hexagon, Lotus, Basket Weave and more.",
    ],
    detailIntro: [
      "Geometrisk parkett byggs av upprepade moduler i flerskiktsparkett: 4 mm ytskikt på 11 mm fuktbeständig plywood. Mönster som Hexagon, Japanese Cherry, Lotus, Peony Rose, Basket Weave, Triwave med flera — helt skräddarsydda beställningar är möjliga.",
      "Geometric parquet is built from repeating modules in engineered parquet: 4 mm top layer on 11 mm moisture-resistant plywood. Patterns such as Hexagon, Japanese Cherry, Lotus, Peony Rose, Basket Weave, Triwave and more — fully custom orders are possible.",
    ],
    detailBullets: [
      {
        title: ["Många mönster", "Many patterns"],
        text: [
          "Hexagon, Lotus, Basket Weave, Triwave, Large Cubes med flera.",
          "Hexagon, Lotus, Basket Weave, Triwave, Large Cubes and more.",
        ],
      },
      {
        title: ["4 mm lamell", "4 mm lamella"],
        text: [
          "Tillräckligt för flera omslipningar under golvets livstid.",
          "Enough for several refinishes over the floor’s lifetime.",
        ],
      },
      {
        title: ["Skräddarsytt", "Bespoke"],
        text: [
          "Helt individuella mönster och mått på beställning.",
          "Fully individual patterns and dimensions on request.",
        ],
      },
    ],
    specs: [
      { label: ["Uppbyggnad", "Construction"], value: ["4 mm lamell + 11 mm plywood", "4 mm lamella + 11 mm plywood"] },
      { label: ["Träslag", "Wood species"], value: ["Ek, valnöt, ask", "Oak, walnut, ash"] },
      { label: ["Fog", "Joint"], value: ["Not och spont", "Tongue and groove"] },
      { label: ["Ytbehandling", "Finish"], value: ["UV-lack / olja · borstning", "UV lacquer / oil · brushing"] },
      { label: ["Golvvärme", "Underfloor heating"], value: ["Ja, upp till 28 °C", "Yes, up to 28 °C"] },
    ],
  },
  {
    slug: "modular",
    name: "Modulparkett",
    image: "/images/floors/modular/01.jpg",
    gallery: [
      "/images/floors/modular/01.jpg",
      "/images/floors/modular/02.jpg",
    ],
    category: "flooring",
    priceSek: 3_290,
    label: ["Golv", "Flooring"],
    material: ["Modulpaneler ek/valnöt", "Modular panels oak/walnut"],
    finish: ["UV-lack eller olja", "UV lacquer or oil"],
    hardware: ["Slottsmönster · paneler", "Palace patterns · panels"],
    colors: [
      { hex: "#bba888", name: ["Naturlig ek", "Natural oak"] },
      { hex: "#9a8868", name: ["Hasselnöt", "Hazelnut"] },
      { hex: "#7a6548", name: ["Mörk ek", "Dark oak"] },
    ],
    description: [
      "Modulparkett — slottsinspirerade paneler som Rhomb, Star, Versal Big och Favorite.",
      "Modular parquet — palace-inspired panels such as Rhomb, Star, Versal Big and Favorite.",
    ],
    detailIntro: [
      "Modulparkett för sammanfogning på plats till rika ornament. Modeller i ek och valnöt — bland annat Arhidona, Brentwood, Derbi, Traversyn, Versal Big och Star — typiskt 500–900 mm paneler, specialmått 500–1 500 mm.",
      "Modular parquet is joined on site into rich ornaments. Oak and walnut models — including Arhidona, Brentwood, Derbi, Traversyn, Versal Big and Star — typically 500–900 mm panels, custom sizes 500–1 500 mm.",
    ],
    detailBullets: [
      {
        title: ["Klassiska paneler", "Classic panels"],
        text: [
          "Rhomb, Star, Versal Big, Favorite, Derbi med flera.",
          "Rhomb, Star, Versal Big, Favorite, Derbi and more.",
        ],
      },
      {
        title: ["Panelformat", "Panel formats"],
        text: [
          "Vanliga storlekar 500×500 till 900×900 mm.",
          "Common sizes from 500×500 to 900×900 mm.",
        ],
      },
      {
        title: ["Showroom", "Showroom"],
        text: [
          "Se och jämför mönster i vårt showroom i Stockholm.",
          "See and compare patterns in our Stockholm showroom.",
        ],
      },
    ],
    specs: [
      { label: ["Panelstorlek", "Panel size"], value: ["500–900 mm (typiskt)", "500–900 mm (typical)"] },
      { label: ["Specialmått", "Custom size"], value: ["500–1 500 mm", "500–1 500 mm"] },
      { label: ["Träslag", "Wood species"], value: ["Ek, valnöt", "Oak, walnut"] },
      { label: ["Fog", "Joint"], value: ["Not och spont", "Tongue and groove"] },
      { label: ["Golvvärme", "Underfloor heating"], value: ["Ja, upp till 28 °C", "Yes, up to 28 °C"] },
    ],
  },
  ...entranceDoorsRaw,
];

function mapModel(m: (typeof raw)[number], locale: Locale): DoorModel {
  const i = locale === "en" ? 1 : 0;
  return {
    slug: m.slug,
    name: m.name,
    image: m.image,
    gallery: m.gallery,
    category: m.category,
    priceSek: 0,
    label: m.label[i],
    material: m.material[i],
    finish: m.finish[i],
    hardware: m.hardware[i],
    colors: m.colors.map((c) => ({ hex: c.hex, name: c.name[i] })),
    description: m.description[i],
    detailIntro: m.detailIntro[i],
    detailBullets: m.detailBullets.map((b) => ({ title: b.title[i], text: b.text[i] })),
    specs: m.specs.map((s) => ({ label: s.label[i], value: s.value[i] })),
  };
}

export const modelSlugs = raw.map((m) => m.slug);

/** Bilingual rows for admin SQLite seed (same catalogue as static fallback). */
export function getStaticCatalogSeed() {
  return raw.map((m, idx) => ({
    slug: m.slug,
    name: m.name,
    category: m.category,
    image: m.image,
    gallery_json: JSON.stringify(m.gallery),
    label_sv: m.label[0],
    label_en: m.label[1],
    material_sv: m.material[0],
    material_en: m.material[1],
    finish_sv: m.finish[0],
    finish_en: m.finish[1],
    hardware_sv: m.hardware[0],
    hardware_en: m.hardware[1],
    colors_json: JSON.stringify(
      m.colors.map((c) => ({ hex: c.hex, name_sv: c.name[0], name_en: c.name[1] })),
    ),
    description_sv: m.description[0],
    description_en: m.description[1],
    detail_intro_sv: m.detailIntro[0],
    detail_intro_en: m.detailIntro[1],
    detail_bullets_json: JSON.stringify(
      m.detailBullets.map((b) => ({
        title_sv: b.title[0],
        title_en: b.title[1],
        text_sv: b.text[0],
        text_en: b.text[1],
      })),
    ),
    specs_json: JSON.stringify(
      m.specs.map((s) => ({
        label_sv: s.label[0],
        label_en: s.label[1],
        value_sv: s.value[0],
        value_en: s.value[1],
      })),
    ),
    price_sek: 0,
    featured: idx < 3 ? 1 : 0,
    published: 1,
    priority: (idx + 1) * 10,
  }));
}

/** Static catalogue fallback — prefer `@/lib/catalog` on the server. */
export function getModels(locale: Locale): DoorModel[] {
  return raw.map((m) => mapModel(m, locale));
}

/** Static catalogue fallback — prefer `@/lib/catalog` on the server. */
export function getModelBySlug(slug: string, locale: Locale): DoorModel | undefined {
  const found = raw.find((m) => m.slug === slug);
  return found ? mapModel(found, locale) : undefined;
}

function colorDistance(a: string, b: string): number {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [0, 2, 4].map((o) => parseInt(h.slice(o, o + 2), 16));
  };
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  return (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2;
}

export function getRelatedModels(current: DoorModel, all: DoorModel[], limit = 4): DoorModel[] {
  const primary = current.colors[0]?.hex ?? "#000000";
  const others = all.filter((m) => m.slug !== current.slug);
  const scored = others.map((m) => {
    const categoryScore = m.category === current.category ? 0 : 1000;
    const nearest = Math.min(...m.colors.map((c) => colorDistance(c.hex, primary)));
    return { m, score: categoryScore + nearest };
  });
  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, limit).map((s) => s.m);
}
