import { AtSign, Paperclip, SendHorizontal, Sparkles } from 'lucide-react'
import { AvatarStack } from '../../ui/AvatarStack'
import { collabComments } from '../../../lib/mock/approval'
import { cn } from '../../../lib/cn'

const lineItems = [
  ['Metro One · Prime', '8 spots · $31.8 CPM', '$102,200'],
  ['Sport+ · Live', '4 spots · $34.2 CPM', '$84,400'],
  ['Nusantara TV', '4 spots · $28.6 CPM', '$62,500'],
  ['News 24 · Bulletin', '2 spots · $22.4 CPM', '$28,900'],
]

export function CollaborationWorkspace() {
  return (
    <div className="grid lg:grid-cols-[1.4fr_340px] gap-5">
      <div className="rounded-2xl bg-white border border-slate-200/70 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
              Document · v3.3
            </div>
            <div className="font-display text-[15px] font-medium text-[#0a1b33]">
              Aurora Mobility · EV Launch quotation
            </div>
          </div>
          <AvatarStack names={['Mira C', 'Jin Park', 'Karen Y', 'Lia S', 'Aldi N']} size={22} />
        </div>

        <div className="px-6 py-5">
          <div className="grid grid-cols-3 text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold border-b border-slate-100 pb-2">
            <span>Channel · daypart</span>
            <span>Detail</span>
            <span className="text-right">Total</span>
          </div>
          {lineItems.map((l, i) => (
            <div
              key={i}
              className="grid grid-cols-3 py-3 text-[12px] border-b border-slate-100 last:border-b-0"
            >
              <span className="font-semibold text-[#0a1b33]">{l[0]}</span>
              <span className="text-slate-500">{l[1]}</span>
              <span className="text-right font-semibold text-[#0a1b33] tabular-nums">{l[2]}</span>
            </div>
          ))}

          <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200/70 p-4 flex items-start gap-3">
            <Sparkles size={14} className="text-amber-600 mt-0.5" />
            <div>
              <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-[0.14em]">
                Pending revision
              </div>
              <p className="text-[12px] text-[#0a1b33] mt-0.5 leading-snug">
                End-frame requires brand logo + tagline + URL per Aurora request. Awaiting v3.3.
              </p>
            </div>
          </div>
        </div>
      </div>

      <aside className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)] flex flex-col">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#0a1b33]">Comments</span>
          <span className="text-[10px] text-slate-400">{collabComments.length} threads</span>
        </div>
        <div className="flex-1 px-5 py-4 space-y-4">
          {collabComments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <span className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-white text-[10px] font-semibold flex items-center justify-center shrink-0">
                {c.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] font-semibold text-[#0a1b33]">{c.author}</span>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <p className="text-[12px] text-slate-600 mt-0.5 leading-snug">
                  {c.body}
                  {c.mentions?.map((m) => (
                    <span
                      key={m}
                      className={cn(
                        'inline-flex items-center gap-0.5 mx-1 px-1.5 py-0 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-700',
                      )}
                    >
                      <AtSign size={9} />
                      {m}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 p-3">
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 flex items-center gap-2">
            <button className="h-7 w-7 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-500">
              <Paperclip size={12} />
            </button>
            <input
              placeholder="Reply to this thread or @mention…"
              className="flex-1 bg-transparent text-[12px] text-[#0a1b33] focus:outline-none placeholder:text-slate-400"
            />
            <button className="h-7 w-7 rounded-md bg-[#0a152d] text-white flex items-center justify-center">
              <SendHorizontal size={12} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
