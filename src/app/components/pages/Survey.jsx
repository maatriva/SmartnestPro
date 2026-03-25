import { useState } from "react";
import { motion } from "motion/react";

export default function Survey() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    parent: "",
    babyAge: "",
    // Tech involvement
    aiCurious: "maybe",
    wantsMonitoring: "maybe",
    prefersAutomation: "maybe",
    // Acceptability
    comfortableAtNight: "maybe",
    trustLevel: "maybe",
    // Purchase intent
    wouldBuy: "maybe",
    wouldPay: "maybe",
    // Apply for free testing (end)
    applyForFreeTesting: false,
    email: ""
  });

  const priceOptions = ["$599", "$899", "$1299", "Not sure"];

  function setField(key) {
    return (e) => {
      const value =
        e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      console.log("Survey submit:", form);
    }, 2200);
  }

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text)] px-6 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--text-dark)] mb-3">
            Smart Nest Pro Survey
          </h1>
          <p className="text-[var(--text)] text-lg leading-relaxed">
            Quick answers to help shape the product. At the end, you can apply for
            free testing.
          </p>
        </div>

        <div className=" bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-[var(--text-dark)]">
                Basic details
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Name
                  </label>
                  <input
                    value={form.name}
                    onChange={setField("name")}
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Baby age (approx.)
                  </label>
                  <input
                    value={form.babyAge}
                    onChange={setField("babyAge")}
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)]"
                    placeholder="e.g., 6 months"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                  Parent status
                </label>
                <select
                  value={form.parent}
                  onChange={setField("parent")}
                  required
                  className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="yes">Yes, I’m a parent</option>
                  <option value="no">Not a parent</option>
                </select>
              </div>
            </div>

            <div
              id="form-section1"
              className="form-section1 bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-6 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] text-[var(--primary)] rounded-full text-sm font-semibold">
                1
                <span>Tech Involvement</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-2">
                  Would you enjoy using AI features?
                </h2>
                <p className="text-[var(--text-light)]">
                  Pick the closest option for each question.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[var(--text-dark)] font-medium mb-2">
                    How curious are you about AI monitoring?
                  </div>
                  <select
                    value={form.aiCurious}
                    onChange={setField("aiCurious")}
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">Not really</option>
                  </select>
                </div>

                <div>
                  <div className="text-[var(--text-dark)] font-medium mb-2">
                    Would you want alerts/patterns on sleep & health?
                  </div>
                  <select
                    value={form.wantsMonitoring}
                    onChange={setField("wantsMonitoring")}
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="not_sure">Not sure</option>
                  </select>
                </div>

                <div>
                  <div className="text-[var(--text-dark)] font-medium mb-2">
                    Prefer automation over manual soothing?
                  </div>
                  <select
                    value={form.prefersAutomation}
                    onChange={setField("prefersAutomation")}
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              id="form-section2"
              className="form-section2 bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-6 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] text-[var(--primary)] rounded-full text-sm font-semibold">
                2
                <span>Acceptability</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-2">
                  Is this comfortable to use at home?
                </h2>
                <p className="text-[var(--text-light)]">
                  Choose what feels most accurate.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[var(--text-dark)] font-medium mb-2">
                    Comfortable using it overnight?
                  </div>
                  <select
                    value={form.comfortableAtNight}
                    onChange={setField("comfortableAtNight")}
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="not_sure">Not sure</option>
                  </select>
                </div>

                <div>
                  <div className="text-[var(--text-dark)] font-medium mb-2">
                    Trust level for insights?
                  </div>
                  <select
                    value={form.trustLevel}
                    onChange={setField("trustLevel")}
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  >
                    <option value="yes">High</option>
                    <option value="maybe">Medium</option>
                    <option value="no">Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              id="form-section3"
              className="form-section3 bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-6 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] text-[var(--primary)] rounded-full text-sm font-semibold">
                3
                <span>Would You Buy</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-2">
                  Would you buy it?
                </h2>
                <p className="text-[var(--text-light)]">
                  This helps us validate pricing and features.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[var(--text-dark)] font-medium mb-2">
                    Would you buy Smart Nest Pro?
                  </div>
                  <select
                    value={form.wouldBuy}
                    onChange={setField("wouldBuy")}
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <div className="text-[var(--text-dark)] font-medium mb-2">
                    Reasonable price:
                  </div>
                  <select
                    value={form.wouldPay}
                    onChange={setField("wouldPay")}
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  >
                    {priceOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[var(--text-dark)]">
                Apply for free testing (end)
              </h2>

              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-hover)] p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.applyForFreeTesting}
                    onChange={setField("applyForFreeTesting")}
                    className="mt-1 h-4 w-4"
                  />
                  <span className="text-[var(--text)] leading-relaxed">
                    Yes, apply me for Smart Nest Pro free testing.
                  </span>
                </label>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={setField("email")}
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-dark)]"
                    placeholder="you@example.com"
                    required={form.applyForFreeTesting}
                    disabled={!form.applyForFreeTesting}
                  />
                  <div className="text-xs text-[var(--text-light)] mt-2">
                    We’ll only use your email to contact you about the free testing
                    program.
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-primary)] transition-all"
              disabled={submitted}
            >
              {submitted ? "Submitted (demo)" : "Submit Survey"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}