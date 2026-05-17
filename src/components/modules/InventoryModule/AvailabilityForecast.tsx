import { useId } from 'react'
import { availabilityForecast } from '../../../lib/mock/inventory'
import { DataTable } from '../../ui/DataTable'

export function AvailabilityForecast() {
  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
              Inventory burn-down · next 12 weeks
            </h3>
            <p className="text-[11.5px] text-slate-500">% available inventory · all channels</p>
          </div>
          <span className="text-[10px] font-semibold text-rose-600 bg-rose-500/10 border border-rose-500/20 rounded-full px-2 py-0.5">
            Sellout window opens W04
          </span>
        </div>
        <div className="mt-5">
          <BurnDownChart data={availabilityForecast.series} labels={availabilityForecast.labels} />
        </div>
      </div>

      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">
          Upcoming sellout dates
        </h3>
        <p className="text-[11px] text-slate-500">AI confidence per forecast</p>
        <div className="mt-3">
          <DataTable
            columns={[
              { key: 'channel', header: 'Channel' },
              { key: 'date', header: 'Sellout', align: 'right' },
              {
                key: 'confidence',
                header: 'Conf.',
                align: 'right',
                render: (r) => (
                  <span className="font-semibold text-[#0a1b33]">{String(r.confidence)}%</span>
                ),
              },
            ]}
            data={availabilityForecast.selloutDates as unknown as Record<string, unknown>[]}
          />
        </div>
      </div>
    </div>
  )
}

function BurnDownChart({ data, labels }: { data: number[]; labels: string[] }) {
  const id = useId().replace(/:/g, '')
  const w = 620
  const h = 220
  const padX = 30
  const padY = 24
  const xStep = (w - padX * 2) / (data.length - 1)
  const max = 100

  const path = data
    .map((v, i) => {
      const x = padX + i * xStep
      const y = h - padY - (v / max) * (h - padY * 2)
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')

  const fill =
    path + ` L ${padX + (data.length - 1) * xStep} ${h - padY} L ${padX} ${h - padY} Z`

  const reorderIdx = data.findIndex((v) => v < 50)
  const reorderX = padX + reorderIdx * xStep

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id={`burn-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
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

      <path d={fill} fill={`url(#burn-${id})`} />
      <path d={path} stroke="#0a152d" strokeWidth="2" fill="none" strokeLinecap="round" />

      {reorderIdx > -1 && (
        <>
          <line x1={reorderX} x2={reorderX} y1={padY} y2={h - padY} stroke="#f43f5e" strokeDasharray="3 4" />
          <rect x={reorderX + 4} y={padY + 6} width="62" height="18" rx="9" fill="#f43f5e" />
          <text
            x={reorderX + 35}
            y={padY + 18}
            textAnchor="middle"
            className="fill-white"
            style={{ fontSize: 9, fontWeight: 600 }}
          >
            Reorder zone
          </text>
        </>
      )}

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
