import { cn } from '../../lib/cn'

export type Status =
  | 'approved'
  | 'pending'
  | 'review'
  | 'live'
  | 'draft'
  | 'rejected'
  | 'broadcast'
  | 'risk'
  | 'ai'

interface StatusBadgeProps {
  status: Status
  label?: string
  className?: string
  size?: 'xs' | 'sm'
}

const map: Record<Status, { bg: string; text: string; border: string; dot: string }> = {
  approved: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  pending: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600',
    border: 'border-amber-500/20',
    dot: 'bg-amber-500',
  },
  review: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-700',
    border: 'border-cyan-500/20',
    dot: 'bg-cyan-500',
  },
  live: {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-700',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-500',
  },
  draft: {
    bg: 'bg-slate-200/60',
    text: 'text-slate-600',
    border: 'border-slate-300/60',
    dot: 'bg-slate-400',
  },
  rejected: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-600',
    border: 'border-rose-500/20',
    dot: 'bg-rose-500',
  },
  broadcast: {
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-600',
    border: 'border-indigo-500/20',
    dot: 'bg-indigo-500',
  },
  risk: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-600',
    border: 'border-rose-500/20',
    dot: 'bg-rose-500',
  },
  ai: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-600',
    border: 'border-violet-500/20',
    dot: 'bg-violet-500',
  },
}

export function StatusBadge({ status, label, className, size = 'sm' }: StatusBadgeProps) {
  const c = map[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-semibold capitalize',
        c.bg,
        c.text,
        c.border,
        size === 'xs' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5',
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', c.dot)} />
      {label ?? status}
    </span>
  )
}
