import { primeTimeTimeline } from '../../../lib/mock/inventory'
import { cn } from '../../../lib/cn'

const startHour = 18
const endHour = 23

const variantClass: Record<string, string> = {
  navy: 'bg-[#0a152d] text-white',
  cyan: 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-white',
  violet: 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white',
  amber: 'bg-gradient-to-r from-amber-400 to-orange-500 text-white',
  emerald: 'bg-emerald-500/15 border border-dashed border-emerald-500/50 text-emerald-700',
}

export function PrimeTimeTimeline() {
  const total = endHour - startHour
  const ticks = Array.from({ length: total + 1 }, (_, i) => startHour + i)

  return (
    <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
            Prime-time timeline · Metro One · this week
          </h3>
          <p className="text-[11.5px] text-slate-500">Color-coded segments per advertiser</p>
        </div>
        <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-3">
          <Legend dot="bg-[#0a152d]" l="BankX" />
          <Legend dot="bg-gradient-to-r from-cyan-400 to-indigo-500" l="Aurora" />
          <Legend dot="bg-gradient-to-r from-violet-500 to-fuchsia-500" l="Nova" />
          <Legend dot="bg-gradient-to-r from-amber-400 to-orange-500" l="Perta" />
          <Legend dot="bg-emerald-400" l="Open" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[60px_1fr] gap-3">
        <div className="flex flex-col gap-2 pt-7">
          {primeTimeTimeline.map((d) => (
            <span key={d.day} className="h-7 text-[11px] font-semibold text-[#0a1b33]/70 flex items-center">
              {d.day}
            </span>
          ))}
        </div>
        <div>
          <div className="relative h-5 mb-2">
            {ticks.map((t) => (
              <span
                key={t}
                className="absolute -translate-x-1/2 text-[10px] text-slate-400 font-semibold"
                style={{ left: `${((t - startHour) / total) * 100}%` }}
              >
                {String(t).padStart(2, '0')}:00
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {primeTimeTimeline.map((d) => (
              <div key={d.day} className="relative h-7 rounded-md bg-slate-50 border border-slate-100 overflow-hidden">
                {d.segments.map((s, i) => {
                  const left = ((s.start - startHour) / total) * 100
                  const width = ((s.end - s.start) / total) * 100
                  return (
                    <div
                      key={i}
                      className={cn(
                        'absolute top-0 bottom-0 flex items-center px-2 text-[10px] font-semibold truncate rounded-md',
                        variantClass[s.variant],
                      )}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      title={s.advertiser}
                    >
                      {s.open ? 'Open slot' : s.advertiser}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Legend({ dot, l }: { dot: string; l: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn('h-2 w-3 rounded-sm', dot)} />
      {l}
    </span>
  )
}
