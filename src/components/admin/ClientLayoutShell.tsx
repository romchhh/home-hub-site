"use client";

import { useSidebar } from "@/lib/admin/SidebarContext";
import AppSidebar from "@/components/admin/AppSidebar";
import AppHeader from "@/components/admin/AppHeader";
import Backdrop from "@/components/admin/Backdrop";
import { AdminTour } from "@/components/admin/AdminTour";
import {
  ADMIN_TOUR_EVENT,
  completeAdminTour,
  isAdminTourForced,
  shouldShowAdminTour,
} from "@/lib/admin/tour";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [tourActive, setTourActive] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    try {
      localStorage.removeItem("theme");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (isLoginPage || tourActive) return;
    if (!shouldShowAdminTour()) return;
    const force = isAdminTourForced();
    if (!force && pathname !== "/admin") return;
    const timer = window.setTimeout(() => setTourActive(true), force ? 120 : 600);
    return () => window.clearTimeout(timer);
  }, [pathname, tourActive, isLoginPage]);

  useEffect(() => {
    const onStartTour = () => setTourActive(true);
    window.addEventListener(ADMIN_TOUR_EVENT, onStartTour);
    return () => window.removeEventListener(ADMIN_TOUR_EVENT, onStartTour);
  }, []);

  const finishTour = () => {
    completeAdminTour();
    setTourActive(false);
  };

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">{children}</div>
      </div>

      {tourActive ? (
        <AdminTour onComplete={finishTour} onSkip={finishTour} />
      ) : null}
    </div>
  );
}
