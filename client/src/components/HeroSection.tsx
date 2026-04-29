/* =============================================================================
   HERO SECTION — Cinematic Dark Tech
   Full-bleed hero with floating AirPods Pro, bold Syne headline
   Dark background with subtle radial gradient glow
   ============================================================================= */
import { useEffect, useRef, useState } from "react";
import BookingModal from "./BookingModal";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.15 0.04 255 / 60%) 0%, oklch(0.08 0.005 260) 70%)",
      }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(1 0 0 / 1) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow behind product */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #0071E3 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container mx-auto max-w-7xl px-6 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-100"
              style={{ transitionDelay: "100ms" }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#2997FF] mb-6">
                <span className="w-8 h-px bg-[#2997FF]" />
                New Generation
              </span>
            </div>

            <h1
              className="reveal opacity-0 translate-y-8 transition-all duration-700 font-display font-extrabold leading-[1.05] mb-6"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                transitionDelay: "200ms",
              }}
            >
              <span className="text-white">Sound that</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #2997FF 0%, #0071E3 50%, #5AC8FA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                moves you.
              </span>
            </h1>

            <p
              className="reveal opacity-0 translate-y-8 transition-all duration-700 text-white/60 text-lg font-light leading-relaxed mb-10 max-w-lg"
              style={{ transitionDelay: "300ms" }}
            >
              AirPods deliver an extraordinary listening experience with industry-leading Active Noise Cancellation, Transparency mode, and Personalized Spatial Audio.
            </p>

            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-700 flex flex-wrap gap-4"
              style={{ transitionDelay: "400ms" }}
            >
              <a
                href="#airpodspro"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-sm transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Explore AirPods Pro
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                Reserve Now
              </button>
            </div>

            {/* Stats row */}
            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-700 flex gap-8 mt-14 pt-8 border-t border-white/8"
              style={{ transitionDelay: "500ms" }}
            >
              {[
                { value: "4×", label: "More ANC than original" },
                { value: "30h", label: "Total battery life" },
                { value: "H2", label: "Apple chip inside" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-2xl text-white">{stat.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 relative"
              style={{ transitionDelay: "150ms" }}
            >
              <div className="animate-float">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663592167889/5z5UWS3A29TGyJKXDroskf/hero_airpods_pro-hBRbqeCTbBXsyuy7B4uXsL.webp"
                  alt="AirPods Pro 3 floating"
                  className="w-full max-w-[580px] object-contain"
                  style={{
                    filter: "drop-shadow(0 30px 80px rgba(0, 113, 227, 0.4)) brightness(1.05)",
                    mixBlendMode: "normal",
                  }}
                />
              </div>
              {/* Reflection glow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 opacity-30"
                style={{
                  background: "radial-gradient(ellipse, #0071E3 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
}
