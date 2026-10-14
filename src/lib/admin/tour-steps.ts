export type TourPlacement = "top" | "bottom" | "left" | "right" | "center";

export type AdminTourStep = {
  id: string;
  path?: string;
  target?: string;
  section?: string;
  title: string;
  description: string;
  tips?: string[];
  placement?: TourPlacement;
};

const DASHBOARD = "/admin";

/**
 * Interactive admin walkthrough. Steps with `target` spotlight `[data-tour="…"]`.
 * Starts on first visit or via the Instructions button in the header.
 */
export const ADMIN_TOUR_STEPS: AdminTourStep[] = [
  {
    id: "welcome",
    path: DASHBOARD,
    section: "Start",
    title: "Welcome to HOME HUB Admin",
    description:
      "A short walkthrough of the panel: products, inquiries, media, settings and the public product feed. The tour opens each section for you.",
    tips: [
      "You can skip anytime with “I’ll explore myself”",
      "Restart later: click Instructions in the top bar",
      "Nothing is saved until you click Save on a form",
    ],
    placement: "center",
  },
  {
    id: "sidebar",
    path: DASHBOARD,
    target: "tour-sidebar",
    section: "Navigation",
    title: "Main menu",
    description:
      "Use the left sidebar to move between Dashboard, Products, Categories, Inquiries, Media and Settings.",
    tips: [
      "On desktop you can collapse the sidebar for more space",
      "Products has a submenu: All products / Add product",
    ],
    placement: "right",
  },
  {
    id: "dashboard-stats",
    path: DASHBOARD,
    target: "tour-dashboard-stats",
    section: "Dashboard",
    title: "Overview cards",
    description:
      "Quick counts for products, categories and inquiries. Click a card to jump to that section.",
    tips: [
      "New leads are highlighted when status is “new”",
      "Charts below show inquiry volume over time",
    ],
    placement: "bottom",
  },
  {
    id: "dashboard-actions",
    path: DASHBOARD,
    target: "tour-dashboard-actions",
    section: "Dashboard",
    title: "Shortcuts",
    description:
      "Add a product, open new inquiries, media library, settings, or the public product feed in one click.",
    tips: [
      "Product feed opens Google Merchant XML for SEO / ads",
      "Settings is where inquiry email recipients live",
    ],
    placement: "bottom",
  },
  {
    id: "products",
    path: "/admin/products",
    target: "tour-products-page",
    section: "Products",
    title: "Catalogue management",
    description:
      "Filter by name or status, toggle Published / Featured, edit priority and price. Use View to open the live product page.",
    tips: [
      "Draft products stay off the public site",
      "Add product creates a new model with gallery and bilingual copy",
    ],
    placement: "bottom",
  },
  {
    id: "categories",
    path: "/admin/categories",
    target: "tour-categories-page",
    section: "Categories",
    title: "Category order",
    description:
      "Manage category slugs, Swedish/English names and priority. Lower priority appears first on the site.",
    tips: [
      "You cannot delete a category that still has products",
      "Priority controls home and catalog ordering",
    ],
    placement: "bottom",
  },
  {
    id: "inquiries",
    path: "/admin/inquiries",
    target: "tour-inquiries-page",
    section: "Inquiries",
    title: "Customer leads",
    description:
      "Every form submission lands here (when the admin DB is on). See door/interest, where they clicked, and update status.",
    tips: [
      "Open a row for email / call / WhatsApp shortcuts",
      "Linked product is matched by slug or name when possible",
    ],
    placement: "bottom",
  },
  {
    id: "media",
    path: "/admin/media",
    target: "tour-media-page",
    section: "Media",
    title: "Uploads library",
    description:
      "Upload images used in product galleries. Pick files from the library when editing a product.",
    tips: [
      "Prefer clear product photos on a light background",
      "Uploaded files live under /uploads on the server",
    ],
    placement: "bottom",
  },
  {
    id: "settings",
    path: "/admin/settings",
    target: "tour-settings-page",
    section: "Settings",
    title: "Inquiry emails & status",
    description:
      "Set which addresses receive Resend emails from the contact form. System status shows if Resend and recipients are configured.",
    tips: [
      "Empty list → falls back to INQUIRY_TO_EMAIL in env",
      "Feed links open the public product catalogue for Google / partners",
    ],
    placement: "bottom",
  },
  {
    id: "finish",
    path: DASHBOARD,
    section: "Done",
    title: "You’re ready",
    description:
      "Publish products, answer inquiries, and keep recipient emails up to date. The public site and product feed stay in sync with published items.",
    tips: [
      "Need a refresher? Header → Instructions",
      "View site opens the customer-facing homepage",
    ],
    placement: "center",
  },
];
