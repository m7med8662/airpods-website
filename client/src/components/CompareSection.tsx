/* =============================================================================
   COMPARE SECTION — Cinematic Dark Tech
   Elegant comparison table for all AirPods models
   Glassmorphism table with highlighted Pro column
   ============================================================================= */
import { useState, useEffect, useRef } from "react";

const models = [
  { name: "AirPods 4", price: "$129", color: "#5AC8FA" },
  { name: "AirPods 4 ANC", price: "$179", color: "#30D158" },
  { name: "AirPods Pro 3", price: "$249", color: "#0071E3", highlight: true },
  { name: "AirPods Max 2", price: "$549", color: "#BF5AF2" },
];

const specs = [
  {
    category: "Audio",
    rows: [
      {
        label: "Active Noise Cancellation",
        values: [false, true, "4× ANC", "1.5× ANC"],
      },
      {
        label: "Adaptive Audio",
        values: [false, true, true, true],
      },
      {
        label: "Transparency Mode",
        values: [false, true, true, true],
      },
      {
        label: "Personalized Spatial Audio",
        values: [true, true, true, true],
      },
      {
        label: "Lossless Audio",
        values: [false, false, false, "USB-C"],
      },
    ],
  },
  {
    category: "Health & Intelligence",
    rows: [
      {
        label: "Heart Rate Sensing",
        values: [false, false, true, false],
      },
      {
        label: "Hearing Test",
        values: [false, false, true, false],
      },
      {
        label: "Hearing Aid Feature",
        values: [false, false, true, false],
      },
      {
        label: "Live Translation",
        values: [false, true, true, true],
      },
      {
        label: "Loud Sound Reduction",
        values: [false, false, false, true],
      },
    ],
  },
  {
    category: "Battery",
    rows: [
      {
        label: "Listening Time",
        values: ["5 hrs", "5 hrs", "8 hrs", "20 hrs"],
      },
      {
        label: "Total with Case",
        values: ["30 hrs", "30 hrs", "30 hrs", "—"],
      },
    ],
  },
  {
    category: "Connectivity",
    rows: [
      {
        label: "Chip",
        values: ["H2", "H2", "H2", "H2"],
      },
      {
        label: "Bluetooth",
        values: ["5.3", "5.3", "5.3", "5.3"],
      },
      {
        label: "Charging",
        values: ["USB-C", "Wireless + USB-C", "MagSafe + USB-C", "USB-C"],
      },
    ],
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      <path d="M6 10l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4 mx-auto opacity-20" viewBox="0 0 16 16" fill="none">
      <path d="M4 4l8 8M12 4l-8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function CompareSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentSpec = specs[activeCategory];

  return (
    <section
      id="compare"
      ref={sectionRef}
      className="py-28 opacity-0 translate-y-8 transition-all duration-700"
      style={{ background: "oklch(0.08 0.005 260)" }}
    >
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#2997FF] mb-4">
            <span className="w-8 h-px bg-[#2997FF]" />
            Compare
            <span className="w-8 h-px bg-[#2997FF]" />
          </span>
          <h2
            className="font-display font-extrabold text-white mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
          >
            Which AirPods are for you?
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto font-light">
            Compare features across the full AirPods lineup to find the perfect match.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {specs.map((spec, i) => (
            <button
              key={spec.category}
              onClick={() => setActiveCategory(i)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={
                activeCategory === i
                  ? {
                      background: "#0071E3",
                      color: "white",
                    }
                  : {
                      background: "oklch(0.14 0.008 260)",
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
              }
            >
              {spec.category}
            </button>
          ))}
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-2xl border border-white/8" style={{ background: "oklch(0.10 0.008 260)" }}>
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left p-5 w-1/3">
                  <span className="text-white/30 text-xs font-medium uppercase tracking-wider">Feature</span>
                </th>
                {models.map((model) => (
                  <th
                    key={model.name}
                    className="p-5 text-center"
                    style={
                      model.highlight
                        ? {
                            background: "oklch(0.52 0.22 255 / 8%)",
                            borderLeft: "1px solid oklch(0.52 0.22 255 / 20%)",
                            borderRight: "1px solid oklch(0.52 0.22 255 / 20%)",
                          }
                        : {}
                    }
                  >
                    <div className="font-display font-semibold text-white text-sm">{model.name}</div>
                    <div className="text-xs mt-1" style={{ color: model.color }}>{model.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentSpec.rows.map((row, rowIdx) => (
                <tr
                  key={row.label}
                  className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors"
                >
                  <td className="p-5 text-sm text-white/60">{row.label}</td>
                  {row.values.map((val, colIdx) => (
                    <td
                      key={colIdx}
                      className="p-5 text-center text-sm"
                      style={
                        models[colIdx].highlight
                          ? {
                              background: "oklch(0.52 0.22 255 / 5%)",
                              borderLeft: "1px solid oklch(0.52 0.22 255 / 15%)",
                              borderRight: "1px solid oklch(0.52 0.22 255 / 15%)",
                            }
                          : {}
                      }
                    >
                      {val === true ? (
                        <CheckIcon color={models[colIdx].color} />
                      ) : val === false ? (
                        <XIcon />
                      ) : (
                        <span className="font-medium text-white/80 text-xs">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA row */}
        <div className="mt-6 grid grid-cols-4 gap-0 min-w-[640px] overflow-x-auto">
          <div className="col-span-1" />
          {models.map((model) => (
            <div key={model.name} className="flex justify-center p-3">
              <a
                href="https://www.apple.com/airpods/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  color: model.color,
                  background: `${model.color}15`,
                  border: `1px solid ${model.color}30`,
                }}
              >
                Buy
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
