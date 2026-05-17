import { useMemo } from 'react'
import { DonutGauge } from '../../ui/DonutGauge'
import { KpiCard } from '../../ui/KpiCard'
import { useLocale } from '../../../i18n/LocaleContext'

export function RevenueSimulator() {
  const { formatUsd } = useLocale()

  const projectedGain = useMemo(
    () => formatUsd(218, { thousands: true, style: 'compact' }),
    [formatUsd],
  )

  return (
    <div className="grid lg:grid-cols-[1fr_1fr_280px] gap-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">Optimization levers</h3>
        <p className="text-[11.5px] text-slate-500">Tune commercial parameters to project revenue impact</p>

        <div className="mt-6 space-y-5">
          <Slider label="Price elasticity" value="−1.4" min={-3} max={0} default_={-1.4} />
          <Slider label="Occupancy target" value="86%" min={50} max={100} default_={86} />
          <Slider label="Discount cap" value="8%" min={0} max={25} default_={8} />
          <Slider label="Frequency cap" value="4 OTS" min={1} max={10} default_={4} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 content-start">
        <KpiCard label="Revenue baseline" value={formatUsd(1.2, { millions: true, style: 'compact' })} delta={0} hint="this period" />
        <KpiCard label="Optimized" value={formatUsd(1.42, { millions: true, style: 'compact' })} delta={18.4} variant="dark" />
        <KpiCard label="Margin uplift" value="+ 3.6 pp" delta={14.1} />
        <KpiCard label="Sellout risk" value="6.2%" delta={-3.4} />
      </div>

      <aside className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-5 text-white flex flex-col items-center justify-center text-center shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
        <div className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
          Projected gain
        </div>
        <DonutGauge value={88} size={120} thickness={10} variant="cyan" />
        <div className="font-display text-[26px] font-medium mt-3 tabular-nums">{projectedGain}</div>
        <div className="text-[11px] text-white/65">incremental over baseline · 30 days</div>
        <button className="mt-5 w-full rounded-xl bg-white text-[#0a1b33] text-[11px] font-semibold py-2.5 hover:bg-cyan-100 transition-colors">
          Save scenario
        </button>
      </aside>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  default_,
}: {
  label: string
  value: string
  min: number
  max: number
  default_: number
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#0a1b33]">{label}</span>
        <span className="font-display text-[14px] font-medium text-[#0a1b33] tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={0.1}
        defaultValue={default_}
        className="w-full accent-[#0a152d] mt-1.5"
      />
    </div>
  )
}
