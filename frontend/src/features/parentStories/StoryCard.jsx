import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import "./StoryCard.scss";

export default function StoryCard({ story }) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : -50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <article 
      className="story-card-container"
      aria-label={`Story of ${story.name}`}
    >
      {/* Left side: image */}
      <motion.div 
        className="story-image-wrapper"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={imageVariants}
      >
        <img 
          src={story.image} 
          alt={`Story image of ${story.name}`} 
          width="400"
          height="400"
          className="story-image"
          loading="lazy"
        />
        <div className="story-image-overlay" />
      </motion.div>

      {/* Right side: content */}
      <motion.div 
        className="story-content-side"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={contentVariants}
      >
        {/* Large Quote Mark */}
        <div className="quote-icon-wrapper" aria-hidden="true">
          <Quote className="fill-current" />
        </div>

        {/* Title */}
        <h3 className="story-title">
          “{story.title}”
        </h3>

        {/* Story Text */}
        <p className="story-text">
          {story.story}
        </p>

        {/* Author details */}
        <div className="story-author">
          <span className="author-name">{story.name}</span>
          <div className="author-meta">
            <span>{story.role}</span>
            <span className="meta-divider" aria-hidden="true">•</span>
            <span>{story.location}</span>
          </div>
        </div>
      </motion.div>
    </article>
  );
}
