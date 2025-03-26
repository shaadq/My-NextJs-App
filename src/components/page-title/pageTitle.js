"use client";
import { pageTitleList } from "@/enum-list/enumList";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PageTitle() {
  const pathname = usePathname();
  let pageKey = pathname.replace("/", "") || "dashboard"; // Default to "dashboard"
  let title = pageTitleList.titles[pageKey] || "Next App";

  // ✅ Handle subpages inside "settings/*"
  if (pathname.startsWith("/settings/")) {
    const subKey = pathname.split("/")[2]; // Extract subpage key (e.g., "user-management")
    title = pageTitleList.subtitles[subKey] || "Settings - Next App";
  }

  useEffect(() => {
    document.title = title; // Dynamically update the page title
  }, [title]);

  return null; // No UI, just updates the title
}
