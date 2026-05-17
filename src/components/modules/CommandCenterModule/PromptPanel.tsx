import { Paperclip, Sparkles, X } from 'lucide-react'
import { useLocale } from '../../../i18n/LocaleContext'
import { promptSuggestions } from '../../../lib/mock/commandCenter'
import { SimulationButton } from '../../ui/SimulationButton'

const attachments = ['Aurora_brief.pdf', 'Q3_targets.csv']
const models = [
  { id: 'tvc-2', label: 'TVC GPT v2.1', active: true },
  { id: 'tvc-1', label: 'TVC GPT v1.6 — fast' },
  { id: 'studio', label: 'Studio · creative' },
]

export function PromptPanel() {
  const { t } = useLocale()

  return (
    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
          {t('modules.commandCenter.pages.prompt.title')}
        </h3>
        <p className="text-[11.5px] text-slate-500">{t('modules.commandCenter.pages.prompt.sub')}</p>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
          <textarea
            rows={5}
            defaultValue="Compose a $320k EV launch package for Aurora Mobility across Tier-1 metros, awareness KPI, Jun 4–26. Include Sport+ live windows if reach > 12M."
            className="w-full resize-none bg-transparent text-[13px] text-[#0a1b33] focus:outline-none placeholder:text-slate-400 leading-relaxed"
          />

          <div className="mt-3 flex flex-wrap gap-1.5">
            {attachments.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0a1b33] bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1"
              >
                <Paperclip size={10} />
                {a}
                <X size={10} className="text-slate-400 hover:text-slate-700 cursor-pointer" />
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
            <div className="inline-flex bg-slate-100 rounded-full p-1">
              {models.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  className={
                    m.active
                      ? 'px-3 py-1 rounded-full text-[10.5px] font-semibold text-[#0a1b33] bg-white shadow-sm'
                      : 'px-3 py-1 rounded-full text-[10.5px] font-semibold text-slate-500 hover:text-[#0a1b33]'
                  }
                >
                  {m.label}
                </button>
              ))}
            </div>
            <SimulationButton
              label={t('action.runPrompt')}
              runningLabel={t('sim.running')}
              doneLabel={t('sim.done')}
              variant="dark"
              className="!px-4 !py-2 !text-[11px] [&>span]:inline-flex [&>span]:items-center [&>span]:gap-1.5"
              onRun={async () => {
                await new Promise((r) => setTimeout(r, 1200))
              }}
            />
          </div>
        </div>
      </div>

      <aside className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[#0a1b33]/60 font-semibold">
          <Sparkles size={11} className="text-violet-500" />
          {t('modules.commandCenter.pages.prompt.suggested')}
        </div>
        <div className="mt-3 grid grid-cols-1 gap-2">
          {promptSuggestions.map((p) => (
            <SimulationButton
              key={p}
              label={p}
              runningLabel={t('sim.running')}
              doneLabel={t('sim.done')}
              variant="light"
              className="!rounded-xl !py-2.5 !text-left !justify-start !h-auto !whitespace-normal"
              onRun={async () => {
                await new Promise((r) => setTimeout(r, 800))
              }}
            />
          ))}
        </div>
      </aside>
    </div>
  )
}
