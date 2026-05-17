import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useLocale } from '../../i18n/LocaleContext'

interface ModuleHeaderProps {
  index: string
  eyebrow: string
  title: string
  description: string
  flowSteps: string[]
  className?: string
}

const easing = [0.22, 1, 0.36, 1] as const

export function ModuleHeader({
  index,
  eyebrow,
  title,
  description,
  flowSteps,
  className,
}: ModuleHeaderProps) {
  const { t } = useLocale()
  return (
    <div className={cn('w-full max-w-[1400px] mx-auto px-4 md:px-2', className)}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: easing }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.18em] uppercase">
          <span className="inline-flex items-center justify-center min-w-[44px] rounded-full bg-[#0a152d] text-white px-2.5 py-1 tabular-nums">
            {index}
          </span>
          <span className="text-slate-400">{t('common.useCase')}</span>
          <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
          <span className="text-[#0a1b33]/70">{eyebrow}</span>
        </div>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-10 items-start">
          <h2 className="font-display text-[30px] md:text-[40px] font-medium tracking-tight text-[#0a1b33] leading-[1.08]">
            {title}
          </h2>
          <p className="font-sans text-[13.5px] md:text-[14.5px] text-[#64748b] leading-[1.65] max-w-[540px] md:pt-3">
            {description}
          </p>
        </div>

        <div className="mt-2 overflow-x-auto -mx-1 pb-1">
          <div className="inline-flex items-center gap-2 px-1">
            {flowSteps.map((step, i) => (
              <div key={i} className="inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200/70 px-3 py-1.5 text-[11px] font-semibold text-[#0a1b33] shadow-[0_4px_14px_-8px_rgba(15,23,42,0.18)]">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-500 text-[8px] font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </span>
                {i < flowSteps.length - 1 && (
                  <ChevronRight size={13} className="text-slate-300 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
