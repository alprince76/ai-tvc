import { useMemo } from 'react'
import { Check, Clock, Sparkles } from 'lucide-react'
import { useLocale } from '../../../i18n/LocaleContext'
import { SimulationButton } from '../../ui/SimulationButton'
import { StatusBadge } from '../../ui/StatusBadge'

const lineItems = [
  { ch: 'Metro One', daypart: 'Prime 19–22h', spots: 8, cpm: 31.8, total: 102200 },
  { ch: 'Sport+', daypart: 'Live 20–22h', spots: 4, cpm: 34.2, total: 84400 },
  { ch: 'Nusantara TV', daypart: 'Prime 19–21h', spots: 4, cpm: 28.6, total: 62500 },
  { ch: 'News 24', daypart: 'Bulletin 19:00', spots: 2, cpm: 22.4, total: 28900 },
]

const subtotal = lineItems.reduce((s, l) => s + l.total, 0)
const fees = 12500
const total = subtotal + fees

const approvalSteps = [
  { role: 'Account Lead', name: 'Mira C.', state: 'done' as const, time: 'Mon · 09:14' },
  { role: 'Revenue Ops', name: 'Aldi N.', state: 'done' as const, time: 'Mon · 11:02' },
  { role: 'Sales VP', name: 'Karen Y.', state: 'current' as const, time: '— in review —' },
  { role: 'Client sign-off', name: 'Aurora · Pak Rendra', state: 'pending' as const, time: 'awaiting' },
]

export function QuotePreview() {
  const { t, formatUsd, formatCpmUsd } = useLocale()

  const avgCpmText = formatCpmUsd(24.8, { style: 'standard', maxFractionDigits: 2, minFractionDigits: 2 })

  const aiSummaryBodyFull = useMemo(
    () => t('modules.quotation.pages.preview.aiSummaryBody').replace('{avgCpm}', avgCpmText),
    [avgCpmText, t],
  )

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-5">
      <div className="rounded-2xl bg-white border border-slate-200/70 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] overflow-hidden">
        <div className="px-8 pt-8 pb-5 border-b border-slate-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-500" />
              <span className="font-display text-[14px] font-medium text-[#0a1b33]">
                {t('modules.quotation.pages.preview.brandTag')}
              </span>
            </div>
            <h3 className="font-display text-[22px] font-medium text-[#0a1b33] mt-3 leading-tight">
              {t('modules.quotation.pages.preview.title')}
            </h3>
            <div className="mt-1.5 text-[11px] text-slate-500">
              {t('modules.quotation.pages.preview.meta')}
            </div>
          </div>
          <div className="text-right">
            <StatusBadge status="review" label={t('status.review')} />
            <div className="text-[10px] text-slate-400 mt-2">v3 · AI-generated</div>
          </div>
        </div>

        <div className="px-8 py-5">
          <div className="grid grid-cols-4 text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold border-b border-slate-100 pb-2">
            <span>{t('modules.quotation.pages.preview.colChannel')}</span>
            <span>{t('modules.quotation.pages.preview.colDaypart')}</span>
            <span className="text-right">{t('modules.quotation.pages.preview.colSpotsCpm')}</span>
            <span className="text-right">{t('modules.quotation.pages.preview.colTotal')}</span>
          </div>
          {lineItems.map((l, i) => (
            <div
              key={i}
              className="grid grid-cols-4 py-3 text-[12px] border-b border-slate-100 last:border-b-0"
            >
              <span className="font-semibold text-[#0a1b33]">{l.ch}</span>
              <span className="text-slate-500">{l.daypart}</span>
              <span className="text-right text-[#0a1b33]">
                {l.spots} · {formatCpmUsd(l.cpm)}
              </span>
              <span className="text-right font-semibold text-[#0a1b33] tabular-nums">
                {formatUsd(l.total)}
              </span>
            </div>
          ))}

          <div className="mt-4 ml-auto w-64 text-[12px] space-y-1.5">
            <Row label={t('modules.quotation.pages.preview.subtotal')} value={formatUsd(subtotal)} />
            <Row label={t('modules.quotation.pages.preview.prodTraffic')} value={formatUsd(fees)} />
            <div className="h-px bg-slate-200 my-1" />
            <Row label={t('modules.quotation.pages.preview.total')} value={formatUsd(total)} highlight />
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200/80 p-4 flex items-start gap-3">
            <Sparkles size={14} className="text-violet-500 mt-0.5 shrink-0" />
            <p className="text-[11.5px] text-[#0a1b33] leading-snug">
              <b>{t('modules.quotation.pages.preview.aiSummary')}</b> {aiSummaryBodyFull}
            </p>
          </div>
        </div>
      </div>

      <aside className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)] h-fit">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[#0a1b33]/60 font-semibold">
          {t('modules.quotation.pages.preview.approvalChain')}
        </div>
        <ul className="mt-4 space-y-3">
          {approvalSteps.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className={
                  s.state === 'done'
                    ? 'mt-0.5 h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center'
                    : s.state === 'current'
                      ? 'mt-0.5 h-5 w-5 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.6)]'
                      : 'mt-0.5 h-5 w-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center'
                }
              >
                {s.state === 'done' ? <Check size={11} /> : <Clock size={10} />}
              </span>
              <div className="flex flex-col flex-1">
                <span className="text-[11px] font-semibold text-[#0a1b33]">{s.role}</span>
                <span className="text-[11px] text-slate-500">{s.name}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{s.time}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <SimulationButton
            label={t('action.approve')}
            runningLabel={t('sim.running')}
            doneLabel={t('sim.done')}
            variant="dark"
            className="!py-2.5"
            onRun={async () => {
              await new Promise((r) => setTimeout(r, 800))
            }}
          />
          <SimulationButton
            label={t('action.decline')}
            runningLabel={t('sim.running')}
            doneLabel={t('sim.done')}
            variant="light"
            className="!py-2.5 border border-slate-200"
            onRun={async () => {
              await new Promise((r) => setTimeout(r, 800))
            }}
          />
        </div>
      </aside>
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={highlight ? 'text-[#0a1b33] font-semibold' : 'text-slate-500'}>{label}</span>
      <span
        className={
          highlight
            ? 'font-display text-[18px] font-medium text-[#0a1b33] tabular-nums'
            : 'text-[#0a1b33] tabular-nums'
        }
      >
        {value}
      </span>
    </div>
  )
}
