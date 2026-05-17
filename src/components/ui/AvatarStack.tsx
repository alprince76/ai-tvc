import { cn } from '../../lib/cn'

interface AvatarStackProps {
  names: string[]
  max?: number
  size?: number
  className?: string
}

const palette = [
  'from-cyan-400 to-indigo-500',
  'from-violet-400 to-fuchsia-500',
  'from-emerald-400 to-cyan-500',
  'from-amber-400 to-rose-500',
  'from-rose-400 to-pink-500',
  'from-sky-400 to-blue-600',
]

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

export function AvatarStack({ names, max = 4, size = 24, className }: AvatarStackProps) {
  const shown = names.slice(0, max)
  const overflow = names.length - shown.length
  return (
    <div className={cn('inline-flex items-center', className)}>
      <div className="flex -space-x-1.5">
        {shown.map((n, i) => (
          <div
            key={i}
            className={cn(
              'rounded-full bg-gradient-to-br ring-2 ring-white flex items-center justify-center text-white font-semibold',
              palette[i % palette.length],
            )}
            style={{
              width: size,
              height: size,
              fontSize: Math.max(8, size * 0.4),
            }}
            title={n}
          >
            {initialsOf(n)}
          </div>
        ))}
        {overflow > 0 && (
          <div
            className="rounded-full bg-slate-100 ring-2 ring-white flex items-center justify-center text-slate-600 font-semibold"
            style={{
              width: size,
              height: size,
              fontSize: Math.max(8, size * 0.38),
            }}
          >
            +{overflow}
          </div>
        )}
      </div>
    </div>
  )
}
