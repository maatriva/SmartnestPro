import gsap from "gsap";

export const navbarEntranceAnimation = (navRef) => {
  const ctx = gsap.context(() => {
    if (!navRef.current) return;
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      clearProps: "transform",
    });

    const logo = navRef.current.querySelector(".nav-logo");
    if (logo) {
      tl.from(
        logo,
        {
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.6,
        },
        "-=0.5"
      );
    }

    const items = navRef.current.querySelectorAll(".nav-item");
    if (items && items.length > 0) {
      tl.from(
        items,
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    const cta = navRef.current.querySelector(".nav-cta");
    if (cta) {
      tl.from(
        cta,
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );
    }
  }, navRef);

  return ctx;
};