import { Activity, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react'
import { useLocale } from '../../i18n/LocaleContext'
import { FloatingInsightCard } from './FloatingInsightCard'

function Sparkline() {
  return (
    <svg viewBox="0 0 120 40" className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sparkLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <path
        d="M0 32 L12 28 L24 30 L36 22 L48 24 L60 18 L72 20 L84 12 L96 14 L108 6 L120 8 L120 40 L0 40 Z"
        fill="url(#sparkFill)"
      />
      <path
        d="M0 32 L12 28 L24 30 L36 22 L48 24 L60 18 L72 20 L84 12 L96 14 L108 6 L120 8"
        fill="none"
        stroke="url(#sparkLine)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PricingForecast() {
  const { t } = useLocale()
  return (
    <div className="bg-[#0a152d]/85 backdrop-blur-2xl border border-white/10 p-4 w-[240px]">
      <div className="flex items-center justify-between text-white/80">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]">
          <TrendingUp size={11} className="text-cyan-300" />
          {t('floating.pricingForecast')}
        </div>
        <span className="text-[9px] font-semibold text-cyan-300/90 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-1.5 py-0.5">
          {t('floating.q3')}
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="font-display text-[26px] font-medium text-white leading-none tracking-tight">+12.4%</span>
        <span className="text-[10px] font-medium text-emerald-300/90">{t('floating.cpm')}</span>
      </div>

      <div className="mt-2">
        <Sparkline />
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-white/60">
        <div className="flex items-center gap-1">
          <Sparkles size={9} className="text-cyan-300" />
          <span>{t('floating.aiConfidence')}</span>
        </div>
        <span className="font-semibold text-white/90">94%</span>
      </div>
    </div>
  )
}

function InventoryHeatmap() {
  const { t } = useLocale()
  const cells = [
    'sold', 'sold', 'active', 'sold', 'open', 'sold', 'sold',
    'sold', 'active', 'sold', 'sold', 'sold', 'open', 'sold',
    'open', 'sold', 'sold', 'active', 'sold', 'sold', 'sold',
    'sold', 'sold', 'active', 'open', 'sold', 'sold', 'open',
  ]
  const colorOf = (s: string) =>
    s === 'sold'
      ? 'bg-[#0a152d]'
      : s === 'active'
        ? 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.7)]'
        : 'bg-slate-200/80'

  return (
    <div className="bg-white/85 backdrop-blur-2xl border border-white/60 p-4 w-[230px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a1b33]/70">
          <Activity size={11} className="text-indigo-500" />
          {t('floating.inventoryHeatmap')}
        </div>
        <span className="text-[9px] font-semibold text-[#0a1b33]/60">{t('floating.primeTime')}</span>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1">
        {cells.map((c, i) => (
          <div key={i} className={`h-3 w-full rounded-[3px] ${colorOf(c)}`} />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] text-[#0a1b33]/65">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-[#0a152d]" />
          <span>{t('floating.soldPct')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-cyan-400" />
          <span>{t('floating.active')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-slate-200" />
          <span>{t('floating.open')}</span>
        </div>
      </div>
    </div>
  )
}

function QuotationGenerator() {
  const { t } = useLocale()
  return (
    <div className="bg-white/85 backdrop-blur-2xl border border-white/60 p-4 w-[250px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a1b33]/70">
          <Sparkles size={11} className="text-violet-500" />
          {t('floating.smartQuotation')}
        </div>
        <span className="text-[9px] font-semibold text-violet-600 bg-violet-500/10 border border-violet-500/20 rounded-full px-1.5 py-0.5">
          {t('status.aiPick')}
        </span>
      </div>

      <div className="mt-3">
        <div className="text-[12px] font-semibold text-[#0a1b33]">{t('floating.bundleLine')}</div>
        <div className="text-[10px] text-[#0a1b33]/60 mt-0.5">{t('floating.bundleMeta')}</div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="text-[10px] text-[#0a1b33]/55">{t('floating.projectedRevenue')}</div>
          <div className="font-display text-[18px] font-medium text-[#0a1b33] tracking-tight leading-none mt-1">
            $284,500
          </div>
        </div>
        <div className="relative h-11 w-11">
          <svg viewBox="0 0 36 36" className="absolute inset-0">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeDasharray="94.2"
              strokeDashoffset="14"
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-[#0a1b33]">
            85
          </div>
        </div>
      </div>
    </div>
  )
}

function TVCVersionManagement() {
  const { t } = useLocale()
  const versions = [
    { tag: 'v3.2', state: 'approved' },
    { tag: 'v3.1', state: 'broadcast' },
    { tag: 'v3.0', state: 'review' },
  ]
  return (
    <div className="bg-[#0a152d]/85 backdrop-blur-2xl border border-white/10 p-4 w-[230px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
          <CheckCircle2 size={11} className="text-emerald-300" />
          {t('floating.tvcVersioning')}
        </div>
        <span className="text-[9px] font-semibold text-emerald-300/90">{t('status.aiValidated')}</span>
      </div>

      <div className="mt-3 space-y-1.5">
        {versions.map((v, i) => (
          <div
            key={v.tag}
            className="flex items-center justify-between rounded-md px-2 py-1.5 bg-white/5 border border-white/5"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  i === 0
                    ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]'
                    : i === 1
                      ? 'bg-cyan-400'
                      : 'bg-amber-300'
                }`}
              />
              <span className="text-[11px] font-semibold text-white">{v.tag}</span>
            </div>
            <span className="text-[9px] text-white/55 capitalize">
              {v.state === 'approved'
                ? t('floating.versionStateApproved')
                : v.state === 'broadcast'
                  ? t('floating.versionStateBroadcast')
                  : t('floating.versionStateReview')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FloatingDashboard() {
  return (
    <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
      <FloatingInsightCard
        delay={0}
        duration={7}
        floatRange={8}
        className="top-14 right-10"
      >
        <PricingForecast />
      </FloatingInsightCard>

      <FloatingInsightCard
        delay={0.15}
        duration={8}
        floatRange={6}
        className="top-[240px] right-[290px]"
      >
        <InventoryHeatmap />
      </FloatingInsightCard>

      <FloatingInsightCard
        delay={0.3}
        duration={7.5}
        floatRange={7}
        className="bottom-[120px] left-[440px]"
      >
        <QuotationGenerator />
      </FloatingInsightCard>

      <FloatingInsightCard
        delay={0.45}
        duration={6.5}
        floatRange={5}
        className="bottom-[120px] right-10"
      >
        <TVCVersionManagement />
      </FloatingInsightCard>
    </div>
  )
}
