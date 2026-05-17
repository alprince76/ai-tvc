import { motion } from 'motion/react'
import { Check, Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'

export type StepVisualState = 'pending' | 'running' | 'done'

export interface StepRunnerItem {
  id: string
  label: string
  state: StepVisualState
}

interface StepRunnerProps {
  steps: StepRunnerItem[]
  className?: string
}

export function StepRunner({ steps, className }: StepRunnerProps) {
  return (
    <ul className={cn('space-y-2', className)}>
      {steps.map((s) => (
        <li
          key={s.id}
          className={cn(
            'flex items-center gap-3 rounded-lg border px-3 py-2 text-[11px] font-medium transition-colors',
            s.state === 'running' &&
              'border-cyan-400/50 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-transparent shadow-[inset_0_0_20px_rgba(34,211,238,0.15)]',
            s.state === 'pending' && 'border-slate-200/80 bg-white/60 text-slate-500',
            s.state === 'done' && 'border-emerald-200/80 bg-emerald-50/60 text-emerald-900',
          )}
        >
          <span className="shrink-0">
            {s.state === 'pending' && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-slate-400">
                ·
              </span>
            )}
            {s.state === 'running' && (
              <Loader2 size={16} className="animate-spin text-cyan-500" />
            )}
            {s.state === 'done' && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check size={12} strokeWidth={3} />
              </span>
            )}
          </span>
          <span className="flex-1">{s.label}</span>
          {s.state === 'running' && (
            <motion.span
              aria-hidden
              className="h-1 w-12 rounded-full bg-slate-200 overflow-hidden"
            >
              <motion.span
                className="block h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
              />
            </motion.span>
          )}
        </li>
      ))}
    </ul>
  )
}
