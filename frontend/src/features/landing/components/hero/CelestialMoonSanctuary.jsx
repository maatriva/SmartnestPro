import React, { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Sparkles, Moon, Heart } from "lucide-react";

const ModelCursor = lazy(() => import("../../../../animations/ModelCursor"));

export default function CelestialMoonSanctuary() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [hasWebGL, setHasWebGL] = useState(true);
  const [shouldLoad3D, setShouldLoad3D] = useState(true);
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
  }, []);

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

      {/* 🌟 SMART CRADLE HERO VISUAL (ONLY THE LIVE 3D MODEL IS SHOWN) 🌟 */}
      <div className="relative z-15 w-full h-full flex items-center justify-center">
        {hasWebGL && !shouldReduceMotion && (
          <div className="w-full h-full flex items-center justify-center">
            <Suspense fallback={null}>
              <ModelCursor
                targetSize={3.6}
                modelColor="#F7F2EB" // Warm Pearl Bisque Ivory body
                frameColor="#D9825F" // Terracotta Rose clay frame
                mattressColor="#F7EFE6" // Warm Organic Cotton Bisque (Harmonious Ivory)
                rodColor="#ECC880" // Champagne Honey Gold supporting rods
                metalColor="#ECC880" // Honey gold accents & pins
                tuskColor="#FFFBF5" // Soft Ivory White tusks
                eyeColor="#2C1E21" // Deep Cocoa Onyx button eyes
                detailColor="#20161C" // Cocoa OLED display
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
              <span className="w-2 h-2 rounded-full bg-(--primary) animate-ping" />
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
