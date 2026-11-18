import React, { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Sparkles, Moon, Heart } from "lucide-react";

const ModelCursor = lazy(() => import("../../../../animations/ModelCursor"));

export default function CelestialMoonSanctuary() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [hasWebGL, setHasWebGL] = useState(true);
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [is3DReady, setIs3DReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    if (shouldReduceMotion) return;

    // Lazy-load Three.js and 3D model after first paint on all devices (desktop + modern phones)
    const trigger3D = () => setShouldLoad3D(true);

    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(trigger3D, { timeout: 800 });
      return () => window.cancelIdleCallback && window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(trigger3D, 300);
      return () => clearTimeout(timer);
    }
  }, [shouldReduceMotion]);

  // Smooth mouse coordinates for ambient parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax layers at different depths (Only transform)
  const cloudFrontX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const cloudFrontY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  const cloudBackX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const cloudBackY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  const planetX = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const planetY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-full h-[460px] sm:h-[540px] lg:h-[640px] select-none"
    >
      {/* Background Celestial Aura Glow (Honey Gold & Rose Clay) */}
      <div className="absolute w-[340px] sm:w-[440px] lg:w-[540px] h-[340px] sm:h-[440px] lg:h-[540px] rounded-full bg-gradient-to-tr from-[#F0C675]/25 via-[#F2B8A8]/20 to-transparent blur-3xl pointer-events-none" />

      {/* Orbit Rings (Dotted constellation orbits) */}
      <div className="absolute w-[360px] sm:w-[480px] lg:w-[580px] h-[360px] sm:h-[480px] lg:h-[580px] rounded-full border border-dashed border-[#F2B8A8]/30 pointer-events-none animate-[spin_120s_linear_infinite]" />
      <div className="absolute w-[280px] sm:w-[380px] lg:w-[460px] h-[280px] sm:h-[380px] lg:h-[460px] rounded-full border border-dotted border-[#F0C675]/25 pointer-events-none animate-[spin_80s_linear_infinite_reverse]" />

      {/* Background Glowing Clay Moon */}
      <div className="absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full clay-moon pointer-events-none z-0 opacity-80" />

      {/* Floating Background Cloud Pill */}
      <motion.div
        style={{ x: cloudBackX, y: cloudBackY }}
        className="absolute top-4 left-2 sm:left-6 z-10 pointer-events-none"
      >
        <div className="clay-cloud px-5 py-2.5 sm:px-6 sm:py-3 flex items-center gap-2 text-[#3A2B2B]/90 shadow-sm">
          <Sparkles size={16} className="text-[#F0C675] animate-pulse" />
          <span className="text-xs sm:text-sm font-bold">Gentle Sleep Cycles</span>
        </div>
      </motion.div>

      {/* Floating Sage Clay Planet */}
      <motion.div
        style={{ x: planetX, y: planetY }}
        className="absolute top-8 right-4 sm:right-10 z-10 pointer-events-none"
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#B9C7AC] to-[#8E9F7F] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),inset_-3px_-3px_6px_rgba(40,55,30,0.3),0_8px_16px_rgba(58,43,43,0.12)] flex items-center justify-center">
          <div className="w-18 sm:w-22 h-3.5 border border-[#FFF6EE]/40 rounded-full -rotate-12" />
        </div>
      </motion.div>

      {/* Floating Terracotta Mini Heart Orb */}
      <div className="absolute bottom-12 left-4 sm:left-10 z-20 pointer-events-none">
        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#E28D6A] to-[#C26F4C] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.6),inset_-2px_-2px_5px_rgba(80,30,10,0.35),0_6px_14px_rgba(217,130,95,0.3)] flex items-center justify-center text-white">
          <Heart size={16} className="fill-white/90" />
        </div>
      </div>

      {/* 🌟 SMART CRADLE HERO VISUAL (Instant LCP Poster + Smooth 3D Crossfade) 🌟 */}
      <div className="relative z-15 w-full h-full flex items-center justify-center">
        {/* Instant Lightweight WebP Poster (<30KB) - Preloaded for instant FCP/LCP */}
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            is3DReady ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <img
            src="/cradle-poster.webp"
            alt="Maatriva Smart Cradle with AI contactless vitals and sleep monitoring in Celestial Clay"
            width="491"
            height="462"
            fetchPriority="high"
            decoding="async"
            className="max-w-[78%] sm:max-w-[85%] max-h-[78%] sm:max-h-[85%] object-contain select-none pointer-events-none drop-shadow-[0_24px_36px_rgba(58,43,43,0.18)]"
          />
        </motion.div>

        {/* Live Interactive 3D Model in Celestial Clay */}
        {shouldLoad3D && hasWebGL && !shouldReduceMotion && (
          <div
            className={`w-full h-full flex items-center justify-center transition-opacity duration-700 ${
              is3DReady ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Suspense fallback={null}>
              <ModelCursor
                targetSize={3.6}
                modelColor="#D9825F" // Terracotta clay body
                frameColor="#F2B8A8" // Rose clay frame
                mattressColor="#A8B89A" // Sage calming mattress
                rodColor="#F2B8A8"
                metalColor="#F0C675" // Honey gold accents
                tuskColor="#F0C675"
                eyeColor="#3A2B2B"
                detailColor="#3A2B2B"
                onLoaded={() => setIs3DReady(true)}
              />
            </Suspense>
          </div>
        )}
      </div>

      {/* Foreground Clay Status Cloud */}
      <motion.div
        style={{ x: cloudFrontX, y: cloudFrontY }}
        className="absolute bottom-4 sm:bottom-6 right-2 sm:right-6 z-25 pointer-events-none"
      >
        <div className="clay-card p-3.5 sm:p-4 flex items-center gap-3 max-w-[260px] sm:max-w-xs shadow-lg">
          <div className="w-9 h-9 rounded-2xl bg-[#D9825F] flex items-center justify-center text-white shrink-0 shadow-[inset_2px_2px_3px_rgba(255,255,255,0.4)]">
            <Moon size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-[#D9825F]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Peaceful Sleep</span>
            </div>
            <p className="text-xs text-[#3A2B2B]/85 font-semibold mt-0.5 leading-snug">
              Breathing steady & lullaby playing
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
