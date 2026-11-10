import type { Locale } from "@/lib/i18n";

const sv = {
  meta: {
    siteName: "HOME HUB",
    tagline: "Kvalitet, design och karaktär för ditt hem.",
    description: "Showroom i Stockholm — ytterdörrar, innerdörrar, dolda dörrar och golv.",
  },
  notFound: {
    code: "404",
    title: "Sidan hittades inte",
    lead: "Länken kan vara felaktig eller sidan kan ha flyttats.",
    cta: "Till startsidan",
  },
  nav: {
    home: "Hem",
    about: "Om oss",
    catalog: "Våra produkter",
    offers: "Aktuell kampanj",
    projects: "Referenser",
    services: "Tjänster",
    contact: "Kontakt",
    contactCta: "Kontakta oss",
    partnerships: "Samarbete",
    menu: "Meny",
    close: "Stäng",
    language: "Språk",
    openSavedItems: "Visa valda modeller",
    openSavedItemsEmpty: "Valda modeller — utforska katalogen",
  },
  savedPage: {
    breadcrumb: "Valda modeller",
    title: "Valda",
    titleEm: "modeller",
    lead: "Modeller du sparat för att jämföra eller ta med till showroomet.",
    viewAll: "Visa alla valda",
    empty: "Du har inga valda modeller än.",
    youMayLike: "Du kanske också gillar",
  },
  home: {
    heroTitle: "Hem förtjänar",
    heroTitleEm: "det bästa.",
    heroLead:
      "Exklusiv design och hantverksmässig kvalitet.\nDirekt från noggrant utvalda tillverkare till ditt rum.",
    heroCta: "Utforska sortimentet",
    heroImageAlt: "Showroom med innerdörrar och golv i Stockholm",
    heroShowroomTitle: "Showroom 140 m² i Stockholm",
    heroShowroomAddress: "Fredensvägen 4C, 174 53 Sundbyberg",
    introTitle: "Produkter som sticker ut.",
    introTitleEm: "Med karaktär.",
    introText:
      "Vi representerar fem tillverkare — utan onödiga mellanhänder. Ytterdörrar, innerdörrar, dolda dörrar, golv och skräddarsydd inredning efter dina mått.",
    featuredTitle: "Olika uttryck.",
    featuredTitleEm: "Samma omsorg.",
    featuredCta: "Se alla modeller",
    showMore: "Visa fler",
    showLess: "Visa färre",
    detailTitle: "Design du kan",
    detailTitleEm: "känna.",
    detailText:
      "Varm mässing, matt metall och genomtänkt beslag. Välj detaljer som förenar känsla och funktion.",
    detailCta: "Välj beslag",
    servicesTitle: "Från idé",
    servicesTitleEm: "till montering.",
    servicesCta: "Tjänster",
    service1Title: "Rådgivning & materialval",
    service1Text:
      "Vi går igenom planlösning, stil, budget och önskad känsla — tillsammans väljer vi rätt produkter.",
    service2Title: "Mått & specifikation",
    service2Text:
      "Vi samordnar mått, väggtjocklek och öppningsriktning innan beställningen fastställs.",
    service3Title: "Leverans & montering",
    service3Text:
      "Leveransomfattning, tidplan och monteringsförutsättningar stäms av i offerten.",
  },
  contactSection: {
    title: "Låt oss hitta",
    titleEm: "din lösning.",
    text: "Vi börjar med rummet och tar detaljerna därifrån.",
    cta: "Prata om ditt projekt",
  },
  request: {
    title: "Ditt rum.",
    titleEm: "Din idé.",
    dialogTitle: "Kontakta oss",
    lead: "Lämna en förfrågan om dörrar du gillar, eller berätta om ditt projekt.",
    leadModel:
      "Lämna en förfrågan om den här dörren — eller berätta kort om ditt projekt så hjälper vi dig vidare.",
    leadModelNamed:
      "Lämna en förfrågan om {model} — eller berätta kort om ditt projekt så hjälper vi dig vidare.",
    leadProject:
      "Berätta om ditt projekt — stil, mått eller frågor — så hjälper vi dig att välja rätt.",
    name: "Namn",
    phoneLabel: "Telefon",
    emailLabel: "E-post",
    namePlaceholder: "namn",
    phonePlaceholder: "telefon",
    emailPlaceholder: "e-post",
    contact: "Telefon eller e-post",
    interest: "Modell eller ämne",
    message: "Berätta om projektet",
    messageLabel: "Meddelande",
    messagePlaceholder: "Skriv ditt meddelande",
    consentLabel:
      "Jag godkänner att Home Hub Stockholm AB behandlar mina uppgifter för att besvara min förfrågan.",
    submit: "Skicka",
    orLabel: "Eller",
    writeUsOn: "Skriv till oss på",
    note: "Vi återkommer så snart vi kan. Du kan också nå oss via WhatsApp.",
    saved: "Tack! Din förfrågan har skickats.",
    error: "Något gick fel. Försök igen eller kontakta oss via WhatsApp.",
    discussModel: "Diskutera modellen",
    modalNote: "Illustrativ modell. Slutliga specifikationer och pris behöver bekräftas.",
  },
  catalog: {
    breadcrumb: "Våra produkter",
    title: "Hitta din",
    titleEm: "dörr.",
    lead: "Utforska material, uttryck och konstruktioner. Hitta en riktning för ditt projekt.",
    shown: "Visar",
    of: "av",
    details: "Visa modell",
    searchLabel: "Sök modeller",
    searchPlaceholder: "Sök modell, material eller beslag…",
    clearSearch: "Rensa sökning",
    filtersTitle: "Filter",
    openFilters: "Filter",
    resetFilters: "Återställ",
    clearFilters: "Rensa alla",
    showResults: "Visa resultat",
    filterCategoryLabel: "Kategori",
    filterSubcategoryLabel: "Underkategori",
    filterSubcategoryAll: "Alla i kategorin",
    filterPriceLabel: "Pris",
    filterMaterialLabel: "Material",
    filterMaterialAll: "Alla material",
    filterColorLabel: "Färg",
    filterColorAll: "Alla färger",
    noResults: "Inga modeller matchar dina filter. Prova att ändra sökning eller filter.",
    priceRangeTo: "till",
    filters: {
      all: "Alla modeller",
      entrance: "Ytterdörrar",
      interior: "Innerdörrar",
      hidden: "Dolda dörrar",
      flooring: "Golv",
    },
    material: "Material",
    finish: "Yta",
    hardware: "Beslag",
    priceFrom: "från",
    priceLabel: "Pris",
    priceNote:
      "Priset avser standardmått (dörrar) eller från-pris per m² (golv) och exkluderar montering. Slutligt pris bekräftas i offert efter mått och specifikation.",
    note: "Material, mått och tillgänglighet bekräftas i offerten.",
  },
  doorPage: {
    paintColorNote:
      "Dörren kan målas i valfri RAL- eller NCS-kulör. Kontakta oss så hjälper vi dig att välja.",
    colorLabel: "Välj färg",
    relatedTitle: "Liknande modeller",
    relatedSubtitle: "Från samma kategori eller närliggande ton.",
    tabs: {
      description: "Beskrivning",
      specs: "Tekniska specifikationer",
      warranty: "Garanti",
      reviews: "Omdömen",
    },
    advantagesTitle: "Fördelar",
    openGallery: "Öppna bildgalleri",
    orderCta: "Skicka beställningsförfrågan",
    contactManager: "Kontakta rådgivare",
    reviewsEmpty: "Inga omdömen ännu. Besök showroomet och dela gärna dina intryck efter installation.",
    warrantyTitle: "Garanti & service",
    warrantyText:
      "Garanti enligt tillverkarens villkor och gäller normal användning efter professionell montering. Exakt omfattning och eventuella undantag bekräftas i offert och leveransdokumentation.",
    warrantyBullets: [
      "Fabriksfel på material och yta omfattas enligt leverantörens garantipolicy.",
      "Montering ska utföras enligt tillverkarens instruktioner.",
      "Service och reservdelar hanteras via Home Hub efter projektets omfattning.",
    ],
    savedItems: {
      title: "Valda modeller",
      subtitle: "Spara modeller du vill jämföra eller ta med till showroomet.",
      add: "Lägg till favoriter",
      remove: "Ta bort från valda",
      inList: "Sparad i valda",
      empty: "Du har inga valda modeller än. Lägg till den här modellen eller utforska katalogen.",
      browseCatalog: "Till katalogen",
      removeItem: "Ta bort",
      addShort: "Lägg till",
    },
  },
  about: {
    breadcrumb: "Om oss",
    title: "Kvalitet, design",
    titleEm: "och karaktär.",
    lead:
      "Ett showroom i Stockholm — ytterdörrar, innerdörrar, dolda dörrar och golv, direkt från noggrant utvalda tillverkare.",
    storyTitle: "Ett hem är mer än det du ser.",
    storyTitleEm: "Det är det du känner.",
    storyIntro:
      "Träets struktur mot handen. Beslagets mjuka rörelse. Stillheten bakom en stängd dörr. Vi hjälper dig välja detaljer som formar vardagen.",
    valuesTitle: "Det vi står för",
    values: [
      {
        index: "01",
        title: "Direkt från tillverkaren",
        text: "Vi representerar fem noggrant utvalda tillverkare — utan onödiga mellanhänder, bara äkta kvalitet.",
      },
      {
        index: "02",
        title: "Erfarenhet från bygget",
        text: "Bakom Home Hub står byggmästare med över 8 års erfarenhet av renovering och nyproduktion i Sverige.",
      },
      {
        index: "03",
        title: "140 m² att uppleva",
        text: "I showroomet i Stockholm kan du se, känna och jämföra sortimentet innan du bestämmer dig.",
      },
    ],
    paragraphs: [
      "Home Hub är ett showroom grundat med en enkel övertygelse: att hem förtjänar produkter med riktigt god kvalitet, genomtänkt design och karaktär.",
      "Bakom Home Hub står en byggmästare med över 8 års erfarenhet av renoverings- och byggprojekt i Sverige. Under åren på byggarbetsplatser väcktes en tanke som inte gick att ignorera: trots ett stort utbud på marknaden var det svårt att hitta dörrar, golv och inredningsdetaljer som verkligen sticker ut — produkter som kombinerar exklusiv design med hantverksmässig kvalitet.",
      "Det var den insikten som skapade Home Hub.",
      "Vi är direkta representanter för 5 noggrant utvalda tillverkare. Det innebär inga onödiga mellanhänder — bara äkta kvalitet, direkt från källan till dig.",
      "I vårt 140 m² stora showroom i Stockholm kan du se, känna och jämföra ett brett sortiment av ytterdörrar, innerdörrar, dolda dörrar och golv. Utöver det erbjuder vi också skräddarsydda kök och möbler — tillverkade exakt efter dina mått, så att varje detalj passar perfekt i ditt utrymme, utan onödiga glapp eller påbyggnader.",
    ],
    welcome: "Varmt välkommen till oss i Stockholm!",
  },
  offers: {
    breadcrumb: "Aktuell kampanj",
    title: "Öppningserbjudande –",
    titleEm: "fira med oss!",
    paragraphs: [
      "Vi öppnar dörrarna till Home Hub i Stockholm och vill fira det tillsammans med dig.",
      "Under hela november erbjuder vi 10% rabatt på hela sortimentet — ytterdörrar, innerdörrar och golv.",
      "Det är ditt tillfälle att välja bland exklusiva produkter från noggrant utvalda tillverkare — till ett extra förmånligt pris.",
      "Missa inte chansen. Erbjudandet gäller endast i november.",
    ],
    cta: "Förbered en förfrågan",
  },
  projects: {
    breadcrumb: "Referenser",
    title: "Rum att",
    titleEm: "inspireras av.",
    lead: "Utforska hur olika dörrar och golv kan forma ett rum. Inspirationsmiljöer från vårt showroom.",
    p1Title: "Ljust & naturligt",
    p1Text: "Ett ljust dörrblad med tydlig trästruktur skapar en naturlig övergång mellan rummen.",
    p2Title: "Mörkt & stilla",
    p2Text: "Valnötens djup ger karaktär åt ett avskalat rum. Matta beslag förstärker det lugna uttrycket.",
    p3Title: "Öppet & flexibelt",
    p3Text: "Tonat glas delar av rummet och behåller känslan av ljus och rymd.",
    projectNote: "Inspirationskoncept från sortimentet.",
    discuss: "Diskutera med oss",
  },
  services: {
    breadcrumb: "Tjänster",
    title: "Från första idé",
    titleEm: "till sista detalj.",
    lead: "En tydlig väg genom val, specifikation och installation. Omfattning och villkor bestäms för varje projekt.",
    s4Title: "Skötsel & uppföljning",
    s4Text:
      "Du får vägledning om skötsel och användning. Garanti och servicevillkor bekräftas av leverantören.",
    faqTitle: "Bra att veta",
    faq1q: "Vad behöver jag inför en rådgivning?",
    faq1a: "En planritning, ungefärligt antal dörrar och några referensbilder räcker för ett första samtal.",
    faq2q: "Kan dörrar och beslag väljas tillsammans?",
    faq2a: "Ja. Vi utgår från både funktion och uttryck när vi sätter samman förslaget.",
    faq3q: "När får jag pris och leveranstid?",
    faq3a: "När modell, mått, material och omfattning har specificerats kan en offert och preliminär tidplan tas fram.",
  },
  showroom: {
    phoneLabel: "Telefon",
    emailLabel: "E-post",
    addressLabel: "Adress",
    hoursLabel: "Öppettider",
    socialLabel: "Sociala medier",
    mapTitle: "Karta till showroom",
    mapDirections: "Öppna i Google Maps",
    visitTitle: "Besök showroomet",
    visitLead: "140 m² i Stockholm — se, känn och jämför sortimentet. Boka gärna tid i förväg.",
  },
  contactPage: {
    breadcrumb: "Kontakt",
    title: "Berätta om",
    titleEm: "ditt rum.",
    lead: "Ett nytt hem, en renovering eller en enstaka dörr. Börja med en kort beskrivning av vad du vill skapa.",
    card2Title: "Förbered ditt besök",
    card2Text:
      "Ta gärna med planritning, mått och bilder på interiören. Boka besök via formuläret eller telefon.",
    formTitle: "Förbered din förfrågan",
  },
  partnerships: {
    breadcrumb: "Samarbete",
    title: "Din vision.",
    titleEm: "Vår gemensamma riktning.",
    lead:
      "För arkitekter, inredare och projektteam som vill förena material, funktion och ett tydligt gestaltningsgrepp.",
    cards: [
      {
        index: "01",
        title: "Arkitekter & inredare",
        text: "Vi hjälper till att samla materialval, dörruttryck och beslagsidéer kring ditt gestaltningskoncept.",
      },
      {
        index: "02",
        title: "Byggare & projektteam",
        text: "Vi går igenom dörrförteckning, gränsdragningar och leveransbehov för att skapa ett tydligt underlag.",
      },
      {
        index: "03",
        title: "Fastighetsutvecklare",
        text: "Vi diskuterar en sammanhållen dörr- och beslagslösning för flera rum eller bostäder.",
      },
    ],
    briefTitle: "Ett gemensamt arbetsunderlag",
    steps: [
      "Dela ritningar, omfattning och tidplan.",
      "Stäm av material, teknik och projektets behov.",
      "Samla valen i en specifikation inför offert.",
    ],
    cta: "Förbered en samarbetsförfrågan",
  },
  footer: {
    note: "Showroom · Stockholm",
    companyName: "Home Hub Stockholm AB",
    orgNr: "556218-7475",
    vatNote: "Momsregistrerad",
    copyright: "© 2026 Home Hub Stockholm AB",
    navHeading: "Navigering",
    contactHeading: "Showroom & kontakt",
    legalHeading: "Juridiskt",
    privacy: "Integritetspolicy",
    terms: "Köpvillkor",
    shipping: "Leveranspolicy",
    returns: "Retur & återbetalning",
    cookies: "Cookies",
  },
  legal: {
    privacyTitle: "Integritetspolicy",
    termsTitle: "Köpvillkor",
    shippingTitle: "Leveranspolicy",
    returnsTitle: "Retur- och återbetalningspolicy",
    cookiesTitle: "Cookies",
    privacyIntro:
      "Denna integritetspolicy beskriver hur Home Hub Stockholm AB (\"vi\", \"oss\") behandlar personuppgifter när du besöker vår webbplats, kontaktar oss eller gör en beställning.",
    privacySections: [
      {
        title: "Personuppgiftsansvarig",
        paragraphs: [
          "Personuppgiftsansvarig är Home Hub Stockholm AB, org.nr 556218-7475. Kontaktuppgifter finns på vår kontaktsida.",
        ],
      },
      {
        title: "Vilka uppgifter vi samlar in",
        paragraphs: [
          "När du kontaktar oss eller begär offert kan vi behandla namn, telefonnummer, e-postadress, leveransadress och uppgifter om ditt projekt.",
          "Vid besök på webbplatsen kan tekniska uppgifter samlas in via cookies och liknande teknik, till exempel IP-adress, enhetstyp och sidor som besöks — se vår cookiepolicy.",
        ],
      },
      {
        title: "Ändamål och rättslig grund",
        paragraphs: [
          "Vi behandlar personuppgifter för att besvara förfrågningar, lämna offerter, fullgöra avtal, leverera produkter och ge kundservice (avtal / berättigat intresse).",
          "Vi använder analyscookies endast om du har samtyckt till dem.",
          "Vi kan också behandla uppgifter när det krävs enligt lag, till exempel bokföring.",
        ],
      },
      {
        title: "Delning av uppgifter",
        paragraphs: [
          "Vi säljer inte dina personuppgifter. Uppgifter kan delas med leverantörer och samarbetspartner som behövs för tillverkning, leverans, IT-drift eller analys — endast i den utsträckning som krävs för respektive uppdrag.",
        ],
      },
      {
        title: "Lagring",
        paragraphs: [
          "Uppgifter sparas så länge det behövs för ändamålet, för kundrelationen eller enligt lagkrav (till exempel bokföringsregler).",
        ],
      },
      {
        title: "Dina rättigheter",
        paragraphs: [
          "Du har rätt att begära tillgång, rättelse, radering, begränsning och i vissa fall dataportabilitet, samt att invända mot behandling som grundas på berättigat intresse.",
          "Du kan när som helst återkalla samtycke till analyscookies. Du har också rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY).",
        ],
      },
      {
        title: "Kontakt",
        paragraphs: [
          "Har du frågor om hur vi behandlar personuppgifter? Kontakta oss via e-post eller telefon enligt uppgifterna på kontaktsidan.",
        ],
      },
    ],
    termsIntro:
      "Dessa köpvillkor gäller när du beställer produkter från Home Hub Stockholm AB via webbplats, showroom eller offert. Genom att lägga en beställning godkänner du villkoren.",
    termsSections: [
      {
        title: "Säljare",
        paragraphs: [
          "Säljare är Home Hub Stockholm AB, org.nr 556218-7475, momsregistrerad. Showroom: Fredensvägen 4C, 174 53 Sundbyberg, Sverige. Telefon och e-post finns på kontaktsidan.",
        ],
      },
      {
        title: "Produkter och priser",
        paragraphs: [
          "Produkter som dörrar och golv tillverkas eller anpassas efter mått, material och övriga val. Priser i katalog och på webbplatsen är vägledande tills en skriftlig offert eller orderbekräftelse har godkänts.",
          "Alla priser anges i SEK. Om inte annat anges i offerten är priser inklusive moms för konsumenter. Slutligt pris, leveranstid och specifikation framgår av offert eller orderbekräftelse.",
        ],
      },
      {
        title: "Beställning och betalning",
        paragraphs: [
          "Beställning sker efter offert. En bindande beställning uppstår när du godkänner offert/orderbekräftelse och eventuell avtalad förskottsbetalning har mottagits.",
          "Betalning sker via faktura och banköverföring (Swish eller kort om det anges i offerten). Förskott, delbetalning eller slutbetalning anges i offert eller faktura. Vid försenad betalning förbehåller vi oss rätten att skjuta upp produktion och leverans.",
        ],
      },
      {
        title: "Leverans och montering",
        paragraphs: [
          "Se vår leveranspolicy för fraktkostnad, leveranssätt, hanteringstid och leveransområde. Kortfattat: varor skickas från Sverige efter tillverkning; kostnad och tid anges i offerten.",
          "Eventuell montering och tilläggsarbeten avtalas separat och ingår endast om det uttryckligen anges.",
        ],
      },
      {
        title: "Ångerrätt, retur och återbetalning",
        paragraphs: [
          "Se vår retur- och återbetalningspolicy. Kortfattat: varan återlämnas inte eftersom den tillverkas i sin helhet på beställning efter dina mått och val.",
          "Vid fabrikationsfel eller transportskada gäller reklamation enligt lag — kontakta oss omgående.",
        ],
      },
      {
        title: "Reklamation",
        paragraphs: [
          "Kontrollera leveransen vid mottagandet. Synliga transportskador ska noteras och meddelas oss utan dröjsmål. Dolda fel ska reklameras inom skälig tid efter upptäckt.",
        ],
      },
      {
        title: "Ansvar",
        paragraphs: [
          "Vi ansvarar för fel enligt gällande konsumentköplag där den är tillämplig. Vi ansvarar inte för indirekta skador eller följdförluster utöver vad som följer av tvingande lag.",
        ],
      },
      {
        title: "Tvist",
        paragraphs: [
          "Tvister ska i första hand lösas i samförstånd. Konsumenter kan vända sig till Allmänna reklamationsnämnden (ARN). Svensk lag gäller.",
        ],
      },
    ],
    shippingIntro:
      "Denna leveranspolicy beskriver hur Home Hub Stockholm AB levererar produkter som beställs via webbplats, showroom eller offert.",
    shippingSections: [
      {
        title: "Avsändare och leveransområde",
        paragraphs: [
          "Varor skickas från vår verksamhet i Sundbyberg / Stockholmsområdet, Sverige (Fredensvägen 4C, 174 53 Sundbyberg).",
          "Vi levererar främst inom Sverige. Leverans till andra länder kan erbjudas efter särskild överenskommelse i offerten.",
        ],
      },
      {
        title: "Leveranssätt",
        paragraphs: [
          "Leverans sker med fraktbolag till angiven adress, eller som upphämtning i showroom om det avtalats.",
          "Stora gods (t.ex. dörrar) kan kräva hemleverans till tomtgräns eller lastkaj. Exakt leveranssätt anges i offert eller orderbekräftelse.",
        ],
      },
      {
        title: "Hanteringstid och leveranstid",
        paragraphs: [
          "Produkter tillverkas eller anpassas efter beställning. Produktionstid anges i offerten och är vanligen 4–12 veckor beroende på produkt, material och belastning.",
          "När varan är klar meddelar vi dig. Transporttid inom Sverige är normalt 1–5 arbetsdagar efter avsändning. Uppskattad leveransvecka framgår av offerten.",
        ],
      },
      {
        title: "Fraktkostnad",
        paragraphs: [
          "Fraktkostnad beräknas utifrån vikt, volym, leveransadress och valt leveranssätt. Kostnaden anges tydligt i offerten innan du godkänner beställningen — antingen som separat rad eller inkluderad i priset.",
          "Inga dolda avgifter tillkommer efter godkänd offert, utöver vad som följer av ändrade leveransuppgifter på kundens begäran.",
        ],
      },
      {
        title: "Mottagning och skador",
        paragraphs: [
          "Kontrollera emballage och gods vid mottagandet. Notera synliga skador på fraktsedel/följesedel och kontakta oss samma dag eller senast inom 48 timmar.",
          "Vi hjälper dig med reklamationsärende mot transportör och leverantör vid transportskada.",
        ],
      },
      {
        title: "Montering",
        paragraphs: [
          "Montering ingår inte i standardleverans om det inte uttryckligen anges i offerten. Monteringspris och villkor avtalas separat.",
        ],
      },
    ],
    returnsIntro:
      "Denna policy beskriver retur, ångerrätt och återbetalning för produkter från Home Hub Stockholm AB.",
    returnsSections: [
      {
        title: "Inga returer för specialtillverkade varor",
        paragraphs: [
          "Varan återlämnas inte eftersom den tillverkas i sin helhet på beställning efter dina mått, material och övriga val.",
          "Det finns därför ingen generell returfrist för ånger eller ombestämning efter att produktion har påbörjats eller varan är specialanpassad.",
        ],
      },
      {
        title: "Ångerrätt",
        paragraphs: [
          "Varor som tillverkas eller väsentligt anpassas efter kundens specifikation omfattas inte av lagstadgad ångerrätt vid distansavtal (konsument).",
          "Om en standardvara utan specialanpassning skulle säljas på distans gäller i förekommande fall 14 dagars ångerrätt enligt lag — detta anges i så fall särskilt i offerten. För våra specialtillverkade dörrar och golv gäller normalt ingen ångerrätt.",
        ],
      },
      {
        title: "Avbeställning före produktion",
        paragraphs: [
          "Om du avbeställer innan produktion har startat kan vi återbetala erlagd förskottsbetalning minus eventuella dokumenterade kostnader som redan uppstått (t.ex. måttagning eller materialreservation), enligt överenskommelse i offerten.",
          "När produktion har startat kan ordern normalt inte avbeställas, returneras eller bytas.",
        ],
      },
      {
        title: "Reklamation vid fel eller skada",
        paragraphs: [
          "Om varan har fabrikationsfel i material eller yta, eller skadats under transport som vi ansvarar för, har du rätt att reklamera enligt konsumentköplagen där den är tillämplig.",
          "Kontakta oss via telefon eller e-post (uppgifter på kontaktsidan) så snart felet upptäcks — synliga skador helst inom 48 timmar efter leverans, dolda fel inom skälig tid.",
          "Vid godkänd reklamation åtgärdar vi felet genom reparation, omleverans eller prisavdrag/återbetalning enligt lag. Returfrakt vid godkänd reklamation bekostas av oss om inte annat följer av tvingande regler.",
        ],
      },
      {
        title: "Återbetalning",
        paragraphs: [
          "När återbetalning ska ske (t.ex. godkänd reklamation eller avbeställning före produktion) återbetalar vi till samma betalningssätt som användes, normalt via banköverföring.",
          "Återbetalning genomförs inom 14 dagar efter att vi godkänt ärendet och, vid behov, mottagit retur eller bekräftat felet. Du får bekräftelse på belopp och tidplan.",
        ],
      },
      {
        title: "Kontakt",
        paragraphs: [
          "Frågor om retur eller återbetalning: kontakta Home Hub Stockholm AB via e-post eller telefon enligt kontaktsidan. Org.nr 556218-7475, Fredensvägen 4C, 174 53 Sundbyberg.",
        ],
      },
    ],
    cookiesIntro:
      "Denna cookiepolicy förklarar hur Home Hub Stockholm AB använder cookies och liknande teknik på webbplatsen.",
    cookiesSections: [
      {
        title: "Vad är cookies?",
        paragraphs: [
          "Cookies är små textfiler som lagras i din webbläsare. De används för att webbplatsen ska fungera, komma ihåg val och — om du godkänner det — förstå hur webbplatsen används.",
        ],
      },
      {
        title: "Nödvändiga cookies",
        paragraphs: [
          "Nödvändiga cookies krävs för grundläggande funktioner, till exempel att spara ditt cookieval och att webbplatsen ska fungera säkert. Dessa används alltid.",
        ],
      },
      {
        title: "Analyscookies",
        paragraphs: [
          "Om du accepterar analyscookies kan vi använda Google Analytics för att förstå trafik och användning av webbplatsen. Dessa cookies sätts först efter ditt samtycke och kan återkallas när som helst via cookievalet.",
        ],
      },
      {
        title: "Hur du hanterar cookies",
        paragraphs: [
          "Du kan acceptera alla cookies eller endast nödvändiga via vår cookiebanner. Du kan också radera eller blockera cookies i webbläsarens inställningar. Observera att vissa funktioner då kan påverkas.",
        ],
      },
      {
        title: "Mer information",
        paragraphs: [
          "För hur vi behandlar personuppgifter i övrigt, se vår integritetspolicy. Kontakta oss gärna om du har frågor.",
        ],
      },
    ],
  },
  cookieBanner: {
    title: "Vi använder cookies",
    text: "Vi använder nödvändiga cookies för att webbplatsen ska fungera, och analyscookies för att förstå hur den används. Du kan acceptera alla eller endast nödvändiga.",
    acceptAll: "Acceptera alla",
    essentialOnly: "Endast nödvändiga",
    learnMore: "Läs mer om cookies",
  },
};

