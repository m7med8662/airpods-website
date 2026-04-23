/* =============================================================================
   HOME PAGE — AirPods Website
   Design: Cinematic Dark Tech
   - Deep dark backgrounds (oklch(0.08)) with luminous product imagery
   - Apple Blue (#0071E3) as primary accent
   - Syne display font + Inter body font
   - Scroll-triggered reveal animations
   ============================================================================= */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import MaxSection from "@/components/MaxSection";
import SoundBanner from "@/components/SoundBanner";
import CompareSection from "@/components/CompareSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.08 0.005 260)" }}>
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <MaxSection />
      <SoundBanner />
      <CompareSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
