import { Calendar, Download, Mail, PenLine, Sparkles } from 'lucide-react'
import { MiniBarChart } from '../../ui/MiniBarChart'
import { revenueAreaSeries } from '../../../lib/mock/analytics'

export function ExecutiveSummary() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/70 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] overflow-hidden">
      <div className="px-8 pt-8 pb-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
            <Calendar size={11} />
            May 2026 · Executive Brief
          </div>
          <h3 className="font-display text-[24px] font-medium text-[#0a1b33] mt-2 leading-tight">
            AI TVC · Monthly performance report
          </h3>
          <p className="text-[12px] text-slate-500 mt-1">
            Prepared by AI Workspace · reviewed by Karen Y., CRO
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-[11px] font-semibold text-[#0a1b33] px-3 py-1.5">
            <Mail size={11} /> Email
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-[#0a152d] text-white text-[11px] font-semibold px-3 py-1.5">
            <Download size={11} /> Export
          </button>
        </div>
      </div>

      <div className="px-8 py-6 grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <div>
          <div className="rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-500 text-white p-6">
            <div className="text-[10px] uppercase tracking-[0.18em] font-semibold opacity-80">
              Revenue this month
            </div>
            <div className="font-display text-[44px] font-medium leading-none mt-1.5 tabular-nums">
              $4.42M
            </div>
            <div className="text-[12px] opacity-85 mt-1">+18.4% vs. last month</div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <SecondaryKpi label="Reach" value="38.4M" delta="+6.2%" />
            <SecondaryKpi label="GRP" value="2,148" delta="+4.1%" />
            <SecondaryKpi label="Avg ROI" value="4.6x" delta="+12.8%" />
          </div>

          <p className="mt-6 text-[12.5px] text-[#0a1b33] leading-relaxed">
            May 2026 delivered the strongest revenue month since platform launch. AI-routed pricing on Sport+
            and Metro One drove +$420k incremental revenue with sellout risk held below 8%. The Aurora EV
            launch became the highest-fit campaign on record (94%), validating the new AI quotation flow
            for the automotive vertical. Recommend doubling down on Sport+ live windows for Q3 with a
            +$180k inventory hold for premium advertisers.
          </p>
        </div>

        <div>
          <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4">
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold">
              Revenue trend · last 12 weeks
            </div>
            <div className="mt-2">
              <MiniBarChart data={revenueAreaSeries.revenue} labels={revenueAreaSeries.labels} height={150} />
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-[#0a152d] text-white p-5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
              <Sparkles size={11} className="text-cyan-300" />
              AI verdict
            </div>
            <p className="text-[12px] mt-2 leading-relaxed text-white/90">
              <b>Grade: A.</b> Execution and pricing discipline are at platform-best. Two risks to flag:
              creative fatigue on BankX, and concentration of revenue in Sport+ (38%). Mitigation drafted —
              ready in Approval queue.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-end gap-2 text-[10px] text-slate-400">
            <PenLine size={11} />
            Signed · Karen Y., CRO · May 31, 2026
          </div>
        </div>
      </div>
    </div>
  )
}

function SecondaryKpi({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200/70 p-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">{label}</div>
      <div className="font-display text-[18px] font-medium text-[#0a1b33] tabular-nums mt-1">{value}</div>
      <div className="text-[10.5px] text-emerald-700 font-semibold">{delta}</div>
    </div>
  )
}
