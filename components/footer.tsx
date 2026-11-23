import { PawIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="relative bg-night text-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-14 text-center md:py-20">
        <div className="flex items-center gap-3">
          <PawIcon size={34} className="text-yellow-400" />
          <span className="text-2xl font-black tracking-tight">ForageGrid</span>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-cream/60">
          A product of Happy While You&apos;re Away. Smart kibble console for
          happier dogs.
        </p>
        <p className="text-xs text-cream/40">
          &copy; {new Date().getFullYear()} ForageGrid. Demo storefront.
        </p>
      </div>
    </footer>
  );
}