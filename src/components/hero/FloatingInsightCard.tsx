import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface FloatingInsightCardProps {
  children: ReactNode
  className?: string
  delay?: number
  floatRange?: number
  duration?: number
}

export function FloatingInsightCard({
  children,
  className,
  delay = 0,
  floatRange = 8,
  duration = 6,
}: FloatingInsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: [0, -floatRange, 0],
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.8, delay: 0.5 + delay, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.8, delay: 0.5 + delay, ease: [0.22, 1, 0.36, 1] },
        y: {
          duration,
          delay: 0.6 + delay,
          ease: 'easeInOut',
          repeat: Infinity,
        },
      }}
      whileHover={{ y: -floatRange - 4, scale: 1.02 }}
      className={cn(
        'pointer-events-auto absolute rounded-2xl overflow-hidden',
        'shadow-[0_30px_60px_-20px_rgba(10,21,45,0.35),0_0_0_1px_rgba(255,255,255,0.04)]',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
