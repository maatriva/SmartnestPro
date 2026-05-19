import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import withBabyImage from "../../images/withbaby.jpeg";
import withoutBabyImage from "../../images/withoutbaby.jpeg";
import withParentImage from "../../images/withParents.jpeg";

import { motion } from "motion/react";

export default function AboutUs() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // Hide the Lottie animation after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const move = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  const gallery = [
    {
      src: withBabyImage,
      title: "AI Sleep Monitoring",
    },
    {
      src: withoutBabyImage,
      title: "Smart Cradle Design",
    },
    {
      src: withParentImage,
      title: "Parent Interaction",
    },
  ];

  const monitoring = [
    "Heart Rate Monitoring",
    "Breathing Analysis",
    "Sleep Stage Detection",
    "Body Posture Tracking",
    "Cry Classification",
    "Temperature Analysis",
    "Mood Detection",
    "Air Quality Monitoring",
  ];

  if (showAnimation) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--bg)] z-50">
        <div className="w-64 h-64 md:w-96 md:h-96">
          {/* Replace this path with your actual animation URL or path */}
          <DotLottieReact
            src="path/to/animation.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-secondary)] text-[var(--text)] fade-in">
      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,var(--text)_1px,transparent_1px),linear-gradient(to_bottom,var(--text)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* ================= CURSOR LIGHT ================= */}

      <div className="pointer-events-none fixed inset-0 z-10">
        <motion.div
          animate={{
            x: mousePosition.x - 200,
            y: mousePosition.y - 200,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 120,
          }}
          className="absolute w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl"
        />
      </div>

      {/* ================= FLOATING BLURS ================= */}

      <motion.div
        animate={{
          y: [0, -40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[var(--primary)] opacity-10 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[var(--primary)] opacity-10 blur-3xl"
      />

      <main className="relative z-20 px-6 pb-24 -mt-12 md:-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* ================= HERO SECTION ================= */}

          <section className="flex pt-8 pb-16">
            <div className="grid lg:grid-cols-2 gap-16 items-start w-full">
              {/* LEFT SIDE */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -80,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1,
                }}
              >
                <div className="inline-flex items-center gap-3 px-5  rounded-full border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl mb-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="w-2 h-2 rounded-full bg-[var(--primary)]"
                  />

                  <span className="text-sm font-semibold text-[var(--primary)]">
                    Maatriva
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] text-[var(--text-dark)] flex flex-col gap-2">
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  >
                    Future
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  >
                    Baby Care
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-blue-500"
                  >
                    Experience
                  </motion.span>
                </h1>

                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.4,
                  }}
                  className="mt-8 text-lg leading-relaxed text-[var(--text)] max-w-xl"
                >
                  AI-powered monitoring, intelligent comfort automation, and
                  futuristic clinical insights for safer parenting.
                </motion.p>

                {/* BUTTONS */}

                <div className="flex flex-wrap items-center gap-5 mt-10">
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                  >
                    <Link
                      to="/survey"
                      className="group relative overflow-hidden px-8 py-4 rounded-full bg-[var(--primary)] text-white font-semibold shadow-[var(--shadow-primary)] inline-flex items-center justify-center"
                    >
                      <span className="relative z-10">
                        Take Survey
                      </span>

                      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition duration-500 bg-white/10" />
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                  >
                    <Link
                      to="/#features"
                      className="px-8 py-4 rounded-full border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl inline-flex items-center justify-center font-medium"
                    >
                      Explore Features
                    </Link>
                  </motion.div>
                </div>

                {/* LIVE MONITORING */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 60,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.6,
                  }}
                  className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {monitoring.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        x: 8,
                        scale: 1.02,
                      }}
                      className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl p-4"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                        className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]"
                      />

                      <span className="text-sm">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* RIGHT SIDE */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 80,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1,
                }}
                className="relative lg:mt-[68px]"
              >
                {/* MAIN IMAGE */}

                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                  className="relative rounded-[40px] overflow-hidden border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-2xl shadow-[var(--shadow)]"
                >
                  <img
                    src={withBabyImage}
                    alt="Maatriva"
                    className="w-full h-[500px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* FLOATING CARD */}

                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="absolute top-6 left-6 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-5"
                  >
                    <p className="text-white/70 text-sm">
                      Sleep Analysis
                    </p>

                    <h3 className="text-4xl font-black text-white">
                      96%
                    </h3>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                    }}
                    className="absolute bottom-6 right-6 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-5"
                  >
                    <p className="text-white/70 text-sm">
                      Live Monitoring
                    </p>

                    <h3 className="text-2xl font-bold text-white">
                      Active
                    </h3>
                  </motion.div>
                </motion.div>

                {/* SMALL FLOATING IMAGE */}

                <motion.div
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="hidden md:block absolute -bottom-10 -left-10 w-[240px] rounded-[30px] overflow-hidden border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-2xl shadow-[var(--shadow)]"
                >
                  <img
                    src={withoutBabyImage}
                    alt="Smart Cradle"
                    className="w-full h-[180px] object-cover"
                  />

                  <div className="p-5">
                    <h3 className="font-bold text-[var(--text-dark)]">
                      Smart Comfort
                    </h3>

                    <p className="text-sm mt-2 text-[var(--text)]">
                      AI adaptive automation
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ================= MISSION SECTION ================= */}
          <section className="py-10 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl">
                  <span className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">
                    Our Vision
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[var(--text-dark)]">
                  Redefining Peace of Mind for Parents
                </h2>
                <p className="text-lg text-[var(--text)] leading-relaxed">
                  We are a team of passionate engineers, designers, and parents dedicated to revolutionizing baby care. Our goal is to provide peace of mind to parents through cutting-edge AI and smart technology.
                </p>
                <p className="text-lg text-[var(--text)] leading-relaxed">
                  We believe that every child deserves the safest and most comfortable sleep environment, and every parent deserves to rest easy knowing their little one is protected by the most advanced monitoring systems available.
                </p>

                <div className="flex flex-wrap gap-4 pt-6">
                  {[
                    { value: "24/7", label: "Monitoring" },
                    { value: "100%", label: "Safe & Secure" },
                    { value: "AI", label: "Powered Insights" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="flex-1 min-w-[120px] p-5 rounded-3xl bg-[var(--bg-glass)] border border-[var(--border)] backdrop-blur-xl shadow-lg text-center"
                    >
                      <h4 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-blue-500 mb-1">{stat.value}</h4>
                      <p className="text-sm font-medium text-[var(--text)]">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, type: "spring" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)] to-blue-500 opacity-20 blur-3xl rounded-full" />
                <div className="relative rounded-[40px] overflow-hidden border border-[var(--border)] p-3 bg-[var(--bg-glass)] backdrop-blur-xl shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                  <img src={withParentImage} alt="Parents with baby" className="w-full h-[450px] object-cover rounded-[32px] hover:scale-105 transition-transform duration-700" />

                  {/* Floating badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-6 -left-6 bg-[var(--bg-secondary)] rounded-2xl p-4 shadow-xl border border-[var(--border)] flex items-center gap-4 z-20"
                  >
                    {/* <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div> */}
                    {/* <div>
                      <p className="text-sm font-bold text-[var(--text-dark)]">Trusted by</p>
                      <p className="text-xs text-[var(--text)]">10,000+ Parents</p>
                    </div> */}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ================= GALLERY SECTION ================= */}

          <section className="py-2">
            <div className="text-center mb-16">
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                className="text-5xl font-black text-[var(--text-dark)]"
              >
                Smart Experience
              </motion.h2>

              <p className="mt-5 text-lg text-[var(--text)]">
                Intelligent design with futuristic interactions.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.2,
                  }}
                  whileHover={{
                    y: -15,
                  }}
                  className="group relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--bg-glass)] shadow-[var(--shadow)]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-[320px] object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[var(--text-dark)]">
                      {image.title}
                    </h3>

                    <div className="mt-4 flex items-center gap-2">
                      <motion.div
                        animate={{
                          scale: [1, 1.4, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="w-2 h-2 rounded-full bg-[var(--primary)]"
                      />

                      <span className="text-sm text-[var(--text)]">
                        Active AI Detection
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/5 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}