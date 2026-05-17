import type { ReactNode } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Sparkline } from './Sparkline'

interface KpiCardProps {
  label: string
  value: string | number | ReactNode
  unit?: string
  delta?: number
  hint?: string
  variant?: 'light' | 'dark'
  sparkline?: number[]
  icon?: ReactNode
  className?: string
}

export function KpiCard({
  label,
  value,
  unit,
  delta,
  hint,
  variant = 'light',
  sparkline,
  icon,
  className,
}: KpiCardProps) {
  const isDark = variant === 'dark'
  const isUp = (delta ?? 0) >= 0
  return (
    <div
      className={cn(
        'rounded-2xl border p-4 backdrop-blur-2xl shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]',
        isDark
          ? 'bg-[#0a152d]/92 border-white/10 text-white'
          : 'bg-white/85 border-slate-200/60',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'text-[10px] font-semibold uppercase tracking-[0.14em]',
            isDark ? 'text-white/70' : 'text-[#0a1b33]/65',
          )}
        >
          {label}
        </span>
        {icon && (
          <span className={isDark ? 'text-cyan-300' : 'text-indigo-500'}>
            {icon}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span
          className={cn(
            'font-display text-[24px] font-medium tracking-tight tabular-nums leading-none',
            isDark ? 'text-white' : 'text-[#0a1b33]',
          )}
        >
          {value}
        </span>
        {unit && (
          <span
            className={cn(
              'text-[11px] font-medium',
              isDark ? 'text-white/60' : 'text-slate-500',
            )}
          >
            {unit}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between">
        {delta !== undefined ? (
          <span
            className={cn(
              'inline-flex items-center gap-1 text-[10px] font-semibold rounded-full px-1.5 py-0.5',
              isUp
                ? 'text-emerald-600 bg-emerald-500/10 border border-emerald-500/20'
                : 'text-rose-600 bg-rose-500/10 border border-rose-500/20',
              isDark && isUp && 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
              isDark && !isUp && 'text-rose-300 bg-rose-400/10 border-rose-400/20',
            )}
          >
            {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {Math.abs(delta).toFixed(1)}%
          </span>
        ) : (
          <span />
        )}
        {hint && (
          <span
            className={cn(
              'text-[10px]',
              isDark ? 'text-white/50' : 'text-slate-400',
            )}
          >
            {hint}
          </span>
        )}
      </div>
      {sparkline && (
        <div className="mt-2">
          <Sparkline data={sparkline} />
        </div>
      )}
    </div>
  )
}
