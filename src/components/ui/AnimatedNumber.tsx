import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  decimals?: number
  className?: string
  format?: (n: number) => string
}

export function AnimatedNumber({
  value,
  decimals = 0,
  className,
  format = (n) => n.toFixed(decimals),
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(() => format(value))
  const fromRef = useRef(value)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const from = fromRef.current
    const start = performance.now()
    const duration = 900

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const ease = 1 - (1 - t) ** 3
      const next = from + (value - from) * ease
      setDisplay(format(next))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = value
      }
    }

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value, format])

  return <span className={className}>{display}</span>
}
