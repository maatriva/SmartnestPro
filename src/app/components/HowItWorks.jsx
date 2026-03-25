import { Download, Settings, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from "motion/react";

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Setup & Connect',
    description: 'Unbox your Smart Nest Pro, plug it in, and connect to the mobile app in under 5 minutes.'
  },
  {
    number: '02',
    icon: Settings,
    title: 'Customize Settings',
    description: 'Set your preferences for rocking speed, music, temperature, and let AI learn your baby\'s patterns.'
  },
  {
    number: '03',
    icon: Zap,
    title: 'AI Takes Over',
    description: 'Our intelligent system automatically responds to your baby\'s needs with soothing motions and sounds.'
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Enjoy Peace of Mind',
    description: 'Relax knowing your baby is safe, comfortable, and sleeping soundly while you get the rest you deserve.'
  }
];

export function HowItWorks() {
  return (
    <section 
      id="how-it-works" 
      className="py-24 px-6 bg-white/50 backdrop-blur-sm text-[var(--text)] overflow-hidden"
    >
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
          bg-[var(--bg-glass)] rounded-full 
          text-[var(--primary)] text-sm font-medium mb-4 border border-[var(--border)]">
            How It Works
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-6">
            Get started in
            <br />
            <span className="text-[var(--primary)]">
              4 simple steps
            </span>
          </h2>

          <p className="text-xl text-[var(--text-light)]">
            From unboxing to sweet dreams, we've made it incredibly easy to set up and use.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">

          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] 
          bg-[var(--border)] -translate-y-1/2"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >

                <div className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] p-8 
                border border-[var(--border)] 
                shadow-[var(--shadow)] hover:shadow-lg transition-all 
                hover:-translate-y-1 duration-300">

                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 
                  bg-[var(--primary)] rounded-full 
                  flex items-center justify-center text-white font-bold 
                  shadow-[var(--shadow-primary)]">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-4">
                    <div className="inline-flex p-4 
                    bg-[var(--primary-light)] rounded-2xl">
                      <step.icon
                        className="w-8 h-8 text-[var(--primary)]"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-[var(--text-light)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}