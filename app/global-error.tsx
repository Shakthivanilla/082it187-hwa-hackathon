"use client";

import { useRouter } from "next/navigation";

interface GlobalErrorProps {
  error: unknown;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const router = useRouter();

  return (
    <section className="min-h-full bg-white font-sans text-ink flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-amber-600 mb-4">
          Something went wrong
        </h1>
        <p className="text-text/60 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button onClick={reset} className="inline-block px-6 py-3 bg-amber-600 text-amber-950 font-black rounded-lg transition-colors hover:bg-amber-500">
          Try Again
        </button>
        <a href="/" className="mt-4 block text-amber-500 underline">
          Return Home
        </a>
      </div>
    </section>
  );
}