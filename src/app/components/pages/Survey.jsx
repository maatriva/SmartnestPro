import { useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Smart Nest Pro Survey
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Quick answers to help shape the product. At the end, you can apply for
            free testing.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-gray-900">
                Basic details
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Name
                  </label>
                  <input
                    value={form.name}
                    onChange={setField("name")}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Baby age (approx.)
                  </label>
                  <input
                    value={form.babyAge}
                    onChange={setField("babyAge")}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 6 months"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Parent status
                </label>
                <select
                  value={form.parent}
                  onChange={setField("parent")}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="form-section1 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold">
                1
                <span>Tech Involvement</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Would you enjoy using AI features?
                </h2>
                <p className="text-gray-600">
                  Pick the closest option for each question.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-gray-900 font-medium mb-2">
                    How curious are you about AI monitoring?
                  </div>
                  <select
                    value={form.aiCurious}
                    onChange={setField("aiCurious")}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">Not really</option>
                  </select>
                </div>

                <div>
                  <div className="text-gray-900 font-medium mb-2">
                    Would you want alerts/patterns on sleep & health?
                  </div>
                  <select
                    value={form.wantsMonitoring}
                    onChange={setField("wantsMonitoring")}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="not_sure">Not sure</option>
                  </select>
                </div>

                <div>
                  <div className="text-gray-900 font-medium mb-2">
                    Prefer automation over manual soothing?
                  </div>
                  <select
                    value={form.prefersAutomation}
                    onChange={setField("prefersAutomation")}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="form-section2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-semibold">
                2
                <span>Acceptability</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Is this comfortable to use at home?
                </h2>
                <p className="text-gray-600">
                  Choose what feels most accurate.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-gray-900 font-medium mb-2">
                    Comfortable using it overnight?
                  </div>
                  <select
                    value={form.comfortableAtNight}
                    onChange={setField("comfortableAtNight")}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="not_sure">Not sure</option>
                  </select>
                </div>

                <div>
                  <div className="text-gray-900 font-medium mb-2">
                    Trust level for insights?
                  </div>
                  <select
                    value={form.trustLevel}
                    onChange={setField("trustLevel")}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="form-section3 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                3
                <span>Would You Buy</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Would you buy it?
                </h2>
                <p className="text-gray-600">
                  This helps us validate pricing and features.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-gray-900 font-medium mb-2">
                    Would you buy Smart Nest Pro?
                  </div>
                  <select
                    value={form.wouldBuy}
                    onChange={setField("wouldBuy")}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <div className="text-gray-900 font-medium mb-2">
                    Reasonable price:
                  </div>
                  <select
                    value={form.wouldPay}
                    onChange={setField("wouldPay")}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              <h2 className="text-2xl font-semibold text-gray-900">
                Apply for free testing (end)
              </h2>

              <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.applyForFreeTesting}
                    onChange={setField("applyForFreeTesting")}
                    className="mt-1 h-4 w-4"
                  />
                  <span className="text-gray-700 leading-relaxed">
                    Yes, apply me for Smart Nest Pro free testing.
                  </span>
                </label>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={setField("email")}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="you@example.com"
                    required={form.applyForFreeTesting}
                    disabled={!form.applyForFreeTesting}
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    We’ll only use your email to contact you about the free testing
                    program.
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all"
              disabled={submitted}
            >
              {submitted ? "Submitted (demo)" : "Submit Survey"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}