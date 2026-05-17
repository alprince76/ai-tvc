import { useState } from 'react'
import { Film, Filter, Play, Search, Sparkles } from 'lucide-react'
import { assets } from '../../../lib/mock/tvc'
import { StatusBadge } from '../../ui/StatusBadge'
import { AvatarStack } from '../../ui/AvatarStack'
import { cn } from '../../../lib/cn'

const filterGroups = [
  { label: 'Brand', items: ['All', 'Aurora', 'Nova', 'Perta', 'BankX'] },
  { label: 'Status', items: ['All', 'Approved', 'Review', 'Draft', 'Broadcast'] },
  { label: 'Duration', items: ['All', '15s', '20s', '30s', '45s+'] },
  { label: 'Format', items: ['All', '16:9 1080p', '16:9 4K', '9:16'] },
]

export function AssetLibrary() {
  const [selectedId, setSelectedId] = useState(assets[0].id)
  const selected = assets.find((a) => a.id === selectedId) ?? assets[0]

  return (
    <div className="grid lg:grid-cols-[200px_1fr_280px] gap-5">
      <aside className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-4 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a1b33]/60">
          <Filter size={11} />
          Filters
        </div>
        <div className="mt-3 space-y-4">
          {filterGroups.map((g) => (
            <div key={g.label}>
              <div className="text-[9px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
                {g.label}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {g.items.map((it, i) => (
                  <button
                    key={it}
                    className={cn(
                      'px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-colors',
                      i === 0
                        ? 'bg-[#0a152d] text-white border-[#0a152d]'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300',
                    )}
                  >
                    {it}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="relative w-full max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search assets, brands, version…"
              className="w-full rounded-full bg-white border border-slate-200 pl-8 pr-3 py-2 text-[12px] text-[#0a1b33] focus:outline-none focus:border-[#0a152d]/40"
            />
          </div>
          <div className="text-[11px] text-slate-500">
            <b className="text-[#0a1b33]">{assets.length}</b> assets · 2 updated today
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {assets.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedId(a.id)}
              className={cn(
                'text-left rounded-2xl bg-white/90 backdrop-blur-2xl border transition-all overflow-hidden hover:-translate-y-0.5',
                selectedId === a.id
                  ? 'border-violet-300 ring-1 ring-violet-200/80 shadow-[0_24px_60px_-30px_rgba(139,92,246,0.4)]'
                  : 'border-slate-200/60 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]',
              )}
            >
              <div className={cn('relative aspect-[16/9] bg-gradient-to-br', a.thumbGradient)}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18),transparent_70%)]" />
                <span className="absolute top-2 left-2">
                  <StatusBadge status={a.status} size="xs" />
                </span>
                <span className="absolute top-2 right-2 text-[10px] font-semibold text-white bg-black/35 backdrop-blur-md rounded-full px-2 py-0.5">
                  {a.duration}
                </span>
                <div className="absolute inset-0 flex items-center justify-center opacity-90">
                  <span className="h-9 w-9 rounded-full bg-white/95 flex items-center justify-center text-[#0a1b33] shadow-lg">
                    <Play size={13} className="ml-0.5" />
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="text-[12px] font-semibold text-[#0a1b33] truncate">{a.codename}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {a.brand} · {a.format}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-violet-600 bg-violet-500/10 border border-violet-500/20 rounded-full px-1.5 py-0.5">
                    {a.version}
                  </span>
                  <AvatarStack names={a.owners} size={18} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <aside className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-5 text-white shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-md bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-200">
            <Film size={13} />
          </span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
            Asset detail
          </span>
        </div>

        <div className={cn('mt-4 aspect-[16/9] rounded-xl bg-gradient-to-br relative overflow-hidden', selected.thumbGradient)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18),transparent_70%)]" />
          <div className="absolute bottom-2 left-2 text-[10px] font-semibold text-white/90">
            {selected.codename}
          </div>
        </div>

        <div className="mt-4 space-y-2.5 text-[11.5px]">
          <DetailRow k="Brand" v={selected.brand} />
          <DetailRow k="Duration" v={selected.duration} />
          <DetailRow k="Format" v={selected.format} />
          <DetailRow k="Version" v={selected.version} />
          <DetailRow k="Status" v={<StatusBadge status={selected.status} size="xs" />} />
        </div>

        <div className="mt-5 rounded-xl bg-white/5 border border-white/10 p-3">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-cyan-200 font-semibold">
            <Sparkles size={11} />
            AI tags
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {['Automotive', 'EV', 'Premium tone', 'Urban', 'Daylight', 'Female VO', 'High contrast'].map(
              (t) => (
                <span
                  key={t}
                  className="text-[10px] font-semibold text-white/85 bg-white/10 border border-white/10 rounded-full px-2 py-0.5"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}

function DetailRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/55">{k}</span>
      <span className="text-white font-semibold">{v}</span>
    </div>
  )
}
