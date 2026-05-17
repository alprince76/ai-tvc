import { ArrowUp, Mic, Paperclip, Plus, Sparkles, Workflow } from 'lucide-react'
import { conversation, sessions } from '../../../lib/mock/commandCenter'
import { cn } from '../../../lib/cn'
import { HeatmapGrid } from '../../ui/HeatmapGrid'
import type { HeatCell } from '../../ui/HeatmapGrid'

const miniHeatmap: HeatCell[] = Array.from({ length: 24 }, (_, i) =>
  i % 7 === 0 ? 'active' : i % 5 === 0 ? 'open' : 'sold',
)

export function AIWorkspace() {
  return (
    <div className="grid lg:grid-cols-[220px_1fr_240px] gap-4 h-[520px]">
      <aside className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-3 flex flex-col text-white shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
        <button className="mx-1 mb-3 rounded-xl bg-white text-[#0a1b33] text-[11px] font-semibold py-2 inline-flex items-center justify-center gap-1.5 hover:bg-cyan-100 transition-colors">
          <Plus size={11} /> New session
        </button>
        <div className="text-[9px] uppercase tracking-[0.18em] text-white/45 font-semibold px-2 mb-2">
          Recent
        </div>
        <ul className="flex-1 overflow-y-auto space-y-1">
          {sessions.map((s) => (
            <li
              key={s.id}
              className={cn(
                'rounded-lg px-2 py-2 cursor-pointer transition-colors',
                s.active ? 'bg-white/10 border border-white/15' : 'hover:bg-white/5',
              )}
            >
              <div className="text-[11px] font-semibold text-white truncate">{s.title}</div>
              <div className="text-[10px] text-white/45">{s.updated}</div>
            </li>
          ))}
        </ul>
      </aside>

      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-md bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-500" />
            <div>
              <div className="text-[12px] font-semibold text-[#0a1b33]">Aurora Mobility quotation</div>
              <div className="text-[10px] text-slate-500">AI Workspace · gpt-tvc · v2.1</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
            Live
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {conversation.map((m) => (
            <div
              key={m.id}
              className={cn('flex gap-3', m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
            >
              <div
                className={cn(
                  'h-7 w-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold shrink-0',
                  m.role === 'user'
                    ? 'bg-gradient-to-br from-amber-400 to-rose-500'
                    : 'bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-500',
                )}
              >
                {m.role === 'user' ? 'MC' : <Sparkles size={12} />}
              </div>
              <div
                className={cn(
                  'max-w-[78%] rounded-2xl px-4 py-3 text-[12.5px] leading-relaxed',
                  m.role === 'user'
                    ? 'bg-[#0a152d] text-white rounded-tr-md'
                    : 'bg-slate-50 text-[#0a1b33] rounded-tl-md border border-slate-100',
                )}
              >
                <p>{m.content}</p>

                {m.attachments && (
                  <div className="mt-3 space-y-2">
                    {m.attachments.map((a, i) =>
                      a.type === 'heatmap' ? (
                        <div key={i} className="rounded-xl border border-slate-200 bg-white p-2">
                          <div className="text-[10px] text-slate-500 font-semibold mb-1">{a.label}</div>
                          <HeatmapGrid cells={miniHeatmap} columns={24} cellHeight={8} gap={2} />
                        </div>
                      ) : (
                        <div
                          key={i}
                          className="rounded-xl border border-violet-200 bg-violet-50/60 p-3 flex items-center justify-between"
                        >
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.14em] text-violet-600 font-semibold">
                              {a.type}
                            </div>
                            <div className="text-[12px] font-semibold text-[#0a1b33]">{a.label}</div>
                          </div>
                          <button className="text-[10px] font-semibold text-violet-700 bg-white border border-violet-200 rounded-full px-2.5 py-1">
                            Open
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                )}

                {m.sources && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.sources.map((s) => (
                      <span
                        key={s}
                        className="text-[9.5px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-full px-2 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  className={cn(
                    'text-[9.5px] mt-2',
                    m.role === 'user' ? 'text-white/55' : 'text-slate-400',
                  )}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 p-3">
          <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 flex items-end gap-2">
            <button className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500">
              <Paperclip size={13} />
            </button>
            <textarea
              rows={1}
              placeholder="Ask AI Workspace anything — quotations, pricing, approvals…"
              className="flex-1 resize-none bg-transparent text-[12.5px] text-[#0a1b33] py-1.5 focus:outline-none placeholder:text-slate-400"
            />
            <button className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500">
              <Mic size={13} />
            </button>
            <button className="h-8 w-8 rounded-lg bg-[#0a152d] text-white flex items-center justify-center">
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>

      <aside className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-4 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)] flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[#0a1b33]/60 font-semibold">
          Referenced sources
        </div>
        <ul className="mt-3 space-y-2">
          {['Inventory · Jun 4–26', 'Pricing model v2.1', 'Aurora past 6 campaigns', 'Sport+ avails', 'Approval graph · Mira C.'].map((s) => (
            <li key={s} className="rounded-lg bg-white border border-slate-100 px-2.5 py-2 text-[11px] text-[#0a1b33]">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          <button className="w-full rounded-xl bg-[#0a152d] text-white text-[11px] font-semibold py-2.5 inline-flex items-center justify-center gap-1.5">
            <Workflow size={11} />
            Run workflow
          </button>
        </div>
      </aside>
    </div>
  )
}
