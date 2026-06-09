import { useState } from "react";
import { createPortal } from "react-dom";
import API from "../../../../shared/services/api";
import { validateEmail } from "../../../../shared/utils/validation";

export default function PreOrderForm({ selectedPlan, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    planName: selectedPlan?.name || "Maatriva",
    planPrice: selectedPlan?.price || ""
  });

  const [loading, setLoading] = useState(false);

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

      alert("Pre-order successful 🚀");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error submitting order. Please ensure all fields are filled.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 transition-opacity duration-300">
      <style>{`
        @keyframes minimizeSmooth {
          0% { opacity: 0; transform: scale(1.1) translateY(-20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-minimize {
          animation: minimizeSmooth 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      
      <div className="clay-card p-8 w-full max-w-md space-y-6 animate-minimize bg-white">

        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--text-dark)]">Pre-Order</h2>
          {selectedPlan && (
            <p className="text-[var(--primary)] font-medium mt-1">
              {selectedPlan.name} Model {selectedPlan.price === "Custom" ? "(Custom Pricing)" : `(₹${selectedPlan.price})`}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <input
            placeholder="Full Name"
            onChange={handleChange("name")}
            className="w-full clay-input p-3"
          />

          <input
            type="email"
            placeholder="Email"
            onChange={handleChange("email")}
            className="w-full clay-input p-3"
          />

          <input
            placeholder="Phone Number"
            onChange={handleChange("phone")}
            className="w-full clay-input p-3"
          />

          <textarea
            placeholder="Delivery Address"
            onChange={handleChange("address")}
            rows="3"
            className="w-full clay-input p-3 resize-none"
          />
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full clay-btn clay-btn-primary py-3.5"
          >
            {loading ? "Submitting..." : "Confirm Pre-Order"}
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
