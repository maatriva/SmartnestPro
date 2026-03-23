import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { Footer } from "../Footer";
import withBabyImage from "../../images/withbaby.jpeg"
import withoutBabyImage from "../../images/withoutbaby.jpeg"
import withParentImage from "../../images/withparents.jpeg"
export default function About() {
  const albumImages = [
    { src: withBabyImage, alt: "Baby resting peacefully in smart cradle" },
    { src: withoutBabyImage, alt: "Smart Nest Pro cradle without baby" },
    { src: withParentImage, alt: "Parent caring for baby in Smart Nest Pro" },
    { src: withoutBabyImage, alt: "Smart Nest Pro setup view in room" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />

      <main className="px-6 pt-36 pb-16">
        <div className="max-w-5xl mx-auto">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Photo Album</h2>
            <p className="text-gray-700 mb-5">
              A quick look at Smart Nest Pro moments and setup.
            </p>

            <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm py-4">
              <div className="about-album-track flex gap-4 w-max px-4">
                {[...albumImages, ...albumImages].map((image, index) => (
                  <div
                    key={`${image.alt}-${index}`}
                    className="w-[320px] h-[190px] md:w-[420px] md:h-[240px] shrink-0 rounded-2xl overflow-hidden border border-gray-100 bg-gray-100"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
            </div>
          </section>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 border border-black/5 backdrop-blur rounded-full text-purple-700 text-sm font-semibold mb-5">
            About Smart Nest Pro
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Sleep Better, Parent Smarter
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-3xl">
            Smart Nest Pro helps parents build calmer routines using AI-driven
            insights, comfort automation, and a thoughtful product experience made
            for real homes and real schedules.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Our mission</h2>
              <p className="text-gray-700 leading-relaxed">
                Make baby care more informed and less stressful through simple,
                dependable assistance.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What we build</h2>
              <p className="text-gray-700 leading-relaxed">
                A smart cradle system that combines monitoring, soothing support,
                and clear guidance for parents.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Our approach</h2>
              <p className="text-gray-700 leading-relaxed">
                Safety-first design, practical automation, and continuous
                improvements based on parent feedback.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What we focus on</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2 rounded-full bg-purple-500" />
                Comfort-first soothing and environment awareness.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2 rounded-full bg-pink-500" />
                Clear insights and parent-friendly interactions.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2 rounded-full bg-blue-500" />
                Ongoing improvement based on real feedback.
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/survey"
              className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all"
            >
              Take Survey
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
