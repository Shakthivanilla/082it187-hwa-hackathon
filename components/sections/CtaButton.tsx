import { ChevronRightIcon } from "@/components/icons";

export function CtaButton() {
  return (
    <a
      href="#configure"
      className="group inline-flex h-14 items-center gap-3 rounded-full bg-amber-950 px-8 font-black text-yellow-400 shadow-lg transition-transform hover:scale-[1.03] md:px-10"
    >
      Configure Yours
      <ChevronRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
    </a>
  );
}