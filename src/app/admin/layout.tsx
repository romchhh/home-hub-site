import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/lib/admin/SidebarContext";
import ClientLayoutShell from "@/components/admin/ClientLayoutShell";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-admin-sans",
});

export const metadata: Metadata = {
  title: {
    default: "HOME HUB Admin",
    template: "%s | HOME HUB Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${dmSans.variable} ${dmSans.className} admin-root min-h-screen antialiased`}
    >
      <SidebarProvider>
        <ClientLayoutShell>{children}</ClientLayoutShell>
      </SidebarProvider>
    </div>
  );
}
