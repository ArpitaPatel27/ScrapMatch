import dynamic from 'next/dynamic';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import HeroSection from '@/components/sections/HeroSection/HeroSection';

/* ── Below-fold sections — lazy loaded for performance ─────────── */
// Each section answers one question in the homepage story:
// 1. Hero         → What is ScrapMatch?
// 2. Why          → Why does this problem exist?
// 3. HowItWorks   → How does ScrapMatch solve it?
// 4. Industries   → Who can use it?
// 5. Features     → What do you get?
// 6. Impact       → What are the results?
// 7. SocialProof  → Why trust ScrapMatch?
// 8. FAQ          → Common questions answered
// 9. FinalCTA     → Take action

const WhySection = dynamic(
  () => import('@/components/sections/WhySection/WhySection')
);

const HowItWorksSection = dynamic(
  () => import('@/components/sections/HowItWorksSection/HowItWorksSection')
);

const IndustriesSection = dynamic(
  () => import('@/components/sections/IndustriesSection/IndustriesSection')
);

const FeaturesSection = dynamic(
  () => import('@/components/sections/FeaturesSection/FeaturesSection')
);

const ImpactSection = dynamic(
  () => import('@/components/sections/ImpactSection/ImpactSection')
);

const SocialProof = dynamic(
  () => import('@/components/sections/SocialProof/SocialProof')
);

const FAQSection = dynamic(
  () => import('@/components/sections/FAQSection/FAQSection')
);

const FinalCTASection = dynamic(
  () => import('@/components/sections/FinalCTASection/FinalCTASection')
);

export default function HomePage() {
  return (
    <>
      <MarketingNav />

      <main id="main-content">
        <HeroSection />
        <WhySection />
        <HowItWorksSection />
        <IndustriesSection />
        <FeaturesSection />
        <ImpactSection />
        <SocialProof />
        <FAQSection />
        <FinalCTASection />
      </main>

      <MarketingFooter />
    </>
  );
}
