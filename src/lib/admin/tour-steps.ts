export type TourPlacement = "top" | "bottom" | "left" | "right" | "center";

export type AdminTourStep = {
  id: string;
  path?: string;
  target?: string;
  section?: string;
  title: string;
  description: string;
  /** Short “what to click / do” line shown as a highlight banner */
  action?: string;
  tips?: string[];
  placement?: TourPlacement;
};

const DASHBOARD = "/admin";

/**
 * Interactive admin walkthrough. Steps with `target` spotlight `[data-tour="…"]`.
 * Starts on first visit or via Instructions in the header.
 */
export const ADMIN_TOUR_STEPS: AdminTourStep[] = [
  {
    id: "welcome",
    path: DASHBOARD,
    section: "Start",
    title: "Welcome to HOME HUB Admin",
    description:
      "This guided tour walks you through every main screen: how to publish doors, answer customer leads, upload photos, and set who receives inquiry emails. Each step opens the right page and highlights what to click.",
    action: "Click Next to begin — or skip if you already know the panel.",
    tips: [
      "Use Back / Next at any time; the tour remembers your place in the flow",
      "Press Escape to exit early — you can restart from Instructions anytime",
      "Nothing is saved until you press Save (or toggle Publish) on a form",
      "All labels in this panel are in English",
    ],
    placement: "center",
  },
  {
    id: "instructions-btn",
    path: DASHBOARD,
    target: "tour-instructions",
    section: "Header",
    title: "Restart this tour anytime",
    description:
      "The Instructions button lives in the top bar on every admin page. Click it whenever you need a refresher — it restarts this walkthrough from the beginning.",
    action: "Remember: Header → Instructions",
    tips: [
      "View site (next to it) opens the public homepage in a new tab",
      "Sign out ends your admin session safely",
    ],
    placement: "bottom",
  },
  {
    id: "header-search",
    path: DASHBOARD,
    target: "tour-header-search",
    section: "Header",
    title: "Quick product search",
    description:
      "Type a product name here to jump straight into editing. Results link to Edit for that door model. Shortcut: ⌘K / Ctrl+K focuses this field.",
    action: "Try searching by product name after the tour.",
    tips: [
      "Search only covers products already in the admin database",
      "On small screens the search sits inside the mobile header menu",
    ],
    placement: "bottom",
  },
  {
    id: "sidebar",
    path: DASHBOARD,
    target: "tour-sidebar",
    section: "Navigation",
    title: "Left menu — your map",
    description:
      "Dashboard · Products · Categories · Inquiries · Media · Settings. Products expands into “All products” and “Add product”. Active page is highlighted.",
    action: "Use this menu to move between sections after the tour.",
    tips: [
      "Click the hamburger (top left) to collapse the sidebar on desktop",
      "On mobile, open the menu first, then pick a section",
      "Home breadcrumb on any page returns you to the Dashboard",
    ],
    placement: "right",
  },
  {
    id: "dashboard-stats",
    path: DASHBOARD,
    target: "tour-dashboard-stats",
    section: "Dashboard",
    title: "At-a-glance numbers",
    description:
      "These cards show how many products, categories, and inquiries you have. “New leads” counts submissions still marked as new. Click any card to open that list.",
    action: "Click a card (e.g. Inquiries) to jump there later.",
    tips: [
      "Charts below track inquiry volume by month",
      "Recent inquiries on the right open the full lead detail",
    ],
    placement: "bottom",
  },
  {
    id: "dashboard-actions",
    path: DASHBOARD,
    target: "tour-dashboard-actions",
    section: "Dashboard",
    title: "Everyday shortcuts",
    description:
      "One-click paths for the work you do most: add a door, review new leads, open the media library, edit settings, or open the public product feed used for SEO and ads.",
    action: "Prefer these buttons when you know the task already.",
    tips: [
      "New inquiries shows a badge when there are unprocessed leads",
      "Product feed → Google Merchant XML (also JSON under Settings)",
      "Settings is where you configure Resend email recipients",
    ],
    placement: "bottom",
  },
  {
    id: "products-list",
    path: "/admin/products",
    target: "tour-products-toolbar",
    section: "Products",
    title: "Find and add products",
    description:
      "Filter the catalogue by name, slug, or category. Status chips narrow to Published, Draft, or Featured. Use Add product to create a new door model.",
    action: "Click Add product when you want a new listing.",
    tips: [
      "Draft = hidden from the public site until you publish",
      "Featured can appear in highlighted home sections",
      "Lower priority number sorts earlier on the site",
    ],
    placement: "bottom",
  },
  {
    id: "products-table",
    path: "/admin/products",
    target: "tour-products-table",
    section: "Products",
    title: "Manage the catalogue table",
    description:
      "Each row is one door. Toggle Published / Featured without opening the form. Edit opens the full editor (photos, bilingual text, price). View opens the live customer page. Delete permanently removes the product.",
    action: "Click Edit on a row to change photos or copy.",
    tips: [
      "Publish only when Swedish and English copy and photos look ready",
      "Price is in SEK and drives “from” labels on the site",
      "View is useful to double-check the public layout after saving",
    ],
    placement: "top",
  },
  {
    id: "product-form",
    path: "/admin/products/add",
    target: "tour-product-form",
    section: "Products",
    title: "Create or edit a door",
    description:
      "Fill slug (URL), names, category, price, gallery images, and Swedish/English descriptions. Upload new photos here or pick from Media. Save creates the product; publish when it should go live.",
    action: "Complete required fields → Save. Then set Published on the list if needed.",
    tips: [
      "Slug should be unique and URL-safe (e.g. alum-wood-painted)",
      "Add several gallery images — customers swipe through them",
      "Bilingual fields keep SV and EN pages in sync",
      "After save you return to editing that product by ID",
    ],
    placement: "bottom",
  },
  {
    id: "categories",
    path: "/admin/categories",
    target: "tour-categories-page",
    section: "Categories",
    title: "Organise categories",
    description:
      "Categories group doors on the home page and in the catalogue filters. Set Swedish and English names, a slug, and priority (lower = first).",
    action: "Add or reorder categories before assigning products.",
    tips: [
      "You cannot delete a category that still has products — reassign first",
      "Priority also affects featured blocks on the homepage",
      "Keep slugs stable; changing them can break old links",
    ],
    placement: "bottom",
  },
  {
    id: "inquiries-list",
    path: "/admin/inquiries",
    target: "tour-inquiries-filters",
    section: "Inquiries",
    title: "Customer leads inbox",
    description:
      "Every contact-form submission appears here when the admin database is enabled. Filter by status (new → in progress → done → archived) or search by name, email, phone, model, or source page.",
    action: "Start with status “new”, then open a row to follow up.",
    tips: [
      "Source shows where they clicked (e.g. product page, contact)",
      "Model / door interest is stored when the form was opened from a product",
      "Dashboard “New inquiries” jumps here with the new filter applied",
    ],
    placement: "bottom",
  },
  {
    id: "inquiries-table",
    path: "/admin/inquiries",
    target: "tour-inquiries-table",
    section: "Inquiries",
    title: "Update status & open details",
    description:
      "Change status from the table as you progress. Click a lead’s name (or open detail) for email, phone, WhatsApp shortcuts, full message, and a link to the matched product when we can resolve it.",
    action: "Open a lead → contact the customer → mark done when finished.",
    tips: [
      "in_progress = you are handling it; done = closed successfully",
      "archived hides old leads without deleting history",
      "Email notifications also go to Settings recipients via Resend",
    ],
    placement: "top",
  },
  {
    id: "media",
    path: "/admin/media",
    target: "tour-media-page",
    section: "Media",
    title: "Photo library",
    description:
      "Upload images once, reuse them across products. Drag and drop or pick files. Copied URLs point to /uploads/… on the server.",
    action: "Upload clear product photos here, then attach them in the product form.",
    tips: [
      "Prefer well-lit shots on a light background",
      "Large files are resized on upload when possible",
      "Deleting a file here does not auto-remove it from product galleries — update those products too",
    ],
    placement: "bottom",
  },
  {
    id: "settings-emails",
    path: "/admin/settings",
    target: "tour-settings-emails",
    section: "Settings",
    title: "Who gets inquiry emails",
    description:
      "List every address that should receive Resend notifications when someone submits the contact form. Separate with commas or new lines. Click Save settings to apply.",
    action: "Add your team emails → Save settings.",
    tips: [
      "If this field is empty, the server uses INQUIRY_TO_EMAIL from the environment",
      "Resend must be configured (API key + EMAIL_FROM) for mail to send",
      "Check System status on the right for green/red configuration signals",
    ],
    placement: "bottom",
  },
  {
    id: "settings-status",
    path: "/admin/settings",
    target: "tour-settings-status",
    section: "Settings",
    title: "System status & product feeds",
    description:
      "Confirms whether the admin DB, Resend, and sender address are ready. Feed links open the public XML/JSON catalogues for Google Merchant and partners — only published products are included.",
    action: "Open the XML feed once to verify products look correct.",
    tips: [
      "Admin DB off → panel and inquiry storage stay limited (typical on some hosts)",
      "Feed JSON is handy for custom integrations",
      "Site URL should match your live domain for correct absolute links",
    ],
    placement: "left",
  },
  {
    id: "finish",
    path: DASHBOARD,
    section: "Done",
    title: "You’re ready to work",
    description:
      "Typical daily flow: publish or update products → answer new inquiries → keep recipient emails current. The public site and product feeds stay in sync with published items only.",
    action: "Header → Instructions restarts this tour whenever you need it.",
    tips: [
      "View site — check the customer experience after big edits",
      "Draft first, publish when copy and photos are ready",
      "Process “new” leads the same day when possible",
    ],
    placement: "center",
  },
];
