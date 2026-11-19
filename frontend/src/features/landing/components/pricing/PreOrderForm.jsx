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
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current?.();
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
    const timer = setTimeout(() => {
      initialFocusRef.current?.focus();
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

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
      
      <div ref={modalRef} className="clay-card-light bg-(--surface) p-6 sm:p-8 w-full max-w-md space-y-5 animate-minimize rounded-2xl border border-(--border-card) shadow-xl">
        <div className="text-center">
          <h2 id="preorder-modal-title" className="text-2xl font-bold font-display text-(--text-primary)">
            {isEnterprise ? "Institutional Inquiry" : "Pre-Order Cradle"}
          </h2>
          {selectedPlan && (
            <p className="text-(--brand-accent) font-semibold text-sm mt-1">
              {selectedPlan.name} • {selectedPlan.price}
            </p>
          )}
        </div>

        <div className="space-y-3.5">
          <div>
            <label htmlFor="preorder-name" className="block text-xs font-semibold text-(--text-primary) mb-1">
              Full Name
            </label>
            <input
              id="preorder-name"
              ref={initialFocusRef}
              placeholder="Your full name"
              onChange={handleChange("name")}
              className="w-full clay-input p-2.5 text-sm"
              value={form.name}
            />
          </div>

          <div>
            <label htmlFor="preorder-email" className="block text-xs font-semibold text-(--text-primary) mb-1">
              Email Address
            </label>
            <input
              id="preorder-email"
              type="email"
              placeholder="name@example.com"
              onChange={handleChange("email")}
              className="w-full clay-input p-2.5 text-sm"
              value={form.email}
            />
          </div>

          <div>
            <label htmlFor="preorder-phone" className="block text-xs font-semibold text-(--text-primary) mb-1">
              Phone Number
            </label>
            <input
              id="preorder-phone"
              type="tel"
              placeholder="+91 98765 43210"
              onChange={handleChange("phone")}
              className="w-full clay-input p-2.5 text-sm"
              value={form.phone}
            />
          </div>

          <div>
            <label htmlFor="preorder-address" className="block text-xs font-semibold text-(--text-primary) mb-1">
              Delivery / Hospital Address
            </label>
            <textarea
              id="preorder-address"
              placeholder="City, State, Pin Code"
              onChange={handleChange("address")}
              rows="3"
              className="w-full clay-input p-2.5 text-sm resize-none"
              value={form.address}
            />
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full clay-btn clay-btn-primary py-3 text-sm font-bold rounded-xl"
          >
            {loading ? "Submitting..." : isEnterprise ? "Submit Inquiry" : "Confirm Pre-Order"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full clay-btn clay-btn-secondary py-2 text-sm font-semibold rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
