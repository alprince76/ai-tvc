import { useId } from 'react'
import { cn } from '../../lib/cn'

interface SparklineProps {
  data?: number[]
  className?: string
  from?: string
  to?: string
  fillOpacity?: number
  strokeWidth?: number
}

const DEFAULT_DATA = [32, 28, 30, 22, 24, 18, 20, 12, 14, 6, 8]

export function Sparkline({
  data = DEFAULT_DATA,
  className,
  from = '#67e8f9',
  to = '#a78bfa',
  fillOpacity = 0.45,
  strokeWidth = 1.5,
}: SparklineProps) {
  const id = useId().replace(/:/g, '')
  const w = 120
  const h = 40
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)

  const points = data.map((v, i) => {
    const x = i * step
    const y = h - ((v - min) / range) * (h - 4) - 2
    return [x, y] as const
  })

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(' ')
  const fillPath = `${linePath} L ${w} ${h} L 0 ${h} Z`

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn('w-full h-10', className)}
    >
      <defs>
        <linearGradient id={`spark-fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={from} stopOpacity={fillOpacity} />
          <stop offset="100%" stopColor={from} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`spark-line-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#spark-fill-${id})`} />
      <path
        d={linePath}
        fill="none"
        stroke={`url(#spark-line-${id})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
