import { useId, useState } from 'react'
import { cn } from '../../../lib/cn'
import { demandLabels, demandSeries } from '../../../lib/mock/pricing'

const scenarios: { id: keyof typeof demandSeries; label: string; color: string }[] = [
  { id: 'baseline', label: 'Baseline', color: '#6366f1' },
  { id: 'bullish', label: 'Bullish', color: '#22d3ee' },
  { id: 'bearish', label: 'Bearish', color: '#f43f5e' },
]

export function DemandForecast() {
  const [active, setActive] = useState<keyof typeof demandSeries>('bullish')
  const data = demandSeries[active]
  const color = scenarios.find((s) => s.id === active)?.color ?? '#6366f1'

  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
              Demand forecast · next 12 weeks
            </h3>
            <p className="text-[11.5px] text-slate-500">AI confidence band shown around forecast line</p>
          </div>
          <div className="inline-flex bg-slate-100 rounded-full p-1">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  'px-3 py-1 rounded-full text-[11px] font-semibold transition-colors',
                  active === s.id ? 'bg-white text-[#0a1b33] shadow-sm' : 'text-slate-500 hover:text-[#0a1b33]',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <ForecastChart data={data} labels={demandLabels} color={color} />
        </div>
      </div>

      <aside className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-5 text-white shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
        <div className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
          Forecast summary
        </div>
        <ul className="mt-3 space-y-3">
          <ForecastStat label="Peak demand index" value={String(Math.max(...data))} hint="Jul 18 · Sport+ tournament" />
          <ForecastStat label="Volatility" value="±6.4%" hint="Std. dev. last 30d" />
          <ForecastStat label="AI confidence" value="89%" hint="Higher than 30d avg" />
          <ForecastStat label="Projected revenue" value="$1.42M" hint="At current pricing" />
        </ul>

        <button className="mt-5 w-full rounded-xl bg-white text-[#0a1b33] text-[11px] font-semibold py-2.5 hover:bg-cyan-100 transition-colors">
          Lock forecast to pricing
        </button>
      </aside>
    </div>
  )
}

function ForecastStat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <li className="rounded-xl bg-white/5 border border-white/10 p-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-white/55 font-semibold">{label}</div>
      <div className="font-display text-[20px] font-medium tabular-nums mt-0.5">{value}</div>
      <div className="text-[10px] text-white/55 mt-1">{hint}</div>
    </li>
  )
}

function ForecastChart({ data, labels, color }: { data: number[]; labels: string[]; color: string }) {
  const id = useId().replace(/:/g, '')
  const w = 640
  const h = 220
  const padX = 30
  const padY = 24
  const max = Math.max(...data) * 1.2
  const xStep = (w - padX * 2) / (data.length - 1)

  const upper = data.map((v) => Math.min(max, v * 1.12))
  const lower = data.map((v) => Math.max(0, v * 0.88))

  const buildPath = (d: number[]) =>
    d
      .map((v, i) => {
        const x = padX + i * xStep
        const y = h - padY - (v / max) * (h - padY * 2)
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
      })
      .join(' ')

  const linePath = buildPath(data)
  const bandPath =
    buildPath(upper) +
    ' ' +
    lower
      .slice()
      .reverse()
      .map((v, idx) => {
        const i = lower.length - 1 - idx
        const x = padX + i * xStep
        const y = h - padY - (v / max) * (h - padY * 2)
        return `L ${x.toFixed(1)} ${y.toFixed(1)}`
      })
      .join(' ') +
    ' Z'

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id={`band-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.04" />
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

      <path d={bandPath} fill={`url(#band-${id})`} />
      <path d={linePath} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />

      {data.map((v, i) => {
        const x = padX + i * xStep
        const y = h - padY - (v / max) * (h - padY * 2)
        return <circle key={i} cx={x} cy={y} r={2.5} fill={color} />
      })}

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
