/* =============================================================================
   FOOTER — Cinematic Dark Tech
   Minimal dark footer with navigation links and copyright
   ============================================================================= */

export default function Footer() {
  return (
    <footer
      className="py-16 border-t border-white/8"
      style={{ background: "oklch(0.06 0.004 260)" }}
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 opacity-80">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="font-display font-bold text-white/80 text-base">AirPods</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed">
              The world's most advanced wireless earbuds. Designed by Apple.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-white/70 text-sm mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-2.5">
              {["AirPods 4", "AirPods 4 with ANC", "AirPods Pro 3", "AirPods Max 2"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-display font-semibold text-white/70 text-sm mb-4 uppercase tracking-wider">Features</h4>
            <ul className="space-y-2.5">
              {["Active Noise Cancellation", "Spatial Audio", "Hearing Health", "Live Translation", "Heart Rate"].map((item) => (
                <li key={item}>
                  <a href="#features" className="text-white/40 hover:text-white/70 text-sm transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-white/70 text-sm mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              {["Compare Models", "Setup Guide", "Apple Support", "Find My AirPods", "Accessories"].map((item) => (
                <li key={item}>
                  <a
                    href="https://www.apple.com/airpods/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white/70 text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © 2025 Apple Inc. All rights reserved. AirPods is a trademark of Apple Inc.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Sales Policy"].map((item) => (
              <a
                key={item}
                href="https://www.apple.com/legal/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/25 hover:text-white/50 text-xs transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
