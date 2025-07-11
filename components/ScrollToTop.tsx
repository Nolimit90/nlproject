"use client";
import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Si on recharge la page (F5, ⌘R, etc.)
    let isReload = false;
    if (typeof window !== "undefined") {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries && navEntries.length > 0) {
        // @ts-ignore: type may exist on PerformanceNavigationTiming
        if ((navEntries[0] as any).type === 'reload') {
          isReload = true;
        }
      } else if ((performance as any).navigation && (performance as any).navigation.type === 1) {
        isReload = true;
      }
    }
    if (isReload) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, []);
  return null;
} 