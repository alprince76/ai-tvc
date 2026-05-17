import { useId } from 'react'
import { cn } from '../../lib/cn'

interface MiniBarChartProps {
  data: number[]
  labels?: string[]
  className?: string
  from?: string
  to?: string
  height?: number
}

export function MiniBarChart({
  data,
  labels,
  className,
  from = '#22d3ee',
  to = '#8b5cf6',
  height = 80,
}: MiniBarChartProps) {
  const id = useId().replace(/:/g, '')
  const max = Math.max(...data, 1)
  const w = 240
  const barW = (w - (data.length - 1) * 6) / data.length

  return (
    <div className={cn('w-full', className)}>
      <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }}>
        <defs>
          <linearGradient id={`bar-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={to} stopOpacity="0.95" />
            <stop offset="100%" stopColor={from} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {data.map((v, i) => {
          const h = (v / max) * (height - 14)
          const x = i * (barW + 6)
          const y = height - h - 8
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                rx={3}
                fill={`url(#bar-${id})`}
              />
            </g>
          )
        })}
      </svg>
      {labels && (
        <div
          className="grid mt-1.5"
          style={{ gridTemplateColumns: `repeat(${labels.length}, 1fr)` }}
        >
          {labels.map((l, i) => (
            <span
              key={i}
              className="text-[9px] font-medium text-slate-400 text-center uppercase tracking-wider"
            >
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
