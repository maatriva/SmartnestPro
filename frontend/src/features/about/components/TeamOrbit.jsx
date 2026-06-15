import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useTransform, useSpring, useMotionValue, animate } from "motion/react";
import { Linkedin, X, Award, Terminal, CheckCircle2 } from "lucide-react";
import { team } from "../constants/aboutData";
import useBodyScrollLock from "../../../shared/hooks/useBodyScrollLock";

// Helper hook to track window size for responsiveness
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// Mini 3D Hover Tilt Wrapper for Cards and Photos
const TiltWrapper = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    // Map mouse position to degree values (max 12 degrees tilt)
    const rY = (mouseX / (width / 2)) * 12;
    const rX = -(mouseY / (height / 2)) * 12;
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    animate(rotateX, 0, { duration: 0.5 });
    animate(rotateY, 0, { duration: 0.5 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Framer Motion Animation Variants for the slide-up panel & its text components
// Using variant propagation and orchestration avoids concurrent reflow layout calculations,
// resulting in a buttery-smooth 60+ FPS animation.
const panelVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 170,
      delayChildren: 0.35,
      staggerChildren: 0.05
    }
  },
  exit: {
    y: "100%",
    transition: {
      type: "spring",
      damping: 32,
      stiffness: 190
    }
  }
};

const childFadeUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  }
};

const childFadeLeftVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function TeamOrbit() {
  const size = useWindowSize();
  const isMobile = size.width < 768;
  const sectionRef = useRef(null);
  const N = team.length;

  // Permanently Enlarged Orbit Dimensions (Centered Layout)
  const radiusX = size.width >= 1280 ? 465 : size.width >= 1024 ? 385 : size.width >= 768 ? 295 : 145;
  const radiusZ = size.width >= 1280 ? 285 : size.width >= 1024 ? 225 : size.width >= 768 ? 165 : 85;
  const tiltFactor = 0.28; // Tilted Y offset based on Z depth
  const radiusY = radiusZ * tiltFactor;

  // Interactive Angle
  const interactiveAngle = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const isAnimatingToCard = useRef(false);

  // Combined smooth rotation
  const smoothAngle = useSpring(interactiveAngle, { stiffness: 40, damping: 22 });

  // Hover, Drag and Panel state
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const [isDraggingState, setIsDraggingState] = useState(false);
  const isDragging = useRef(false);
  const dragOccurred = useRef(false);
  const startX = useRef(0);
  const startAngle = useRef(0);
  const spinControls = useRef(null);

  const isExploreMode = isSectionHovered || isPanelOpen;

  // Lock body scroll when profile details panel is open
  useBodyScrollLock(isPanelOpen);

  // Orbit scale factor (permanently 1.0)
  const orbitScale = useMotionValue(1);
  useEffect(() => {
    animate(orbitScale, 1.0, {
      type: "spring",
      stiffness: 70,
      damping: 18,
    });
  }, [orbitScale]);

  // Sync drag gesture handlers using window listeners for robust, lag-free tracking
  const handlePointerDown = (e) => {
    if (spinControls.current) {
      spinControls.current.stop();
      spinControls.current = null;
    }
    isDragging.current = true;
    dragOccurred.current = false;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startAngle.current = interactiveAngle.get();
    setIsDraggingState(true);
  };

  useEffect(() => {
    if (!isDraggingState) return;

    const handleWindowPointerMove = (e) => {
      if (!isDragging.current) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - startX.current;
      
      if (Math.abs(deltaX) > 4) {
        dragOccurred.current = true;
      }
      
      const sensitivity = 0.55; // drag responsiveness factor
      interactiveAngle.set(startAngle.current + deltaX * sensitivity);
    };

    const handleWindowPointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        setTimeout(() => {
          setIsDraggingState(false);
        }, 50);
      }
    };

    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });
    window.addEventListener("pointerup", handleWindowPointerUp);
    window.addEventListener("pointercancel", handleWindowPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
      window.removeEventListener("pointercancel", handleWindowPointerUp);
    };
  }, [isDraggingState]);

  // Track closest card to the front center to update spotlight content
  useEffect(() => {
    const unsub = smoothAngle.on("change", (latestAngle) => {
      if (isAnimatingToCard.current) return;
      
      let minDistance = Infinity;
      let closestIdx = 0;
      team.forEach((_, idx) => {
        const phi_i = idx * (360 / N);
        const totalCardAngle = latestAngle + phi_i;
        const normalized = ((totalCardAngle + 180) % 360 + 360) % 360 - 180;
        const dist = Math.abs(normalized);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });
      
      if (closestIdx !== activeIndexRef.current) {
        activeIndexRef.current = closestIdx;
        setActiveIndex(closestIdx);
      }
    });
    return () => unsub();
  }, [smoothAngle, N]);

  // Handle continuous rotation in explore mode
  useEffect(() => {
    let controls;
    if (isSectionHovered && !isPanelOpen && !isDraggingState) {
      const current = interactiveAngle.get();
      controls = animate(interactiveAngle, current - 3600, {
        duration: 360, // 360 seconds for 3600 degrees (36s per 360 deg, slower & smoother)
        ease: "linear",
        repeat: Infinity,
      });
      spinControls.current = controls;
    }
    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [isSectionHovered, isPanelOpen, isDraggingState]);

  // Snap closest card on hover exit
  useEffect(() => {
    if (!isSectionHovered && !isPanelOpen) {
      handleCardClick(activeIndex, team[activeIndex]);
    }
  }, [isSectionHovered]);

  // Interactive Click centering / Sheet trigger
  const handleCardClick = (idx, member) => {
    // If a drag just occurred, ignore the click to avoid misfires
    if (dragOccurred.current) return;

    isAnimatingToCard.current = true;
    activeIndexRef.current = idx;
    setActiveIndex(idx);

    const phi_i = idx * (360 / N);
    const targetInteractive = -phi_i;
    
    // Find shortest path to rotate
    const currentInteractive = interactiveAngle.get();
    const diff = targetInteractive - currentInteractive;
    const normalizedDiff = ((diff + 180) % 360 + 360) % 360 - 180;
    
    animate(interactiveAngle, currentInteractive + normalizedDiff, {
      type: "spring",
      stiffness: 60,
      damping: 18,
      onComplete: () => {
        isAnimatingToCard.current = false;
      }
    });

    // Open bottom sheet in explore mode (or always on mobile)
    if (isMobile || isSectionHovered) {
      setSelectedEmployee(member);
      setIsPanelOpen(true);
    }
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    if (!isSectionHovered) {
      handleCardClick(activeIndex, team[activeIndex]);
    }
  };

  return (
    <div
      ref={sectionRef}
      onMouseEnter={() => {
        if (!isMobile) setIsSectionHovered(true);
      }}
      onMouseLeave={() => {
        if (!isMobile) setIsSectionHovered(false);
      }}
      className="relative w-full overflow-hidden py-16 px-6 md:px-12 lg:px-20 select-none"
    >
      {/* 🌌 Premium Aesthetic Backdrop: Gradient Blobs & Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Blob 1 */}
        <motion.div
          animate={{
            y: [0, -35, 0],
            x: [0, 20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-300/25 to-teal-400/25 blur-3xl pointer-events-none"
        />
        {/* Blob 2 */}
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -25, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-300/20 to-purple-400/20 blur-3xl pointer-events-none"
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.4 + 0.1,
              scale: Math.random() * 0.8 + 0.4,
            }}
            animate={{
              y: ["0%", "-10%", "0%"],
              x: ["0%", "5%", "0%"],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
            style={{ willChange: "transform" }}
            className="absolute w-3 h-3 rounded-full bg-teal-200/50 shadow-[0_0_6px_rgba(184,227,226,0.4)] pointer-events-none"
          />
        ))}
      </div>

      {/* Main Section Content Wrapper */}
      <div className="relative mx-auto max-w-7xl z-10 flex flex-col items-center">
        
        {/* 🧭 Rating-style Profile Avatar Navigation Bar */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-5 mb-12 relative z-25">
          {team.map((member, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={`nav-${member.name}`}
                onClick={() => {
                  handleCardClick(i, member);
                }}
                className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
              >
                {/* Profile Avatar Circle */}
                <div
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-0.5 clay-badge overflow-visible transition-all duration-300 transform ${
                    isActive
                      ? "scale-110 border-teal-300 ring-2 ring-teal-300/80 shadow-[0_0_12px_rgba(184,227,226,0.7)]"
                      : "hover:scale-105 border-white/60 hover:border-teal-200/40"
                  }`}
                >
                  {isActive && (
                    <div className="absolute -inset-1 rounded-full ring-2 ring-teal-300/80 animate-ping opacity-45 pointer-events-none" />
                  )}
                  
                  <img
                    src={member.image}
                    alt={member.name}
                    draggable="false"
                    className={`w-full h-full rounded-full object-cover select-none ${member.objectPosition || "object-center"}`}
                  />
                </div>
                
                {/* Display name */}
                <span
                  className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-(--primary)" : "text-gray-400 group-hover:text-(--text-dark)"
                  }`}
                >
                  {member.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center Stage Layout */}
        <div className="flex flex-col items-center justify-center min-h-[460px] sm:min-h-[580px] w-full relative">
          
          {/* Centered 3D Orbit Stage (with Pointer Event Drag-to-spin) */}
          <motion.div
            onPointerDown={handlePointerDown}
            animate={{
              scale: isExploreMode ? 1.05 : 1.0,
            }}
            transition={{ type: "spring", stiffness: 60, damping: 16 }}
            className="flex flex-col items-center justify-center relative w-full overflow-visible z-20 touch-none cursor-grab active:cursor-grabbing"
          >
            {/* Orbit Stage Area */}
            <div className="relative w-full h-[320px] sm:h-[480px] flex items-center justify-center overflow-visible">
              {/* Ellipse SVG Orbit path and beam lines */}
              <svg style={{ willChange: "transform" }} className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <defs>
                  <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="var(--bg-secondary)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.15" />
                  </linearGradient>
                  <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Orbit Path Ellipse */}
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx={radiusX}
                  ry={radiusY}
                  fill="none"
                  stroke="url(#orbit-grad)"
                  strokeWidth="3.5"
                  filter="url(#glow-filter)"
                  className="opacity-80"
                />

                {/* Core MedTech Hub Center Point */}
                <circle cx="50%" cy="50%" r="22" fill="var(--bg-secondary)" className="opacity-15 animate-ping" />
                <circle cx="50%" cy="50%" r="14" fill="var(--bg-secondary)" className="opacity-30" />
                <circle cx="50%" cy="50%" r="7" fill="var(--primary)" />

                {/* Pulse lines connecting central Hub to active cards (optimized motion line) */}
                {team.map((member, i) => {
                  const phi_i = i * (360 / N);
                  return (
                    <OrbitBeamLine
                      key={member.name}
                      phi_i={phi_i}
                      smoothAngle={smoothAngle}
                      orbitScale={orbitScale}
                      radiusX={radiusX}
                      radiusY={radiusY}
                      isActive={activeIndex === i}
                    />
                  );
                })}
              </svg>

              {/* Orbiting Cards */}
              {team.map((member, i) => {
                const phi_i = i * (360 / N);
                const isActive = activeIndex === i;

                return (
                  <OrbitCard
                    key={member.name}
                    member={member}
                    index={i}
                    phi_i={phi_i}
                    smoothAngle={smoothAngle}
                    orbitScale={orbitScale}
                    radiusX={radiusX}
                    radiusY={radiusY}
                    radiusZ={radiusZ}
                    size={size}
                    isActive={isActive}
                    isExploreMode={isExploreMode}
                    onClick={() => handleCardClick(i, member)}
                  />
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>

      {/* 🌟 PREMIUM BOTTOM SHEET PROFILE PANEL */}
      <AnimatePresence>
        {isPanelOpen && selectedEmployee && (
          <>
            {/* Dark glassmorphic overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-45 cursor-pointer"
            />

            {/* Slide-up Profile Panel */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ willChange: "transform" }}
              className="fixed top-[101px] bottom-0 left-0 right-0 w-full bg-white/85 dark:bg-zinc-950/90 backdrop-blur-xl rounded-t-[32px] sm:rounded-t-[48px] border-t border-white/20 dark:border-zinc-800/40 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] z-50 overflow-hidden flex flex-col"
            >
              {/* Top drag handle indicator */}
              <div className="w-full flex justify-center py-4 cursor-pointer" onClick={closePanel}>
                <div className="w-16 h-1.5 rounded-full bg-teal-900/10 dark:bg-white/10" />
              </div>
              
              {/* Close button */}
              <button
                onClick={closePanel}
                className="absolute top-4 right-4 sm:top-6 sm:right-8 flex h-10 w-10 items-center justify-center rounded-full clay-badge text-teal-900/60 hover:text-red-500 hover:border-red-200/40 bg-white/50 dark:bg-zinc-900/50 backdrop-blur active:scale-95 transition-all cursor-pointer z-55 border border-white/40"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              {/* Scrollable Panel Contents */}
              <div className="flex-1 overflow-y-auto px-6 pb-20 sm:px-12 lg:px-24 no-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-6">
                  
                  {/* Left Column: Photo & Socials */}
                  <div className="lg:col-span-4 flex flex-col items-center">
                    <TiltWrapper className="w-60 h-60 sm:w-72 sm:h-72 rounded-[32px] overflow-hidden p-1 bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-xl relative group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-indigo-500/10 pointer-events-none z-10" />
                      <img
                        src={selectedEmployee.image}
                        alt={selectedEmployee.name}
                        draggable="false"
                        className={`w-full h-full rounded-[28px] object-cover select-none pointer-events-none ${selectedEmployee.objectPosition || "object-center"}`}
                      />
                    </TiltWrapper>

                    {/* Social links (LinkedIn Only) */}
                    <div className="flex items-center gap-4 mt-8">
                      {selectedEmployee.linkedin && (
                        <motion.a
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          href={selectedEmployee.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-12 w-12 items-center justify-center rounded-full clay-badge bg-white/60 dark:bg-zinc-900/60 text-blue-600 dark:text-blue-400 shadow-md cursor-pointer border border-white/40"
                        >
                          <Linkedin size={20} strokeWidth={2.5} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Information details */}
                  <div className="lg:col-span-8 flex flex-col text-left">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1.5 rounded-full clay-badge text-[10px] font-black uppercase tracking-[0.2em] bg-teal-100/50 text-teal-800 border border-white/40">
                        {selectedEmployee.isFounder ? "Founder" : "Co-Founder"}
                      </span>
                    </div>

                    {/* Name: Smooth 60 FPS Container Reveal */}
                    <motion.h2
                      variants={childFadeUpVariants}
                      className="text-3xl sm:text-5xl font-black text-teal-950 dark:text-white leading-tight tracking-tight mb-2"
                    >
                      {selectedEmployee.name}
                    </motion.h2>

                    {/* Designation/Role: Smooth 60 FPS Container Reveal */}
                    <motion.h3
                      variants={childFadeUpVariants}
                      className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400 mb-6"
                    >
                      {selectedEmployee.role}
                    </motion.h3>

                    {/* Biography: Highly Optimized Paragraph-Level Spring Reveal with whitespace support */}
                    <motion.p
                      variants={childFadeUpVariants}
                      className="text-sm sm:text-base font-semibold leading-relaxed text-teal-900/80 dark:text-zinc-300 tracking-wide mb-8 border-l-2 border-teal-200 dark:border-teal-400/30 pl-4 whitespace-pre-line"
                    >
                      {selectedEmployee.copy}
                    </motion.p>

                    {/* Achievements & Contributions grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 border-t border-teal-100 dark:border-zinc-800/40 pt-8">
                      {/* Achievements */}
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-teal-950 dark:text-white mb-4 flex items-center gap-2">
                          <Award size={14} className="text-teal-500" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-3">
                          {selectedEmployee.achievements?.map((achievement, idx) => (
                            <motion.li
                              key={idx}
                              variants={childFadeLeftVariants}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-teal-900/75 dark:text-zinc-400 font-semibold"
                            >
                              <CheckCircle2 size={16} className="text-teal-500 shrink-0 mt-0.5" />
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Contributions */}
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-teal-950 dark:text-white mb-4 flex items-center gap-2">
                          <Terminal size={14} className="text-teal-500" />
                          Product Contributions
                        </h4>
                        <ul className="space-y-3">
                          {selectedEmployee.contributions?.map((contribution, idx) => (
                            <motion.li
                              key={idx}
                              variants={childFadeLeftVariants}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-teal-900/75 dark:text-zinc-400 font-semibold"
                            >
                              <CheckCircle2 size={16} className="text-teal-500 shrink-0 mt-0.5" />
                              <span>{contribution}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component: A single card on the 3D Orbit path (Desktop & Mobile)
function OrbitCard({
  member,
  index,
  phi_i,
  smoothAngle,
  orbitScale,
  radiusX,
  radiusY,
  radiusZ,
  size,
  isActive,
  isExploreMode,
  onClick,
}) {
  const x = useTransform([smoothAngle, orbitScale], ([angleVal, scaleVal]) => (radiusX * scaleVal) * Math.sin(((angleVal + phi_i) * Math.PI) / 180));
  const z = useTransform([smoothAngle, orbitScale], ([angleVal, scaleVal]) => (radiusZ * scaleVal) * Math.cos(((angleVal + phi_i) * Math.PI) / 180));
  const y = useTransform(z, (zVal) => zVal * 0.28);
  
  // Calculate relative scale and opacity dynamically
  const scale = useTransform([z, orbitScale], ([zVal, scaleVal]) => {
    const currentMaxZ = radiusZ * scaleVal;
    if (currentMaxZ === 0) return 0.75;
    const t = (zVal + currentMaxZ) / (2 * currentMaxZ);
    // On mobile screens, scale the orbit items down slightly so they don't overlap
    const baseScale = size.width < 768 ? 0.62 : 0.75;
    const maxScale = size.width < 768 ? 0.88 : 1.05;
    return baseScale + t * (maxScale - baseScale);
  });

  const opacity = useTransform([z, orbitScale], ([zVal, scaleVal]) => {
    const currentMaxZ = radiusZ * scaleVal;
    if (currentMaxZ === 0) return 0.55;
    const t = (zVal + currentMaxZ) / (2 * currentMaxZ);
    return 0.55 + t * 0.45; // range [0.55, 1.0]
  });
  
  // High-performance direct motion value style mapping for zIndex (no React state updates!)
  const zIndex = useTransform([z, orbitScale], ([zVal, scaleVal]) => {
    const currentMaxZ = radiusZ * scaleVal;
    if (currentMaxZ === 0) return 10;
    return Math.round(((zVal + currentMaxZ) / (2 * currentMaxZ)) * 90) + 10;
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: useTransform(x, (v) => v - 64), // offset card center
        y: useTransform(y, (v) => v - 64),
        scale,
        opacity,
        zIndex,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
      className="w-32 h-32 select-none"
    >
      <motion.div
        animate={{
          y: isExploreMode ? [0, -6, 0] : 0,
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 3 + (index % 3) * 0.5,
            ease: "easeInOut",
            delay: index * 0.35,
          }
        }}
        whileHover={{
          scale: 1.08,
          y: -10,
        }}
        className="w-full h-full relative"
      >
        <div
          onClick={onClick}
          className={`w-full h-full clay-card flex flex-col items-center justify-center p-3 text-center cursor-pointer relative border-2 transition-all duration-300 ${
            isActive 
              ? "border-teal-300 bg-teal-100/30 ring-2 ring-teal-300/50 shadow-[0_0_15px_rgba(184,227,226,0.6)]" 
              : "border-white/80 hover:border-teal-200/50"
          }`}
        >
          {/* Profile Avatar Frame */}
          <div className="w-16 h-16 rounded-full clay-badge p-0.5 overflow-hidden mb-2 relative border border-white/60">
            <img
              src={member.image}
              alt={member.name}
              draggable="false"
              className={`w-full h-full rounded-full object-cover select-none pointer-events-none ${member.objectPosition || "object-center"}`}
            />
          </div>

          {/* Core Member Label */}
          <span className="block text-[10px] font-black leading-tight text-(--text-dark) truncate max-w-full">
            {member.name.split(" ")[0]}
          </span>
          
          {/* Role Label */}
          <span className="block text-[8px] font-bold text-(--primary) tracking-wide truncate max-w-full mt-1">
            {member.role.split(" ")[0]}
          </span>

          {/* Blue Pill "Click to know" Badge */}
          <span className="block text-[8px] font-black uppercase tracking-wider text-blue-600 bg-blue-50/70 border border-blue-200/40 px-2 py-0.5 rounded-full mt-1.5 overflow-hidden whitespace-nowrap">
            Click to know
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Sub-component: Connector lines (optimized motion line coordinate transforms)
function OrbitBeamLine({ phi_i, smoothAngle, orbitScale, radiusX, radiusY, isActive }) {
  const x = useTransform([smoothAngle, orbitScale], ([angleVal, scaleVal]) => (radiusX * scaleVal) * Math.sin(((angleVal + phi_i) * Math.PI) / 180));
  const z = useTransform([smoothAngle, orbitScale], ([angleVal, scaleVal]) => (radiusY * scaleVal) * (radiusX !== 0 ? Math.cos(((angleVal + phi_i) * Math.PI) / 180) : 1));
  
  const x2 = useTransform(x, (xVal) => `calc(50% + ${xVal}px)`);
  const y2 = useTransform(z, (yVal) => `calc(50% + ${yVal}px)`);

  return (
    <motion.line
      x1="50%"
      y1="50%"
      x2={x2}
      y2={y2}
      stroke={isActive ? "var(--primary)" : "var(--bg-secondary)"}
      strokeWidth={isActive ? "2" : "1.2"}
      strokeDasharray={isActive ? "0" : "4,4"}
      className={`transition-colors duration-300 ${isActive ? "opacity-60" : "opacity-25"}`}
    />
  );
}
