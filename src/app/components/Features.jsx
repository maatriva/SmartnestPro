import { Brain, Moon, Smartphone, Shield, Music, ThermometerSun } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Learning',
    description: 'Adapts to your baby\'s unique sleep patterns and preferences over time.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Moon,
    title: 'Smart Soothing',
    description: 'Automatic rocking, white noise, and lullabies when baby needs comfort.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: Smartphone,
    title: 'App Control',
    description: 'Monitor and control everything from your phone, anywhere, anytime.',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-100'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Medical-grade materials with built-in safety sensors and alerts.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Music,
    title: 'Sound Library',
    description: '100+ curated lullabies and white noise options for better sleep.',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  {
    icon: ThermometerSun,
    title: 'Climate Control',
    description: 'Monitors temperature and humidity for optimal sleeping conditions.',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-100'
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need for
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              peaceful parenting
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Cutting-edge technology designed with your baby's comfort and your peace of mind at heart.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} strokeWidth={2.5} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative gradient */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
