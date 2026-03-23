import { Download, Settings, Zap, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Setup & Connect',
    description: 'Unbox your Smart Nest Pro, plug it in, and connect to the mobile app in under 5 minutes.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    number: '02',
    icon: Settings,
    title: 'Customize Settings',
    description: 'Set your preferences for rocking speed, music, temperature, and let AI learn your baby\'s patterns.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '03',
    icon: Zap,
    title: 'AI Takes Over',
    description: 'Our intelligent system automatically responds to your baby\'s needs with soothing motions and sounds.',
    color: 'from-pink-500 to-pink-600'
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Enjoy Peace of Mind',
    description: 'Relax knowing your baby is safe, comfortable, and sleeping soundly while you get the rest you deserve.',
    color: 'from-green-500 to-green-600'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get started in
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              4 simple steps
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            From unboxing to sweet dreams, we've made it incredibly easy to set up and use.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200  via-pink-200 to-green-200 -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all">
                  {/* Step Number */}
                  <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-4">
                    <div className={`inline-flex p-4 bg-gradient-to-r ${step.color} rounded-2xl`}>
                      <step.icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
