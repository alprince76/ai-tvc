import { Activity, Banknote, CheckCircle2, FileText } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useMemo, useState } from 'react'
import { useLocale } from '../../../i18n/LocaleContext'
import { workflowSuggestions, type WorkflowSuggestion } from '../../../lib/mock/commandCenter'
import { cn } from '../../../lib/cn'
import { SimulationButton } from '../../ui/SimulationButton'
import { StepRunner, type StepRunnerItem } from '../../ui/StepRunner'

const tagMap = {
  quotation: { icon: FileText, color: 'bg-violet-500/10 text-violet-600 border-violet-500/20' },
  pricing: { icon: Banknote, color: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/20' },
  approval: { icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' },
  analytics: { icon: Activity, color: 'bg-amber-500/10 text-amber-700 border-amber-500/20' },
} as const

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

function WorkflowCard({ w }: { w: WorkflowSuggestion }) {
  const { t } = useLocale()
  const tag = tagMap[w.tag]
  const Icon = tag.icon

  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const [line, setLine] = useState(0)

  const labels = useMemo(
    () => [
      t('modules.commandCenter.pages.workflow.wfStep1'),
      t('modules.commandCenter.pages.workflow.wfStep2'),
      t('modules.commandCenter.pages.workflow.wfStep3'),
      t('modules.commandCenter.pages.workflow.wfStep4'),
    ],
    [t],
  )

  const stepItems: StepRunnerItem[] = useMemo(() => {
    return labels.map((label, i) => {
      let state: StepRunnerItem['state'] = 'pending'
      if (!open && !done) state = 'pending'
      else if (done || i < line) state = 'done'
      else if (i === line) state = 'running'
      return { id: `${i}`, label, state }
    })
  }, [labels, open, done, line])

  const run = useCallback(async () => {
    setDone(false)
    setOpen(true)
    setLine(0)
    for (let i = 0; i < labels.length; i++) {
      setLine(i)
      await delay(450)
    }
    setLine(labels.length)
    setDone(true)
    await delay(200)
  }, [labels.length])

  return (
    <div className="group rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-30px_rgba(15,23,42,0.32)] transition-all">
      <div className="flex items-center justify-between">
        <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize', tag.color)}>
          <Icon size={11} />
          {w.tag}
        </span>
        <span className="text-[10px] text-slate-400 font-semibold">{w.duration}</span>
      </div>

      <h3 className="mt-4 font-display text-[15.5px] font-medium text-[#0a1b33] tracking-tight leading-snug">
        {w.title}
      </h3>
      <p className="mt-1 text-[11.5px] text-slate-500 leading-snug">{w.description}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
            {t('modules.commandCenter.pages.workflow.impact')}
          </div>
          <div className="text-[12.5px] font-semibold text-emerald-700">{w.impact}</div>
        </div>
        <SimulationButton
          label={t('action.run')}
          runningLabel={t('sim.running')}
          doneLabel={t('sim.done')}
          variant="dark"
          className="!px-3.5 !py-1.5 !text-[11px] inline-flex"
          onRun={run}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-slate-100">
              <StepRunner steps={stepItems} />
              {done && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold"
                >
                  <CheckCircle2 size={12} />
                  {t('modules.commandCenter.pages.workflow.badgeDone')} · {w.impact}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function WorkflowSuggestions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {workflowSuggestions.map((w) => (
        <WorkflowCard key={w.id} w={w} />
      ))}
    </div>
  )
}
