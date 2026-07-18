import { useEffect } from "react";

let lockCount = 0;

export default function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    lockCount++;
    document.body.style.overflow = "hidden";

    return () => {
      lockCount--;
      if (lockCount <= 0) {
        document.body.style.overflow = "";
        lockCount = 0;
      }
    };
  }, [isLocked]);
}