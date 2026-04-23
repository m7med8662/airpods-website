/* =============================================================================
   SOUND BANNER — Cinematic Dark Tech
   Animated waveform visualization with Apple Music integration callout
   ============================================================================= */

export default function SoundBanner() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, oklch(0.10 0.02 255) 0%, oklch(0.08 0.005 260) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.52 0.22 255 / 20%) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-12">
          {/* Animated waveform */}
          <div className="flex items-end justify-center gap-1.5 h-16 mb-10">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="waveform-bar rounded-full"
                style={{
                  width: "4px",
                  height: `${Math.random() * 60 + 20}%`,
                  background: `linear-gradient(to top, #0071E3, #2997FF)`,
                  animationDelay: `${(i * 0.05).toFixed(2)}s`,
                  animationDuration: `${0.8 + Math.random() * 0.8}s`,
                  opacity: 0.6 + Math.random() * 0.4,
                }}
              />
            ))}
          </div>

          <h2
            className="font-display font-extrabold text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
          >
            Music the way it was meant to be heard.
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-light mb-10">
            AirPods work seamlessly with Apple Music to deliver lossless audio, Dolby Atmos spatial mixes, and over 100 million songs — all in extraordinary quality.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.apple.com/apple-music/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/20"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
              Try Apple Music Free
            </a>
            <a
              href="#compare"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Shop AirPods
            </a>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {[
            "Lossless Audio",
            "Dolby Atmos",
            "100M+ Songs",
            "Spatial Audio",
            "Hi-Res Audio",
            "Personalized Radio",
          ].map((pill) => (
            <span
              key={pill}
              className="text-xs font-medium px-4 py-2 rounded-full border border-white/10 text-white/50"
              style={{ background: "oklch(1 0 0 / 4%)" }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
