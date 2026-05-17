import { revisionDeltas } from '../../../lib/mock/approval'

export function RevisionTimeline() {
  return (
    <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">Revision history</h3>
        <span className="text-[10px] text-slate-400 font-semibold">{revisionDeltas.length} revisions</span>
      </div>

      <ol className="mt-6 relative">
        <span className="absolute left-3.5 top-1 bottom-1 w-px bg-slate-200" />
        {revisionDeltas.map((r) => (
          <li key={r.id} className="relative pl-10 pb-6 last:pb-0">
            <span className="absolute left-0 top-0 h-7 w-7 rounded-full bg-white border border-violet-300 text-violet-600 text-[10px] font-semibold flex items-center justify-center shadow-[0_0_18px_rgba(139,92,246,0.18)]">
              {r.version}
            </span>
            <div className="rounded-2xl bg-white border border-slate-200/70 p-4 shadow-[0_8px_22px_-14px_rgba(15,23,42,0.18)]">
              <div className="flex items-center justify-between">
                <div className="text-[12.5px] font-semibold text-[#0a1b33]">
                  {r.who} · {r.when}
                </div>
                <span className="text-[10px] font-semibold text-violet-700 bg-violet-500/10 border border-violet-500/20 rounded-full px-2 py-0.5">
                  {r.version}
                </span>
              </div>
              <div className="mt-3 grid lg:grid-cols-2 gap-2">
                {r.changes.map((c, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-slate-50 border border-slate-100 p-3"
                  >
                    <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
                      {c.field}
                    </div>
                    <div className="mt-1 grid grid-cols-[1fr_auto_1fr] gap-2 items-center text-[11.5px]">
                      <span className="text-rose-600 line-through truncate">{c.from}</span>
                      <span className="text-slate-300">→</span>
                      <span className="text-emerald-700 font-semibold truncate">{c.to}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
