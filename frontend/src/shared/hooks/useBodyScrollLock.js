import { useEffect } from "react";

export default function useBodyScrollLock(isLocked) {
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLocked]);
}