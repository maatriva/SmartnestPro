import { ArrowRight, Sparkles } from "lucide-react";
import WithBaby from "../images/withbaby.jpeg";
import { useEffect, useRef,useState } from "react";
import { motion } from "framer-motion"; // ✅ fixed import
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import ModelCursor from "../animations/ModelCursor";
import PreOrderForm from "../components/pages/preOrder";

export function Hero() {
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, []);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const original = el.innerHTML;

    // Split into characters without external SplitText plugin.
    // We preserve the existing markup (br/span), and replace only text nodes with per-char spans.
    const spans = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        // skip empty/whitespace-only nodes to avoid weird jumps
        return node.nodeValue && node.nodeValue.length
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });

    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((textNode) => {
      const text = textNode.nodeValue ?? "";
      const frag = document.createDocumentFragment();
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") {
          frag.appendChild(document.createTextNode(" "));
          continue;
        }
        const span = document.createElement("span");
        span.textContent = ch;
        span.style.display = "inline-block";
        span.style.willChange = "transform, opacity";
        frag.appendChild(span);
        spans.push(span);
      }
      textNode.parentNode?.replaceChild(frag, textNode);
    });

    const tl = gsap.timeline();
    tl.from(spans, {
      scale: 0,
      y: 30,
      rotation: () => gsap.utils.random(-20, 20),
      stagger: { each: 0.04, from: "random" },
      duration: 0.4,
      ease: "back.out(2)",
      clearProps: "transform",
    });

    return () => {
      tl.kill();
      el.innerHTML = original; // restore original markup
    };
  }, []);

  return (
    <section id="home" className="relative overflow-hidden mt-16 md:mt-24">
      <Parallax y={[-20, 20]}>
        <div
          className="max-w-7xl mx-auto px-6  pb-20 md:pt-12 md:pb-32 
          bg-[var(--bg-secondary)] rounded-[var(--radius-lg)]"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 
                bg-[var(--bg-glass)] backdrop-blur-sm rounded-full border border-[var(--border)]"
              >
                <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-sm text-[var(--text)]">
                  AI-Powered Baby Care
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                ref={headingRef}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text-dark)] leading-tight"
              >
                Sleep Better,
                <br />
                <span className="text-[var(--primary)]">Parent Smarter</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-[var(--text-dark)] leading-relaxed"
              >
                The world's first AI-powered smart cradle that learns your
                baby's needs, automates soothing routines, and gives you peace
                of mind.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* <button
                  onClick={() => setOpen(true)}
                  className="group px-8 py-4 bg-[var(--primary)] text-white rounded-full"
                >
                  Pre-Order Now
                </button> */}

                {open && <PreOrderForm onClose={() => setOpen(false)} />}

                {/* <a
                  href="#demo"
                  className="px-8 py-4 bg-[var(--primary)] text-white
                  rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 
                  flex items-center justify-center"
                >
                  Watch Demo
                </a> */}
                 <button
                  className="px-8 py-4 bg-[var(--primary)] text-white
                  rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 
                  flex items-center justify-center"
                >
                  Coming Soon
                </button>
              </motion.div>
            </div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              className="relative"
            >
              <div
                className="absolute inset-0 
                bg-[var(--primary-light)] opacity-30 rounded-[3rem] blur-3xl"
              ></div>

              <div
                className="relative bg-[var(--bg-glass)] backdrop-blur-sm 
                rounded-[3rem] p-8 m-5 border border-white/60 shadow-2xl 
                hover:scale-105 transition-all duration-300"
              >
                <div className="w-full h-[400px] flex items-center justify-center -z-40">
                  <ModelCursor />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Parallax>
    </section>
  );
}
