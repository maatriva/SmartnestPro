import { useState } from "react";
import { Link } from "react-router-dom";
import { Baby, Heart, Linkedin, Sparkles, Wind } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import withBabyImage from "../../images/withbaby.jpeg";
import withoutBabyImage from "../../images/withoutbaby.jpeg";
import withParentImage from "../../images/withParents.jpeg";
import Arman from "../../images/Arman.png"
import Arghya from "../../images/Arghya.png"
import Kirtik from "../../images/Kirtik.png"
import Rahul from "../../images/rahul.jpeg"
import Vishavjeet from "../../images/Vishavjeet.png"

export default function AboutUs() {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (name) => {
    setExpandedCards(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const scienceCards = [
    {
      icon: Wind,
      title: "Breathable Materials",
      copy: "Medical-grade comfort layers are designed for steady airflow, reducing heat buildup while maintaining a soft, secure nest.",
    },
    {
      icon: Sparkles,
      title: "Smart Motion Tech",
      copy: "Whisper-quiet movement patterns mimic natural soothing rhythms, helping babies settle without disrupting the room.",
    },
    {
      icon: Baby,
      title: "Cry-Detection AI",
      copy: "Responsive alerts help parents understand discomfort, hunger, and sleep cues with more confidence.",
    },
  ];

  const team = [
    {
      name: "Arghya Pratim Ghosh",
      role: "Founder & Hardware lead",
      isFounder: true,
      isCoFounder: false,
      image: Arghya,
      objectPosition: "object-[center_20%]",
      linkedin: "https://www.linkedin.com/in/arghyapratimghosh ",
      copy: "Leads the development of smart hardware systems, ensuring reliability, innovation, and seamless integration.",
    },
    {
      name: "Rahul Kumar Ghosh",
      role: "AI & Robotics Specialist",
      isFounder: false,
      isCoFounder: true,
      image: Rahul,
      objectPosition: "object-center",
      linkedin: "https://www.linkedin.com/in/rahul-kumar-ghosh ",
      copy: "Builds advanced AI solutions to enhance safety, monitoring, and user experiences.",
    },
    {
      name: "Kirtik Biswas",
      role: "Marketing & AI Specialist",
      isFounder: false,
      isCoFounder: true,
      image: Kirtik,
      objectPosition: "object-[center_20%]",
      linkedin: "https://www.linkedin.com/in/kirtikbiswas ",
      copy: "Combines AI innovation with strategic marketing to create impactful solutions that enhance baby care and connect meaningfully with parents.",
    },
    {
      name: "Vishavjeet Chauhan",
      role: "Creative Head",
      isFounder: false,
      isCoFounder: true,
      image: Vishavjeet,
      objectPosition: "object-center",
      linkedin: "https://www.linkedin.com/in/vishavjeet-chauhan-140b88335 ",
      copy: "Shapes the creative vision of Maatriva, crafting engaging experiences that are innovative, meaningful, and user-focused.",
    },{
      name: "Arman Sharma",
      role: "Web & App Developer",
      isFounder: false,
      isCoFounder: true,
      image: Arman,
      objectPosition: "object-[center_20%]",
      linkedin: "https://www.linkedin.com/in/arman-sharma-0a875a32a ",
      copy: "Builds intuitive web and mobile applications that bring Maatriva's smart baby care solutions to parents everywhere.",
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text)] fade-in pb-20">
      <main className="space-y-20">
        <section className="relative min-h-[720px] md:min-h-[760px] pt-36 flex items-end overflow-hidden">
          <img
            src={withParentImage}
            alt="Parents resting with their baby"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 pb-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
                Redefining the First Dreams.
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg leading-8 text-white/90">
                A warm, inviting introduction to our mission of safe, smart
                sleep. At Maatriva, we believe every infant deserves a sanctuary
                of peace, and every parent deserves the confidence that comes
                with protective innovation.
              </p>
              <Link
                to="/#features"
                className="mt-9 inline-flex min-h-12 items-center clay-btn clay-btn-primary clay-btn-darkbg px-8 text-sm text-white"
              >
                Discover the Innovation
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Section 2: The Genesis */}
        <section className="px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl clay-card p-8 sm:p-12 lg:p-16 grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-block px-3 py-1.5 clay-badge text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                The Genesis
              </div>
              <h2 className="mt-5 text-3xl font-black leading-tight text-[var(--text-dark)] sm:text-4xl">
                Born from a Parent's Love
              </h2>
              <p className="mt-7 text-base leading-8 text-[var(--text)]">
                Maatriva started from a fundamental parent's need for better
                rest and baby safety. Our founders, navigating the exhausted fog
                of early parenthood, realized that sleep technology had not kept
                pace with our understanding of infant wellness.
              </p>
              <p className="mt-5 text-base leading-8 text-[var(--text)]">
                Driven by curiosity, creativity, and a vision for smarter parenting, we created Maatriva to explore how technology can make baby care safer, simpler, and more connected. Our goal is to build innovative solutions that support families through every step of their parenting journey.

              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full clay-badge text-[var(--text-dark)]">
                  <Heart size={20} />
                </div>
                <p className="text-sm italic text-[var(--text-dark)]">
                  "Nurturing is our nature, innovation is our instrument."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="overflow-hidden clay-card w-full p-2"
            >
              <img
                src={withoutBabyImage}
                alt="Smart Maatriva cradle in a nursery"
                className="h-[360px] w-full object-cover sm:h-[480px] lg:h-[560px] rounded-2xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Section 3: Science & Safety */}
        <section className="px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl clay-card p-8 sm:p-12 lg:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black text-[var(--text-dark)] sm:text-4xl">
                The Science & Safety
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text)] font-semibold">
                We leverage advanced robotics and AI to ensure your baby's
                safety and comfort, grounded in clinical research.
              </p>
            </div>

            <div className="mt-14 grid gap-7 md:grid-cols-3">
              {scienceCards.map(({ icon: Icon, title, copy }, index) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="clay-card p-8 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center clay-badge text-[var(--text-dark)]">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-7 text-xl font-black text-[var(--text-dark)]">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text)]">
                    {copy}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Our Experts */}
        <section className="px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl clay-card p-8 sm:p-12 lg:p-16">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <div className="inline-block px-3 py-1.5 clay-badge text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  The Minds Behind Maatriva
                </div>
                <h2 className="mt-5 text-3xl font-black leading-tight text-[var(--text-dark)] sm:text-4xl">
                  Meet the Visionaries Behind Maatriva
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[var(--text)] lg:ml-auto font-semibold">
                A team of aspiring developers and innovators building the future of baby care through technology and AI.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {team.map((member, index) => (
                <motion.article
                  key={member.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.07 }}
                  className="flex"
                >
                  <motion.div
                    layout
                    className="relative flex w-full flex-col flex-1 items-center clay-card px-7 py-9 text-center text-[var(--text)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    {(member.isFounder || member.isCoFounder) && (
                      <motion.span layout className="absolute left-5 top-5 rounded-full clay-badge px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em]">
                        {member.isFounder ? "Founder" : "Co-Founder"}
                      </motion.span>
                    )}
                    <motion.div layout className="mt-8 flex h-28 w-28 items-center justify-center rounded-full clay-badge p-1 shadow-[inset_3px_3px_6px_rgba(255,255,255,0.7),_inset_-3px_-3px_6px_rgba(0,0,0,0.15),_0_8px_16px_rgba(0,0,0,0.08)]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`h-full w-full rounded-full object-cover ${member.objectPosition || 'object-center'}`}
                      />
                    </motion.div>
                    <motion.div layout className="mt-8 w-full flex flex-col items-center">
                      <h3 className="text-2xl font-black leading-tight text-[var(--text-dark)]">
                        {member.name}
                      </h3>
                      <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--primary)]">
                        {member.role}
                      </p>
                    </motion.div>
                    
                    <motion.button
                      layout
                      onClick={() => toggleCard(member.name)}
                      className={`mt-4 text-xs font-black uppercase tracking-wider text-blue-500 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer ${!expandedCards[member.name] ? 'mt-auto' : ''}`}
                    >
                      {expandedCards[member.name] ? "Show Less" : "Know More.."}
                    </motion.button>

                    <AnimatePresence>
                      {expandedCards[member.name] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="w-full overflow-hidden flex flex-col items-center flex-1"
                        >
                          <p className="mt-6 text-left text-sm font-semibold leading-6 text-[var(--text)]">
                            {member.copy}
                          </p>
                          <div className="mt-auto pt-6">
                            <a
                              href={member.linkedin || "https://www.linkedin.com/company/maatriva/"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-11 w-11 items-center justify-center clay-badge text-[var(--primary)] hover:scale-110 cursor-pointer"
                              aria-label={`${member.name} LinkedIn profile`}
                            >
                              <Linkedin size={18} strokeWidth={2} />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
