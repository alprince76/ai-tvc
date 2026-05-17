import { FloatingDashboard } from './FloatingDashboard'
import { HeroContent } from './HeroContent'
import { HeroVideoBackground } from './HeroVideoBackground'
import { NavPill } from './NavPill'

export function HeroSection() {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden h-[600px] flex flex-col">
      <HeroVideoBackground />
      <HeroContent />
      <FloatingDashboard />
      <NavPill />
    </section>
  )
}
