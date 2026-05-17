import { AlertTriangle, Check, Clock } from 'lucide-react'
import { workflowProgress } from '../../../lib/mock/approval'
import { cn } from '../../../lib/cn'

export function StatusTracker() {
  return (
    <div className="space-y-4">
      {workflowProgress.map((w) => {
        const total = w.stages.length
        const done = w.stages.filter((s) => s.state === 'done').length
        const pct = Math.round((done / total) * 100)
        return (
          <div
            key={w.id}
            className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">{w.name}</h3>
                <p className="text-[11px] text-slate-500">
                  {done} of {total} stages complete · {pct}%
                </p>
              </div>
              {w.bottleneck && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-700 text-[10.5px] font-semibold px-2.5 py-0.5">
                  <AlertTriangle size={11} />
                  Bottleneck: {w.bottleneck}
                </span>
              )}
            </div>

            <div className="mt-5">
              <div className="grid" style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}>
                {w.stages.map((s, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-full flex items-center">
                      <span
                        className={cn(
                          'flex-1 h-0.5',
                          i === 0 ? 'opacity-0' : '',
                          s.state === 'pending' ? 'bg-slate-200' : 'bg-emerald-400',
                        )}
                      />
                      <span
                        className={cn(
                          'h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-semibold border-2 transition-colors',
                          s.state === 'done' && 'bg-emerald-500 text-white border-emerald-500',
                          s.state === 'current' &&
                            'bg-cyan-500 text-white border-cyan-500 shadow-[0_0_14px_rgba(34,211,238,0.6)]',
                          s.state === 'pending' && 'bg-white text-slate-400 border-slate-300',
                        )}
                      >
                        {s.state === 'done' ? <Check size={11} /> : <Clock size={10} />}
                      </span>
                      <span
                        className={cn(
                          'flex-1 h-0.5',
                          i === total - 1 ? 'opacity-0' : '',
                          s.state === 'done' ? 'bg-emerald-400' : 'bg-slate-200',
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        'mt-2 text-[10.5px] font-semibold',
                        s.state === 'pending' ? 'text-slate-400' : 'text-[#0a1b33]',
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