export type Dictionary = typeof sv;

const en: Dictionary = {
  meta: {
    siteName: "HOME HUB",
    tagline: "Quality, design and character for your home.",
    description: "Showroom in Stockholm — entrance doors, interior doors, hidden doors and flooring.",
  },
  notFound: {
    code: "404",
    title: "Page not found",
    lead: "The link may be wrong, or the page may have moved.",
    cta: "Back to home",
  },
  nav: {
    home: "Home",
    about: "About us",
    catalog: "Our products",
    offers: "Current campaign",
    projects: "References",
    services: "Services",
    contact: "Contact",
    contactCta: "Contact us",
    partnerships: "Partnership",
    menu: "Menu",
    close: "Close",
    language: "Language",
    openSavedItems: "View selected models",
    openSavedItemsEmpty: "Selected models — browse the catalog",
  },
  savedPage: {
    breadcrumb: "Selected items",
    title: "Selected",
    titleEm: "items",
    lead: "Models you saved to compare or bring to the showroom.",
    viewAll: "View all selected",
    empty: "You have no selected items yet.",
    youMayLike: "You may also like",
  },
  home: {
    heroTitle: "Homes deserve",
    heroTitleEm: "the best.",
    heroLead:
      "Exclusive design and craftsmanship.\nDirect from carefully selected manufacturers to your space.",
    heroCta: "Explore the range",
    heroImageAlt: "Showroom with interior doors and flooring in Stockholm",
    heroShowroomTitle: "Showroom 140 m² in Stockholm",
    heroShowroomAddress: "Fredensvägen 4C, 174 53 Sundbyberg",
    introTitle: "Products that stand out.",
    introTitleEm: "With character.",
    introText:
      "We represent five manufacturers — no unnecessary middlemen. Entrance and interior doors, hidden doors, flooring and bespoke interiors made to your exact measurements.",
    featuredTitle: "Different expressions.",
    featuredTitleEm: "Same care.",
    featuredCta: "View all models",
    showMore: "Show more",
    showLess: "Show less",
    detailTitle: "Design you can",
    detailTitleEm: "feel.",
    detailText:
      "Warm brass, matt metal and thoughtful hardware. Choose details that unite feeling and function.",
    detailCta: "Choose hardware",
    servicesTitle: "From idea",
    servicesTitleEm: "to installation.",
    servicesCta: "Services",
    service1Title: "Consultation & materials",
    service1Text:
      "We review layout, style, budget and the mood you want — together we choose the right products.",
    service2Title: "Dimensions & specification",
    service2Text:
      "We align sizes, wall thickness and swing direction before the order is confirmed.",
    service3Title: "Delivery & installation",
    service3Text:
      "Scope, timeline and installation conditions are agreed in the quote.",
  },
  contactSection: {
    title: "Let us find",
    titleEm: "your solution.",
    text: "We start with the room and take the details from there.",
    cta: "Talk about your project",
  },
  request: {
    title: "Your space.",
    titleEm: "Your idea.",
    dialogTitle: "Contact us",
    lead: "Leave a request for doors you like, or tell us about your project.",
    leadModel:
      "Leave a request for this door — or briefly tell us about your project and we’ll help you next.",
    leadModelNamed:
      "Leave a request for {model} — or briefly tell us about your project and we’ll help you next.",
    leadProject:
      "Tell us about your project — style, measurements or questions — and we’ll help you choose.",
    name: "Name",
    phoneLabel: "Phone",
    emailLabel: "Email",
    namePlaceholder: "name",
    phonePlaceholder: "phone",
    emailPlaceholder: "email",
    contact: "Phone or email",
    interest: "Model or topic",
    message: "Tell us about the project",
    messageLabel: "Message",
    messagePlaceholder: "Write your message",
    consentLabel:
      "I agree that Home Hub Stockholm AB may process my details to respond to my enquiry.",
    submit: "Send",
    orLabel: "Or",
    writeUsOn: "Write to us on",
    note: "We will get back to you as soon as we can. You can also reach us on WhatsApp.",
    saved: "Thank you! Your enquiry has been sent.",
    error: "Something went wrong. Please try again or contact us on WhatsApp.",
    discussModel: "Discuss this model",
    modalNote: "Illustrative model. Final specs and price need confirmation.",
  },
  catalog: {
    breadcrumb: "Our products",
    title: "Find your",
    titleEm: "door.",
    lead: "Explore materials, expressions and constructions. Find a direction for your project.",
    shown: "Showing",
    of: "of",
    details: "View model",
    searchLabel: "Search models",
    searchPlaceholder: "Search model, material or hardware…",
    clearSearch: "Clear search",
    filtersTitle: "Filters",
    openFilters: "Filters",
    resetFilters: "Reset",
    clearFilters: "Clear all",
    showResults: "Show results",
    filterCategoryLabel: "Category",
    filterSubcategoryLabel: "Subcategory",
    filterSubcategoryAll: "All in category",
    filterPriceLabel: "Price",
    filterMaterialLabel: "Material",
    filterMaterialAll: "All materials",
    filterColorLabel: "Colour",
    filterColorAll: "All colours",
    noResults: "No models match your filters. Try changing the search or filters.",
    priceRangeTo: "to",
    filters: {
      all: "All models",
      entrance: "Entrance doors",
      interior: "Interior doors",
      hidden: "Hidden doors",
      flooring: "Flooring",
    },
    material: "Material",
    finish: "Surface",
    hardware: "Hardware",
    priceFrom: "from",
    priceLabel: "Price",
    priceNote:
      "Price is for standard sizes (doors) or from-price per m² (flooring) and excludes installation. Final price is confirmed in the quote after measurements and specification.",
    note: "Material, sizes and availability are confirmed in the quote.",
  },
  doorPage: {
    paintColorNote:
      "The door can be painted in any RAL or NCS colour. Contact us and we will help you choose.",
    colorLabel: "Choose colour",
    relatedTitle: "Similar models",
    relatedSubtitle: "From the same category or a close tone.",
    tabs: {
      description: "Description",
      specs: "Technical specifications",
      warranty: "Warranty",
      reviews: "Reviews",
    },
    advantagesTitle: "Advantages",
    openGallery: "Open photo gallery",
    orderCta: "Send order enquiry",
    contactManager: "Contact your manager",
    reviewsEmpty: "No reviews yet. Visit the showroom and share your experience after installation.",
    warrantyTitle: "Warranty & service",
    warrantyText:
      "Warranty follows the manufacturer’s terms and normal use after professional installation. Exact scope and any exclusions are confirmed in the quote and delivery documentation.",
    warrantyBullets: [
      "Factory defects in material and finish are covered under the supplier warranty policy.",
      "Installation must follow the manufacturer’s instructions.",
      "Service and spare parts are handled via Home Hub according to project scope.",
    ],
    savedItems: {
      title: "Selected items",
      subtitle: "Save models you want to compare or bring to the showroom.",
      add: "Add to favorites",
      remove: "Remove from selection",
      inList: "Saved to selection",
      empty: "You have no selected models yet. Add this model or browse the catalog.",
      browseCatalog: "Browse catalog",
      removeItem: "Remove",
      addShort: "Add",
    },
  },
  about: {
    breadcrumb: "About us",
    title: "Quality, design",
    titleEm: "and character.",
    lead:
      "A showroom in Stockholm — entrance doors, interior doors, hidden doors and flooring from carefully selected manufacturers.",
    storyTitle: "Home is more than what you see.",
    storyTitleEm: "It is what you feel.",
    storyIntro:
      "The grain beneath your hand. The gentle movement of hardware. The quiet behind a closed door. We help you choose the details that shape everyday life.",
    valuesTitle: "What we stand for",
    values: [
      {
        index: "01",
        title: "Straight from the manufacturer",
        text: "We represent five carefully selected manufacturers — no unnecessary middlemen, just genuine quality.",
      },
      {
        index: "02",
        title: "Built on site experience",
        text: "Home Hub is founded by a master builder with over 8 years of renovation and construction work in Sweden.",
      },
      {
        index: "03",
        title: "140 m² to experience",
        text: "In our Stockholm showroom you can see, feel and compare the range before you decide.",
      },
    ],
    paragraphs: [
      "Home Hub is a showroom founded on a simple belief: that homes deserve products of real quality, thoughtful design and character.",
      "Behind Home Hub is a master builder with over 8 years of experience in renovation and construction projects in Sweden. Years on building sites sparked an idea that could not be ignored: despite a large market offering, it was hard to find doors, flooring and interior details that truly stand out — products that combine exclusive design with craftsmanship.",
      "That insight created Home Hub.",
      "We are direct representatives for 5 carefully selected manufacturers. That means no unnecessary middlemen — just genuine quality, straight from the source to you.",
      "In our 140 m² showroom in Stockholm you can see, feel and compare a wide range of entrance doors, interior doors, hidden doors and flooring. We also offer bespoke kitchens and furniture — made exactly to your measurements, so every detail fits your space perfectly, without gaps or add-ons.",
    ],
    welcome: "You are warmly welcome to visit us in Stockholm!",
  },
  offers: {
    breadcrumb: "Current campaign",
    title: "Opening offer –",
    titleEm: "celebrate with us!",
    paragraphs: [
      "We are opening the doors to Home Hub in Stockholm and want to celebrate with you.",
      "Throughout November we offer 10% off the entire range — entrance doors, interior doors and flooring.",
      "This is your chance to choose from exclusive products by carefully selected manufacturers — at an extra favourable price.",
      "Do not miss it. The offer is valid in November only.",
    ],
    cta: "Prepare an enquiry",
  },
  projects: {
    breadcrumb: "References",
    title: "Rooms to",
    titleEm: "inspire.",
    lead: "Explore how different doors and floors shape a room. Inspirational settings from our showroom.",
    p1Title: "Light & natural",
    p1Text: "A light door leaf with clear wood grain creates a natural transition between rooms.",
    p2Title: "Dark & quiet",
    p2Text: "Walnut depth gives character to a pared-back room. Matt hardware reinforces the calm expression.",
    p3Title: "Open & flexible",
    p3Text: "Smoked glass divides the space while keeping light and a sense of volume.",
    projectNote: "Inspirational concept from the range.",
    discuss: "Discuss with us",
  },
  services: {
    breadcrumb: "Services",
    title: "From first idea",
    titleEm: "to the last detail.",
    lead: "A clear path through choice, specification and installation. Scope and terms are set per project.",
    s4Title: "Care & follow-up",
    s4Text:
      "Guidance on care and use. Product warranty and service terms are confirmed by the supplier.",
    faqTitle: "Good to know",
    faq1q: "What do I need for a consultation?",
    faq1a: "A floor plan, approximate door count and a few reference images are enough for a first call.",
    faq2q: "Can doors and hardware be chosen together?",
    faq2a: "Yes. We balance function and expression when building the proposal.",
    faq3q: "When will I get price and lead time?",
    faq3a: "Once model, sizes, materials and scope are specified, we prepare a quote and preliminary timeline.",
  },
  showroom: {
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Address",
    hoursLabel: "Opening hours",
    socialLabel: "Social media",
    mapTitle: "Map to the showroom",
    mapDirections: "Open in Google Maps",
    visitTitle: "Visit the showroom",
    visitLead: "140 m² in Stockholm — see, feel and compare the range. We recommend booking ahead.",
  },
  contactPage: {
    breadcrumb: "Contact",
    title: "Tell us about",
    titleEm: "your room.",
    lead: "A new home, a renovation or a single door. Start with a short description of what you want to create.",
    card2Title: "Prepare your visit",
    card2Text:
      "Bring a floor plan, dimensions and interior photos. Book a visit via the form or by phone.",
    formTitle: "Prepare your enquiry",
  },
  partnerships: {
    breadcrumb: "Partnership",
    title: "Your vision.",
    titleEm: "A shared direction.",
    lead:
      "For architects, interior designers and project teams who want to bring materials, function and a clear design idea together.",
    cards: [
      {
        index: "01",
        title: "Architects & interior designers",
        text: "We help bring material choices, door designs and hardware ideas together around your design concept.",
      },
      {
        index: "02",
        title: "Builders & project teams",
        text: "We review door schedules, responsibilities and delivery needs to establish a clear project brief.",
      },
      {
        index: "03",
        title: "Property developers",
        text: "We discuss a coherent door and hardware solution across multiple rooms or homes.",
      },
    ],
    briefTitle: "A shared project brief",
    steps: [
      "Share drawings, scope and the project schedule.",
      "Review materials, technical requirements and project needs.",
      "Collect the selections in a specification for quotation.",
    ],
    cta: "Prepare a partnership enquiry",
  },
  footer: {
    note: "Showroom · Stockholm",
    companyName: "Home Hub Stockholm AB",
    orgNr: "556218-7475",
    vatNote: "VAT registered",
    copyright: "© 2026 Home Hub Stockholm AB",
    navHeading: "Navigation",
    contactHeading: "Showroom & contact",
    legalHeading: "Legal",
    privacy: "Privacy policy",
    terms: "Terms of purchase",
    shipping: "Shipping policy",
    returns: "Returns & refunds",
    cookies: "Cookies",
  },
  legal: {
    privacyTitle: "Privacy policy",
    termsTitle: "Terms of purchase",
    shippingTitle: "Shipping policy",
    returnsTitle: "Return and refund policy",
    cookiesTitle: "Cookies",
    privacyIntro:
      "This privacy policy explains how Home Hub Stockholm AB (\"we\", \"us\") processes personal data when you visit our website, contact us or place an order.",
    privacySections: [
      {
        title: "Data controller",
        paragraphs: [
          "The data controller is Home Hub Stockholm AB, company registration number 556218-7475. Contact details are available on our contact page.",
        ],
      },
      {
        title: "What data we collect",
        paragraphs: [
          "When you contact us or request a quote we may process your name, phone number, email address, delivery address and project details.",
          "When you visit the website, technical data may be collected through cookies and similar technologies — such as IP address, device type and pages visited — see our cookie policy.",
        ],
      },
      {
        title: "Purposes and legal basis",
        paragraphs: [
          "We process personal data to answer enquiries, provide quotes, fulfil contracts, deliver products and provide customer service (contract / legitimate interest).",
          "We use analytics cookies only if you have consented to them.",
          "We may also process data when required by law, for example bookkeeping.",
        ],
      },
      {
        title: "Sharing of data",
        paragraphs: [
          "We do not sell your personal data. Data may be shared with suppliers and partners needed for manufacturing, delivery, IT operations or analytics — only to the extent required for each assignment.",
        ],
      },
      {
        title: "Retention",
        paragraphs: [
          "Data is kept for as long as needed for the purpose, the customer relationship or legal requirements (for example accounting rules).",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "You have the right to request access, rectification, erasure, restriction and in some cases data portability, and to object to processing based on legitimate interest.",
          "You may withdraw consent to analytics cookies at any time. You also have the right to lodge a complaint with the Swedish Authority for Privacy Protection (IMY).",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          "If you have questions about how we process personal data, contact us by email or phone using the details on the contact page.",
        ],
      },
    ],
    termsIntro:
      "These terms of purchase apply when you order products from Home Hub Stockholm AB via the website, showroom or quotation. By placing an order you accept these terms.",
    termsSections: [
      {
        title: "Seller",
        paragraphs: [
          "The seller is Home Hub Stockholm AB, company registration number 556218-7475, VAT registered. Showroom: Fredensvägen 4C, 174 53 Sundbyberg, Sweden. Phone and email are listed on the contact page.",
        ],
      },
      {
        title: "Products and prices",
        paragraphs: [
          "Products such as doors and flooring are manufactured or adapted to measurements, materials and other choices. Prices in the catalogue and on the website are indicative until a written quote or order confirmation has been accepted.",
          "All prices are in SEK. Unless otherwise stated in the quote, consumer prices include VAT. Final price, lead time and specification are stated in the quote or order confirmation.",
        ],
      },
      {
        title: "Order and payment",
        paragraphs: [
          "Orders are placed after a quote. A binding order is formed when you accept the quote/order confirmation and any agreed deposit has been received.",
          "Payment is made by invoice and bank transfer (Swish or card if stated in the quote). Deposit, instalments or final payment are stated in the quote or invoice. In case of late payment we reserve the right to postpone production and delivery.",
        ],
      },
      {
        title: "Delivery and installation",
        paragraphs: [
          "See our shipping policy for freight cost, delivery methods, handling time and delivery area. In short: goods ship from Sweden after manufacturing; cost and timing are stated in the quote.",
          "Any installation and additional work is agreed separately and is included only if expressly stated.",
        ],
      },
      {
        title: "Withdrawal, returns and refunds",
        paragraphs: [
          "See our return and refund policy. In short: the product cannot be returned because it is manufactured entirely to order according to your measurements and choices.",
          "For manufacturing defects or transport damage, complaints are handled under applicable law — contact us promptly.",
        ],
      },
      {
        title: "Complaints",
        paragraphs: [
          "Please check the delivery upon receipt. Visible transport damage should be noted and reported to us without delay. Hidden defects should be reported within a reasonable time after discovery.",
        ],
      },
      {
        title: "Liability",
        paragraphs: [
          "We are liable for defects under applicable consumer sales law where it applies. We are not liable for indirect damages or consequential losses beyond what follows from mandatory law.",
        ],
      },
      {
        title: "Disputes",
        paragraphs: [
          "Disputes should primarily be resolved amicably. Consumers may contact the National Board for Consumer Disputes (ARN). Swedish law applies.",
        ],
      },
    ],
    shippingIntro:
      "This shipping policy describes how Home Hub Stockholm AB delivers products ordered via the website, showroom or quotation.",
    shippingSections: [
      {
        title: "Ship-from location and delivery area",
        paragraphs: [
          "Goods are dispatched from our operations in Sundbyberg / the Stockholm area, Sweden (Fredensvägen 4C, 174 53 Sundbyberg).",
          "We mainly deliver within Sweden. Delivery to other countries may be offered by special agreement in the quote.",
        ],
      },
      {
        title: "Delivery methods",
        paragraphs: [
          "Delivery is made by freight carrier to the stated address, or as showroom collection if agreed.",
          "Large goods (e.g. doors) may require home delivery to the property boundary or loading bay. The exact method is stated in the quote or order confirmation.",
        ],
      },
      {
        title: "Handling time and delivery time",
        paragraphs: [
          "Products are manufactured or adapted to order. Production time is stated in the quote and is usually 4–12 weeks depending on product, materials and capacity.",
          "When the goods are ready we will notify you. Transit time within Sweden is normally 1–5 business days after dispatch. An estimated delivery week is stated in the quote.",
        ],
      },
      {
        title: "Shipping cost",
        paragraphs: [
          "Shipping cost is calculated from weight, volume, delivery address and chosen method. The cost is clearly stated in the quote before you accept the order — either as a separate line or included in the price.",
          "No hidden fees are added after an accepted quote, other than changes requested by the customer to delivery details.",
        ],
      },
      {
        title: "Receipt and damage",
        paragraphs: [
          "Check packaging and goods on receipt. Note visible damage on the consignment note and contact us the same day or within 48 hours at the latest.",
          "We will help you with a claim against the carrier and supplier in case of transport damage.",
        ],
      },
      {
        title: "Installation",
        paragraphs: [
          "Installation is not included in standard delivery unless expressly stated in the quote. Installation price and terms are agreed separately.",
        ],
      },
    ],
    returnsIntro:
      "This policy describes returns, right of withdrawal and refunds for products from Home Hub Stockholm AB.",
    returnsSections: [
      {
        title: "No returns for made-to-order goods",
        paragraphs: [
          "The product cannot be returned because it is manufactured entirely to order according to your measurements, materials and other choices.",
          "There is therefore no general return window for change of mind once production has started or the goods are custom-made.",
        ],
      },
      {
        title: "Right of withdrawal",
        paragraphs: [
          "Goods that are made or substantially customised to the customer's specification are not covered by the statutory right of withdrawal for distance contracts (consumers).",
          "If a non-customised standard product were sold at a distance, a 14-day right of withdrawal may apply by law — this would then be stated specifically in the quote. For our made-to-order doors and flooring, withdrawal normally does not apply.",
        ],
      },
      {
        title: "Cancellation before production",
        paragraphs: [
          "If you cancel before production has started we may refund any deposit paid minus documented costs already incurred (e.g. measuring or material reservation), as agreed in the quote.",
          "Once production has started, the order can normally not be cancelled, returned or exchanged.",
        ],
      },
      {
        title: "Complaints for defects or damage",
        paragraphs: [
          "If the goods have a manufacturing defect in material or finish, or were damaged in transit that we are responsible for, you may complain under the Consumer Sales Act where applicable.",
          "Contact us by phone or email (details on the contact page) as soon as the defect is discovered — visible damage preferably within 48 hours of delivery, hidden defects within a reasonable time.",
          "For an approved complaint we remedy the defect by repair, replacement or price reduction/refund under the law. Return shipping for an approved complaint is paid by us unless mandatory rules say otherwise.",
        ],
      },
      {
        title: "Refunds",
        paragraphs: [
          "When a refund is due (e.g. approved complaint or cancellation before production) we refund to the same payment method used, normally by bank transfer.",
          "Refunds are completed within 14 days after we approve the case and, if needed, receive a return or confirm the defect. You will receive confirmation of the amount and timeline.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          "Questions about returns or refunds: contact Home Hub Stockholm AB by email or phone via the contact page. Company no. 556218-7475, Fredensvägen 4C, 174 53 Sundbyberg.",
        ],
      },
    ],
    cookiesIntro:
      "This cookie policy explains how Home Hub Stockholm AB uses cookies and similar technologies on the website.",
    cookiesSections: [
      {
        title: "What are cookies?",
        paragraphs: [
          "Cookies are small text files stored in your browser. They are used to make the website work, remember choices and — if you consent — understand how the website is used.",
        ],
      },
      {
        title: "Necessary cookies",
        paragraphs: [
          "Necessary cookies are required for basic functions, such as saving your cookie choice and keeping the site secure. These are always used.",
        ],
      },
      {
        title: "Analytics cookies",
        paragraphs: [
          "If you accept analytics cookies we may use Google Analytics to understand traffic and site usage. These cookies are set only after your consent and can be withdrawn at any time via the cookie choice.",
        ],
      },
      {
        title: "How to manage cookies",
        paragraphs: [
          "You can accept all cookies or necessary cookies only via our cookie banner. You can also delete or block cookies in your browser settings. Note that some features may then be affected.",
        ],
      },
      {
        title: "More information",
        paragraphs: [
          "For how we otherwise process personal data, see our privacy policy. Feel free to contact us if you have questions.",
        ],
      },
    ],
  },
  cookieBanner: {
    title: "We use cookies",
    text: "We use necessary cookies to make the site work, and analytics cookies to understand how it is used. You can accept all or necessary cookies only.",
    acceptAll: "Accept all",
    essentialOnly: "Necessary only",
    learnMore: "Learn more about cookies",
  },
};

const dictionaries: Record<"sv" | "en", Dictionary> = { sv, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
