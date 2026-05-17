import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { quoteModalSnapshots } from '../../../lib/mock/commandCenter'

type FormatUsdFn = (
  amountUsd: number,
  opts?: { thousands?: boolean; millions?: boolean; style?: 'standard' | 'compact' },
) => string

type FormatCpmFn = (amountUsd: number, opts?: { style?: 'standard' | 'compact' }) => string

interface QuotePreviewModalProps {
  open: boolean
  quoteModalId: string | null
  onClose: () => void
  formatUsd: FormatUsdFn
  formatCpmUsd: FormatCpmFn
  t: (path: string, fallback?: string) => string
}

export function QuotePreviewModal({
  open,
  quoteModalId,
  onClose,
  formatUsd,
  formatCpmUsd,
  t,
}: QuotePreviewModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const snap = quoteModalId !== null ? quoteModalSnapshots[quoteModalId] : undefined

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!open || !snap) return null

  const subtotalUsd = snap.lines.reduce((acc, row) => acc + row.totalUsd, 0)
  const brief = formatUsd(snap.briefUsdThousands, { thousands: true, style: 'compact' })
  const pkg = formatUsd(snap.packageUsdThousands, { thousands: true, style: 'compact' })

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={t('modules.commandCenter.workspace.modalClose')}
        className="absolute inset-0 bg-[#0a152d]/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[min(90vh,640px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-[0_28px_80px_-30px_rgba(15,23,42,0.45)]">
        <div className="sticky top-0 z-[1] flex items-start justify-between gap-3 border-b border-slate-100 bg-white/95 backdrop-blur-md px-5 py-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
              {t('modules.commandCenter.workspace.modalSubtitle')}
            </div>
            <div className="font-display text-[18px] font-medium text-[#0a1b33] mt-1">
              {snap.packageTitle}
            </div>
            <div className="text-[12px] text-slate-500 mt-0.5">{snap.clientSubtitle}</div>
            <div className="mt-2 inline-flex items-center rounded-full bg-violet-500/10 text-violet-700 border border-violet-200 px-2.5 py-0.5 text-[10px] font-semibold">
              {t('modules.commandCenter.workspace.modalFitBadge').replace(
                '{{pct}}',
                String(snap.fitPct),
              )}
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0a1b33] shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 flex justify-between gap-4 text-[12px]">
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-slate-400 font-semibold">
                {t('modules.commandCenter.workspace.modalTotalsRowBrief')}
              </div>
              <div className="font-display text-[16px] font-medium tabular-nums mt-1 text-[#0a1b33]">{brief}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.12em] text-slate-400 font-semibold">
                {t('modules.commandCenter.workspace.modalTotalsRowPackage')}
              </div>
              <div className="font-display text-[16px] font-medium tabular-nums mt-1 text-emerald-700">{pkg}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 text-[9px] uppercase tracking-[0.12em] text-slate-400 font-semibold border-b border-slate-100 pb-2">
            <span>{t('modules.commandCenter.workspace.modalColChannel')}</span>
            <span>{t('modules.commandCenter.workspace.modalColDaypart')}</span>
            <span className="text-right">{t('modules.commandCenter.workspace.modalColSpotsCpm')}</span>
            <span className="text-right">{t('modules.commandCenter.workspace.modalColTotal')}</span>
          </div>
          {snap.lines.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-4 py-2.5 text-[12px] border-b border-slate-50 last:border-0 items-center"
            >
              <span className="font-semibold text-[#0a1b33]">{row.channel}</span>
              <span className="text-slate-500">{row.daypart}</span>
              <span className="text-right text-[#0a1b33] tabular-nums">
                {row.spots} · {formatCpmUsd(row.cpmUsd)}
              </span>
              <span className="text-right font-semibold text-[#0a1b33] tabular-nums">{formatUsd(row.totalUsd)}</span>
            </div>
          ))}

          <div className="mt-4 flex justify-end text-[11px] text-slate-500">
            {t('modules.commandCenter.workspace.modalTitle')} ·{' '}
            <span className="font-semibold text-[#0a1b33] tabular-nums ml-1">{formatUsd(subtotalUsd)}</span>
          </div>
        </div>

        <div className="sticky bottom-0 flex gap-2 border-t border-slate-100 bg-white px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl bg-slate-100 text-[#0a1b33] text-[11px] font-semibold py-2.5"
          >
            {t('modules.commandCenter.workspace.modalClose')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl bg-[#0a152d] text-white text-[11px] font-semibold py-2.5"
          >
            {t('modules.commandCenter.workspace.modalExport')}
          </button>
        </div>
      </div>
    </div>
  )
}
