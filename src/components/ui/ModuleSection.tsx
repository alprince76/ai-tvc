import { AnimatePresence, motion } from 'motion/react'
import { useId, useMemo, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { ModuleHeader } from './ModuleHeader'
import { TabBar, type TabItem } from './TabBar'
import { useLocale } from '../../i18n/LocaleContext'

export interface ModuleTabDef extends TabItem {
  render: () => ReactNode
}

interface ModuleSectionProps {
  id: string
  index: string
  eyebrow: string
  title: string
  description: string
  flowSteps: string[]
  tabs: ModuleTabDef[]
  className?: string
  frameClassName?: string
}

const easing = [0.22, 1, 0.36, 1] as const

export function ModuleSection({
  id,
  index,
  eyebrow,
  title,
  description,
  flowSteps,
  tabs,
  className,
  frameClassName,
}: ModuleSectionProps) {
  const { t } = useLocale()
  const layoutGroupId = useId().replace(/:/g, '')
  const [active, setActive] = useState(tabs[0]?.id ?? '')
  const [mounted, setMounted] = useState<Set<string>>(() => new Set([tabs[0]?.id ?? '']))

  const handleChange = (next: string) => {
    setActive(next)
    setMounted((prev) => {
      if (prev.has(next)) return prev
      const updated = new Set(prev)
      updated.add(next)
      return updated
    })
  }

  const activeTab = useMemo(() => tabs.find((t) => t.id === active), [tabs, active])

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: easing }}
      className={cn('w-full flex flex-col gap-8 scroll-mt-10', className)}
    >
      <ModuleHeader
        index={index}
        eyebrow={eyebrow}
        title={title}
        description={description}
        flowSteps={flowSteps}
      />

      <div
        className={cn(
          'relative w-full max-w-[1400px] mx-auto rounded-[40px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden',
          frameClassName,
        )}
      >
        <div className="flex items-center justify-between px-6 md:px-8 pt-6 gap-4">
          <div className="overflow-x-auto">
            <TabBar
              tabs={tabs}
              active={active}
              onChange={handleChange}
              layoutGroupId={`${id}-${layoutGroupId}`}
            />
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-400">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            {t('common.liveModule')}
          </div>
        </div>

        <div className="relative p-5 md:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: easing }}
            >
              {activeTab?.render()}
            </motion.div>
          </AnimatePresence>

          {tabs.map((tab) =>
            mounted.has(tab.id) && tab.id !== active ? (
              <div key={tab.id} className="hidden">
                {tab.render()}
              </div>
            ) : null,
          )}
        </div>
      </div>
    </motion.section>
  )
}
