import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Sparkles, 
  Baby, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  AlertTriangle, 
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import supportingParentsImage from "../../images/supportingParents.jpg";

export default function SupportingParents() {
  const sectionRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="supporting-parents"
      ref={sectionRef}
      className="py-24 px-6 clay-even-section text-(--text) overflow-hidden relative"
    >
      {/* Decorative Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-(--primary) opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-(--primary) opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 clay-badge text-sm font-bold mb-4">
            Beyond Tech
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-(--text-dark) mb-6">
            Supporting Parents
            <br />
            <span className="text-(--primary)">Beyond Technology</span>
          </h2>
          <p className="text-xl text-(--text-light)">
            Your AI Parenting Companion — 24/7 intelligent guidance, monitoring, and reassurance for both babies and parents.
          </p>
        </motion.div>

        {/* Upper Row: 50/50 Grid with reduced gap (gap-6 lg:gap-8) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          
          {/* Left Side: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="clay-card p-4 bg-white/50 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl overflow-hidden"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10]">
              <img
                src={supportingParentsImage}
                alt="Your AI Parenting Companion"
                width="1200"
                height="800"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-85" />
              
              {/* Floating Badge/Info on Image */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                  Inside Maatriva
                </span>
                <h3 className="text-lg font-bold">Comprehensive Care Ecosystem</h3>
                <p className="text-xs text-white/85 mt-1">Connecting infant monitoring with caregiver mental wellness.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Title, Intro & Learn More Button */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl sm:text-4xl font-extrabold text-(--text-dark) leading-tight">
              Meet the MAATRIVA AI Assistant
            </h3>
            <p className="text-lg text-(--text) leading-relaxed">
              More than just a smart cradle, the MAATRIVA Smart Cradle comes with an intelligent AI Assistant designed to support parents throughout their caregiving journey. Available 24/7 through chat and voice interaction, it transforms complex infant data into simple, actionable insights, helping families make informed decisions with confidence.
            </p>
            
            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="clay-btn clay-btn-primary px-8 py-3.5 text-sm flex items-center gap-2 hover:cursor-pointer transition-all duration-300"
              >
                <span>{isExpanded ? "Show Less" : "Learn More"}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

        </div>

        {/* Lower Row: Full-Width Details Block */}
        <motion.div
          initial={false}
          animate={{ 
            height: isExpanded ? "auto" : 0, 
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 48 : 0,
            paddingTop: isExpanded ? 48 : 0,
            borderTopColor: isExpanded ? "rgba(229, 231, 235, 0.4)" : "rgba(229, 231, 235, 0)"
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden w-full space-y-16 border-t"
        >
          
          {/* Maternal Wellbeing Section (3 columns on desktop) - Delayed 1s */}
          <motion.div 
            animate={{
              y: isExpanded ? 0 : 20,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.4, delay: isExpanded ? 1.0 : 0, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 border-b border-(--border) pb-4">
              <div className="p-2.5 rounded-xl bg-pink-100/80 text-pink-500">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold text-(--text-dark)">
                Supporting Maternal Wellbeing
              </h4>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: Anxiety */}
              <div className="clay-card p-6 flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-white/60 text-pink-500 shadow-sm flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-(--text-dark) mb-2">Reducing Postpartum Anxiety</h5>
                    <p className="text-(--text) text-sm leading-relaxed">
                      Continuous monitoring of breathing patterns, heart rate, sleep quality, and environmental conditions provides parents with real-time reassurance. By minimizing unnecessary alerts and delivering clear explanations, the AI helps reduce stress and late-night worry.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Warning Signs */}
              <div className="clay-card p-6 flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-white/60 text-pink-500 shadow-sm flex-shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-(--text-dark) mb-2">Helping Detect Early Warning Signs</h5>
                    <p className="text-(--text) text-sm leading-relaxed">
                      The AI performs regular wellness check-ins and monitors caregiver interaction patterns. If signs of parental exhaustion or emotional distress are detected, the system can encourage support-seeking behaviors and notify trusted caregivers when needed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Compassionate Guidance */}
              <div className="clay-card p-6 flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-white/60 text-pink-500 shadow-sm flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-(--text-dark) mb-2">Compassionate Guidance</h5>
                    <p className="text-(--text) text-sm leading-relaxed">
                      For mothers facing postpartum depression, anxiety, or emotional overwhelm, the assistant provides calm, evidence-based guidance, helping reduce uncertainty and making infant care feel more manageable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Empowering First-Time Parents Section (4 columns on desktop) - Delayed 1.1s */}
          <motion.div 
            animate={{
              y: isExpanded ? 0 : 20,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.4, delay: isExpanded ? 1.1 : 0, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 border-b border-(--border) pb-4">
              <div className="p-2.5 rounded-xl bg-(--primary)/10 text-(--primary)">
                <Baby className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold text-(--text-dark)">
                Empowering First-Time Parents
              </h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Cry analysis */}
              <div className="clay-card p-6">
                <h5 className="font-bold text-base text-(--text-dark) mb-2">Understand Every Cry</h5>
                <p className="text-(--text) text-sm leading-relaxed">
                  Advanced cry analysis helps identify whether a baby may be hungry, uncomfortable, tired, or in distress, reducing guesswork and helping parents respond faster.
                </p>
              </div>

              {/* Learn As Your Baby Grows */}
              <div className="clay-card p-6">
                <h5 className="font-bold text-base text-(--text-dark) mb-2">Learn As Your Baby Grows</h5>
                <p className="text-(--text) text-sm leading-relaxed">
                  Receive personalized developmental insights, milestone tracking, feeding reminders, and age-appropriate parenting guidance tailored to your baby's growth stage.
                </p>
              </div>

              {/* Simple Health Insights */}
              <div className="clay-card p-6">
                <h5 className="font-bold text-base text-(--text-dark) mb-2">Simple Health Insights</h5>
                <p className="text-(--text) text-sm leading-relaxed">
                  Instead of overwhelming medical data, the assistant explains infant health metrics in easy-to-understand language, helping parents know what is normal and when professional medical attention may be needed.
                </p>
              </div>

              {/* 24/7 Parenting Support */}
              <div className="clay-card p-6">
                <h5 className="font-bold text-base text-(--text-dark) mb-2">24/7 Parenting Support</h5>
                <p className="text-(--text) text-sm leading-relaxed">
                  Whether it's 2 PM or 2 AM, the MAATRIVA AI Assistant is always available to answer questions, provide guidance, and offer reassurance when parents need it most.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Two Levels of Intelligence Section (2 columns on desktop) - Delayed 1.2s */}
          <motion.div 
            animate={{
              y: isExpanded ? 0 : 20,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.4, delay: isExpanded ? 1.2 : 0, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 border-b border-(--border) pb-4">
              <div className="p-2.5 rounded-xl bg-(--primary)/10 text-(--primary)">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold text-(--text-dark)">
                Two Levels of Intelligence
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Chat Assistant */}
              <div className="clay-card p-6 border border-white bg-white/70">
                <h5 className="font-bold text-lg text-(--text-dark) mb-1">MAATRIVA Chat Assistant</h5>
                <p className="text-xs text-(--text-light) mb-6">Everyday support on the go</p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-sm text-(--text)">
                    <div className="mt-0.5 rounded-full p-0.5 bg-(--primary)/10 text-(--primary) flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Parenting guidance and support</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-(--text)">
                    <div className="mt-0.5 rounded-full p-0.5 bg-(--primary)/10 text-(--primary) flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Developmental milestone tracking</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-(--text)">
                    <div className="mt-0.5 rounded-full p-0.5 bg-(--primary)/10 text-(--primary) flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Feeding and sleep recommendations</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-(--text)">
                    <div className="mt-0.5 rounded-full p-0.5 bg-(--primary)/10 text-(--primary) flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Everyday caregiving assistance</span>
                  </li>
                </ul>
              </div>

              {/* Voice Assistant Pro */}
              <div className="clay-card p-6 border border-white bg-white/70 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-(--primary)/5 rounded-full blur-xl" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="font-bold text-lg text-(--text-dark)">MAATRIVA Voice Assistant</h5>
                    <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-(--primary)/10 text-(--primary) rounded-full">
                      Pro Version
                    </span>
                  </div>
                  <p className="text-xs text-(--text-light) mb-6">Advanced real-time intelligence</p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5 text-sm text-(--text)">
                      <div className="mt-0.5 rounded-full p-0.5 bg-(--primary)/10 text-(--primary) flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Real-time voice interaction</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-(--text)">
                      <div className="mt-0.5 rounded-full p-0.5 bg-(--primary)/10 text-(--primary) flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Advanced health monitoring</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-(--text)">
                      <div className="mt-0.5 rounded-full p-0.5 bg-(--primary)/10 text-(--primary) flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Illness-risk prediction support</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-(--text)">
                      <div className="mt-0.5 rounded-full p-0.5 bg-(--primary)/10 text-(--primary) flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Intelligent emergency escalation</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-(--text)">
                      <div className="mt-0.5 rounded-full p-0.5 bg-(--primary)/10 text-(--primary) flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Enhanced personalized recommendations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom/Footer banner - Delayed 1.3s */}
          <motion.div 
            animate={{
              y: isExpanded ? 0 : 20,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.4, delay: isExpanded ? 1.3 : 0, ease: "easeOut" }}
            className="clay-card p-6 border border-white bg-white/40 backdrop-blur-md rounded-2xl text-center"
          >
            <p className="text-(--text-dark) font-medium leading-relaxed">
              With <strong>MAATRIVA</strong>, parents don't just monitor their baby's wellbeing — they gain a trusted companion that provides reassurance, guidance, and support every step of the way.
            </p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
