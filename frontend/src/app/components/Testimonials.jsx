import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Mother of 2',
    image: 'https://images.unsplash.com/photo-1665931500523-98ae696c47f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    quote: 'Smart Nest Pro has been a game-changer for our family. My baby sleeps through the night now, and I finally get the rest I need. The AI learning feature is incredible!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'First-time Dad',
    image: 'https://images.unsplash.com/photo-1650872466823-433d9e461b9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    quote: 'As a new parent, I was overwhelmed. This smart cradle took so much stress away. The app controls are intuitive, and knowing my baby is safe gives me peace of mind.',
    rating: 5
  },
  {
    name: 'Jessica Wong',
    role: 'Pediatric Nurse & Mom',
    image: 'https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    quote: 'Even as a healthcare professional, I\'m impressed by the safety features and thoughtful design. The temperature monitoring and sleep analytics are incredibly valuable.',
    rating: 5
  }
];

export function Testimonials() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animation - Targeting specific child elements
      gsap.from(".testimonials-header-el", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".testimonials-header",
          start: "top 90%",
          toggleActions: "play none none none",
        }
      });

      // 2. Cards Animation - Added immediateRender: false
      gsap.from(".testimonial-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      // 3. Stats Animation
      gsap.from(".stat-item", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 95%",
          toggleActions: "play none none none",
        }
      });
      
      // Refresh to ensure all trigger points are accurate
      ScrollTrigger.refresh();
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 px-6 bg-[var(--bg-secondary)] text-[var(--text)] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="testimonials-header text-center max-w-3xl mx-auto mb-16">
          <div className="testimonials-header-el inline-block px-4 py-2 
          bg-[var(--bg-glass)] rounded-full 
          text-[var(--primary)] text-sm font-medium mb-4 
          border border-[var(--border)]">
            Testimonials
          </div>

          <h2 className="testimonials-header-el text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-6">
            Loved by parents
            <br />
            <span className="text-[var(--primary)]">
              worldwide
            </span>
          </h2>

          <p className="testimonials-header-el text-xl text-[var(--text-light)]">
            Join thousands of happy families who have transformed their parenting experience.
          </p>
        </div>

        {/* Testimonials Grid */}
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

              {/* Rating */}
              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[var(--primary)] fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[var(--text)] leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
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
          <div className="stat-item text-center">
            <div className="text-4xl font-bold text-[var(--primary)] mb-2">
              50,000+
            </div>
            <div className="text-[var(--text-light)]">Happy Families</div>
          </div>

          <div className="stat-item text-center">
            <div className="text-4xl font-bold text-[var(--primary)] mb-2">
              4.9/5
            </div>
            <div className="text-[var(--text-light)]">Average Rating</div>
          </div>

          <div className="stat-item text-center">
            <div className="text-4xl font-bold text-[var(--primary)] mb-2">
              98%
            </div>
            <div className="text-[var(--text-light)]">Would Recommend</div>
          </div>

          <div className="stat-item text-center">
            <div className="text-4xl font-bold text-[var(--primary)] mb-2">
              24/7
            </div>
            <div className="text-[var(--text-light)]">Customer Support</div>
          </div>
        </div>

      </div>
    </section>
  );
}