import Image from "next/image";
import type { Organ } from "@/app/profile/organs";

export const OrganItem = ({ organ, isOpen, onToggle }: { organ: Organ; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="border border-border rounded-xl p-3 w-full bg-white">
      <button
        className="flex items-center justify-between gap-2 w-full cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <Image src={organ.icon} alt={organ.title} width={27} height={27} />
          <h3 className="text-sm font-semibold">{organ.title}</h3>
        </div>
        <svg
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="text-sm text-gray-600 mt-2">{organ.description}</p>
        </div>
      </div>
    </div>
  );
};
