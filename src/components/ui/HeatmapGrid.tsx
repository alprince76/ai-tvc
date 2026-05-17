import { cn } from '../../lib/cn'

export type HeatCell = 'sold' | 'active' | 'open' | 'risk'

interface HeatmapGridProps {
  cells: HeatCell[]
  columns: number
  className?: string
  cellHeight?: number
  gap?: number
  showLegend?: boolean
}

const cellClass: Record<HeatCell, string> = {
  sold: 'bg-[#0a152d]',
  active: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]',
  open: 'bg-slate-200',
  risk: 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.55)]',
}

export function HeatmapGrid({
  cells,
  columns,
  className,
  cellHeight = 14,
  gap = 4,
  showLegend = false,
}: HeatmapGridProps) {
  return (
    <div className={cn('w-full', className)}>
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: `${gap}px`,
        }}
      >
        {cells.map((c, i) => (
          <div
            key={i}
            className={cn('rounded-[3px] w-full', cellClass[c])}
            style={{ height: cellHeight }}
          />
        ))}
      </div>
      {showLegend && (
        <div className="mt-3 flex items-center gap-4 text-[10px] text-[#0a1b33]/65">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-[#0a152d]" />
            <span>Sold</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-cyan-400" />
            <span>Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-slate-200" />
            <span>Open</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-rose-400" />
            <span>At risk</span>
          </div>
        </div>
      )}
    </div>
  )
}
