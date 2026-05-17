import { GripVertical } from 'lucide-react'
import { board } from '../../../lib/mock/tvc'
import { AvatarStack } from '../../ui/AvatarStack'
import { cn } from '../../../lib/cn'

const colors: Record<string, string> = {
  Draft: 'bg-slate-100 text-slate-600 border border-slate-200',
  'In Review': 'bg-amber-50 text-amber-700 border border-amber-200/80',
  Approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
  'Broadcast Ready': 'bg-indigo-50 text-indigo-700 border border-indigo-200/80',
}

const dotColors: Record<string, string> = {
  Draft: 'bg-slate-400',
  'In Review': 'bg-amber-500',
  Approved: 'bg-emerald-500',
  'Broadcast Ready': 'bg-indigo-500',
}

export function ApprovalBoard() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(board).map(([col, cards]) => (
        <div key={col} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold', colors[col])}>
              <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[col])} />
              {col}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">{cards.length}</span>
          </div>

          <div className="space-y-2 min-h-[160px]">
            {cards.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl bg-white border border-slate-200/70 p-3.5 shadow-[0_8px_22px_-14px_rgba(15,23,42,0.18)] hover:shadow-[0_18px_40px_-22px_rgba(15,23,42,0.32)] hover:-translate-y-0.5 transition-all cursor-grab"
              >
                <div className="flex items-start gap-2">
                  <GripVertical size={12} className="text-slate-300 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-[12px] font-semibold text-[#0a1b33] leading-tight">
                      {c.title}
                    </div>
                    <div className="text-[10.5px] text-slate-500 mt-0.5">{c.brand}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-violet-600 bg-violet-500/10 border border-violet-500/20 rounded-full px-1.5 py-0.5">
                    {c.version}
                  </span>
                  <AvatarStack names={c.owners} size={18} />
                </div>
              </div>
            ))}

            <button className="w-full rounded-2xl border border-dashed border-slate-200 text-slate-400 text-[11px] font-semibold py-3 hover:border-slate-300 hover:text-slate-600 transition-colors">
              + Add card
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
