import { motion } from 'motion/react'
import { Check, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'ai' | 'dark' | 'ghost' | 'light'

const variants: Record<Variant, string> = {
  ai: 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 text-white shadow-[0_8px_24px_-8px_rgba(99,102,241,0.55)]',
  dark: 'bg-[#0a152d] text-white shadow-sm',
  ghost: 'bg-white/10 text-white border border-white/15',
  light: 'bg-white text-[#0a152d] border border-slate-200 shadow-sm',
}

interface SimulationButtonProps {
  label: string
  runningLabel: string
  doneLabel: string
  onRun: () => void | Promise<void>
  variant?: Variant
  className?: string
  disabled?: boolean
}

export function SimulationButton({
  label,
  runningLabel,
  doneLabel,
  onRun,
  variant = 'ai',
  className,
  disabled,
}: SimulationButtonProps) {
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const handleClick = useCallback(async () => {
    if (disabled || phase !== 'idle') return
    clearTimers()
    setPhase('running')
    try {
      await onRun()
    } catch {
      setPhase('idle')
      return
    }
    setPhase('done')
    const t = setTimeout(() => setPhase('idle'), 1500)
    timers.current.push(t)
  }, [clearTimers, disabled, onRun, phase])

  const text =
    phase === 'running' ? runningLabel : phase === 'done' ? doneLabel : label

  return (
    <motion.button
      type="button"
      disabled={disabled || phase === 'running'}
      whileHover={{ scale: phase === 'idle' ? 1.02 : 1 }}
      whileTap={{ scale: phase === 'idle' ? 0.98 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold tracking-tight',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50',
        variants[variant],
        (disabled || phase === 'running') && 'opacity-90',
        className,
      )}
    >
      {phase === 'running' && <Loader2 size={14} className="animate-spin shrink-0" />}
      {phase === 'done' && <Check size={14} className="shrink-0" strokeWidth={2.5} />}
      <span>{text}</span>
    </motion.button>
  )
}
