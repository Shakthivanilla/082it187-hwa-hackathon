import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  blurb?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  title,
  blurb,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`mx-auto max-w-2xl ${
        centered ? "text-center" : "text-left"
      }`}
    >
      <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-700">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black leading-[1.1] tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {blurb ? (
        <p className="mt-5 text-lg leading-relaxed text-ink-2">{blurb}</p>
      ) : null}
    </div>
  );
}