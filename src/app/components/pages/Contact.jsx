import { useState } from "react";
import { motion } from "motion/react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  function setField(key) {
    return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
      console.log("Contact submit:", form);
    }, 2200);
  }

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] px-6 py-16 text-[var(--text)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-glass)] border border-[var(--border)] backdrop-blur rounded-full text-[var(--primary)] text-sm font-semibold mb-5">
          Contact Us
        </div>
        <h1 className="text-4xl font-bold text-[var(--text-dark)] mb-5">Let’s talk</h1>
        <p className="text-[var(--text)] text-lg leading-relaxed mb-6">
          Have questions about bulk orders, partnerships, or product support? Send
          us a message.
        </p>

        <div className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                Name
              </label>
              <input
                value={form.name}
                onChange={setField("name")}
                required
                className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                Email
              </label>
              <input
                value={form.email}
                type="email"
                onChange={setField("email")}
                required
                className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)]"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={setField("message")}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)] resize-none"
                placeholder="Tell us what you need..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full font-semibold text-[var(--white)] bg-[var(--primary)] hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-primary)] transition-all"
              disabled={submitted}
            >
              {submitted ? "Sent (demo)" : "Send Message"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
