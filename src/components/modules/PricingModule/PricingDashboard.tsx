import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useId, useMemo, useState } from 'react'
import { Sparkles, TrendingDown, TrendingUp } from 'lucide-react'
import { useLocale } from '../../../i18n/LocaleContext'
import { channelLeaderboard, demandSeries, demandLabels, pricingKpis } from '../../../lib/mock/pricing'
import { cn } from '../../../lib/cn'
import { AnimatedNumber } from '../../ui/AnimatedNumber'
import { KpiCard } from '../../ui/KpiCard'
import { SimulationButton } from '../../ui/SimulationButton'

export function PricingDashboard() {
  const { t, formatUsd, formatCpmUsd } = useLocale()
  const [applied, setApplied] = useState(false)
  const [toast, setToast] = useState(false)

  const kpiLabels = useMemo(
    () => [
      t('modules.pricing.pages.dashboard.kpiAvgCpm'),
      t('modules.pricing.pages.dashboard.kpiDemand'),
      t('modules.pricing.pages.dashboard.kpiOccupancy'),
      t('modules.pricing.pages.dashboard.kpiRevenueLift'),
    ],
    [t],
  )

  const channels = useMemo(() => {
    const boosted = channelLeaderboard.map((c) =>
      applied && c.channel === 'Sport+' ? { ...c, cpm: 38.3, delta: 16.2 } : c,
    )
    return [...boosted].sort((a, b) => b.cpm - a.cpm)
  }, [applied])

  const aiInsightInterpolate = useMemo(() => {
    const impact72 = '+' + formatUsd(72, { thousands: true, style: 'compact' })
    return t('modules.pricing.pages.dashboard.aiInsightBody').replace('{impact}', impact72)
  }, [formatUsd, t])

  const animateCpm = useCallback((n: number) => formatCpmUsd(n, { style: 'standard', maxFractionDigits: 2, minFractionDigits: 2 }), [formatCpmUsd])
  const animateRevLift = useCallback((n: number) => formatUsd(n, { millions: true, style: 'compact' }), [formatUsd])

  const runApply = async () => {
    await new Promise((r) => setTimeout(r, 1100))
    setApplied(true)
    setToast(true)
    window.setTimeout(() => setToast(false), 3200)
  }

  return (
    <div className="relative grid lg:grid-cols-[1.6fr_1fr] gap-5">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#0a152d] text-white text-[11px] font-semibold px-4 py-2 shadow-xl border border-white/10"
          >
            {t('sim.toastPricing')}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pricingKpis.map((k, i) => {
            const label = kpiLabels[i]
            if (i === 0) {
              return (
                <KpiCard
                  key={k.label}
                  label={label}
                  value={
                    <AnimatedNumber value={applied ? 27.6 : 24.8} decimals={2} format={animateCpm} />
                  }
                  delta={applied ? 10.2 : k.delta}
                  sparkline={k.sparkline}
                />
              )
            }
            if (i === 3) {
              return (
                <KpiCard
                  key={k.label}
                  label={label}
                  value={
                    <AnimatedNumber value={applied ? 1.58 : 1.42} decimals={2} format={animateRevLift} />
                  }
                  delta={applied ? 16.2 : k.delta}
                  sparkline={k.sparkline}
                />
              )
            }
            return (
              <KpiCard key={k.label} label={label} value={k.value} delta={k.delta} sparkline={k.sparkline} />
            )
          })}
        </div>

        <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
                {t('modules.pricing.pages.dashboard.chartTitle')}
              </h3>
              <p className="text-[11.5px] text-slate-500">{t('modules.pricing.pages.dashboard.chartSub')}</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <Legend dot="bg-indigo-500" label={t('modules.pricing.pages.dashboard.legendCpm')} />
              <Legend dot="bg-cyan-400" label={t('modules.pricing.pages.dashboard.legendDemand')} />
              <Legend dot="bg-violet-500/40" label={t('modules.pricing.pages.dashboard.legendConfidence')} outline />
            </div>
          </div>
          <div className="mt-5">
            <AreaChart cpm={demandSeries.baseline} demand={demandSeries.bullish} labels={demandLabels} />
          </div>
        </div>

        <div className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-5 text-white flex items-start gap-3 shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
          <span className="h-7 w-7 rounded-md bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-200 shrink-0">
            <Sparkles size={13} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/55 font-semibold">
              {t('modules.pricing.pages.dashboard.aiInsight')}
            </div>
            <p className="text-[12.5px] mt-0.5 leading-snug">{aiInsightInterpolate}</p>
          </div>
          <SimulationButton
            label={t('action.applyAiRecommendation')}
            runningLabel={t('sim.running')}
            doneLabel={t('sim.done')}
            variant="light"
            className="shrink-0 !px-3 !py-1.5 !text-[10px]"
            disabled={applied}
            onRun={runApply}
          />
        </div>
      </div>

      <aside className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">
            {t('modules.pricing.pages.dashboard.topChannels')}
          </h3>
          <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
            {t('modules.pricing.pages.dashboard.cpm7d')}
          </span>
        </div>
        <motion.ul className="mt-4 space-y-2" layout>
          {channels.map((c, i) => {
            const isUp = c.delta >= 0
            return (
              <motion.li
                layout
                key={c.channel}
                className={cn(
                  'flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5',
                  applied && 'motion-safe:animate-[pulse_0.6s_ease-out_1]',
                )}
              >
                <span className="font-display text-[11px] font-semibold text-slate-300 tabular-nums w-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-[12px] font-semibold text-[#0a1b33]">{c.channel}</span>
                <span className="text-[12px] font-semibold text-[#0a1b33] tabular-nums">{formatCpmUsd(c.cpm)}</span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 text-[10px] font-semibold rounded-full px-1.5 py-0.5',
                    isUp
                      ? 'text-emerald-600 bg-emerald-500/10'
                      : 'text-rose-600 bg-rose-500/10',
                  )}
                >
                  {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {Math.abs(c.delta).toFixed(1)}%
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
      </aside>
    </div>
  )
}

function Legend({ dot, label, outline }: { dot: string; label: string; outline?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn('h-2 w-2 rounded-full', dot, outline && 'border border-violet-500/50')} />
      {label}
    </span>
  )
}

function AreaChart({ cpm, demand, labels }: { cpm: number[]; demand: number[]; labels: string[] }) {
  const id = useId().replace(/:/g, '')
  const w = 640
  const h = 200
  const padX = 30
  const padY = 20
  const max = Math.max(...cpm, ...demand)
  const min = 0
  const xStep = (w - padX * 2) / (cpm.length - 1)

  const buildPath = (data: number[]) =>
    data
      .map((v, i) => {
        const x = padX + i * xStep
        const y = h - padY - ((v - min) / (max - min)) * (h - padY * 2)
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
      })
      .join(' ')

  const cpmPath = buildPath(cpm)
  const demandPath = buildPath(demand)
  const cpmFill = `${cpmPath} L ${padX + (cpm.length - 1) * xStep} ${h - padY} L ${padX} ${h - padY} Z`

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[200px]">
        <defs>
          <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`band-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={padX}
            x2={w - padX}
            y1={padY + (i * (h - padY * 2)) / 3}
            y2={padY + (i * (h - padY * 2)) / 3}
            stroke="#e2e8f0"
            strokeDasharray="2 4"
          />
        ))}

        <path d={cpmFill} fill={`url(#area-${id})`} />
        <path d={cpmPath} stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path
          d={demandPath}
          stroke="#22d3ee"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />

        {labels.map((l, i) => (
          <text
            key={l}
            x={padX + i * xStep}
            y={h - 4}
            textAnchor="middle"
            className="fill-slate-400"
            style={{ fontSize: 9 }}
          >
            {l}
          </text>
        ))}
      </svg>
    </div>
  )
}
