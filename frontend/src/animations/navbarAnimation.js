import gsap from "gsap";

export const navbarEntranceAnimation = (navRef) => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(".demo-navbar", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    tl.from(
      ".nav-logo",
      {
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.6,
      },
      "-=0.5"
    );

    tl.from(
      ".nav-item",
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    );

    tl.from(
      ".nav-cta",
      {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );
  }, navRef);

  return ctx;
};