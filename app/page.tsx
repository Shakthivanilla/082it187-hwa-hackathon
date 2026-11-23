import { Hero } from "@/components/hero/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DayAway } from "@/components/sections/DayAway";
import { ScentWheel } from "@/components/sections/ScentWheel";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Comparison } from "@/components/sections/Comparison";
import { Safety } from "@/components/sections/Safety";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Problem />
      <HowItWorks />
      <DayAway />
      <ScentWheel />
      <BentoGrid />
      <Comparison />
      <Safety />
    </main>
  );
}