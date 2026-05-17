import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface Column<T> {
  key: keyof T | string
  header: string
  align?: 'left' | 'right' | 'center'
  width?: string
  render?: (row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  className?: string
  variant?: 'light' | 'dark'
  rowClassName?: string
  onRowClick?: (row: T) => void
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  className,
  variant = 'light',
  rowClassName,
  onRowClick,
}: DataTableProps<T>) {
  const isDark = variant === 'dark'
  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <table className="w-full text-left">
        <thead>
          <tr
            className={cn(
              'text-[10px] font-semibold uppercase tracking-[0.14em]',
              isDark
                ? 'text-white/55 border-b border-white/10'
                : 'text-[#0a1b33]/55 border-b border-slate-200/70',
            )}
          >
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  'py-2 px-3 font-semibold',
                  col.align === 'right' && 'text-right',
                  col.align === 'center' && 'text-center',
                )}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                'transition-colors',
                isDark
                  ? 'border-b border-white/5 hover:bg-white/5'
                  : 'border-b border-slate-100 hover:bg-slate-50/70',
                onRowClick && 'cursor-pointer',
                rowClassName,
              )}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={cn(
                    'py-3 px-3 text-[12px]',
                    isDark ? 'text-white/85' : 'text-[#0a1b33]/90',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                  )}
                >
                  {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
