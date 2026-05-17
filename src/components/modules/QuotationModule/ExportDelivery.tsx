import { FileText, Globe2, Mail } from 'lucide-react'
import { useLocale } from '../../../i18n/LocaleContext'
import { deliveryChannels } from '../../../lib/mock/quotation'
import { SimulationButton } from '../../ui/SimulationButton'
import { StatusBadge } from '../../ui/StatusBadge'
import type { Status } from '../../ui/StatusBadge'

const iconFor = (id: string) =>
  id === 'email' ? Mail : id === 'portal' ? Globe2 : FileText

const statusMap: Record<string, Status> = {
  ready: 'approved',
  sent: 'broadcast',
  pending: 'pending',
}

const recipients = [
  { name: 'Rendra Wibowo', role: 'CMO · Aurora', email: 'rendra@aurora.id' },
  { name: 'Anissa Pratiwi', role: 'Marketing Lead', email: 'anissa@aurora.id' },
  { name: 'Mira Chandra', role: 'AI TVC · Account Lead', email: 'mira@ai-tvc.com' },
]

export function ExportDelivery() {
  const { t, tr } = useLocale()

  const statusLabel = (s: 'ready' | 'sent' | 'pending') => {
    if (s === 'ready') return t('modules.quotation.pages.export.statusReady')
    if (s === 'sent') return t('modules.quotation.pages.export.statusSent')
    return t('modules.quotation.pages.export.statusPending')
  }

  return (
    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5">
      <div className="space-y-3">
        {deliveryChannels.map((c) => {
          const Icon = iconFor(c.id)
          return (
            <div
              key={c.id}
              className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/80 flex items-center justify-center text-[#0a1b33]">
                  <Icon size={16} />
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-[#0a1b33]">{tr(c.name)}</div>
                  <div className="text-[11px] text-slate-500">{tr(c.description)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={statusMap[c.status]} label={statusLabel(c.status)} size="xs" />
                <SimulationButton
                  label={t('action.send')}
                  runningLabel={t('sim.running')}
                  doneLabel={t('sim.done')}
                  variant="dark"
                  className="!px-3 !py-1.5 !text-[10px] inline-flex"
                  onRun={async () => {
                    await new Promise((r) => setTimeout(r, 800))
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <aside className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[#0a1b33]/60 font-semibold">
          {t('modules.quotation.pages.export.deliveryRecipients')}
        </div>
        <ul className="mt-3 divide-y divide-slate-100">
          {recipients.map((r) => (
            <li key={r.email} className="py-2.5 flex items-center justify-between">
              <div>
                <div className="text-[12px] font-semibold text-[#0a1b33]">{r.name}</div>
                <div className="text-[11px] text-slate-500">{r.role}</div>
              </div>
              <span className="text-[10px] text-slate-400">{r.email}</span>
            </li>
          ))}
        </ul>

        <SimulationButton
          label={t('action.addRecipient')}
          runningLabel={t('sim.running')}
          doneLabel={t('sim.done')}
          variant="light"
          className="mt-4 w-full !rounded-xl !py-2.5 bg-slate-100 !text-[#0a1b33]"
          onRun={async () => {
            await new Promise((r) => setTimeout(r, 700))
          }}
        />

        <div className="mt-5 rounded-xl bg-[#0a152d] text-white p-4">
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">
            {t('modules.quotation.pages.export.scheduleTitle')}
          </div>
          <p className="text-[11.5px] text-white/85 mt-1 leading-snug">
            {t('modules.quotation.pages.export.scheduleBody')}
          </p>
          <SimulationButton
            label={t('modules.quotation.pages.export.scheduleCta')}
            runningLabel={t('sim.running')}
            doneLabel={t('sim.done')}
            variant="light"
            className="mt-3 w-full !rounded-xl !py-2"
            onRun={async () => {
              await new Promise((r) => setTimeout(r, 900))
            }}
          />
        </div>
      </aside>
    </div>
  )
}
