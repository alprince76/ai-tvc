import { Building2, CalendarRange, Crosshair, Sparkles, Tv2, Users, Wallet } from 'lucide-react'
import { useMemo } from 'react'
import { useLocale } from '../../../i18n/LocaleContext'
import { cn } from '../../../lib/cn'
import { aiRationale, campaignBrief, packages } from '../../../lib/mock/quotation'
import { DonutGauge } from '../../ui/DonutGauge'
import { SimulationButton } from '../../ui/SimulationButton'
import { StatusBadge } from '../../ui/StatusBadge'

export function PackageRecommendation() {
  const { t, tr } = useLocale()

  const briefRows = useMemo(
    () => [
      { icon: Building2, label: t('modules.quotation.pages.input.brand'), value: campaignBrief.brand },
      { icon: Tv2, label: t('modules.quotation.pages.input.vertical'), value: campaignBrief.vertical },
      { icon: Crosshair, label: t('modules.quotation.pages.input.kpiFocus'), value: campaignBrief.kpi },
      { icon: Wallet, label: t('modules.quotation.pages.input.budget'), value: `$${campaignBrief.budget.toLocaleString()}` },
      { icon: CalendarRange, label: t('modules.quotation.pages.input.flightEnd'), value: campaignBrief.flight },
      { icon: Users, label: t('modules.quotation.pages.input.targetDemo'), value: campaignBrief.demo },
    ],
    [t],
  )

  return (
    <div className="grid lg:grid-cols-[280px_1fr_280px] gap-5">
      <aside className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a1b33]/60">
            {t('modules.quotation.pages.recommend.briefHeading')}
          </span>
          <StatusBadge status="ai" label={t('status.aiParsed')} size="xs" />
        </div>
        <ul className="mt-4 space-y-3.5">
          {briefRows.map((row) => (
            <li key={row.label} className="flex items-start gap-2.5">
              <span className="mt-0.5 h-6 w-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500">
                <row.icon size={12} />
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  {row.label}
                </span>
                <span className="text-[12px] font-medium text-[#0a1b33]">{row.value}</span>
              </div>
            </li>
          ))}
        </ul>
        <SimulationButton
          label={t('action.editBrief')}
          runningLabel={t('sim.running')}
          doneLabel={t('sim.done')}
          variant="light"
          className="mt-5 w-full !rounded-xl !py-2.5 bg-slate-100/80 !text-[#0a1b33] hover:!bg-slate-200/80 shadow-none border-0"
          onRun={async () => {
            await new Promise((r) => setTimeout(r, 900))
          }}
        />
      </aside>

      <div className="space-y-3">
        {packages.map((p) => (
          <div
            key={p.id}
            className={cn(
              'rounded-2xl border p-5 transition-all backdrop-blur-2xl',
              p.recommended
                ? 'bg-white border-violet-200 shadow-[0_24px_60px_-30px_rgba(139,92,246,0.45)] ring-1 ring-violet-200/60'
                : 'bg-white/85 border-slate-200/60 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]',
            )}
          >
            <div className="grid grid-cols-[64px_1fr_auto] gap-4 items-start">
              <DonutGauge value={p.fitScore} size={64} variant={p.recommended ? 'violet' : 'cyan'} />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-[18px] font-medium text-[#0a1b33] tracking-tight">
                    {p.name}
                  </h3>
                  {p.recommended && <StatusBadge status="ai" label={t('status.aiTopPick')} size="xs" />}
                </div>
                <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">{p.tagline}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px]">
                  <span className="text-slate-500">
                    {t('modules.quotation.pages.recommend.channels')}:{' '}
                    <span className="text-[#0a1b33] font-semibold">{p.channels.join(' · ')}</span>
                  </span>
                  <span className="text-slate-500">
                    {t('modules.quotation.pages.recommend.spots')}:{' '}
                    <span className="text-[#0a1b33] font-semibold">{p.spots}</span>
                  </span>
                  <span className="text-slate-500">
                    {t('modules.quotation.pages.recommend.reach')}:{' '}
                    <span className="text-[#0a1b33] font-semibold">{p.reach}</span>
                  </span>
                  <span className="text-slate-500">
                    {t('modules.quotation.pages.recommend.cpm')}:{' '}
                    <span className="text-[#0a1b33] font-semibold">${p.cpm}</span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  {t('modules.quotation.pages.recommend.projectedRevenue')}
                </div>
                <div className="font-display text-[22px] font-medium text-[#0a1b33] tracking-tight leading-none mt-1">
                  ${p.revenue.toLocaleString()}
                </div>
                <SimulationButton
                  label={t('modules.quotation.pages.recommend.select')}
                  runningLabel={t('sim.running')}
                  doneLabel={t('sim.done')}
                  variant="dark"
                  className="mt-3 !px-3 !py-1.5 !text-[10px] inline-flex"
                  onRun={async () => {
                    await new Promise((r) => setTimeout(r, 700))
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-5 text-white shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-md bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-200">
            <Sparkles size={13} />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
              {t('modules.quotation.pages.recommend.aiRationaleTitle')}
            </span>
            <span className="text-[12px] font-semibold">{t('modules.quotation.pages.recommend.whyTitle')}</span>
          </div>
        </div>

        <ul className="mt-4 space-y-2.5">
          {aiRationale.map((line, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(103,232,249,0.8)]" />
              <span className="text-[11.5px] text-white/85 leading-snug">{tr(line)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <SimulationButton
            label={t('action.regenerate')}
            runningLabel={t('sim.running')}
            doneLabel={t('sim.done')}
            variant="ghost"
            className="!bg-white/10 !text-white border border-white/10"
            onRun={async () => {
              await new Promise((r) => setTimeout(r, 1100))
            }}
          />
          <SimulationButton
            label={t('action.exportQuote')}
            runningLabel={t('sim.running')}
            doneLabel={t('sim.done')}
            variant="light"
            onRun={async () => {
              await new Promise((r) => setTimeout(r, 900))
            }}
          />
        </div>
      </aside>
    </div>
  )
}
