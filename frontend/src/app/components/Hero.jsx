import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ModelCursor from "../animations/ModelCursor";

export default function Hero() {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const original = el.innerHTML;

    const spans = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);

    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((textNode) => {
      const text = textNode.nodeValue || "";
      const frag = document.createDocumentFragment();

      [...text].forEach((char) => {
        if (char === " ") {
          frag.appendChild(document.createTextNode(" "));
          return;
        }

        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";

        frag.appendChild(span);
        spans.push(span);
      });

      textNode.parentNode.replaceChild(frag, textNode);
    });

    gsap.from(spans, {
      scale: 0,
      y: 50,
      rotation: () => gsap.utils.random(-20, 20),
      stagger: {
        each: 0.03,
        from: "random",
      },
      duration: 0.5,
      ease: "back.out(2)",
    });

    return () => {
      el.innerHTML = original;
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[var(--bg-secondary)]"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
          absolute top-20 left-10
          w-96 h-96
          bg-[var(--primary)]
          opacity-10
          blur-[120px]
          rounded-full
        "
        />

        <div
          className="
          absolute bottom-10 right-10
          w-96 h-96
          bg-[var(--primary)]
          opacity-10
          blur-[120px]
          rounded-full
        "
        />
      </div>

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen">
        <div className="grid lg:grid-cols-2 items-center min-h-screen gap-16">
          {/* LEFT CONTENT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-[var(--primary)]
                mb-8
              "
            >
              <Sparkles size={16} className="text-[var(--primary)]" />

              <span className="text-sm text-[var(--text-dark)]">
                AI Powered Baby Care
              </span>
            </motion.div>

            <h1
              ref={headingRef}
              className="
                text-5xl
                md:text-6xl
                lg:text-7xl
                font-bold
                leading-tight
                text-[var(--text-dark)]
              "
            >
              Sleep Better,
              <br />
              <span className="text-[var(--primary)]">Parent Smarter</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="
                mt-8
                text-lg
                md:text-xl
                leading-relaxed
                max-w-xl
                text-[var(--text-dark)]
              "
            >
              The world's first AI-powered smart cradle that learns your baby's
              needs, automates soothing routines, and provides peace of mind for
              every parent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <button
                className="
                  px-8
                  py-4
                  rounded-full
                  bg-[var(--primary)]
                  text-white
                  font-medium
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                Coming Soon
              </button>

            </motion.div>
          </div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="
              relative
              flex
              items-center
              justify-center
              h-[650px]
            "
          >
            {/* Glow Ring */}
            <div
              className="
                absolute
                w-[500px]
                h-[500px]
                rounded-full
                border
                border-[var(--primary)]
                opacity-20
                animate-pulse
              "
            />

            <div
              className="
                absolute
                w-[650px]
                h-[650px]
                rounded-full
                border
                border-[var(--primary)]
                opacity-10
              "
            />

            {/* 3D Model */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-[450px] h-[450px] flex items-center justify-center"
              >
                <ModelCursor />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
