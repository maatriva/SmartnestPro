import { ArrowRight, Sparkles } from "lucide-react";
import WithBaby from "../images/withbaby.jpeg";
// import mainVid from "../video/Smart_Elephant_Cradle_Baby_Monitor_Ad.mp4";
import { useEffect, useRef } from "react";

export function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, []);

  return (
    <section id="home" className="relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32 
      bg-[var(--bg-secondary)] rounded-[var(--radius-lg)]">

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">

            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 
            bg-[var(--bg-glass)] backdrop-blur-sm rounded-full border border-[var(--border)]">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm text-[var(--text)]">
                AI-Powered Baby Care
              </span> 
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-[var(--text-dark)] leading-tight">
              Sleep Better,
              <br />
              <span className="text-[var(--primary)]">
                Parent Smarter
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-[var(--text-dark)] leading-relaxed">
              The world's first AI-powered smart cradle that learns your baby's
              needs, automates soothing routines, and gives you peace of mind.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              <button className="group px-8 py-4 
              bg-[var(--primary)] text-white rounded-full 
              hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-primary)] 
              transition-all flex items-center justify-center gap-2">
                Pre-Order Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#demo"
                className="px-8 py-4 bg-[var(--primary)] text-white
                rounded-full hover:shadow-lg transition-all "
              >
                Watch Demo
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-[var(--text-dark)]">50K+</div>
                <div className="text-sm text-[var(--text-light)]">Happy Parents</div>
              </div>

              <div className="w-px h-12 bg-[var(--border)]"></div>

              <div>
                <div className="text-3xl font-bold text-[var(--text-dark)]">4.9★</div>
                <div className="text-sm text-[var(--text-light)]">User Rating</div>
              </div>

              <div className="w-px h-12 bg-[var(--border)]"></div>

              <div>
                <div className="text-3xl font-bold text-[var(--text-dark)]">99%</div>
                <div className="text-sm text-[var(--text-light)]">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="absolute inset-0 
            bg-[var(--primary-light)] opacity-30 rounded-[3rem] blur-3xl"></div>

            <div className="relative bg-[var(--bg-glass)] backdrop-blur-sm 
            rounded-[3rem] p-8 border border-white/60 shadow-2xl">

              {/* <video ref={videoRef} controls src={mainVid} className="rounded-xl"></video> */}
              <img src={WithBaby} alt="Smart Cradle Demo" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}