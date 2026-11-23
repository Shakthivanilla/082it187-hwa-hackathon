"use client";

const REVIEWS = [
  { dog: "Bruno", detail: "India - Bengaluru", text: "Our pup finally looks as happy as he sounds." },
  { dog: "Simba", detail: "Golden Retriever - Chennai", text: "The scent wheel is genius. He is obsessed." },
  { dog: "Coco", detail: "Beagle - Pune", text: "Boredom gone. Nap scheduled." },
  { dog: "Rani", detail: "Madurai", text: "Three stars. Wait - four stars. Much better." },
  { dog: "Oreo", detail: "Shih Tzu - Mumbai", text: "Small dog, big console. No regrets." },
  { dog: "Milo", detail: "Goa", text: "Sea breeze and sniff puzzles. Perfect combo." },
];

export function ReviewMarquee() {
  const items = [...REVIEWS, ...REVIEWS];
  return (
    <section className="relative overflow-hidden bg-night py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <h2 className="text-center text-2xl font-black tracking-tight text-cream md:text-3xl">
          Loved by Indian dog parents
        </h2>
        <p className="mt-3 text-center text-sm font-semibold text-cream/60">
          Sample demo reviews - not from real customers.
        </p>
      </div>
      <div className="marquee relative mt-12 overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-6">
          {items.map((review, index) => (
            <div
              key={index}
              className="w-[340px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <p className="text-sm font-bold text-cream">{review.dog}</p>
              <p className="mt-1 text-xs font-semibold text-yellow-400">{review.detail}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}