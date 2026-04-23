/* =============================================================================
   AIRPODS MAX SECTION — Cinematic Dark Tech
   Full-width cinematic showcase for AirPods Max 2
   Dark background with purple accent
   ============================================================================= */
import { useEffect, useRef } from "react";

export default function MaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll(".max-reveal");
            els.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="airpodsmax"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, oklch(0.08 0.005 260) 0%, oklch(0.10 0.015 290) 50%, oklch(0.08 0.005 260) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #BF5AF2 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div
              className="max-reveal"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.8s ease-out" }}
            >
              <div className="animate-float">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663592167889/5z5UWS3A29TGyJKXDroskf/hero_airpods_max-ALpGf5RXmqT3RsTzigQm8u.webp"
                  alt="AirPods Max 2"
                  className="w-full max-w-[520px] mx-auto object-contain"
                  style={{
                    filter: "drop-shadow(0 30px 60px rgba(191, 90, 242, 0.3))",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div
              className="max-reveal"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease-out" }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#BF5AF2] mb-5">
                <span className="w-8 h-px bg-[#BF5AF2]" />
                AirPods Max 2
              </span>
            </div>

            <h2
              className="max-reveal font-display font-extrabold text-white leading-tight mb-6"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                opacity: 0,
                transform: "translateY(24px)",
                transition: "all 0.6s ease-out",
              }}
            >
              The ultimate<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #BF5AF2 0%, #9B59B6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                over-ear experience.
              </span>
            </h2>

            <p
              className="max-reveal text-white/55 text-base leading-relaxed mb-8"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease-out" }}
            >
              AirPods Max 2 combines high-fidelity audio with intelligent features. Lossless Audio and ultra-low latency via USB-C, up to 1.5× more Active Noise Cancellation, and 20 hours of listening time.
            </p>

            {/* Specs grid */}
            <div
              className="max-reveal grid grid-cols-2 gap-4 mb-8"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease-out" }}
            >
              {[
                { label: "Battery Life", value: "20 hrs" },
                { label: "ANC", value: "1.5× more" },
                { label: "Audio", value: "Lossless" },
                { label: "Colors", value: "5 options" },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="p-4 rounded-xl border border-white/8"
                  style={{ background: "oklch(0.11 0.008 260)" }}
                >
                  <div className="text-xs text-white/40 mb-1">{spec.label}</div>
                  <div className="font-display font-bold text-lg text-white">{spec.value}</div>
                </div>
              ))}
            </div>

            <div
              className="max-reveal flex gap-4"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease-out" }}
            >
              <a
                href="https://www.apple.com/airpods-max/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: "#BF5AF2",
                  boxShadow: "0 0 0 0 rgba(191,90,242,0)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(191,90,242,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(191,90,242,0)";
                }}
              >
                Shop AirPods Max
              </a>
              <div className="flex items-center">
                <span className="font-display font-bold text-xl text-white">$549</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
