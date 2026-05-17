import { useMemo } from 'react'
import { useLocale } from '../../../i18n/LocaleContext'
import { revenueSeries, weekLabels } from '../../../lib/mock/quotation'
import { KpiCard } from '../../ui/KpiCard'
import { MiniBarChart } from '../../ui/MiniBarChart'
import { SimulationButton } from '../../ui/SimulationButton'

export function PricingSimulation() {
  const { t, formatUsd, formatCpmUsd } = useLocale()

  const suggestion = useMemo(() => {
    const impact = '+' + formatUsd(32, { thousands: true, style: 'compact' })
    return (
      t('modules.quotation.pages.pricing.suggestionBody').replace('{impact}', impact) +
      ' ' +
      t('modules.quotation.pages.pricing.autoApply')
    )
  }, [formatUsd, t])

  const baseCpmLabel = formatCpmUsd(24.8, { style: 'standard', maxFractionDigits: 2, minFractionDigits: 2 })

  return (
    <div className="grid lg:grid-cols-[1fr_1.3fr] gap-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">{t('modules.quotation.pages.pricing.title')}</h3>
        <p className="text-[12px] text-slate-500 mt-0.5">{t('modules.quotation.pages.pricing.sub')}</p>

        <div className="mt-6 space-y-5">
          <Lever
            label={t('modules.quotation.pages.pricing.baseCpm')}
            valueLabel={baseCpmLabel}
            min={10}
            max={50}
            value={24.8}
          />
          <Lever label={t('modules.quotation.pages.pricing.frequency')} valueLabel="3.4 OTS" min={1} max={8} value={3.4} />
          <Lever label={t('modules.quotation.pages.pricing.shareVoice')} valueLabel="22%" min={5} max={50} value={22} unit="%" />
          <Lever label={t('modules.quotation.pages.pricing.volumeDisc')} valueLabel="6%" min={0} max={20} value={6} unit="%" />
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200/70 p-4">
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold">
            {t('modules.quotation.pages.pricing.aiSuggestion')}
          </div>
          <p className="text-[12px] text-[#0a1b33] mt-1.5 leading-snug">{suggestion}</p>
          <div className="mt-3 flex gap-2 flex-wrap">
            <SimulationButton
              label={t('action.applySuggestion')}
              runningLabel={t('sim.running')}
              doneLabel={t('sim.done')}
              variant="dark"
              className="!px-3 !py-1.5 !text-[10px]"
              onRun={async () => {
                await new Promise((r) => setTimeout(r, 800))
              }}
            />
            <SimulationButton
              label={t('action.dismiss')}
              runningLabel={t('sim.running')}
              doneLabel={t('sim.done')}
              variant="light"
              className="!px-3 !py-1.5 !text-[10px] border border-slate-200"
              onRun={async () => {
                await new Promise((r) => setTimeout(r, 600))
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard
            label={t('modules.quotation.pages.pricing.totalRevenue')}
            value={formatUsd(340.5, { thousands: true, style: 'compact' })}
            delta={6.4}
          />
          <KpiCard
            label={t('modules.quotation.pages.input.avgCpmLabel')}
            value={formatCpmUsd(24.8, { style: 'standard', maxFractionDigits: 2, minFractionDigits: 2 })}
            delta={-1.2}
          />
          <KpiCard label={t('modules.quotation.pages.pricing.grp')} value="248" delta={4.4} />
        </div>

        <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">
              {t('modules.quotation.pages.pricing.weeklyTitle')}
            </h3>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              {t('modules.quotation.pages.pricing.baselineDelta')}
            </span>
          </div>
          <div className="mt-4">
            <MiniBarChart data={revenueSeries} labels={weekLabels} height={140} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Lever({
  label,
  valueLabel,
  value,
  min,
  max,
  unit,
}: {
  label: string
  valueLabel: string
  value: number
  min: number
  max: number
  unit?: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#0a1b33]">{label}</span>
        <span className="text-[11px] text-slate-500 tabular-nums">
          {valueLabel}
          {unit ? ` ${unit}` : ''}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={0.1}
        defaultValue={value}
        className="w-full mt-2 accent-[#0a152d]"
      />
    </div>
  )
}
