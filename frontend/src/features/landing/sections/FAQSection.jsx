import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "How does Maatriva's AI cry translation work?",
    answer:
      "Our cradle uses an advanced acoustic recognition algorithm that analyzes infant crying frequencies, acoustic rhythms, and pitch variations. It categorizes cries into 4 primary states—Hunger, Fatigue, Colic/Discomfort, or a Wet Diaper—giving parents clear guidance in seconds.",
  },
  {
    question: "Is contactless infant monitoring completely safe?",
    answer:
      "Yes, 100%. Unlike wearables that require straps or skin contact, Maatriva relies exclusively on contactless sensors, passive optical monitoring, and medical-grade ambient temperature tracking. There are zero wearable electrodes or uncomfortable attachments touching your baby.",
  },
  {
    question: "Does the cradle replace pediatric medical care?",
    answer:
      "No. Maatriva is designed as a companion monitoring and soothing layer to support rested, informed parenting. It detects subtle vital trends and sleep cues, but is not a diagnostic device and does not replace regular pediatric consultations or emergency medical services.",
  },
  {
    question: "What happens if our home Wi-Fi disconnects?",
    answer:
      "The cradle’s onboard Edge AI controller continues automated motion soothing and local lullaby playback uninterrupted using built-in offline algorithms. When Wi-Fi reconnects, all sleep logs and vital trends sync seamlessly to the mobile app.",
  },
  {
    question: "Can multiple caregivers access the mobile dashboard?",
    answer:
      "Yes. The Maatriva companion app offers multi-user caregiver access with granular permissions, allowing parents, grandparents, and pediatric caretakers to monitor live vitals, soothing controls, and nightly sleep records.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="clay-section relative bg-(--bg-secondary)">
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 -left-24 w-80 h-80 bg-(--honey-gold) opacity-15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-(--rose-clay) opacity-20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto clay-container relative z-10">
        
        {/* Section Header */}
        <div className="clay-section-header">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full clay-badge text-xs sm:text-sm font-bold mb-3">
            <HelpCircle size={15} className="text-(--primary)" />
            <span>Parent Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight mb-3">
            Frequently Asked
            <br />
            <span className="text-(--primary)">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-(--text-light) font-medium max-w-2xl mx-auto leading-relaxed">
            Clear, honest answers to help you make informed decisions for your newborn.
          </p>
        </div>

        {/* Accordion List with Clay Plus/Minus Morph */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="clay-card overflow-hidden transition-transform duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-bold text-(--text-dark) tracking-tight">
                    {item.question}
                  </span>

                  {/* Morphing Clay Plus/Minus Button */}
                  <div
                    className={`w-10 h-10 rounded-full clay-badge flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-(--primary) text-white rotate-180"
                        : "text-(--primary) hover:scale-105"
                    }`}
                  >
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      {/* Horizontal bar */}
                      <span className="absolute w-4 h-0.5 bg-current rounded-full transition-transform duration-300" />
                      {/* Vertical bar morphs into minus by rotating 90deg */}
                      <span
                        className={`absolute w-4 h-0.5 bg-current rounded-full transition-transform duration-300 ${
                          isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100"
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Smooth 60fps Grid Expansion */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-(--text) leading-relaxed border-t border-(--border)/30 pt-4 font-medium">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
