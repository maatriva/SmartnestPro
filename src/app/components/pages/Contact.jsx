import { useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 border border-black/5 backdrop-blur rounded-full text-purple-700 text-sm font-semibold mb-5">
          Contact Us
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-5">Let’s talk</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Have questions about bulk orders, partnerships, or product support? Send
          us a message.
        </p>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Name
              </label>
              <input
                value={form.name}
                onChange={setField("name")}
                required
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Email
              </label>
              <input
                value={form.email}
                type="email"
                onChange={setField("email")}
                required
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={setField("message")}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Tell us what you need..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all"
              disabled={submitted}
            >
              {submitted ? "Sent (demo)" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

