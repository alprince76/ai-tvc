import { useId } from 'react'
import { cn } from '../../lib/cn'

interface DonutGaugeProps {
  value: number
  max?: number
  size?: number
  thickness?: number
  label?: string
  sublabel?: string
  className?: string
  variant?: 'violet' | 'cyan' | 'emerald' | 'amber'
}

const colorMap = {
  violet: { from: '#8b5cf6', to: '#ec4899' },
  cyan: { from: '#22d3ee', to: '#6366f1' },
  emerald: { from: '#10b981', to: '#22d3ee' },
  amber: { from: '#f59e0b', to: '#ef4444' },
}

export function DonutGauge({
  value,
  max = 100,
  size = 56,
  thickness = 5,
  label,
  sublabel,
  className,
  variant = 'violet',
}: DonutGaugeProps) {
  const id = useId().replace(/:/g, '')
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(1, Math.max(0, value / max))
  const offset = circumference * (1 - pct)
  const { from, to } = colorMap[variant]

  return (
    <div className={cn('inline-flex flex-col items-center', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={`donut-${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={thickness}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#donut-${id})`}
            strokeWidth={thickness}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display font-medium text-[#0a1b33] tabular-nums"
            style={{ fontSize: size * 0.28 }}
          >
            {Math.round(pct * 100)}
          </span>
        </div>
      </div>
      {(label || sublabel) && (
        <div className="text-center mt-1.5">
          {label && (
            <div className="text-[10px] font-semibold text-[#0a1b33]">{label}</div>
          )}
          {sublabel && (
            <div className="text-[9px] text-slate-400">{sublabel}</div>
          )}
        </div>
      )}
    </div>
  )
}
