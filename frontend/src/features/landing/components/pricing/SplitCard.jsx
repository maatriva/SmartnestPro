import { useRef, useState } from "react";
import { Check } from "lucide-react";
import gsap from "gsap";

export default function SplitCard({ model, onPreOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  const frontRef = useRef(null);
  const backRef = useRef(null);

  const toggleOpen = () => {
    const tl = gsap.timeline();

    if (!isOpen) {
      tl.to(
        frontRef.current,
        {
          y: -10,
          duration: 0.6,
          ease: "power3.out",
        },
        0
      );

      tl.to(
        backRef.current,
        {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        0
      );
    } else {
      tl.to(
        frontRef.current,
        {
          y: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        backRef.current,
        {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto z-10 flex flex-col h-full">
      <div
        ref={frontRef}
        className="relative z-20 flex flex-col flex-1"
      >
        <div className="p-6 flex flex-col flex-1 clay-card h-full">
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
            className="w-full py-3 clay-btn clay-btn-primary mt-auto"
          >
            Pre-Order
          </button>
        </div>
      </div>

      <div
        ref={backRef}
        className="relative z-10 overflow-hidden"
        style={{
          height: 0,
          opacity: 0,
          marginTop: "-20px",
        }}
      >
        <div className="pt-10 pb-6 px-6 flex flex-col clay-card bg-white">
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
    </div>
  );
}