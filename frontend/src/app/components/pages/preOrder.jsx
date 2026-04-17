import { useState } from "react";
import API from "../../utils/api";
import { validateEmail } from "../../utils/validation";


export default function PreOrderForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
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


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

        <h2 className="text-xl font-bold">Pre-Order Smart Nest Pro</h2>

        <input
          placeholder="Full Name"
          onChange={handleChange("name")}
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          onChange={handleChange("email")}
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Phone"
          onChange={handleChange("phone")}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Address"
          onChange={handleChange("address")}
          className="w-full border p-3 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[var(--primary)] text-white py-3 rounded"
        >
          {loading ? "Submitting..." : "Confirm Pre-Order"}
        </button>

        <button
          onClick={onClose}
          className="w-full text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}