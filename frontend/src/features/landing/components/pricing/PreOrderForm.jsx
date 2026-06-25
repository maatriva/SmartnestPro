import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import API from "../../../../shared/services/api";
import { validateEmail } from "../../../../shared/utils/validation";

export default function PreOrderForm({ selectedPlan, onClose }) {
  const isEnterprise = selectedPlan?.name === "Enterprise" || selectedPlan?.price === "Custom";
  const modalRef = useRef(null);
  const initialFocusRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    planName: selectedPlan?.name || "Maatriva",
    planPrice: selectedPlan?.price || ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    document.body.style.overflow = "hidden";

    // Focus first input field initially
    setTimeout(() => {
      initialFocusRef.current?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }
    if (!validateEmail(form.email)) {
      alert("Please enter a valid email address");
      return;
    }
    try {
      setLoading(true);

      await API.post("/preorders", form);

      alert(isEnterprise ? "Inquiry submitted successfully 🚀" : "Pre-order successful 🚀");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error submitting order. Please ensure all fields are filled.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preorder-modal-title"
    >
      <style>{`
        @keyframes minimizeSmooth {
          0% { opacity: 0; transform: scale(1.1) translateY(-20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-minimize {
          animation: minimizeSmooth 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      
      <div ref={modalRef} className="clay-card p-8 w-full max-w-md space-y-6 animate-minimize bg-white">

        <div className="text-center">
          <h2 id="preorder-modal-title" className="text-2xl font-bold text-[var(--text-dark)]">
            {isEnterprise ? "Enterprise Inquiry" : "Pre-Order"}
          </h2>
          {selectedPlan && (
            <p className="text-[var(--primary)] font-medium mt-1">
              {selectedPlan.name} {selectedPlan.price === "Custom" ? "(Custom Pricing)" : `Model (₹${selectedPlan.price})`}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <input
            ref={initialFocusRef}
            placeholder="Full Name"
            aria-label="Full Name"
            onChange={handleChange("name")}
            className="w-full clay-input p-3"
            value={form.name}
          />

          <input
            type="email"
            placeholder="Email"
            aria-label="Email Address"
            onChange={handleChange("email")}
            className="w-full clay-input p-3"
            value={form.email}
          />

          <input
            placeholder="Phone Number"
            aria-label="Phone Number"
            onChange={handleChange("phone")}
            className="w-full clay-input p-3"
            value={form.phone}
          />

          <textarea
            placeholder="Delivery Address"
            aria-label="Delivery Address"
            onChange={handleChange("address")}
            rows="3"
            className="w-full clay-input p-3 resize-none"
            value={form.address}
          />
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full clay-btn clay-btn-primary py-3.5"
          >
            {loading ? "Submitting..." : isEnterprise ? "Submit Inquiry" : "Confirm Pre-Order"}
          </button>

          <button
            onClick={onClose}
            className="w-full clay-btn clay-btn-secondary py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
