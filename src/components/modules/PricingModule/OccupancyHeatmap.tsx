import { useMemo } from 'react'
import { HeatmapGrid } from '../../ui/HeatmapGrid'
import { occupancyCells } from '../../../lib/mock/pricing'
import { useLocale } from '../../../i18n/LocaleContext'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = ['00', '04', '08', '12', '16', '20']

export function OccupancyHeatmap() {
  const { formatUsd, formatCpmUsd, t } = useLocale()

  const projectedCpm = formatCpmUsd(31.8)

  const nudge = useMemo(() => {
    const gain = '+' + formatUsd(8.4, { thousands: true, style: 'compact' })
    return t('modules.pricing.pages.heatmap.aiNudge').replace('{gain}', gain)
  }, [formatUsd, t])

  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
              Occupancy heatmap · 7d × 24h
            </h3>
            <p className="text-[11.5px] text-slate-500">Channel: Metro One · refreshed 2m ago</p>
          </div>
          <select className="rounded-full bg-slate-100 border-0 text-[11px] font-semibold text-[#0a1b33] px-3 py-1.5">
            <option>Metro One</option>
            <option>Sport+</option>
            <option>News 24</option>
            <option>Lifestyle TV</option>
          </select>
        </div>

        <div className="mt-6 grid grid-cols-[40px_1fr] gap-2">
          <div className="flex flex-col gap-1 pt-1">
            {days.map((d) => (
              <span key={d} className="h-3.5 text-[10px] font-semibold text-slate-400">{d}</span>
            ))}
          </div>
          <div>
            <div className="grid grid-cols-1 gap-1">
              {Array.from({ length: 7 }).map((_, dayIdx) => (
                <HeatmapGrid
                  key={dayIdx}
                  cells={occupancyCells.slice(dayIdx * 24, dayIdx * 24 + 24)}
                  columns={24}
                  cellHeight={14}
                  gap={3}
                />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-6 text-[9px] text-slate-400 font-semibold">
              {hours.map((h) => (
                <span key={h} className="text-center">{h}h</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-[10px] text-[#0a1b33]/65">
          <Dot c="bg-[#0a152d]" l="Sold" />
          <Dot c="bg-cyan-400" l="Active campaign" />
          <Dot c="bg-slate-200" l="Open" />
          <Dot c="bg-rose-400" l="At risk" />
        </div>
      </div>

      <aside className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[#0a1b33]/60 font-semibold">
          Selected window · Thu · 20:00–22:00
        </div>
        <div className="mt-4 space-y-3">
          <Stat label="Slots" value="14" />
          <Stat label="Sold" value="11 (78%)" />
          <Stat label="Active campaigns" value="Aurora, BankX, Perta" />
          <Stat label="Open slots" value="3" />
          <Stat label="Projected CPM" value={projectedCpm} />
        </div>
        <div className="mt-5 rounded-xl bg-[#0a152d] text-white p-4">
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
            AI nudge
          </div>
          <p className="text-[11.5px] mt-1 leading-snug">{nudge}</p>
        </div>
      </aside>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
      <span className="text-[11px] text-slate-500">{label}</span>
      <span className="text-[12px] font-semibold text-[#0a1b33]">{value}</span>
    </div>
  )
}

function Dot({ c, l }: { c: string; l: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-sm ${c}`} />
      <span>{l}</span>
    </div>
  )
}
