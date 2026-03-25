import { Brain, Moon, Smartphone, Shield, Music, ThermometerSun } from 'lucide-react';
import { motion } from "motion/react";

const features = [
  {
    icon: Brain,
    title: 'AI Learning',
    description: 'Adapts to your baby\'s unique sleep patterns and preferences over time.'
  },
  {
    icon: Moon,
    title: 'Smart Soothing',
    description: 'Automatic rocking, white noise, and lullabies when baby needs comfort.'
  },
  {
    icon: Smartphone,
    title: 'App Control',
    description: 'Monitor and control everything from your phone, anywhere, anytime.'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Medical-grade materials with built-in safety sensors and alerts.'
  },
  {
    icon: Music,
    title: 'Sound Library',
    description: '100+ curated lullabies and white noise options for better sleep.'
  },
  {
    icon: ThermometerSun,
    title: 'Climate Control',
    description: 'Monitors temperature and humidity for optimal sleeping conditions.'
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-[var(--bg-secondary)] text-[var(--text)] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 
          bg-[var(--bg-secondary)] rounded-full 
          text-[var(--primary)] text-sm font-medium mb-4">
            Features
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-6">
            Everything you need for
            <br />
            <span className="text-[var(--primary)]">
              peaceful parenting
            </span>
          </h2>

          <p className="text-xl text-[var(--text-light)]">
            Cutting-edge technology designed with your baby's comfort and your peace of mind at heart.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative 
              bg-[var(--bg-glass)] 
              rounded-[var(--radius-lg)] p-8 
              border border-[var(--border)] 
              hover:shadow-[var(--shadow)] 
              transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 
              bg-[var(--primary-light)] 
              rounded-2xl flex items-center justify-center mb-6 
              group-hover:scale-110 transition-transform">

                <feature.icon
                  className="w-8 h-8 text-[var(--primary)]"
                  strokeWidth={2.5}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-light)] leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 
              bg-[var(--primary)] rounded-b-[var(--radius-lg)] 
              opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}