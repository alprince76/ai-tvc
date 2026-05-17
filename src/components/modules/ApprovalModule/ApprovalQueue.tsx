import { Check, Clock } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useLocale } from '../../../i18n/LocaleContext'
import { approvalChain, approvalQueue, type ApprovalSubject } from '../../../lib/mock/approval'
import { cn } from '../../../lib/cn'
import { SimulationButton } from '../../ui/SimulationButton'
import { StatusBadge } from '../../ui/StatusBadge'

const FILTER_IDS = ['mine', 'team', 'overdue', 'all'] as const
type FilterId = (typeof FILTER_IDS)[number]

export function ApprovalQueue() {
  const { t, tr, formatUsd } = useLocale()
  const [active, setActive] = useState(approvalQueue[0].id)
  const [filter, setFilter] = useState<FilterId>('team')
  const selected = approvalQueue.find((q) => q.id === active) ?? approvalQueue[0]
  const chain = approvalChain[selected.id] ?? approvalChain.q1

  const subjectText = useCallback(
    (subject: ApprovalSubject) => {
      if (typeof subject === 'string') return subject
      const amt = formatUsd(subject.moneyUsdThousands, { thousands: true, style: 'compact' })
      return tr(subject.template).replace(/\{amount\}/g, amt)
    },
    [formatUsd, tr],
  )

  const filterLabel = useMemo(() => {
    const m: Record<FilterId, string> = {
      mine: t('modules.approval.pages.queue.filterMine'),
      team: t('modules.approval.pages.queue.filterTeam'),
      overdue: t('modules.approval.pages.queue.filterOverdue'),
      all: t('modules.approval.pages.queue.filterAll'),
    }
    return m
  }, [t])

  return (
    <div className="grid lg:grid-cols-[180px_1fr_320px] gap-5">
      <aside className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-4 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[#0a1b33]/60 font-semibold">
          {t('modules.approval.pages.queue.filters')}
        </div>
        <ul className="mt-3 space-y-1">
          {FILTER_IDS.map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => setFilter(id)}
                className={cn(
                  'w-full text-left px-3 py-1.5 rounded-lg text-[11.5px] font-semibold transition-colors',
                  filter === id
                    ? 'bg-[#0a152d] text-white'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-[#0a1b33]',
                )}
              >
                {filterLabel[id]}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-xl bg-rose-50 border border-rose-200/70 p-3">
          <div className="text-[10px] uppercase tracking-[0.14em] text-rose-600 font-semibold">
            {t('modules.approval.pages.queue.overdue')}
          </div>
          <div className="font-display text-[20px] font-medium text-rose-600 mt-0.5 tabular-nums">2</div>
          <div className="text-[10.5px] text-rose-600/80">{t('modules.approval.pages.queue.pastSla')}</div>
        </div>
      </aside>

      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)] overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">
            {t('modules.approval.pages.queue.title')}
          </h3>
          <span className="text-[10px] text-slate-500 font-semibold">
            {t('modules.approval.pages.queue.items').replace('{count}', String(approvalQueue.length))}
          </span>
        </div>

        <ul className="divide-y divide-slate-100">
          {approvalQueue.map((q) => (
            <li
              key={q.id}
              onClick={() => setActive(q.id)}
              role="presentation"
              className={cn(
                'px-5 py-3.5 cursor-pointer transition-colors grid grid-cols-[1fr_auto] gap-3',
                active === q.id ? 'bg-violet-50/40' : 'hover:bg-slate-50',
              )}
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12.5px] font-semibold text-[#0a1b33]">{subjectText(q.subject)}</span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">
                    {q.type}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {q.requester} · {q.team} · {q.age} old
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <StatusBadge status={q.status} size="xs" />
                <BottleneckBar value={q.bottleneck} label={t('modules.approval.pages.queue.risk')} />
                <span className="text-[10px] text-slate-400">ETA {q.eta}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-5 text-white shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
        <div className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
          {t('modules.approval.pages.queue.selectedChain')}
        </div>
        <h4 className="font-display text-[14px] font-medium mt-2">{subjectText(selected.subject)}</h4>

        <ol className="mt-4 relative">
          <span className="absolute left-2.5 top-2 bottom-2 w-px bg-white/15" />
          {chain.map((s, i) => (
            <li key={i} className="relative pl-8 pb-3.5 last:pb-0">
              <span
                className={cn(
                  'absolute left-0 top-0 h-5 w-5 rounded-full flex items-center justify-center',
                  s.status === 'done' && 'bg-emerald-400 text-[#0a152d]',
                  s.status === 'current' && 'bg-cyan-400 text-[#0a152d] shadow-[0_0_12px_rgba(34,211,238,0.7)]',
                  s.status === 'pending' && 'bg-white/10 text-white/55',
                )}
              >
                {s.status === 'done' ? <Check size={11} /> : <Clock size={10} />}
              </span>
              <div className="text-[11.5px] font-semibold text-white">{s.role}</div>
              <div className="text-[11px] text-white/65">{s.name}</div>
              {s.time && <div className="text-[10px] text-white/45 mt-0.5">{s.time}</div>}
            </li>
          ))}
        </ol>

        <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-3">
          <div className="text-[10px] uppercase tracking-[0.14em] text-cyan-200 font-semibold">
            {t('modules.approval.pages.queue.aiEta')}
          </div>
          <div className="text-[11.5px] mt-1 text-white/85 leading-snug">{t('modules.approval.pages.queue.etaBody')}</div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <SimulationButton
            label={t('action.approve')}
            runningLabel={t('sim.running')}
            doneLabel={t('sim.done')}
            variant="light"
            className="!rounded-xl !py-2"
            onRun={async () => {
              await new Promise((r) => setTimeout(r, 850))
            }}
          />
          <SimulationButton
            label={t('action.decline')}
            runningLabel={t('sim.running')}
            doneLabel={t('sim.done')}
            variant="ghost"
            className="!rounded-xl !py-2 !bg-white/10 !text-white border border-white/15"
            onRun={async () => {
              await new Promise((r) => setTimeout(r, 800))
            }}
          />
        </div>
      </aside>
    </div>
  )
}

function BottleneckBar({ value, label }: { value: number; label: string }) {
  const color = value > 60 ? 'bg-rose-500' : value > 30 ? 'bg-amber-500' : 'bg-emerald-500'
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">{label}</span>
      <span className="h-1.5 w-16 rounded-full bg-slate-200 overflow-hidden">
        <span className={cn('h-full block', color)} style={{ width: `${value}%` }} />
      </span>
    </div>
  )
}
