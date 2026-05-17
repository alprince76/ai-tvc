import { useState } from 'react'
import { Plus, Power, Settings2 } from 'lucide-react'
import { automations, type Automation } from '../../../lib/mock/commandCenter'
import { cn } from '../../../lib/cn'

export function AutomationConsole() {
  const [list, setList] = useState<Automation[]>(automations)

  const toggle = (id: string) =>
    setList((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)))

  return (
    <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">Smart automations</h3>
          <p className="text-[11.5px] text-slate-500">
            {list.filter((a) => a.enabled).length} active · {list.reduce((s, a) => s + a.runs, 0)} runs total
          </p>
        </div>
        <button className="rounded-full bg-[#0a152d] text-white text-[11px] font-semibold px-4 py-2 inline-flex items-center gap-1.5">
          <Plus size={11} />
          New automation
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200/70">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 bg-slate-50/60">
              <th className="py-2.5 px-4">Automation</th>
              <th className="py-2.5 px-4">Trigger → Condition → Action</th>
              <th className="py-2.5 px-4 text-right">Runs</th>
              <th className="py-2.5 px-4 text-right">Status</th>
              <th className="py-2.5 px-4 text-right" />
            </tr>
          </thead>
          <tbody>
            {list.map((a) => (
              <tr key={a.id} className="border-t border-slate-100 text-[12px]">
                <td className="py-3 px-4">
                  <div className="font-semibold text-[#0a1b33]">{a.name}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center flex-wrap gap-1.5 text-[11px] text-slate-600">
                    <Chip>{a.trigger}</Chip>
                    <span className="text-slate-300">→</span>
                    <Chip>{a.condition}</Chip>
                    <span className="text-slate-300">→</span>
                    <Chip>{a.action}</Chip>
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-semibold text-[#0a1b33] tabular-nums">
                  {a.runs}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => toggle(a.id)}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold border transition-colors',
                      a.enabled
                        ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                        : 'bg-slate-200/60 text-slate-500 border-slate-300/60',
                    )}
                  >
                    <Power size={10} />
                    {a.enabled ? 'On' : 'Off'}
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="h-7 w-7 rounded-lg hover:bg-slate-100 inline-flex items-center justify-center text-slate-500">
                    <Settings2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-semibold text-[#0a1b33]">
      {children}
    </span>
  )
}
