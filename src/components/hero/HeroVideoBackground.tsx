const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4'

export function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover scale-105 transition-transform duration-1000"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  )
}
