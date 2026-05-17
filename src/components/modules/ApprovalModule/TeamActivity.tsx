import { teamActivity } from '../../../lib/mock/approval'
import { cn } from '../../../lib/cn'

const teamFilters = ['All teams', 'Sales', 'Broadcasting', 'Legal', 'AI Workspace']

export function TeamActivity() {
  return (
    <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">Team activity</h3>
        <div className="inline-flex bg-slate-100 rounded-full p-1">
          {teamFilters.map((f, i) => (
            <button
              key={f}
              className={cn(
                'px-3 py-1 rounded-full text-[10.5px] font-semibold transition-colors',
                i === 0 ? 'bg-white text-[#0a1b33] shadow-sm' : 'text-slate-500 hover:text-[#0a1b33]',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {teamActivity.map((group) => (
          <div key={group.day}>
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
              {group.day}
            </div>
            <ul className="mt-2 divide-y divide-slate-100">
              {group.items.map((it, i) => (
                <li key={i} className="py-3 flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-white text-[10px] font-semibold flex items-center justify-center shrink-0">
                    {it.actor
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <div className="flex-1 text-[12px] text-[#0a1b33]">
                    <span className="font-semibold">{it.actor}</span> {it.action}{' '}
                    <span className="font-semibold">{it.target}</span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 font-semibold tabular-nums">
                    {it.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
