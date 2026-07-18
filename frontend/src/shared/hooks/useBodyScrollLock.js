import { useEffect } from "react";

export default function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    if (typeof window !== "undefined") {
      window.__scrollLockCount = (window.__scrollLockCount || 0) + 1;
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (typeof window !== "undefined") {
        window.__scrollLockCount = Math.max(0, (window.__scrollLockCount || 1) - 1);
        if (window.__scrollLockCount === 0) {
          document.body.style.overflow = "";
        }
      }
    };
  }, [isLocked]);
}