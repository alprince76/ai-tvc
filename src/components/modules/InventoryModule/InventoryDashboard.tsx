import { useMemo, useState } from 'react'
import { Layers, Sparkles, Zap } from 'lucide-react'
import { HeatmapGrid } from '../../ui/HeatmapGrid'
import { KpiCard } from '../../ui/KpiCard'
import { useLocale } from '../../../i18n/LocaleContext'
import { inventoryCells, inventoryKpis, openSlots } from '../../../lib/mock/inventory'
import { cn } from '../../../lib/cn'

const channels = ['Metro One', 'Sport+', 'News 24', 'Lifestyle TV', 'Kids HD']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function InventoryDashboard() {
  const [active, setActive] = useState('Metro One')
  const { formatUsd, formatCpmUsd } = useLocale()

  const kpiValues = useMemo(
    () =>
      inventoryKpis.map((k) =>
        'riskUsdThousands' in k && typeof (k as { riskUsdThousands?: number }).riskUsdThousands === 'number'
          ? formatUsd((k as { riskUsdThousands: number }).riskUsdThousands, { thousands: true, style: 'compact' })
          : (k as { value?: string }).value ?? '',
      ),
    [formatUsd],
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="inline-flex bg-slate-100 rounded-full p-1">
          {channels.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                'px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors',
                active === c ? 'bg-white text-[#0a1b33] shadow-sm' : 'text-slate-500 hover:text-[#0a1b33]',
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="inline-flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
          Live · synced 12s ago
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {inventoryKpis.map((k, i) => (
          <KpiCard key={k.label} label={k.label} value={kpiValues[i]} delta={k.delta} hint={k.hint} />
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">
              {active} · week × hour
            </h3>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold">
              <Layers size={11} />
              7d × 24h grid
            </div>
          </div>

          <div className="mt-5 grid grid-cols-[36px_1fr] gap-2">
            <div className="flex flex-col gap-1 pt-1">
              {days.map((d) => (
                <span key={d} className="h-3.5 text-[10px] font-semibold text-slate-400">{d}</span>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <HeatmapGrid
                  key={i}
                  cells={inventoryCells.slice(i * 24, i * 24 + 24)}
                  columns={24}
                  cellHeight={14}
                  gap={3}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-[10px] text-[#0a1b33]/65">
            <Dot c="bg-[#0a152d]" l="Sold" />
            <Dot c="bg-cyan-400" l="Active" />
            <Dot c="bg-slate-200" l="Open" />
            <Dot c="bg-rose-400" l="At risk" />
          </div>
        </div>

        <aside className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-5 text-white shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-md bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-200">
              <Sparkles size={13} />
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
              High-value open slots
            </span>
          </div>

          <ul className="mt-4 space-y-2">
            {openSlots.slice(0, 4).map((s) => (
              <li
                key={s.id}
                className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-3"
              >
                <div className="flex-1">
                  <div className="text-[11.5px] font-semibold text-white">{s.channel}</div>
                  <div className="text-[10.5px] text-white/55">
                    {s.date} · {s.daypart} · CPM {formatCpmUsd(s.cpm)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-[14px] font-medium tabular-nums">
                    {formatUsd(s.projected / 1000, { thousands: true, style: 'compact' })}
                  </div>
                  <div className="text-[9px] text-cyan-300 font-semibold">{s.fit}% fit</div>
                </div>
              </li>
            ))}
          </ul>

          <button className="mt-4 w-full rounded-xl bg-white text-[#0a1b33] text-[11px] font-semibold py-2.5 inline-flex items-center justify-center gap-1.5 hover:bg-cyan-100 transition-colors">
            <Zap size={11} />
            Auto-package top 4
          </button>
        </aside>
      </div>
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
