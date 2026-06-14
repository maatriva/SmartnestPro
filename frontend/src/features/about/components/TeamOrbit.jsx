import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, animate } from "motion/react";
import { Linkedin } from "lucide-react";
import { team } from "../constants/aboutData";

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

// 1. Text reveal component for Name/Role (Character-by-character)
const LetterReveal = ({ text, className = "" }) => {
  if (!text) return null;
  return (
    <span className={className}>
      {Array.from(text).map((char, idx) => (
        <motion.span
          key={`${char}-${idx}`}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.25, delay: idx * 0.015 }}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// 2. Text reveal component for Biography (Word-by-word with blur)
const WordReveal = ({ text, className = "" }) => {
  if (!text) return null;
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.35,
            delay: idx * 0.02,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block mr-1.5 mb-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// 3. Mini 3D Hover Tilt Wrapper for Cards
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
    // Map mouse position to degree values (max 15 degrees tilt)
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

export default function TeamOrbit() {
  const size = useWindowSize();
  const isMobile = size.width < 1024;
  const sectionRef = useRef(null);
  const N = team.length;

  // Orbit Dimensions based on screens
  const radiusX = size.width >= 1280 ? 280 : 220;
  const radiusZ = size.width >= 1280 ? 170 : 130;
  const tiltFactor = 0.28; // Tilted Y offset based on Z depth
  const radiusY = radiusZ * tiltFactor;

  // Angle tracking
  const interactiveAngle = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimatingToCard = useRef(false);
  
  // Slider state and sync
  const [sliderVal, setSliderVal] = useState(0);

  // Combined smooth rotation
  const smoothAngle = useSpring(interactiveAngle, { stiffness: 50, damping: 20 });

  // Sync range slider handle to the orbit rotation angle in real-time
  useEffect(() => {
    const unsub = interactiveAngle.on("change", (latest) => {
      // Map interactiveAngle (which is negative) to a positive [0, 360] range
      const positiveAngle = ((-latest % 360) + 360) % 360;
      setSliderVal(positiveAngle);
    });
    return () => unsub();
  }, [interactiveAngle]);

  // Track closest card to the front center to update spotlight content
  useEffect(() => {
    const unsub = smoothAngle.on("change", (latestAngle) => {
      if (isAnimatingToCard.current) return; // Ignore updates if a click animation is active
      
      let minDistance = Infinity;
      let closestIdx = 0;
      team.forEach((_, idx) => {
        const phi_i = idx * (360 / N);
        // Angle of card i
        const totalCardAngle = latestAngle + phi_i;
        // Normalize to [-180, 180]
        const normalized = ((totalCardAngle + 180) % 360 + 360) % 360 - 180;
        const dist = Math.abs(normalized);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
    });
    return () => unsub();
  }, [smoothAngle, N]);

  // Interactive Click centering
  const handleCardClick = (idx) => {
    isAnimatingToCard.current = true;
    setActiveIndex(idx);
    setMobileIndex(idx);

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
  };

  // Mobile 3D Card Stack Swipe index
  const [mobileIndex, setMobileIndex] = useState(0);

  const handleMobileSwipe = (dir) => {
    if (dir === "next") {
      setMobileIndex((prev) => (prev + 1) % N);
    } else {
      setMobileIndex((prev) => (prev - 1 + N) % N);
    }
  };

  // Sync mobile index to spotlight detail index when on mobile
  const activeSpotlightIndex = isMobile ? mobileIndex : activeIndex;
  const activeMember = team[activeSpotlightIndex];

  return (
    <div
      ref={sectionRef}
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
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-300/25 to-teal-400/25 blur-3xl"
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
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-300/20 to-purple-400/20 blur-3xl"
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
            className="absolute w-3 h-3 rounded-full bg-teal-200/40 backdrop-blur-sm shadow-[0_0_8px_rgba(184,227,226,0.5)]"
          />
        ))}
      </div>

      {/* Main Section Content Wrapper */}
      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* 🧭 Rating-style Profile Avatar Navigation Bar */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-5 mb-12 relative z-25">
          {team.map((member, i) => {
            const isActive = activeSpotlightIndex === i;
            return (
              <button
                key={`nav-${member.name}`}
                onClick={() => {
                  handleCardClick(i);
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
                    className={`w-full h-full rounded-full object-cover ${member.objectPosition || "object-center"}`}
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
        
        {/* Responsive Grid Split */}
        {!isMobile ? (
          /* ========================================================================= */
          /* 🖥️ DESKTOP VIEW: 3D Orbit Left + Spotlight Right                          */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[620px]">
            
            {/* Left Column: 3D Orbit Stage + Controls */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full overflow-visible">
              {/* Orbit Stage Area */}
              <div className="relative w-full h-[480px] flex items-center justify-center overflow-visible">
                {/* Ellipse SVG Orbit path and beam lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
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

                  {/* Pulse lines connecting central Hub to active cards */}
                  {team.map((member, i) => {
                    const phi_i = i * (360 / N);
                    
                    // Setup reactive coordinate hooks driven by Framer Motion values
                    return (
                      <OrbitBeamLine
                        key={member.name}
                        phi_i={phi_i}
                        smoothAngle={smoothAngle}
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
                      radiusX={radiusX}
                      radiusY={radiusY}
                      radiusZ={radiusZ}
                      isActive={isActive}
                      onClick={() => handleCardClick(i)}
                    />
                  );
                })}
              </div>

              {/* 🎚️ Premium Glassmorphic Range Slider Control (Positioned under the orbit) */}
              <div className="w-3/4 max-w-[280px] flex flex-col items-center gap-2 mt-4 relative z-30">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-teal-800/60 flex items-center gap-1.5 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Slide to spin the orbit
                </span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={sliderVal}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSliderVal(val);
                    interactiveAngle.set(-val);
                  }}
                  className="w-full h-2 bg-white/50 backdrop-blur rounded-lg appearance-none cursor-pointer accent-(--primary) border border-white/40 shadow-inner"
                />
              </div>
            </div>

            {/* Right Column: Spotlight detail card */}
            <div className="lg:col-span-6 flex justify-center lg:pl-10">
              <div className="w-full max-w-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.name}
                    initial={{ opacity: 0, x: 30, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="clay-card relative p-8 md:p-10 text-left w-full min-h-[460px] flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Glossy radial overlay */}
                    <div className="absolute inset-0 bg-radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.4), transparent) pointer-events-none" />

                    <div>
                      {/* Top profile accent row */}
                      <div className="flex items-center gap-6 mb-6">
                        <div className="relative w-20 h-20 rounded-full p-1 clay-badge overflow-visible">
                          {/* Pulsing outer ring */}
                          <div className="absolute -inset-1 rounded-full ring-2 ring-teal-300/80 shadow-[0_0_15px_rgba(184,227,226,0.6)] animate-pulse pointer-events-none" />
                          <img
                            src={activeMember.image}
                            alt={activeMember.name}
                            className={`w-full h-full rounded-full object-cover ${activeMember.objectPosition || "object-center"}`}
                          />
                        </div>

                        <div>
                          <LetterReveal
                            text={activeMember.name}
                            className="block text-2xl font-black text-(--text-dark) leading-snug tracking-tight"
                          />
                          <LetterReveal
                            text={activeMember.role}
                            className="block text-xs font-black uppercase tracking-[0.16em] text-(--primary) mt-1.5"
                          />
                        </div>
                      </div>

                      {/* Bio Copy */}
                      <div className="min-h-[120px] mb-8">
                        <p className="text-sm font-semibold leading-relaxed text-(--text) tracking-wide">
                          <WordReveal text={activeMember.copy} />
                        </p>
                      </div>
                    </div>

                    {/* Footer Row (Skills & Social) */}
                    <div className="border-t border-teal-200/30 pt-6 mt-auto">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {activeMember.skills?.map((skill, sIdx) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: sIdx * 0.08, type: "spring" }}
                            className="px-3 py-1.5 clay-badge text-[10px] font-black uppercase tracking-wider text-teal-700/80"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                          {activeMember.isFounder ? "Co-Founding Team" : "Core Team Member"}
                        </span>
                        
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href={activeMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center clay-badge text-(--primary) hover:text-blue-600 shadow-md cursor-pointer"
                        >
                          <Linkedin size={16} strokeWidth={2.5} />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* 📱 MOBILE VIEW: Swipeable 3D Card Stack + Spotlight Details Underneath   */
          /* ========================================================================= */
          <div className="flex flex-col items-center gap-12 w-full py-6">
            
            {/* Top: 3D Stack container */}
            <div className="relative h-[250px] w-full max-w-[280px] flex items-center justify-center">
              {team.map((member, i) => {
                // Calculate stacked positioning relative to activeMobileIndex
                const diff = (i - mobileIndex + N) % N;
                
                // We only render the front 3 cards in the stack for performance
                if (diff > 2) return null;

                const isFront = diff === 0;
                const scale = 1 - diff * 0.08;
                const yOffset = diff * 22;
                const zIndex = 50 - diff;
                const opacity = 1 - diff * 0.35;

                return (
                  <motion.div
                    key={member.name}
                    drag={isFront ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragEnd={(e, info) => {
                      if (Math.abs(info.offset.x) > 80) {
                        handleMobileSwipe(info.offset.x > 0 ? "prev" : "next");
                      }
                    }}
                    style={{ zIndex }}
                    animate={{
                      scale,
                      y: yOffset,
                      opacity,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 18 }}
                    className="absolute w-full h-[220px] clay-card p-6 flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing select-none"
                  >
                    <div className="relative w-20 h-20 rounded-full p-1 clay-badge mb-4 overflow-visible">
                      {isFront && (
                        <div className="absolute -inset-1 rounded-full ring-2 ring-teal-300/80 shadow-[0_0_12px_rgba(184,227,226,0.6)] animate-pulse" />
                      )}
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full rounded-full object-cover ${member.objectPosition || "object-center"}`}
                      />
                    </div>
                    <h3 className="text-lg font-black text-(--text-dark) truncate max-w-full">
                      {member.name}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-(--primary) mt-1">
                      {member.role}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Swipe manual triggers */}
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => handleMobileSwipe("prev")}
                className="px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full clay-badge active:scale-95 cursor-pointer"
              >
                ◀ Prev
              </button>
              <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">
                {mobileIndex + 1} / {N}
              </span>
              <button
                onClick={() => handleMobileSwipe("next")}
                className="px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full clay-badge active:scale-95 cursor-pointer"
              >
                Next ▶
              </button>
            </div>

            {/* Bottom: Mobile Spotlight Bio Details */}
            <div className="w-full max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMember.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="clay-card p-6 text-left min-h-[300px] flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-xl font-black text-(--text-dark)">
                      {activeMember.name}
                    </h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-(--primary) mt-1.5 mb-4">
                      {activeMember.role}
                    </p>

                    <p className="text-xs font-semibold leading-relaxed text-(--text) tracking-wide mb-6">
                      {activeMember.copy}
                    </p>
                  </div>

                  <div className="border-t border-teal-200/30 pt-4">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {activeMember.skills?.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 clay-badge text-[9px] font-black uppercase tracking-wider text-teal-700/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                        {activeMember.isFounder ? "Founder" : "Co-Founder"}
                      </span>
                      
                      <a
                        href={activeMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center clay-badge text-(--primary) cursor-pointer"
                      >
                        <Linkedin size={14} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

// Sub-component: A single card on the 3D Orbit path (Desktop only)
function OrbitCard({
  member,
  index,
  phi_i,
  smoothAngle,
  radiusX,
  radiusY,
  radiusZ,
  isActive,
  onClick,
}) {
  // Transform positions dynamically driven by smoothAngle motion value
  // This avoids triggering React render ticks during transitions
  const x = useTransform(smoothAngle, (angleVal) => radiusX * Math.sin(((angleVal + phi_i) * Math.PI) / 180));
  const z = useTransform(smoothAngle, (angleVal) => radiusZ * Math.cos(((angleVal + phi_i) * Math.PI) / 180));
  
  // Calculate vertical coordinate mimicking perspective tilt
  const y = useTransform(z, (zVal) => zVal * 0.28);
  
  // Depth scaling and opacity
  const scale = useTransform(z, [-radiusZ, radiusZ], [0.75, 1.05]);
  const opacity = useTransform(z, [-radiusZ, radiusZ], [0.55, 1.0]);
  
  // Compute zIndex dynamically
  const [zIdx, setZIdx] = useState(10);
  useEffect(() => {
    const unsub = z.on("change", (zVal) => {
      // Map zVal range [-radiusZ, radiusZ] to zIndex [10, 100]
      setZIdx(Math.round(((zVal + radiusZ) / (2 * radiusZ)) * 90) + 10);
    });
    return () => unsub();
  }, [z, radiusZ]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: useTransform(x, (v) => v - 64), // subtract half card width (128px / 2 = 64)
        y: useTransform(y, (v) => v - 64), // subtract half card height
        scale,
        opacity,
        zIndex: zIdx,
        transformStyle: "preserve-3d",
      }}
      className="w-32 h-32 select-none"
    >
      <TiltWrapper className="w-full h-full relative cursor-pointer">
        <div
          onClick={onClick}
          className={`w-full h-full clay-card flex flex-col items-center justify-center p-3 text-center border-2 transition-colors duration-300 relative ${
            isActive ? "border-teal-300 bg-teal-100/30" : "border-white/80 hover:border-teal-200/50"
          }`}
        >
          {/* Card Glass Glow ring (if active) */}
          {isActive && (
            <div className="absolute -inset-1.5 rounded-[28px] ring-2 ring-teal-300/80 shadow-[0_0_15px_rgba(184,227,226,0.6)] animate-pulse pointer-events-none" />
          )}

          {/* Profile Avatar Frame */}
          <div className="w-16 h-16 rounded-full clay-badge p-0.5 overflow-hidden mb-2">
            <img
              src={member.image}
              alt={member.name}
              className={`w-full h-full rounded-full object-cover ${member.objectPosition || "object-center"}`}
            />
          </div>

          {/* Core Member Label */}
          <span className="block text-[10px] font-black leading-tight text-(--text-dark) truncate max-w-full">
            {member.name.split(" ")[0]}
          </span>
          <span className="block text-[8px] font-bold text-(--primary) tracking-wide mt-0.5 truncate max-w-full">
            {member.role.split(" ")[0]}
          </span>
        </div>
      </TiltWrapper>
    </motion.div>
  );
}

// Sub-component: Glowing connector lines connecting hub center to active orbits
function OrbitBeamLine({ phi_i, smoothAngle, radiusX, radiusY, isActive }) {
  const x = useTransform(smoothAngle, (angleVal) => radiusX * Math.sin(((angleVal + phi_i) * Math.PI) / 180));
  const z = useTransform(smoothAngle, (angleVal) => radiusY * (radiusX !== 0 ? Math.cos(((angleVal + phi_i) * Math.PI) / 180) : 1));
  const y = useTransform(z, (zVal) => zVal);

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubX = x.on("change", (latestX) => {
      setCoords((prev) => ({ ...prev, x: latestX }));
    });
    const unsubY = y.on("change", (latestY) => {
      setCoords((prev) => ({ ...prev, y: latestY }));
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [x, y]);

  return (
    <line
      x1="50%"
      y1="50%"
      x2={`calc(50% + ${coords.x}px)`}
      y2={`calc(50% + ${coords.y}px)`}
      stroke={isActive ? "var(--primary)" : "var(--bg-secondary)"}
      strokeWidth={isActive ? "2" : "1.2"}
      strokeDasharray={isActive ? "0" : "4,4"}
      className={`transition-colors duration-300 ${isActive ? "opacity-60" : "opacity-25"}`}
    />
  );
}
