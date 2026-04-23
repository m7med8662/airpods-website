/* =============================================================================
   PRODUCTS SECTION — Cinematic Dark Tech
   Three product cards: AirPods 4, AirPods Pro 3, AirPods Max 2
   Glassmorphism cards with hover glow effects
   ============================================================================= */
import { useEffect, useRef } from "react";

const products = [
  {
    id: "airpods4",
    name: "AirPods 4",
    tagline: "Iconic. Now supersonic.",
    price: "From $129",
    badge: null,
    description:
      "The next evolution of sound and comfort. Featuring the H2 chip, Personalized Spatial Audio with dynamic head tracking, and up to 30 hours of total battery life.",
    features: [
      "H2 chip",
      "Personalized Spatial Audio",
      "5 hrs listening time",
      "USB-C charging",
      "Voice Isolation",
    ],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663592167889/5z5UWS3A29TGyJKXDroskf/airpods4_lifestyle-5mcjdqhb2ko6RujpQ7ogqb.webp",
    accentColor: "#5AC8FA",
    href: "#airpods4",
  },
  {
    id: "airpodspro",
    name: "AirPods Pro 3",
    tagline: "The world's best in-ear ANC.",
    price: "$249",
    badge: "Most Popular",
    description:
      "Up to 4× more Active Noise Cancellation than original AirPods Pro. Features heart rate sensing during workouts, Hearing Health features, and Live Translation.",
    features: [
      "4× more ANC",
      "Heart rate sensing",
      "Hearing Test & Aid",
      "Live Translation",
      "8 hrs with ANC",
    ],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663592167889/5z5UWS3A29TGyJKXDroskf/hero_airpods_pro-hBRbqeCTbBXsyuy7B4uXsL.webp",
    accentColor: "#0071E3",
    href: "#airpodspro",
  },
  {
    id: "airpodsmax",
    name: "AirPods Max 2",
    tagline: "Ultimate over-ear listening.",
    price: "$549",
    badge: "Premium",
    description:
      "The ultimate over-ear personal listening experience. Up to 1.5× more ANC, Lossless Audio via USB-C, 20 hours of battery life, and Loud Sound Reduction.",
    features: [
      "1.5× more ANC",
      "Lossless Audio",
      "20 hrs battery",
      "Loud Sound Reduction",
      "Live Translation",
    ],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663592167889/5z5UWS3A29TGyJKXDroskf/hero_airpods_max-ALpGf5RXmqT3RsTzigQm8u.webp",
    accentColor: "#BF5AF2",
    href: "#airpodsmax",
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("opacity-100", "translate-y-0");
              entry.target.classList.remove("opacity-0", "translate-y-10");
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      id={product.id}
      className="opacity-0 translate-y-10 transition-all duration-700 group relative rounded-2xl overflow-hidden gradient-border hover:scale-[1.02] transition-transform"
      style={{
        background: "oklch(0.11 0.008 260)",
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-5 right-5 z-10">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: `${product.accentColor}22`,
              color: product.accentColor,
              border: `1px solid ${product.accentColor}44`,
            }}
          >
            {product.badge}
          </span>
        </div>
      )}

      {/* Product image */}
      <div
        className="relative h-64 overflow-hidden flex items-center justify-center p-6"
        style={{
          background: `radial-gradient(ellipse at center, ${product.accentColor}15 0%, transparent 70%)`,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          style={{ filter: `drop-shadow(0 20px 40px ${product.accentColor}40)` }}
        />
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="mb-4">
          <h3 className="font-display font-bold text-2xl text-white mb-1">{product.name}</h3>
          <p className="text-sm font-medium" style={{ color: product.accentColor }}>
            {product.tagline}
          </p>
        </div>

        <p className="text-white/55 text-sm leading-relaxed mb-6">{product.description}</p>

        {/* Feature list */}
        <ul className="space-y-2 mb-7">
          {product.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2.5 text-sm text-white/70">
              <svg
                className="w-4 h-4 flex-shrink-0"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle cx="8" cy="8" r="7" stroke={product.accentColor} strokeWidth="1.5" strokeOpacity="0.5" />
                <path d="M5 8l2 2 4-4" stroke={product.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {feat}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-5 border-t border-white/8">
          <span className="font-display font-bold text-xl text-white">{product.price}</span>
          <a
            href="https://www.apple.com/airpods/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: `${product.accentColor}18`,
              color: product.accentColor,
              border: `1px solid ${product.accentColor}30`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${product.accentColor}30`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${product.accentColor}18`;
            }}
          >
            Buy Now
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  return (
    <section className="py-28 relative" style={{ background: "oklch(0.08 0.005 260)" }}>
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#2997FF] mb-4">
            <span className="w-8 h-px bg-[#2997FF]" />
            The Lineup
            <span className="w-8 h-px bg-[#2997FF]" />
          </span>
          <h2 className="font-display font-extrabold text-white mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
            Find your perfect AirPods.
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto font-light">
            From everyday listening to professional-grade audio, there's an AirPods for every moment.
          </p>
        </div>

        {/* Product cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
