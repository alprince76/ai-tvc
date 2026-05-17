import { MiniBarChart } from '../../ui/MiniBarChart'
import { revenueByChannel, revenueByChannelLabels, revenueByDaypart, revenueByDaypartLabels } from '../../../lib/mock/analytics'

export function RevenueTrends() {
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <ChartCard
        title="Revenue by channel"
        subtitle="Last 30 days · in $k"
        data={revenueByChannel}
        labels={revenueByChannelLabels}
        delta="+14.2%"
      />
      <ChartCard
        title="Revenue by daypart"
        subtitle="Last 30 days · in $k"
        data={revenueByDaypart}
        labels={revenueByDaypartLabels.map((l) => `${l}h`)}
        delta="+8.6%"
      />
    </div>
  )
}

function ChartCard({
  title,
  subtitle,
  data,
  labels,
  delta,
}: {
  title: string
  subtitle: string
  data: number[]
  labels: string[]
  delta: string
}) {
  return (
    <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">{title}</h3>
          <p className="text-[11.5px] text-slate-500">{subtitle}</p>
        </div>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
          {delta}
        </span>
      </div>
      <div className="mt-4">
        <MiniBarChart data={data} labels={labels} height={160} />
      </div>
    </div>
  )
}
