import { Check, Minus, X } from 'lucide-react'
import { recommendations, type PricingRecommendation } from '../../../lib/mock/pricing'
import { cn } from '../../../lib/cn'

const actionMap: Record<PricingRecommendation['action'], { bg: string; text: string; label: string }> = {
  raise: { bg: 'bg-emerald-500/10 border border-emerald-500/20', text: 'text-emerald-600', label: 'Raise' },
  discount: { bg: 'bg-amber-500/10 border border-amber-500/20', text: 'text-amber-600', label: 'Discount' },
  hold: { bg: 'bg-slate-200/60 border border-slate-300/60', text: 'text-slate-600', label: 'Hold' },
}

export function AIRecommendations() {
  return (
    <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
            AI pricing recommendations
          </h3>
          <p className="text-[11.5px] text-slate-500">{recommendations.length} active · refreshed every 15m</p>
        </div>
        <button className="rounded-full bg-[#0a152d] text-white text-[11px] font-semibold px-4 py-2">
          Approve all (3)
        </button>
      </div>

      <ul className="mt-5 divide-y divide-slate-100">
        {recommendations.map((r) => {
          const a = actionMap[r.action]
          return (
            <li key={r.id} className="py-4 grid lg:grid-cols-[96px_1fr_auto] gap-4 items-start">
              <span
                className={cn(
                  'inline-flex items-center justify-center gap-1 rounded-full text-[11px] font-semibold py-1',
                  a.bg,
                  a.text,
                )}
              >
                {r.action === 'raise' && <Check size={11} />}
                {r.action === 'discount' && <Check size={11} />}
                {r.action === 'hold' && <Minus size={11} />}
                {a.label} {r.delta}
              </span>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[12.5px] text-[#0a1b33]">{r.channel}</span>
                  <span className="text-[11px] text-slate-400">·</span>
                  <span className="text-[11.5px] text-slate-500">{r.daypart}</span>
                </div>
                <p className="text-[12px] text-slate-600 mt-1 leading-snug">{r.reason}</p>
                <div className="mt-1.5 text-[11px] text-emerald-700 font-semibold">{r.impact}</div>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <button className="rounded-full bg-[#0a152d] text-white text-[11px] font-semibold px-3 py-1.5 inline-flex items-center gap-1">
                  <Check size={11} />
                  Accept
                </button>
                <button className="rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[#0a1b33] hover:border-slate-300 text-[11px] font-semibold px-3 py-1.5 inline-flex items-center gap-1">
                  <X size={11} />
                  Dismiss
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
