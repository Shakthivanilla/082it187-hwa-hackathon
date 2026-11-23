import { Hero } from "@/components/hero/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DayAway } from "@/components/sections/DayAway";
import { ScentWheel } from "@/components/sections/ScentWheel";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Comparison } from "@/components/sections/Comparison";
import { Safety } from "@/components/sections/Safety";
import { BuildYourForageGrid } from "@/components/sections/BuildYourForageGrid";
import { PortionEstimator } from "@/components/sections/PortionEstimator";
import { ReviewMarquee } from "@/components/sections/ReviewMarquee";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Problem />
      <HowItWorks />
      <DayAway />
      
      <BentoGrid />
      <Comparison />
      <Safety />
      <BuildYourForageGrid />
      <PortionEstimator />
      <ReviewMarquee />
      <Faq />
      <Cta />
    </main>
  );
}