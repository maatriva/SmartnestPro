import { useLayoutEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import gsap from "gsap";

export default function HorizontalSplitCard({
  model,
  onPreOrder,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const frontRef = useRef(null);
  const backRef = useRef(null);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );

  useLayoutEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  const toggleOpen = () => {
    const tl = gsap.timeline();

    if (!isOpen) {
      if (isMobile) {
        tl.to(
          frontRef.current,
          {
            y: -180,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        );

        tl.to(
          backRef.current,
          {
            y: 180,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        );
      } else {
        tl.to(
          frontRef.current,
          {
            x: 192,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        );

        tl.to(
          backRef.current,
          {
            x: -192,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        );
      }
    } else {
      tl.to(
        frontRef.current,
        {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        backRef.current,
        {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        0
      );
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto z-10">

      <div
        ref={backRef}
        className="absolute inset-0 z-0"
      >
        <div className="p-6 flex flex-col clay-card bg-white h-full">
          <h3 className="text-xl font-bold mb-4 text-(--primary)">
            More Info
          </h3>

          <p className="text-(--text-light) mb-4">
            {model.description}
          </p>

          <ul className="space-y-2">
            {model.features.map((feature, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-(--text-dark)"
              >
                <Check className="w-4 h-4 text-(--primary) mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        ref={frontRef}
        className="relative z-10"
      >
        <div className="p-6 flex flex-col clay-card h-full">
          {model.img && (
            <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
              <img
                src={model.img}
                alt={model.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h3 className="text-2xl font-bold mb-2 text-(--text-dark)">
            {model.name}
          </h3>

          <div className="text-3xl font-bold text-(--primary) mb-4">
            ₹{model.price}
          </div>

          <button
            onClick={toggleOpen}
            className="w-full py-2 mb-3 clay-btn clay-btn-secondary"
          >
            {isOpen ? "Close Info" : "Know More"}
          </button>

          <button
            onClick={() => onPreOrder(model)}
            className="w-full py-3 clay-btn clay-btn-primary"
          >
            Pre-Order
          </button>
        </div>
      </div>
    </div>
  );
}