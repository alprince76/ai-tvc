import { AlertTriangle, Sparkles, TrendingUp } from 'lucide-react'
import { motion } from 'motion/react'
import { useCallback, useState } from 'react'
import { useLocale } from '../../../i18n/LocaleContext'
import { USD_TO_IDR } from '../../../lib/money'
import { insights, type Insight } from '../../../lib/mock/analytics'
import { cn } from '../../../lib/cn'
import { AnimatedNumber } from '../../ui/AnimatedNumber'
import { SimulationButton } from '../../ui/SimulationButton'

const kindMap: Record<Insight['kind'], { icon: typeof Sparkles; color: string }> = {
  opportunity: {
    icon: TrendingUp,
    color: 'text-emerald-700 bg-emerald-500/10 border-emerald-500/20',
  },
  anomaly: {
    icon: Sparkles,
    color: 'text-violet-700 bg-violet-500/10 border-violet-500/20',
  },
  risk: {
    icon: AlertTriangle,
    color: 'text-rose-700 bg-rose-500/10 border-rose-500/20',
  },
}

function InsightRow({
  insight: i,
  applied,
  onApply,
}: {
  insight: Insight
  applied: boolean
  onApply: () => void
}) {
  const { t, formatUsd, tr } = useLocale()
  const k = kindMap[i.kind]
  const Icon = k.icon

  /** Modeled nominal IDR uplift in mock → incremental USD shown via demo FX */
  const appliedIncrementalUsd = 2_100_000 / USD_TO_IDR

  const recommendedAction =
    i.actionTemplate && i.actionAmountUsdThousands !== undefined
      ? tr(i.actionTemplate).replace(
          /\{amount\}/g,
          formatUsd(i.actionAmountUsdThousands, { thousands: true, style: 'compact' }),
        )
      : (i.action ?? '')

  const formatAppliedDelta = useCallback(
    (n: number) => '+' + formatUsd(n, { style: 'compact' }),
    [formatUsd],
  )

  const kindLabels: Record<Insight['kind'], string> = {
    opportunity: t('modules.analytics.pages.insights.kindOpportunity'),
    anomaly: t('modules.analytics.pages.insights.kindAnomaly'),
    risk: t('modules.analytics.pages.insights.kindRisk'),
  }

  const runApply = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 900))
    onApply()
  }, [onApply])

  return (
    <motion.div
      layout
      className={cn(
        'rounded-2xl bg-white/85 backdrop-blur-2xl border p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)] grid lg:grid-cols-[120px_1fr_auto] gap-4 items-start',
        applied ? 'border-emerald-400 ring-2 ring-emerald-200/80' : 'border-slate-200/60',
      )}
    >
      <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold w-fit', k.color)}>
        <Icon size={11} />
        {kindLabels[i.kind]}
      </span>

      <div>
        <h3 className="font-display text-[15px] font-medium text-[#0a1b33] tracking-tight leading-snug">
          {i.title}
        </h3>
        <p className="text-[12px] text-slate-500 mt-1 leading-snug">{i.detail}</p>
        <div className="mt-2 text-[11.5px] text-[#0a1b33] font-semibold inline-flex items-center gap-1.5 flex-wrap">
          <Sparkles size={11} className="text-violet-500" />
          {t('modules.analytics.pages.insights.recommended')}{' '}
          <span className="text-slate-600 font-normal">{recommendedAction}</span>
        </div>
        {applied && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-[11px] font-semibold text-emerald-700 inline-flex items-center gap-2"
          >
            <span className="rounded-full bg-emerald-500 text-white text-[9px] px-1.5 py-0.5">✓</span>
            {t('sim.insightApplied')} ·{' '}
            <AnimatedNumber
              value={appliedIncrementalUsd}
              decimals={1}
              format={formatAppliedDelta}
            />
          </motion.div>
        )}
      </div>

      <div className="text-right">
        <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
          {t('floating.aiConfidence')}
        </div>
        <div className="font-display text-[20px] font-medium text-[#0a1b33] tabular-nums leading-none mt-0.5">
          {i.confidence}%
        </div>
        <SimulationButton
          label={t('modules.analytics.pages.insights.act')}
          runningLabel={t('sim.running')}
          doneLabel={t('sim.done')}
          variant="dark"
          className="mt-3 !px-3 !py-1.5 !text-[10.5px]"
          disabled={applied}
          onRun={runApply}
        />
      </div>
    </motion.div>
  )
}

export function AIInsights() {
  const [applied, setApplied] = useState<Set<string>>(() => new Set())

  return (
    <div className="space-y-3">
      {insights.map((i) => (
        <InsightRow
          key={i.id}
          insight={i}
          applied={applied.has(i.id)}
          onApply={() => setApplied((prev) => new Set(prev).add(i.id))}
        />
      ))}
    </div>
  )
}
