import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Star, Baby } from "lucide-react";
import StoryCard from "./StoryCard";

const ShareStoryModal = lazy(() => import("./ShareStoryModal"));
import "./ParentStories.scss";
import API from "../../shared/services/api";

// Custom Footprints SVG for background decoration
const FootprintsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8.5 11c-1.5 0-2.5 1.5-2.5 3s1 2.5 2.5 2.5s2.5-1 2.5-2.5s-1-3-2.5-3zm-2-3c-.4 0-.8.4-.8.8s.4.8.8.8.8-.4.8-.8-.4-.8-.8-.8zm1.8-1c-.4 0-.8.4-.8.8s.4.8.8.8.8-.4.8-.8-.4-.8-.8-.8zm2 1c-.4 0-.8.4-.8.8s.4.8.8.8.8-.4.8-.8-.4-.8-.8-.8zm1 1.8c-.4 0-.8.4-.8.8s.4.8.8.8.8-.4.8-.8-.4-.8-.8-.8z" />
    <path d="M15.5 13c-1.5 0-2.5 1.5-2.5 3s1 2.5 2.5 2.5s2.5-1 2.5-2.5s-1-3-2.5-3zm2-3c-.4 0-.8.4-.8.8s.4.8.8.8.8-.4.8-.8-.4-.8-.8-.8zm-1.8-1c-.4 0-.8.4-.8.8s.4.8.8.8.8-.4.8-.8-.4-.8-.8-.8zm-2 1c-.4 0-.8.4-.8.8s.4.8.8.8.8-.4.8-.8-.4-.8-.8-.8zm-1 1.8c-.4 0-.8.4-.8.8s.4.8.8.8.8-.4.8-.8-.4-.8-.8-.8z" />
  </svg>
);

export default function ParentStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storiesList, setStoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await API.get("/stories");
        if (isMounted) {
          if (response.data && Array.isArray(response.data)) {
            const dbStories = response.data.map((dbStory) => {
              let role = "Parent";
              if (dbStory.child_age) {
                const lower = dbStory.child_age.toLowerCase();
                if (lower.includes("mother") || lower.includes("father") || lower.includes("parent")) {
                  role = dbStory.child_age;
                } else {
                  role = `Parent of a ${dbStory.child_age}`;
                }
              }
              return {
                id: `db-${dbStory.id}`,
                title: dbStory.story_title,
                story: dbStory.story_description,
                name: dbStory.parent_name,
                role: role,
                location: dbStory.location || "India",
                image: dbStory.photo_url || null,
              };
            });
            setStoriesList(dbStories);
            setCurrentIndex(0);
          } else {
            setStoriesList([]);
          }
        }
      } catch (error) {
        console.error("Error fetching stories from DB:", error);
        if (isMounted) {
          setStoriesList([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchStories();
    return () => {
      isMounted = false;
    };
  }, [isModalOpen]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setStoriesList((current) => {
      if (current.length <= 1) return current;
      setCurrentIndex((prev) => (prev + 1) % current.length);
      return current;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setStoriesList((current) => {
      if (current.length <= 1) return current;
      setCurrentIndex((prev) => (prev - 1 + current.length) % current.length);
      return current;
    });
  }, []);

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen || storiesList.length <= 1) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isModalOpen, storiesList.length]);

  // Auto-slide effect (every 6 seconds)
  useEffect(() => {
    if (isHovered || isModalOpen || storiesList.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered, isModalOpen, handleNext, storiesList.length]);

  // Slide Animation configurations
  const slideVariants = {
    enter: (dir) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir) => ({
      x: shouldReduceMotion ? 0 : dir < 0 ? 80 : -80,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  const onDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <section id="parent-stories" className="py-24 px-6 blend-features text-(--text) overflow-x-hidden relative">
      {/* Slow floating decorations */}
      <div className="floating-decorations" aria-hidden="true">
        <div className="decoration-item footprint-1"><FootprintsIcon /></div>
        <div className="decoration-item footprint-2"><FootprintsIcon /></div>
        <div className="decoration-item heart-1"><Heart /></div>
        <div className="decoration-item heart-2"><Heart /></div>
        <div className="decoration-item star-1"><Star /></div>
        <div className="decoration-item star-2"><Star /></div>
        <div className="decoration-item circle-1" />
        <div className="decoration-item circle-2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 clay-badge text-sm font-bold mb-4">
            PARENT STORIES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-(--text-dark) mb-6">
            Every Parent Has a Story.<br />Every Story Matters.
          </h2>
          <p className="text-xl text-(--text-light)">
            Hear from parents whose parenting journey became easier, calmer, and more confident with MAATRIVA.
          </p>
        </motion.div>

        {loading ? (
          <div className="clay-card p-12 text-center max-w-2xl mx-auto my-8">
            <div className="inline-block w-8 h-8 border-4 border-(--primary) border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-semibold text-(--text-light)">Loading real parent stories...</p>
          </div>
        ) : storiesList.length > 0 ? (
          <>
            {/* Carousel Area */}
            <div 
              className="carousel-wrapper"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Navigation Buttons - Left */}
              {storiesList.length > 1 && (
                <button 
                  className="carousel-nav-btn prev"
                  onClick={handlePrev}
                  aria-label="Previous story"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Carousel Slide wrapper */}
              <div className="overflow-hidden p-4">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag={storiesList.length > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={storiesList.length > 1 ? onDragEnd : undefined}
                    className="w-full"
                  >
                    <StoryCard story={storiesList[currentIndex]} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons - Right */}
              {storiesList.length > 1 && (
                <button 
                  className="carousel-nav-btn next"
                  onClick={handleNext}
                  aria-label="Next story"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Pagination Dots */}
            {storiesList.length > 1 && (
              <div className="carousel-dots-container" role="tablist" aria-label="Stories pagination">
                {storiesList.map((_, index) => (
                  <button
                    key={index}
                    role="tab"
                    aria-selected={currentIndex === index}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`carousel-dot ${currentIndex === index ? "active" : ""}`}
                    onClick={() => handleDotClick(index)}
                  />
                ))}
              </div>
            )}

            {/* Premium CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="cta-card-container"
            >
              <div className="cta-left">
                <div className="cta-illustration" aria-hidden="true">
                  <Baby />
                </div>
                <h3 className="cta-text">
                  Your story could inspire another parent. Share your experience with MAATRIVA.
                </h3>
              </div>
              <div className="cta-right">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="clay-btn clay-btn-primary cta-button cursor-pointer"
                  aria-haspopup="dialog"
                >
                  Share Your Story
                </button>
              </div>
            </motion.div>
          </>
        ) : (
          /* Real Stories Empty State */
          <div className="clay-card p-8 sm:p-12 text-center max-w-2xl mx-auto my-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full clay-badge flex items-center justify-center text-(--primary) mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-(--text-dark) mb-3">
              Be the First to Share Your Story
            </h3>
            <p className="text-sm sm:text-base text-(--text-light) leading-relaxed mb-8 max-w-md">
              We only publish genuine parent experiences. If you have been part of our early journey or tested Maatriva, we would love to feature your story!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="clay-btn clay-btn-primary px-8 py-3.5 text-sm font-bold shadow-lg shadow-[#5A78D6]/25 cursor-pointer"
            >
              Share Your Experience
            </button>
          </div>
        )}
      </div>

      {/* Share Story Modal */}
      <Suspense fallback={null}>
        <ShareStoryModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </Suspense>
    </section>
  );
}
