import { partners, type PartnerLogo } from '../../lib/partners'

function LogoCard({ logo }: { logo: PartnerLogo }) {
  return (
    <div className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out"
        style={{ backgroundImage: logo.gradient }}
      />
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        className="relative z-10 h-7 max-w-[88px] object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert"
      />
    </div>
  )
}

export function MarqueeScroller() {
  const loop = [...partners, ...partners]

  return (
    <div className="relative w-full max-w-[1400px] mx-auto marquee-mask overflow-hidden">
      <div className="marquee-track flex w-max items-center gap-5 py-2">
        {loop.map((logo, i) => (
          <LogoCard key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  )
}
