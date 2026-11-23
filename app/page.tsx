import { Hero } from "@/components/hero/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DayAway } from "@/components/sections/DayAway";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Problem />
      <HowItWorks />
      <DayAway />
    </main>
  );
}