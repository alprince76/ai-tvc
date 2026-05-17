import { useState } from 'react'
import { StatusBadge } from '../../ui/StatusBadge'
import { versionTimeline } from '../../../lib/mock/tvc'
import { cn } from '../../../lib/cn'

export function VersionTimeline() {
  const [selected, setSelected] = useState(versionTimeline[0].tag)
  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
            AUR-EV-LAUNCH-30 · version timeline
          </h3>
          <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
            {versionTimeline.length} revisions
          </span>
        </div>

        <div className="mt-6 relative overflow-x-auto">
          <div className="relative min-w-full">
            <div className="absolute left-0 right-0 top-3 h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
            <div className="relative grid grid-flow-col auto-cols-[minmax(180px,1fr)] gap-3">
              {versionTimeline.map((v) => (
                <button
                  key={v.tag}
                  onClick={() => setSelected(v.tag)}
                  className="text-left group"
                >
                  <span
                    className={cn(
                      'block h-6 w-6 rounded-full ring-4 ring-white border-2 transition-all',
                      selected === v.tag
                        ? 'bg-[#0a152d] border-violet-400 shadow-[0_0_18px_rgba(139,92,246,0.6)]'
                        : 'bg-white border-slate-300 group-hover:border-slate-400',
                    )}
                  />
                  <div className="mt-3 text-[11px] font-semibold text-[#0a1b33]">{v.tag}</div>
                  <div className="text-[10px] text-slate-500">
                    {v.date} · {v.actor}
                  </div>
                  <div className="mt-1">
                    <StatusBadge status={v.status} size="xs" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
          <div className="text-[10px] uppercase tracking-[0.14em] text-[#0a1b33]/60 font-semibold">
            Previous · {versionTimeline[1].tag}
          </div>
          <DiffBlock
            rows={[
              { field: 'End-frame', value: 'Aurora wordmark only' },
              { field: 'Caption track', value: 'EN only' },
              { field: 'Audio mix', value: '-21 LUFS' },
            ]}
          />
        </div>

        <div className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-6 text-white shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
            Selected · {selected}
          </div>
          <DiffBlock
            dark
            rows={[
              { field: 'End-frame', value: 'Wordmark + tagline + URL' },
              { field: 'Caption track', value: 'EN + ID burn-in' },
              { field: 'Audio mix', value: '-23 LUFS' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

function DiffBlock({
  rows,
  dark,
}: {
  rows: { field: string; value: string }[]
  dark?: boolean
}) {
  return (
    <ul className="mt-4 space-y-2">
      {rows.map((r) => (
        <li
          key={r.field}
          className={cn(
            'rounded-xl border p-3',
            dark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-white',
          )}
        >
          <div
            className={cn(
              'text-[10px] uppercase tracking-[0.14em] font-semibold',
              dark ? 'text-white/55' : 'text-slate-400',
            )}
          >
            {r.field}
          </div>
          <div
            className={cn(
              'text-[12.5px] font-semibold mt-1',
              dark ? 'text-white' : 'text-[#0a1b33]',
            )}
          >
            {r.value}
          </div>
        </li>
      ))}
    </ul>
  )
}
