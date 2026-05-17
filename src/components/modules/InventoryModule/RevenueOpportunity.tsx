import { motion } from 'motion/react'
import { useCallback, useMemo, useState } from 'react'
import { useLocale } from '../../../i18n/LocaleContext'
import { openSlots } from '../../../lib/mock/inventory'
import { AnimatedNumber } from '../../ui/AnimatedNumber'
import { DonutGauge } from '../../ui/DonutGauge'
import { SimulationButton } from '../../ui/SimulationButton'

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

export function RevenueOpportunity() {
  const { t, formatUsd, formatCpmUsd } = useLocale()
  const sorted = [...openSlots].sort((a, b) => b.projected - a.projected)
  const baseTotal = sorted.reduce((s, x) => s + x.projected, 0)
  const [packaged, setPackaged] = useState<Set<string>>(() => new Set())
  const [totalBoost, setTotalBoost] = useState(0)

  const displayTotal = baseTotal + totalBoost

  const summary = useMemo(
    () => {
      const amount = formatUsd(Math.round(baseTotal / 1000), { thousands: true, style: 'compact' })
      return t('modules.inventory.pages.opp.openSlotsSummary').replace('{count}', String(sorted.length)).replace('{amount}', amount)
    },
    [baseTotal, formatUsd, sorted.length, t],
  )

  const packageOne = useCallback(async (id: string, bump: number) => {
    await delay(700)
    let bumped = false
    setPackaged((prev) => {
      if (prev.has(id)) return prev
      bumped = true
      return new Set(prev).add(id)
    })
    if (bumped) setTotalBoost((b0) => b0 + bump)
  }, [])

  const packageAll = useCallback(async () => {
    for (const s of sorted) {
      await packageOne(s.id, Math.round(s.projected * 0.04))
    }
  }, [sorted, packageOne])

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
              {t('modules.inventory.pages.opp.title')}
            </h3>
            <p className="text-[11.5px] text-slate-500">{summary}</p>
          </div>
          <SimulationButton
            label={t('modules.inventory.pages.opp.autoPackageAll')}
            runningLabel={t('sim.running')}
            doneLabel={t('sim.done')}
            variant="dark"
            onRun={packageAll}
          />
        </div>

        <ul className="mt-5 divide-y divide-slate-100">
          {sorted.map((s, i) => {
            const isPackaged = packaged.has(s.id)
            return (
              <motion.li
                layout
                key={s.id}
                className={`py-3 grid grid-cols-[28px_1fr_auto_auto] gap-3 items-center transition-colors ${
                  isPackaged ? 'bg-slate-50/80 opacity-70' : ''
                }`}
              >
                <span className="text-[11px] font-display font-semibold text-slate-300 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="text-[12px] font-semibold text-[#0a1b33]">
                    {s.channel} · {s.date} · {s.daypart}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    CPM {formatCpmUsd(s.cpm)} · fit score {s.fit}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-[16px] font-medium text-[#0a1b33] tabular-nums leading-none">
                    {formatUsd(s.projected)}
                  </div>
                  <div className="text-[10px] text-slate-400">{t('modules.inventory.pages.opp.projectedRevLabel')}</div>
                </div>
                <div className="flex justify-end">
                  {isPackaged ? (
                    <span className="rounded-full bg-slate-200/80 text-[10px] font-semibold text-slate-600 px-2.5 py-1">
                      {t('modules.inventory.pages.opp.packageCreated')}
                    </span>
                  ) : (
                    <SimulationButton
                      label={t('action.autoPackage')}
                      runningLabel={t('sim.running')}
                      doneLabel={t('sim.done')}
                      variant="light"
                      className="!px-3 !py-1.5 !text-[10px]"
                      onRun={() => packageOne(s.id, Math.round(s.projected * 0.04))}
                    />
                  )}
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>

      <aside className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-5 text-white flex flex-col items-center text-center shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
        <div className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
          {t('modules.inventory.pages.opp.addressable')}
        </div>
        <DonutGauge value={72} size={120} thickness={10} variant="emerald" />
        <div className="font-display text-[26px] font-medium mt-3 tabular-nums">
          <AnimatedNumber
            value={displayTotal / 1000}
            decimals={0}
            format={(n) => formatUsd(Math.round(n), { thousands: true, style: 'compact' })}
          />
        </div>
        <div className="text-[11px] text-white/65">{t('modules.inventory.pages.opp.filledNote')}</div>

        <div className="mt-5 w-full rounded-xl bg-white/5 border border-white/10 p-3 text-left">
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/55 font-semibold">
            {t('modules.inventory.pages.opp.aiNudge')}
          </div>
          <p className="text-[11.5px] mt-1 leading-snug">{t('modules.inventory.pages.opp.aiNudgeBody')}</p>
        </div>
      </aside>
    </div>
  )
}
