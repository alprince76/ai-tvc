import { Cpu } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useMemo, useState } from 'react'
import { useLocale } from '../../../i18n/LocaleContext'
import { cn } from '../../../lib/cn'
import { AnimatedNumber } from '../../ui/AnimatedNumber'
import { SimulationButton } from '../../ui/SimulationButton'
import { StatusBadge } from '../../ui/StatusBadge'

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

export function CampaignInput() {
  const { t, tArray } = useLocale()
  const kpis = tArray('modules.quotation.pages.input.kpiChips')
  const demos = tArray('modules.quotation.pages.input.demoChips')

  const [generating, setGenerating] = useState(false)
  const [done, setDone] = useState(false)
  const [stepIdx, setStepIdx] = useState(-1)
  const [confidence, setConfidence] = useState(0)

  const steps = useMemo(
    () => [
      t('sim.stepAnalyzeBrief'),
      t('sim.stepMatchInventory'),
      t('sim.stepOptimizeCpm'),
      t('sim.stepCompose'),
    ],
    [t],
  )

  const phantoms = useMemo(
    () => [
      { key: 'p1', title: t('modules.quotation.pages.input.phantom1') },
      { key: 'p2', title: t('modules.quotation.pages.input.phantom2') },
      { key: 'p3', title: t('modules.quotation.pages.input.phantom3') },
    ],
    [t],
  )

  const runGenerate = useCallback(async () => {
    setGenerating(true)
    setDone(false)
    setConfidence(0)
    setStepIdx(0)
    for (let i = 0; i < steps.length; i++) {
      setStepIdx(i)
      await delay(520)
    }
    setStepIdx(-1)
    setConfidence(94)
    await delay(400)
    setDone(true)
    setGenerating(false)
  }, [steps.length])

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
            {t('modules.quotation.pages.input.newBrief')}
          </h3>
          <StatusBadge status="draft" label={t('status.draft')} size="xs" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Field label={t('modules.quotation.pages.input.brand')}>
            <input
              defaultValue="Aurora Mobility"
              className="w-full rounded-xl bg-white border border-slate-200/80 px-3 py-2.5 text-[12px] font-medium text-[#0a1b33] focus:outline-none focus:border-[#0a152d]/40 focus:ring-2 focus:ring-[#0a152d]/10"
            />
          </Field>
          <Field label={t('modules.quotation.pages.input.vertical')}>
            <input
              defaultValue="Automotive · EV"
              className="w-full rounded-xl bg-white border border-slate-200/80 px-3 py-2.5 text-[12px] font-medium text-[#0a1b33] focus:outline-none focus:border-[#0a152d]/40 focus:ring-2 focus:ring-[#0a152d]/10"
            />
          </Field>
          <Field label={t('modules.quotation.pages.input.flightStart')}>
            <input
              defaultValue="04 Jun 2026"
              className="w-full rounded-xl bg-white border border-slate-200/80 px-3 py-2.5 text-[12px] font-medium text-[#0a1b33] focus:outline-none focus:border-[#0a152d]/40 focus:ring-2 focus:ring-[#0a152d]/10"
            />
          </Field>
          <Field label={t('modules.quotation.pages.input.flightEnd')}>
            <input
              defaultValue="26 Jun 2026"
              className="w-full rounded-xl bg-white border border-slate-200/80 px-3 py-2.5 text-[12px] font-medium text-[#0a1b33] focus:outline-none focus:border-[#0a152d]/40 focus:ring-2 focus:ring-[#0a152d]/10"
            />
          </Field>
        </div>

        <div className="mt-5">
          <Label>{t('modules.quotation.pages.input.kpiFocus')}</Label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {kpis.map((k, i) => (
              <Chip key={k} active={i < 2}>
                {k}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <Label>{t('modules.quotation.pages.input.budget')}</Label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={50}
              max={1000}
              defaultValue={320}
              className="flex-1 accent-[#0a152d]"
            />
            <span className="font-display text-[14px] font-medium text-[#0a1b33] tabular-nums w-20 text-right">
              $320k
            </span>
          </div>
        </div>

        <div className="mt-5">
          <Label>{t('modules.quotation.pages.input.targetDemo')}</Label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {demos.map((d, i) => (
              <Chip key={d} active={i < 3}>
                {d}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-6 text-white shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-md bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-200">
            <Cpu size={13} />
          </span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
            {t('modules.quotation.pages.input.liveMatch')}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Metric label={t('modules.quotation.pages.input.matchingSlots')} value="1,284" />
          <Metric label={t('modules.quotation.pages.input.channelsLabel')} value="6" />
          <Metric label={t('modules.quotation.pages.input.avgCpmLabel')} value="$24.20" />
          <Metric label={t('modules.quotation.pages.input.projectedReach')} value="12.4M" />
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/55 font-semibold">
            {t('modules.quotation.pages.input.aiConfidence')}
          </div>
          <div className="mt-1 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-300 via-indigo-400 to-violet-400"
                animate={{ width: `${confidence}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
            <span className="font-display text-[15px] font-medium tabular-nums">
              <AnimatedNumber value={confidence} decimals={0} format={(n) => `${Math.round(n)}%`} />
            </span>
          </div>
          <p className="mt-3 text-[11px] text-white/65 leading-snug">
            {t('modules.quotation.pages.input.matchBlurb')}
          </p>

          {(generating || stepIdx >= 0) && (
            <ul className="mt-3 space-y-1.5 text-[10px] text-white/75">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    'flex items-center gap-2',
                    i === stepIdx && 'text-cyan-200 font-semibold',
                    i < stepIdx && 'text-white/45',
                  )}
                >
                  <span className="opacity-70">{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-2"
            >
              {phantoms.map((p, i) => (
                <motion.div
                  key={p.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 24 }}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <div className="text-[12px] font-semibold">{p.title}</div>
                  <div className="text-[10px] text-white/55">{t('modules.quotation.pages.input.phantomSub')}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5">
          <SimulationButton
            label={t('action.generatingPackages')}
            runningLabel={t('sim.running')}
            doneLabel={t('sim.done')}
            variant="light"
            className="w-full !py-2.5"
            disabled={generating}
            onRun={runGenerate}
          />
        </div>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a1b33]/55">
      {children}
    </span>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function Chip({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'px-3 py-1 rounded-full text-[11px] font-semibold border transition-colors',
        active
          ? 'bg-[#0a152d] text-white border-[#0a152d]'
          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300',
      )}
    >
      {children}
    </button>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-white/55 font-semibold">{label}</div>
      <div className="font-display text-[18px] font-medium tabular-nums mt-1">{value}</div>
    </div>
  )
}
