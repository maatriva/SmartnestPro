import { useState } from "react";
import AboutSideNav from "../AboutSideNav";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { Footer } from "../Footer";
import withBabyImage from "../../images/withbaby.jpeg";
import withoutBabyImage from "../../images/withoutbaby.jpeg";
import withParentImage from "../../images/withparents.jpeg";
import { motion } from "motion/react";

export default function AboutUs() {
  const albumImages = [
    { src: withBabyImage, alt: "Baby resting peacefully in smart cradle" },
    { src: withoutBabyImage, alt: "Smart Nest Pro cradle without baby" },
    { src: withParentImage, alt: "Parent caring for baby in Smart Nest Pro" },
    { src: withoutBabyImage, alt: "Smart Nest Pro setup view in room" }
  ];

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
    <div id="about-us" className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text)]">
      <Navbar />
        <AboutSideNav />

      <main className="px-6 pt-3 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">Photo Album</h2>
            <p className="text-[var(--text)] mb-5">
              A quick look at Smart Nest Pro moments and setup.
            </p>

            <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow)] py-4">
              <div className="about-album-track flex gap-4 w-max px-4">
                {[...albumImages, ...albumImages].map((image, index) => (
                  <div
                    key={`${image.alt}-${index}`}
                    className="w-[320px] h-[190px] md:w-[420px] md:h-[240px] shrink-0 rounded-[var(--radius)] overflow-hidden border border-[var(--border)] bg-[var(--bg)]"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--white)] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--white)] to-transparent" />
            </div>
          </section>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-glass)] border border-[var(--border)] backdrop-blur rounded-full text-[var(--primary)] text-sm font-semibold mb-5">
            About Smart Nest Pro
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-5">
            Sleep Better, Parent Smarter
          </h1>
          <p className="text-[var(--text)] text-lg leading-relaxed mb-8 max-w-3xl">
            Smart Nest Pro helps parents build calmer routines using AI-driven
            insights, comfort automation, and a thoughtful product experience made
            for real homes and real schedules.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <div className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-6">
              <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-3">Our mission</h2>
              <p className="text-[var(--text)] leading-relaxed">
                Make baby care more informed and less stressful through simple,
                dependable assistance.
              </p>
            </div>

            <div className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-6">
              <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-3">What we build</h2>
              <p className="text-[var(--text)] leading-relaxed">
                A smart cradle system that combines monitoring, soothing support,
                and clear guidance for parents.
              </p>
            </div>

            <div className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-6">
              <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-3">Our approach</h2>
              <p className="text-[var(--text)] leading-relaxed">
                Safety-first design, practical automation, and continuous
                improvements based on parent feedback.
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-8 mb-8">
            <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">What we focus on</h2>
            <ul className="space-y-3 text-[var(--text)]">
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[var(--primary)]" />
                Comfort-first soothing and environment awareness.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[var(--primary)]" />
                Clear insights and parent-friendly interactions.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[var(--primary)]" />
                Ongoing improvement based on real feedback.
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 mb-20">
            <Link
              to="/survey"
              className="px-6 py-3 rounded-full font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-primary)] transition-all"
            >
              Take Survey
            </Link>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full font-semibold text-[var(--primary)] bg-[var(--bg-hover)] hover:bg-[var(--primary-light)] hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>

          {/* Contact Section */}
          <section id="contact" className="mt-16 scroll-mt-28">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-glass)] border border-[var(--border)] backdrop-blur rounded-full text-[var(--primary)] text-sm font-semibold mb-5">
              Contact Us
            </div>
            <h1 className="text-4xl font-bold text-[var(--text-dark)] mb-5">Let’s talk</h1>
            <p className="text-[var(--text)] text-lg leading-relaxed mb-6">
              Have questions about bulk orders, partnerships, or product support? Send
              us a message.
            </p>

            <div className="max-w-3xl bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-8">
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
          </section>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
