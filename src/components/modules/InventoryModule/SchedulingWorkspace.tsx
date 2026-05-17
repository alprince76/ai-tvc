import { GripVertical } from 'lucide-react'

const drafts = [
  { day: 'Mon', slot: '19:00', advertiser: 'Aurora', spot: 'AUR v3.2 · 30s', locked: true },
  { day: 'Mon', slot: '20:30', advertiser: 'BankX', spot: 'BANKX v4.1 · 30s', locked: true },
  { day: 'Mon', slot: '21:15', advertiser: '— drop campaign here —', spot: '', locked: false },
  { day: 'Tue', slot: '19:00', advertiser: 'Perta', spot: 'PERTA v1.4 · 45s', locked: true },
  { day: 'Tue', slot: '20:30', advertiser: 'Aurora', spot: 'AUR v3.2 · 30s', locked: true },
  { day: 'Tue', slot: '21:15', advertiser: '— drop campaign here —', spot: '', locked: false },
  { day: 'Wed', slot: '19:00', advertiser: 'Nova', spot: 'NOVA v2.0 · 15s', locked: true },
  { day: 'Wed', slot: '20:30', advertiser: '— drop campaign here —', spot: '', locked: false },
]

const palette = [
  { name: 'Aurora Mobility · v3.2', spots: 8, color: 'from-cyan-400 to-indigo-500' },
  { name: 'BankX Platinum · v4.1', spots: 6, color: 'from-slate-700 to-indigo-700' },
  { name: 'Perta Fuel Next · v1.4', spots: 4, color: 'from-amber-400 to-orange-500' },
  { name: 'Nova Ramadan · v2.0', spots: 3, color: 'from-rose-400 to-fuchsia-500' },
  { name: 'GreenEarth · v1.0', spots: 5, color: 'from-emerald-400 to-cyan-500' },
]

export function SchedulingWorkspace() {
  return (
    <div className="grid lg:grid-cols-[1.4fr_300px] gap-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
            Draft schedule · Metro One
          </h3>
          <div className="text-[10px] text-slate-500">
            <b className="text-emerald-600">2 open</b> · 6 locked
          </div>
        </div>

        <ul className="mt-5 space-y-2">
          {drafts.map((d, i) => (
            <li
              key={i}
              className={
                d.locked
                  ? 'rounded-xl bg-white border border-slate-200 p-3 flex items-center gap-3'
                  : 'rounded-xl bg-emerald-50/60 border-2 border-dashed border-emerald-300/70 p-3 flex items-center gap-3 text-emerald-700'
              }
            >
              <GripVertical size={12} className="text-slate-300" />
              <div className="w-12 text-[11px] font-semibold text-[#0a1b33]">{d.day}</div>
              <div className="w-14 text-[11px] text-slate-500 tabular-nums">{d.slot}</div>
              <div className="flex-1">
                <div className={d.locked ? 'text-[12px] font-semibold text-[#0a1b33]' : 'text-[12px] font-semibold'}>
                  {d.advertiser}
                </div>
                {d.spot && <div className="text-[10.5px] text-slate-500">{d.spot}</div>}
              </div>
              {d.locked && (
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">
                  Locked
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-5 text-white shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
        <div className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
          Campaign palette
        </div>
        <ul className="mt-4 space-y-2">
          {palette.map((p) => (
            <li
              key={p.name}
              className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-3 cursor-grab"
            >
              <span className={`h-7 w-7 rounded-md bg-gradient-to-br ${p.color}`} />
              <div className="flex-1">
                <div className="text-[11.5px] font-semibold text-white">{p.name}</div>
                <div className="text-[10px] text-white/55">{p.spots} spots remaining</div>
              </div>
              <GripVertical size={12} className="text-white/40" />
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
