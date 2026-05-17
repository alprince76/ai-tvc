import { HeroSection } from './components/hero/HeroSection'
import { MarqueeScroller } from './components/marquee/MarqueeScroller'
import { Modules } from './components/modules'

function App() {
  return (
    <main className="min-h-screen w-full bg-[#f9fafb] py-8 md:py-12 px-4 md:px-6">
      <HeroSection />
      <div className="mt-10">
        <MarqueeScroller />
      </div>
      <div className="mt-20 md:mt-28">
        <Modules />
      </div>
      <div className="h-16" />
    </main>
  )
}

export default App
