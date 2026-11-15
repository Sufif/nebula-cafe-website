import { useId } from "react";

export function LogoMark({ size = 44 }: { size?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={`n${id}`} cx="34%" cy="28%" r="85%">
          <stop offset="0" stopColor="#F4FFCB" />
          <stop offset="0.5" stopColor="#C7F36A" />
          <stop offset="1" stopColor="#4F7A17" />
        </radialGradient>
      </defs>
      <g className="animate-spin-slower" style={{ transformOrigin: "32px 32px" }}>
        <ellipse cx="32" cy="32" rx="29" ry="11" transform="rotate(-24 32 32)" stroke="#C7F36A" strokeOpacity=".6" strokeWidth="1.6" strokeDasharray="2 4" />
        <circle cx="55" cy="22" r="3.4" fill="#fff" />
      </g>
      <circle cx="32" cy="32" r="15.5" fill={`url(#n${id})`} />
      <path d="M24 42C28.5 34 35.5 30 40 22" stroke="#090D12" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M26 24c2-2 4-2.6 6-2.4" stroke="#fff" strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ tagline = true }: { tagline?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="transition-transform duration-700 hover:scale-110 hover:-rotate-12">
        <LogoMark size={44} />
      </span>
      <span className="leading-none">
        <span className="font-display block text-[17px] font-extrabold tracking-[0.26em] text-[#F6F1E7]">NEBULA</span>
        {tagline && (
          <span className="mt-1.5 block text-[9.5px] uppercase tracking-[0.36em] text-[#C7F36A]/80">Coffee · Cosmos</span>
        )}
      </span>
    </span>
  );
}
