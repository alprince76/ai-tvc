import { audienceGeo, audienceMix } from '../../../lib/mock/analytics'

export function AudienceReport() {
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">Demographics</h3>
        <ul className="mt-4 space-y-3">
          {audienceMix.map((d) => (
            <li key={d.label}>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-slate-600">{d.label}</span>
                <span className="font-semibold text-[#0a1b33] tabular-nums">{d.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${d.pct * 2.5}%`, background: d.color }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">Geographic reach</h3>
        <ul className="mt-4 space-y-2.5">
          {audienceGeo.map((g) => (
            <li key={g.region}>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-[#0a1b33]">{g.region}</span>
                <span className="text-slate-500 tabular-nums">{g.reach}M · {g.share}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500"
                  style={{ width: `${g.share * 3.5}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <h3 className="font-display text-[15px] font-medium text-[#0a1b33]">Reach / frequency</h3>
        <table className="mt-3 w-full text-left text-[11.5px]">
          <thead className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
            <tr className="border-b border-slate-100">
              <th className="py-2">Cohort</th>
              <th className="py-2 text-right">Reach</th>
              <th className="py-2 text-right">Freq.</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1+ exposures', '38.4M', '—'],
              ['3+ exposures', '24.6M', '3.1'],
              ['5+ exposures', '14.2M', '5.4'],
              ['Heavy viewers', '6.8M', '8.2'],
            ].map((r) => (
              <tr key={r[0]} className="border-b border-slate-100 last:border-b-0">
                <td className="py-2.5 text-[#0a1b33]">{r[0]}</td>
                <td className="py-2.5 text-right font-semibold text-[#0a1b33] tabular-nums">{r[1]}</td>
                <td className="py-2.5 text-right text-slate-500 tabular-nums">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
