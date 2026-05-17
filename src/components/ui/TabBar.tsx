import { motion } from 'motion/react'
import { cn } from '../../lib/cn'

export interface TabItem {
  id: string
  label: string
}

interface TabBarProps {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
  layoutGroupId: string
  className?: string
}

export function TabBar({ tabs, active, onChange, layoutGroupId, className }: TabBarProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 bg-white/90 backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-slate-200/50',
        className,
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap',
              isActive
                ? 'text-white'
                : 'text-slate-500 hover:text-[#0a1b33]',
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`tabbar-${layoutGroupId}`}
                className="absolute inset-0 rounded-full bg-[#0a152d] shadow-[0_8px_22px_-8px_rgba(10,21,45,0.6)]"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
