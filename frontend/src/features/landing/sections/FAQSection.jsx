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
    <section id="faq" className="clay-section relative bg-(--bg-canvas) pt-14 pb-20 sm:pt-20 sm:pb-24 overflow-hidden z-10">
      <div className="max-w-3xl mx-auto clay-container relative z-10">
        
        {/* Section Header: Direct, Plain Language */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) leading-tight mb-3 text-center [text-wrap:balance] font-display">
            Frequently asked questions
          </h2>
          <p className="text-base sm:text-lg text-(--text-secondary) font-normal max-w-2xl mx-auto leading-relaxed text-center [text-wrap:pretty]">
            Direct answers about safety, sensors, and cradle features.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="clay-card-light bg-(--surface) border border-(--border-card) rounded-2xl overflow-hidden transition-[transform,box-shadow] duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-(--text-primary) tracking-tight [text-wrap:balance] font-display">
                    {item.question}
                  </span>

                  {/* Morphing Plus/Minus Button */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 border border-(--border-card) ${
                      isOpen
                        ? "bg-(--brand-accent) text-white"
                        : "bg-(--bg-canvas) text-(--brand-accent)"
                    }`}
                  >
                    <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                      <span className="absolute w-3.5 h-0.5 bg-current rounded-full" />
                      <span
                        className={`absolute w-3.5 h-0.5 bg-current rounded-full transition-transform duration-200 ${
                          isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100"
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Smooth Expansion */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-(--text-secondary) leading-relaxed border-t border-(--border-card) pt-3.5 font-normal [text-wrap:pretty]">
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
