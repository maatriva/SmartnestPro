import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { createPortal } from "react-dom";
import API from "../../shared/services/api";

export default function ShareStoryModal({ isOpen, onClose }) {
  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  
  const [formData, setFormData] = useState({
    parentName: "",
    childAge: "",
    location: "",
    storyTitle: "",
    storyDescription: "",
  });
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Focus trap and escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Focus close button initially
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.parentName || !formData.storyTitle || !formData.storyDescription) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      let photoUrl = null;
      if (photo) {
        try {
          photoUrl = await fileToBase64(photo);
        } catch (fileErr) {
          console.error("Error reading file:", fileErr);
        }
      }

      await API.post("/stories", {
        parentName: formData.parentName,
        childAge: formData.childAge,
        location: formData.location,
        storyTitle: formData.storyTitle,
        storyDescription: formData.storyDescription,
        photoUrl: photoUrl
      });

      setIsSuccess(true);
      toast.success("Thank you for sharing! Your story is saved.");
      
      // Reset form
      setFormData({
        parentName: "",
        childAge: "",
        location: "",
        storyTitle: "",
        storyDescription: "",
      });
      setPhoto(null);
      
      // Close after 2 seconds success view
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting story:", error);
      toast.error("Failed to save story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.9, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", duration: 0.5 } 
    },
    exit: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.9, 
      y: shouldReduceMotion ? 0 : 20,
      transition: { duration: 0.3 }
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div 
            className="modal-backdrop"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div 
            ref={modalRef}
            className="modal-container"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            {/* Close Button */}
            <button 
              ref={closeButtonRef}
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="modal-success-state">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle2 size={64} className="text-(--primary) mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-(--text-dark) mb-2 text-center">Story Received!</h3>
                <p className="text-(--text-light) text-center max-w-sm">
                  We have received your parenting story. Our team will review it and notify you when it's live.
                </p>
              </div>
            ) : (
              <div className="modal-form-content">
                <div className="modal-header">
                  <h3 id="modal-title" className="text-2xl font-bold text-(--text-dark)">
                    Share Your Journey
                  </h3>
                  <p className="text-sm text-(--text-light) mt-1">
                    Inspire other parents with your MAATRIVA experience.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Parent Name */}
                    <div className="form-group">
                      <label htmlFor="parentName" className="form-label required">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className="clay-input w-full p-3 text-sm focus:outline-none"
                        required
                        placeholder="e.g. Priya Sharma"
                        aria-required="true"
                      />
                    </div>

                    {/* Child Age */}
                    <div className="form-group">
                      <label htmlFor="childAge" className="form-label">
                        Child's Age
                      </label>
                      <input
                        type="text"
                        id="childAge"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        className="clay-input w-full p-3 text-sm focus:outline-none"
                        placeholder="e.g. 6 months old"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Location */}
                    <div className="form-group">
                      <label htmlFor="location" className="form-label">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="clay-input w-full p-3 text-sm focus:outline-none"
                        placeholder="e.g. Bengaluru"
                      />
                    </div>

                    {/* Photo Upload */}
                    <div className="form-group">
                      <label htmlFor="photoUpload" className="form-label">
                        Upload Photo
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="photoUpload"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById("photoUpload")?.click()}
                          className="clay-input w-full p-3 text-sm flex items-center justify-between hover:cursor-pointer"
                          aria-label="Upload story image file"
                        >
                          <span className="truncate text-(--text-light)">
                            {photo ? photo.name : "Select image..."}
                          </span>
                          <Upload size={16} className="text-(--primary)" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Story Title */}
                  <div className="form-group">
                    <label htmlFor="storyTitle" className="form-label required">
                      Story Title
                    </label>
                    <input
                      type="text"
                      id="storyTitle"
                      name="storyTitle"
                      value={formData.storyTitle}
                      onChange={handleInputChange}
                      className="clay-input w-full p-3 text-sm focus:outline-none"
                      required
                      placeholder="e.g. Maatriva gave me confidence during overwhelming days."
                      aria-required="true"
                    />
                  </div>

                  {/* Story Description */}
                  <div className="form-group">
                    <label htmlFor="storyDescription" className="form-label required">
                      Your Story
                    </label>
                    <textarea
                      id="storyDescription"
                      name="storyDescription"
                      rows={4}
                      value={formData.storyDescription}
                      onChange={handleInputChange}
                      className="clay-input w-full p-3 text-sm focus:outline-none resize-none"
                      required
                      placeholder="Share your parenting experience with MAATRIVA..."
                      aria-required="true"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="clay-btn clay-btn-primary w-full py-3.5 mt-2 text-sm flex items-center justify-center hover:cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Story"
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
