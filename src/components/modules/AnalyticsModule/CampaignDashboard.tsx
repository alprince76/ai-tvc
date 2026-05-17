import { useId } from 'react'
import { Sparkles } from 'lucide-react'
import { audienceMix, campaignKpis, insights, revenueAreaSeries, topCampaigns } from '../../../lib/mock/analytics'
import { KpiCard } from '../../ui/KpiCard'

export function CampaignDashboard() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {campaignKpis.map((k) => (
          <KpiCard
            key={k.label}
            label={k.label}
            value={k.value}
            unit={'unit' in k ? (k.unit as string) : undefined}
            delta={k.delta}
            sparkline={k.sparkline}
          />
        ))}
      </div>

      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
              Revenue vs. spend · last 12 weeks
            </h3>
            <p className="text-[11.5px] text-slate-500">Dual area · GRP layered as line (not shown)</p>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-500">
            <Legend dot="bg-cyan-400" l="Revenue" />
            <Legend dot="bg-violet-500" l="Spend" />
          </div>
        </div>
        <div className="mt-5">
          <DualAreaChart
            revenue={revenueAreaSeries.revenue}
            spend={revenueAreaSeries.spend}
            labels={revenueAreaSeries.labels}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
          <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">Top campaigns</h3>
          <ul className="mt-3 divide-y divide-slate-100">
            {topCampaigns.map((c) => (
              <li key={c.name} className="py-2.5 flex items-center justify-between">
                <span className="text-[12px] text-[#0a1b33] font-semibold truncate pr-3">{c.name}</span>
                <div className="flex items-center gap-3 text-[11px] tabular-nums">
                  <span className="text-slate-500">${c.spend}k</span>
                  <span className="text-emerald-700 font-semibold">{c.roi}x</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
          <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">Audience mix</h3>
          <div className="mt-4 flex items-center gap-4">
            <DonutChart segments={audienceMix} />
            <ul className="flex-1 space-y-1.5">
              {audienceMix.map((s) => (
                <li key={s.label} className="flex items-center gap-2 text-[11px]">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  <span className="flex-1 text-slate-600">{s.label}</span>
                  <span className="font-semibold text-[#0a1b33] tabular-nums">{s.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-5 text-white shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
            <Sparkles size={11} className="text-violet-300" />
            AI insights
          </div>
          <ul className="mt-3 space-y-3">
            {insights.slice(0, 2).map((i) => (
              <li key={i.id} className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="text-[11.5px] font-semibold text-white">{i.title}</div>
                <div className="text-[10.5px] text-white/65 mt-0.5 leading-snug">{i.action}</div>
                <div className="mt-1.5 text-[10px] text-cyan-300 font-semibold">{i.confidence}% conf.</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Legend({ dot, l }: { dot: string; l: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {l}
    </span>
  )
}

function DualAreaChart({
  revenue,
  spend,
  labels,
}: {
  revenue: number[]
  spend: number[]
  labels: string[]
}) {
  const id = useId().replace(/:/g, '')
  const w = 640
  const h = 220
  const padX = 30
  const padY = 24
  const max = Math.max(...revenue) * 1.1
  const xStep = (w - padX * 2) / (revenue.length - 1)

  const build = (d: number[]) =>
    d
      .map((v, i) => {
        const x = padX + i * xStep
        const y = h - padY - (v / max) * (h - padY * 2)
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
      })
      .join(' ')

  const revPath = build(revenue)
  const spendPath = build(spend)
  const revFill =
    revPath + ` L ${padX + (revenue.length - 1) * xStep} ${h - padY} L ${padX} ${h - padY} Z`
  const spendFill =
    spendPath + ` L ${padX + (spend.length - 1) * xStep} ${h - padY} L ${padX} ${h - padY} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[220px]">
      <defs>
        <linearGradient id={`rev-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`spend-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={padX}
          x2={w - padX}
          y1={padY + (i * (h - padY * 2)) / 3}
          y2={padY + (i * (h - padY * 2)) / 3}
          stroke="#e2e8f0"
          strokeDasharray="2 4"
        />
      ))}

      <path d={revFill} fill={`url(#rev-${id})`} />
      <path d={spendFill} fill={`url(#spend-${id})`} />
      <path d={revPath} stroke="#22d3ee" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d={spendPath} stroke="#8b5cf6" strokeWidth="2" fill="none" strokeLinecap="round" />

      {labels.map((l, i) =>
        i % 2 === 0 ? (
          <text
            key={l}
            x={padX + i * xStep}
            y={h - 4}
            textAnchor="middle"
            className="fill-slate-400"
            style={{ fontSize: 9 }}
          >
            {l}
          </text>
        ) : null,
      )}
    </svg>
  )
}

function DonutChart({ segments }: { segments: { label: string; pct: number; color: string }[] }) {
  const size = 84
  const r = 32
  const c = 2 * Math.PI * r
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        {segments.map((s, i) => {
          const startPct = segments.slice(0, i).reduce((a, x) => a + x.pct, 0)
          const dash = (c * s.pct) / 100
          const offset = c * (1 - startPct / 100)
          return (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="10"
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={offset}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-[#0a1b33]">
        100%
      </div>
    </div>
  )
}
