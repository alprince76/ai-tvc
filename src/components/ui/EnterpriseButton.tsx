import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'nav'

interface EnterpriseButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#0a152d] text-white shadow-[0_10px_30px_-10px_rgba(10,21,45,0.6)] hover:shadow-[0_18px_40px_-12px_rgba(10,21,45,0.7)]',
  secondary:
    'bg-white/60 text-[#0a1b33] border border-white/80 backdrop-blur-xl shadow-[0_8px_24px_-12px_rgba(15,23,42,0.25)] hover:bg-white/75',
  nav:
    'bg-white text-[#0a1b33] border border-slate-200/60 shadow-sm hover:border-slate-300',
}

const sizeClasses: Record<Variant, string> = {
  primary: 'px-6 py-3 text-[13px]',
  secondary: 'px-6 py-3 text-[13px]',
  nav: 'px-5 py-2 text-[12px]',
}

export function EnterpriseButton({
  variant = 'primary',
  children,
  icon,
  iconPosition = 'right',
  className,
  ...rest
}: EnterpriseButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: variant === 'nav' ? 1.02 : 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a152d]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        sizeClasses[variant],
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className="flex">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex">{icon}</span>}
    </motion.button>
  )
}
