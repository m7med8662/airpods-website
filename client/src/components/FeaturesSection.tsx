/* =============================================================================
   FEATURES SECTION — Cinematic Dark Tech
   Alternating left/right feature blocks with abstract visualizations
   Scroll-triggered reveal animations
   ============================================================================= */
import { useEffect, useRef } from "react";

const features = [
  {
    id: "anc",
    label: "Active Noise Cancellation",
    title: "Silence the world. Hear what matters.",
    description:
      "AirPods Pro 3 delivers up to 4× more Active Noise Cancellation than the original AirPods Pro. Two outward-facing microphones detect external sound, while an inward-facing microphone listens toward your ear. An advanced algorithm cancels noise before it reaches you.",
    detail: "Up to 4× more ANC than original AirPods Pro",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663592167889/5z5UWS3A29TGyJKXDroskf/feature_anc-RFkjgqJbn6FHMpckpDJ7rB.webp",
    accentColor: "#0071E3",
    reverse: false,
  },
  {
    id: "spatial",
    label: "Personalized Spatial Audio",
    title: "Sound all around you.",
    description:
      "Spatial Audio with dynamic head tracking places sound in three-dimensional space so music, movies, and calls feel like they're happening around you. AirPods use the TrueDepth camera to map your unique ear geometry for a personalized listening experience.",
    detail: "Dynamic head tracking with precise motion sensors",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663592167889/5z5UWS3A29TGyJKXDroskf/feature_spatial-h5R4mFfrZZ6Q5NzSTTWQ2a.webp",
    accentColor: "#5AC8FA",
    reverse: true,
  },
];

function FeatureBlock({ feature }: { feature: typeof features[0] }) {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll(".reveal-item");
            els.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (blockRef.current) observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={blockRef}
      className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${feature.reverse ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Text */}
      <div className={feature.reverse ? "lg:order-2" : "lg:order-1"}>
        <div
          className="reveal-item"
          style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease-out" }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              color: feature.accentColor,
              background: `${feature.accentColor}15`,
              border: `1px solid ${feature.accentColor}30`,
            }}
          >
            {feature.label}
          </span>
        </div>

        <h3
          className="reveal-item font-display font-bold text-white mb-5 leading-tight"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            opacity: 0,
            transform: "translateY(24px)",
            transition: "all 0.6s ease-out",
          }}
        >
          {feature.title}
        </h3>

        <p
          className="reveal-item text-white/55 text-base leading-relaxed mb-8"
          style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease-out" }}
        >
          {feature.description}
        </p>

        <div
          className="reveal-item flex items-center gap-3 p-4 rounded-xl"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "all 0.6s ease-out",
            background: `${feature.accentColor}10`,
            border: `1px solid ${feature.accentColor}20`,
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `${feature.accentColor}25` }}
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill={feature.accentColor}>
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.5 6.5h-3v-3a.5.5 0 00-1 0v3h-3a.5.5 0 000 1h3v3a.5.5 0 001 0v-3h3a.5.5 0 000-1z" />
            </svg>
          </div>
          <span className="text-sm font-medium" style={{ color: feature.accentColor }}>
            {feature.detail}
          </span>
        </div>
      </div>

      {/* Image */}
      <div className={feature.reverse ? "lg:order-1" : "lg:order-2"}>
        <div
          className="reveal-item relative rounded-2xl overflow-hidden"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "all 0.8s ease-out",
            background: `radial-gradient(ellipse at center, ${feature.accentColor}12 0%, oklch(0.11 0.008 260) 70%)`,
          }}
        >
          <img
            src={feature.image}
            alt={feature.label}
            className="w-full h-80 object-cover"
          />
          {/* Overlay gradient */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(ellipse at center, ${feature.accentColor} 0%, transparent 70%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-28 relative"
      style={{
        background: "linear-gradient(180deg, oklch(0.08 0.005 260) 0%, oklch(0.10 0.012 255) 50%, oklch(0.08 0.005 260) 100%)",
      }}
    >
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#2997FF] mb-4">
            <span className="w-8 h-px bg-[#2997FF]" />
            Technology
            <span className="w-8 h-px bg-[#2997FF]" />
          </span>
          <h2
            className="font-display font-extrabold text-white mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
          >
            Built different.
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto font-light">
            Powered by Apple's most advanced audio chips, AirPods redefine what wireless listening can be.
          </p>
        </div>

        {/* Feature blocks */}
        <div className="space-y-28">
          {features.map((feature) => (
            <FeatureBlock key={feature.id} feature={feature} />
          ))}
        </div>

        {/* Additional feature grid */}
        <div className="mt-28 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: "❤️",
              title: "Heart Rate Sensing",
              desc: "Track your heart rate and calories burned during workouts with AirPods Pro 3.",
              color: "#FF375F",
            },
            {
              icon: "🌐",
              title: "Live Translation",
              desc: "Hear real-time translations in your ears during conversations across languages.",
              color: "#30D158",
            },
            {
              icon: "👂",
              title: "Hearing Health",
              desc: "Hearing Test, Hearing Aid, and Hearing Protection features built right in.",
              color: "#FFD60A",
            },
            {
              icon: "🔋",
              title: "All-Day Battery",
              desc: "Up to 30 hours of total listening time with the charging case.",
              color: "#5AC8FA",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-white/8 hover:border-white/15 transition-all duration-300 group"
              style={{ background: "oklch(0.11 0.008 260)" }}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h4 className="font-display font-semibold text-white text-base mb-2">{item.title}</h4>
              <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
