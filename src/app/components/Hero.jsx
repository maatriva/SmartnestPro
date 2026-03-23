import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import mainVid from "../video/Smart_Elephant_Cradle_Baby_Monitor_Ad.mp4";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export function Hero() {

useEffect(() => {
  const video = {mainVid}.current;
  if (video) {
    video.play().catch((error) => {
      console.error("Error playing video:", error);
    });
  }
}, []);

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Navigation */}
     

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700">
                AI-Powered Baby Care
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Sleep Better,
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Parent Smarter
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              The world's first AI-powered smart cradle that learns your baby's
              needs, automates soothing routines, and gives you peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-xl transition-all flex items-center justify-center gap-2">
                Pre-Order Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#demo"
                className="px-8 py-4 bg-white text-gray-900 rounded-full hover:shadow-lg transition-all border border-gray-200"
              >
                Watch Demo
              </a>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Happy Parents</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">99%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-[3rem] blur-3xl"></div>
            <div className="relative bg-white/50 backdrop-blur-sm rounded-[3rem] p-8 border border-white/60 shadow-2xl">
              <video controls src={mainVid}></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
