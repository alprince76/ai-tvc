import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, FileVideo, Loader2, UploadCloud, XCircle } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useLocale } from '../../../i18n/LocaleContext'
import { validationChecks } from '../../../lib/mock/tvc'
import { AnimatedNumber } from '../../ui/AnimatedNumber'
import { SimulationButton } from '../../ui/SimulationButton'

type RowPhase = 'idle' | 'pending' | 'scanning' | 'pass' | 'fail'

const STEP_MS = 600
const SCAN_MS = 320

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

export function UploadValidation() {
  const { t, tr } = useLocale()
  const runRef = useRef(0)

  const [rowPhase, setRowPhase] = useState<RowPhase[]>(() => validationChecks.map(() => 'idle'))
  const [passedVisual, setPassedVisual] = useState(
    () => validationChecks.filter((c) => c.pass).length,
  )
  const [showRemediation, setShowRemediation] = useState(false)
  const [runBusy, setRunBusy] = useState(false)

  const total = validationChecks.length
  const pct = Math.round((passedVisual / total) * 100)

  const checksSummary = useMemo(
    () =>
      t('modules.tvc.pages.upload.checksSummary')
        .replace('{passed}', String(passedVisual))
        .replace('{total}', String(total)),
    [t, passedVisual, total],
  )

  const runCascade = useCallback(async () => {
    const my = ++runRef.current
    setRunBusy(true)
    setShowRemediation(false)
    setPassedVisual(0)
    setRowPhase(validationChecks.map(() => 'pending'))

    for (let i = 0; i < validationChecks.length; i++) {
      if (runRef.current !== my) return
      setRowPhase((prev) => {
        const next = [...prev]
        next[i] = 'scanning'
        return next
      })
      await delay(SCAN_MS)
      if (runRef.current !== my) return
      const ok = validationChecks[i].pass
      setRowPhase((prev) => {
        const next = [...prev]
        next[i] = ok ? 'pass' : 'fail'
        return next
      })
      setPassedVisual((p) => p + (ok ? 1 : 0))
      await delay(STEP_MS - SCAN_MS)
    }

    if (runRef.current !== my) return
    setShowRemediation(true)
    setRunBusy(false)
  }, [])

  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-10 flex flex-col items-center justify-center text-center">
          <span className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-[0_18px_40px_-20px_rgba(99,102,241,0.6)]">
            <UploadCloud size={20} />
          </span>
          <h3 className="font-display text-[16px] font-medium text-[#0a1b33] mt-4">
            {t('modules.tvc.pages.upload.dropTitle')}
          </h3>
          <p className="text-[12px] text-slate-500 mt-1 max-w-xs">
            {t('modules.tvc.pages.upload.dropSub')}
          </p>
          <button
            type="button"
            className="mt-4 rounded-full bg-[#0a152d] text-white text-[11px] font-semibold px-4 py-2"
          >
            {t('action.browseFiles')}
          </button>
          <div className="mt-5 text-[10px] text-slate-400">{t('action.pasteCdn')}</div>
        </div>

        <div className="mt-5 rounded-xl bg-white border border-slate-200/70 p-4 flex items-center gap-3">
          <span className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#0a1b33]">
            <FileVideo size={14} />
          </span>
          <div className="flex-1">
            <div className="text-[12px] font-semibold text-[#0a1b33]">AUR_EV_Launch_v3.3_master.mp4</div>
            <div className="text-[11px] text-slate-500">2.4 GB · uploaded 14s ago</div>
          </div>
          <div className="text-[11px] font-semibold text-emerald-600">{t('action.uploaded')}</div>
        </div>
      </div>

      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
              {t('modules.tvc.pages.upload.validationTitle')}
            </h3>
            <p className="text-[11.5px] text-slate-500">{checksSummary}</p>
          </div>
          <SimulationButton
            label={t('action.runValidation')}
            runningLabel={t('sim.running')}
            doneLabel={t('sim.done')}
            variant="dark"
            disabled={runBusy}
            onRun={runCascade}
          />
        </div>

        <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500"
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            {t('modules.tvc.pages.upload.broadcastReady')}
          </div>
          <div className="font-display text-[22px] font-medium text-[#0a1b33] tabular-nums">
            <AnimatedNumber value={pct} decimals={0} format={(n) => `${Math.round(n)}%`} />
          </div>
        </div>

        <ul className="mt-5 space-y-2">
          {validationChecks.map((c, i) => {
            const phase = rowPhase[i]
            const showStatic = phase === 'idle'
            const passIcon = showStatic ? c.pass : phase === 'pass'
            const failIcon = showStatic ? !c.pass : phase === 'fail'

            return (
              <motion.li
                key={i}
                layout
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                  phase === 'scanning'
                    ? 'border-cyan-300/60 bg-gradient-to-r from-cyan-50 via-white to-white shadow-[0_0_24px_-8px_rgba(34,211,238,0.35)]'
                    : 'border-slate-100 bg-white'
                }`}
              >
                <span className="shrink-0">
                  {phase === 'scanning' ? (
                    <span className="relative flex h-[15px] w-[15px] items-center justify-center">
                      <span className="absolute h-4 w-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                      <Loader2 size={15} className="text-cyan-500 animate-pulse" />
                    </span>
                  ) : passIcon ? (
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                  ) : failIcon ? (
                    <XCircle size={15} className="text-rose-500 shrink-0" />
                  ) : (
                    <span className="inline-flex h-[15px] w-[15px] items-center justify-center rounded-full bg-slate-100 text-[8px] text-slate-400">
                      ·
                    </span>
                  )}
                </span>
                <div className="flex-1">
                  <div className="text-[12px] font-semibold text-[#0a1b33]">{tr(c.label)}</div>
                  <div className="text-[11px] text-slate-500">{tr(c.detail)}</div>
                </div>
                <span
                  className={
                    passIcon
                      ? 'text-[10px] font-semibold text-emerald-600'
                      : failIcon
                        ? 'text-[10px] font-semibold text-rose-600'
                        : 'text-[10px] font-semibold text-slate-400'
                  }
                >
                  {phase === 'scanning'
                    ? t('sim.scanning')
                    : phase === 'pending'
                      ? t('sim.pending')
                      : passIcon
                        ? t('sim.pass')
                        : t('sim.fail')}
                </span>
              </motion.li>
            )
          })}
        </ul>

        <AnimatePresence>
          {showRemediation && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="mt-5 rounded-xl bg-[#0a152d] text-white p-4 shadow-[0_20px_50px_-20px_rgba(10,21,45,0.6)] ring-1 ring-white/10"
            >
              <div className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
                {t('modules.tvc.pages.upload.remediationTitle')}
              </div>
              <p className="text-[11.5px] mt-1 leading-snug">
                {t('modules.tvc.pages.upload.remediationBody')}
              </p>
              <div className="mt-3 flex gap-2 flex-wrap">
                <SimulationButton
                  label={t('action.autoFix')}
                  runningLabel={t('sim.running')}
                  doneLabel={t('sim.done')}
                  variant="light"
                  onRun={async () => delay(800)}
                />
                <SimulationButton
                  label={t('action.sendBack')}
                  runningLabel={t('sim.running')}
                  doneLabel={t('sim.done')}
                  variant="ghost"
                  className="!bg-white/10 !text-white border border-white/20"
                  onRun={async () => delay(800)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
