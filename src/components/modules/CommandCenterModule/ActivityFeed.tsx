import { Activity, Banknote, CheckCircle2, FileText, Film, Sparkles } from 'lucide-react'
import { useLocale } from '../../../i18n/LocaleContext'
import { activityFeed } from '../../../lib/mock/commandCenter'

const iconMap = {
  quote: { icon: FileText, color: 'bg-violet-500/15 text-violet-600 border-violet-500/30' },
  pricing: { icon: Banknote, color: 'bg-cyan-500/15 text-cyan-700 border-cyan-500/30' },
  tvc: { icon: Film, color: 'bg-amber-500/15 text-amber-700 border-amber-500/30' },
  approval: { icon: CheckCircle2, color: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30' },
  system: { icon: Sparkles, color: 'bg-indigo-500/15 text-indigo-700 border-indigo-500/30' },
} as const

export function ActivityFeed() {
  const { formatUsd } = useLocale()
  return (
    <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
            AI Workspace activity
          </h3>
          <p className="text-[11.5px] text-slate-500">
            <Activity size={11} className="inline -mt-0.5 mr-1 text-emerald-500" />
            {activityFeed.length} events today · real-time
          </p>
        </div>
        <div className="inline-flex bg-slate-100 rounded-full p-1 text-[10.5px] font-semibold">
          <button className="px-3 py-1 rounded-full bg-white text-[#0a1b33] shadow-sm">All</button>
          <button className="px-3 py-1 rounded-full text-slate-500">Quotation</button>
          <button className="px-3 py-1 rounded-full text-slate-500">Pricing</button>
          <button className="px-3 py-1 rounded-full text-slate-500">TVC</button>
        </div>
      </div>

      <ol className="mt-5 relative">
        <span className="absolute left-3.5 top-1 bottom-1 w-px bg-slate-200" />
        {activityFeed.map((e) => {
          const m = iconMap[e.type]
          const Icon = m.icon
          const target =
            e.targetUsdThousands !== undefined ? (
              <>
                <span className="font-semibold">{e.target}</span>
                <span className="font-semibold">
                  {' '}
                  · {formatUsd(e.targetUsdThousands, { thousands: true, style: 'compact' })}
                </span>
              </>
            ) : (
              <span className="font-semibold">{e.target}</span>
            )
          return (
            <li key={e.id} className="relative pl-10 pb-4 last:pb-0">
              <span
                className={`absolute left-0 top-0 h-7 w-7 rounded-full border flex items-center justify-center ${m.color} bg-white`}
              >
                <Icon size={12} />
              </span>
              <div className="rounded-xl bg-white border border-slate-100 px-4 py-2.5 shadow-[0_8px_22px_-14px_rgba(15,23,42,0.12)]">
                <div className="flex items-center justify-between">
                  <div className="text-[12px] text-[#0a1b33]">
                    <span className="font-semibold">{e.actor}</span> {e.action} {target}
                  </div>
                  <span className="text-[10.5px] text-slate-400 font-semibold tabular-nums">
                    {e.time}
                  </span>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
