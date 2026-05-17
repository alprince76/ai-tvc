import { Radio, Send } from 'lucide-react'
import { broadcastReadiness } from '../../../lib/mock/tvc'
import { cn } from '../../../lib/cn'

const lightMap: Record<string, { bg: string; text: string; label: string; pulse: string }> = {
  green: { bg: 'bg-emerald-500', text: 'text-emerald-600', label: 'Ready', pulse: 'shadow-[0_0_10px_rgba(16,185,129,0.7)]' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-600', label: 'Almost', pulse: 'shadow-[0_0_10px_rgba(245,158,11,0.7)]' },
  red: { bg: 'bg-rose-500', text: 'text-rose-600', label: 'Blocked', pulse: 'shadow-[0_0_10px_rgba(244,63,94,0.7)]' },
}

export function BroadcastReadiness() {
  return (
    <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
            Broadcast readiness · AUR-EV-LAUNCH-30 v3.2
          </h3>
          <p className="text-[11.5px] text-slate-500">Per-channel send-to-traffic status</p>
        </div>
        <button className="rounded-full bg-[#0a152d] text-white text-[11px] font-semibold px-4 py-2 inline-flex items-center gap-2">
          <Send size={11} />
          Send all to traffic
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200/70">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 bg-slate-50/60">
              <th className="py-2.5 px-4">Channel</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4">Scheduled airing</th>
              <th className="py-2.5 px-4 text-right">Spots</th>
              <th className="py-2.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {broadcastReadiness.map((r) => {
              const c = lightMap[r.light]
              return (
                <tr key={r.channel} className="border-t border-slate-100 text-[12px]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Radio size={12} className="text-slate-400" />
                      <span className="font-semibold text-[#0a1b33]">{r.channel}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-2">
                      <span className={cn('h-2 w-2 rounded-full', c.bg, c.pulse)} />
                      <span className={cn('font-semibold', c.text)}>{c.label}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{r.time}</td>
                  <td className="py-3 px-4 text-right text-[#0a1b33] font-semibold tabular-nums">{r.spots}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="rounded-full bg-white border border-slate-200 hover:border-slate-300 text-[10px] font-semibold text-[#0a1b33] px-3 py-1">
                      {r.light === 'red' ? 'Unblock' : 'Send'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
