import { Hero } from "@/components/hero/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DayAway } from "@/components/sections/DayAway";
import { SevenDayScent } from "@/components/sections/SevenDayScent";
import { ScentWheel } from "@/components/sections/ScentWheel";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Comparison } from "@/components/sections/Comparison";
import { Safety } from "@/components/sections/Safety";
import { BuildYourForageGrid } from "@/components/sections/BuildYourForageGrid";
import { PortionEstimator } from "@/components/sections/PortionEstimator";
import { ReviewMarquee } from "@/components/sections/ReviewMarquee";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { SectionErrorBoundary } from "@/components/sections/SectionErrorBoundary";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <Hero />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <Problem />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <HowItWorks />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <DayAway />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <SevenDayScent />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <ScentWheel />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <BentoGrid />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <Comparison />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <Safety />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <BuildYourForageGrid />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <PortionEstimator />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <ReviewMarquee />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <Faq />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallback={<div className="py-24 text-center text-ink/60"><p>Error loading this section.</p></div>}>
        <Cta />
      </SectionErrorBoundary>
    </main>
  );
}