/* =============================================================================
   TESTIMONIALS SECTION — Cinematic Dark Tech
   User reviews and press quotes in glassmorphism cards
   ============================================================================= */

const testimonials = [
  {
    quote: "AirPods Pro 3 are the best earbuds I've ever used. The noise cancellation is genuinely magical — it's like someone turned off the world.",
    author: "Sarah M.",
    role: "Daily commuter",
    rating: 5,
    accent: "#0071E3",
  },
  {
    quote: "The heart rate sensing during workouts is a game-changer. I no longer need to wear my Apple Watch for fitness tracking.",
    author: "James K.",
    role: "Fitness enthusiast",
    rating: 5,
    accent: "#FF375F",
  },
  {
    quote: "Spatial Audio with my AirPods Max is absolutely breathtaking. Movies feel like I'm in a cinema. Worth every penny.",
    author: "Priya L.",
    role: "Film editor",
    rating: 5,
    accent: "#BF5AF2",
  },
  {
    quote: "I switched from a competitor's earbuds and the difference in sound quality is night and day. The H2 chip is remarkable.",
    author: "David R.",
    role: "Music producer",
    rating: 5,
    accent: "#30D158",
  },
  {
    quote: "The Live Translation feature saved me during a business trip to Japan. I could understand conversations in real time.",
    author: "Emma T.",
    role: "International consultant",
    rating: 5,
    accent: "#FFD60A",
  },
  {
    quote: "Battery life is incredible. I use them all day for calls and music and still have charge left when I get home.",
    author: "Marcus W.",
    role: "Remote worker",
    rating: 5,
    accent: "#5AC8FA",
  },
];

const pressQuotes = [
  { outlet: "The Verge", quote: "The best AirPods Apple has ever made.", score: "9.5/10" },
  { outlet: "WIRED", quote: "A landmark in personal audio technology.", score: "★★★★★" },
  { outlet: "TechCrunch", quote: "Sets a new standard for wireless earbuds.", score: "Editor's Choice" },
];

export default function TestimonialsSection() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: "oklch(0.09 0.007 260)" }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Press quotes */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {pressQuotes.map((press) => (
            <div
              key={press.outlet}
              className="flex items-center gap-4 px-6 py-4 rounded-xl border border-white/8"
              style={{ background: "oklch(0.12 0.008 260)" }}
            >
              <div>
                <div className="font-display font-bold text-white/80 text-sm">{press.outlet}</div>
                <div className="text-white/40 text-xs mt-0.5">"{press.quote}"</div>
              </div>
              <div className="text-[#0071E3] font-semibold text-sm whitespace-nowrap">{press.score}</div>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#2997FF] mb-4">
            <span className="w-8 h-px bg-[#2997FF]" />
            Reviews
            <span className="w-8 h-px bg-[#2997FF]" />
          </span>
          <h2
            className="font-display font-extrabold text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            Loved by millions.
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto font-light">
            Join over 100 million people who have made AirPods part of their daily life.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/8 hover:border-white/15 transition-all duration-300 group hover:-translate-y-1"
              style={{ background: "oklch(0.11 0.008 260)" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4" viewBox="0 0 16 16" fill={t.accent}>
                    <path d="M8 1.5l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.7l4-.6L8 1.5z" />
                  </svg>
                ))}
              </div>

              <p className="text-white/65 text-sm leading-relaxed mb-5">"{t.quote}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: `${t.accent}30`, border: `1px solid ${t.accent}40` }}
                >
                  {t.author[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-white/80">{t.author}</div>
                  <div className="text-xs text-white/35">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
