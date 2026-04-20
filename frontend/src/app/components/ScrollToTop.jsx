import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is no hash (e.g., #features), scroll to top
    if (!hash) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      // If there is a hash, scroll to that element
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}
