import { Star, Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Mother of 2",
    image:
      "https://images.unsplash.com/photo-1665931500523-98ae696c47f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    quote:
      "Smart Nest Pro has been a game-changer for our family. My baby sleeps through the night now, and I finally get the rest I need. The AI learning feature is incredible!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "First-time Dad",
    image:
      "https://images.unsplash.com/photo-1650872466823-433d9e461b9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    quote:
      "As a new parent, I was overwhelmed. This smart cradle took so much stress away. The app controls are intuitive, and knowing my baby is safe gives me peace of mind.",
    rating: 5,
  },
  {
    name: "Jessica Wong",
    role: "Pediatric Nurse & Mom",
    image:
      "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    quote:
      "Even as a healthcare professional, I'm impressed by the safety features and thoughtful design. The temperature monitoring and sleep analytics are incredibly valuable.",
    rating: 5,
  },
];

export function Testimonials() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ✅ Header Animation (FIXED)
      gsap.fromTo(
        ".testimonials-header > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonials-header",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // ✅ Cards Animation (FIXED)
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // ✅ Stats Animation (FIXED)
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

    }, sectionRef);

    // 🔥 Important fix
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 px-6 bg-[var(--bg-secondary)] text-[var(--text)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="testimonials-header text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 
          bg-[var(--bg-glass)] rounded-full 
          text-[var(--primary)] text-sm font-medium mb-4 
          border border-[var(--border)]">
            Testimonials
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-6">
            Loved by parents
            <br />
            <span className="text-[var(--primary)]">
              worldwide
            </span>
          </h2>

          <p className="text-xl text-[var(--text-light)]">
            Join thousands of happy families who have transformed their parenting experience.
          </p>
        </div>

        {/* Grid */}
        <div className="testimonials-grid grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-[var(--bg)] rounded-[var(--radius-lg)] p-8 
              border border-[var(--border)] shadow-[var(--shadow)] 
              hover:shadow-lg transition-all relative"
            >

              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 
              bg-[var(--primary)] rounded-full flex items-center justify-center 
              shadow-[var(--shadow-primary)]">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[var(--primary)] fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[var(--text)] leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4 pt-4 border-t border-[var(--border)]">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-[var(--text-dark)]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-[var(--text-light)]">
                    {testimonial.role}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="stats-grid mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["50,000+", "Happy Families"],
            ["4.9/5", "Average Rating"],
            ["98%", "Would Recommend"],
            ["24/7", "Customer Support"],
          ].map(([value, label], i) => (
            <div key={i} className="stat-item text-center">
              <div className="text-4xl font-bold text-[var(--primary)] mb-2">
                {value}
              </div>
              <div className="text-[var(--text-light)]">{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}