import { ArrowUp, Mic, Paperclip, Plus, Sparkles, Workflow } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from '../../../i18n/LocaleContext'
import {
  conversationSeedTemplates,
  sessions,
  workspacePresetReplies,
  workspaceSuggestionSlugs,
  type ChatMessage,
  type WorkspaceSuggestionSlug,
} from '../../../lib/mock/commandCenter'
import {
  aiTurnTplToMessage,
  nextWorkspaceChatClock,
  seedToChatMessages,
} from '../../../lib/mock/workspaceChatHydrate'
import { cn } from '../../../lib/cn'
import { HeatmapGrid } from '../../ui/HeatmapGrid'
import type { HeatCell } from '../../ui/HeatmapGrid'
import { QuotePreviewModal } from './QuotePreviewModal'

const miniHeatmap: HeatCell[] = Array.from({ length: 24 }, (_, i) =>
  i % 7 === 0 ? 'active' : i % 5 === 0 ? 'open' : 'sold',
)

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Route free-text prompts to scripted presets before falling back */
function matchPresetFromInput(raw: string): WorkspaceSuggestionSlug | null {
  const q = raw.toLowerCase()
  if (/summarize|weekly|last week|digest|\bwow\b|performance/.test(q)) return 'weekly-summary'
  if (/unsold|risk\b|inventory|burn|bundle/.test(q)) return 'inventory-risk'
  if (/re[- ]price|prime time|sport\+|reprime/i.test(raw)) return 'reprice-prime'
  if (/auto[- ]quote|pipeline|vitabar|greenearth|citybank|advertiser/.test(q)) return 'auto-quote'
  return null
}

export function AIWorkspace() {
  const { t, tArray, formatUsd, formatCpmUsd } = useLocale()
  const scrollRef = useRef<HTMLDivElement>(null)
  const composingRef = useRef(false)

  const seedMessages = useMemo(() => seedToChatMessages(conversationSeedTemplates, formatUsd), [formatUsd])
  const [appendedMessages, setAppendedMessages] = useState<ChatMessage[]>([])
  const messages = useMemo(() => [...seedMessages, ...appendedMessages], [seedMessages, appendedMessages])

  const [composerText, setComposerText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [busy, setBusy] = useState(false)
  const [quoteModalId, setQuoteModalId] = useState<string | null>(null)

  const chips = useMemo(
    () => tArray('modules.commandCenter.workspace.suggestionChips'),
    [tArray],
  )

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, isTyping])

  const runPresetResponses = useCallback(
    async (slug: WorkspaceSuggestionSlug) => {
      const preset = workspacePresetReplies[slug]
      const turns = preset?.aiTurns ?? []
      for (let i = 0; i < turns.length; i++) {
        const turn = turns[i]
        await delay(turn.delayBeforeMs ?? 450)
        const id = `ai-${crypto.randomUUID()}`
        setAppendedMessages((prev) => [...prev, aiTurnTplToMessage(turn, formatUsd, id)])
      }
    },
    [formatUsd],
  )

  const handleAfterUserBubble = useCallback(
    async (slug: WorkspaceSuggestionSlug | null) => {
      setIsTyping(true)
      await delay(380)
      try {
        if (slug && workspacePresetReplies[slug]) {
          await runPresetResponses(slug)
        } else {
          const fb: ChatMessage = {
            id: `ai-fallback-${crypto.randomUUID()}`,
            role: 'ai',
            content: t('modules.commandCenter.workspace.chatFallbackReply'),
            time: nextWorkspaceChatClock(),
          }
          setAppendedMessages((prev) => [...prev, fb])
        }
      } finally {
        setIsTyping(false)
      }
    },
    [runPresetResponses, t],
  )

  const sendUserAndRespond = useCallback(
    async (trimmedUserText: string, presetSlug?: WorkspaceSuggestionSlug | null) => {
      if (!trimmedUserText || busy) return
      setBusy(true)
      const slug = presetSlug ?? matchPresetFromInput(trimmedUserText)
      const userMsg: ChatMessage = {
        id: `user-${crypto.randomUUID()}`,
        role: 'user',
        content: trimmedUserText,
        time: nextWorkspaceChatClock(),
      }
      setAppendedMessages((prev) => [...prev, userMsg])
      try {
        await handleAfterUserBubble(slug)
      } finally {
        setBusy(false)
      }
    },
    [busy, handleAfterUserBubble],
  )

  const submitComposer = useCallback(async () => {
    const text = composerText.trim()
    if (!text) return
    setComposerText('')
    await sendUserAndRespond(text)
  }, [composerText, sendUserAndRespond])

  const resetSession = useCallback(() => {
    setComposerText('')
    setAppendedMessages([])
    setQuoteModalId(null)
  }, [])

  return (
    <>
    <div className="grid lg:grid-cols-[220px_1fr_240px] gap-4 h-[520px]">
      <aside className="rounded-2xl bg-[#0a152d]/95 border border-white/10 p-3 flex flex-col text-white shadow-[0_24px_60px_-25px_rgba(10,21,45,0.5)]">
        <button
          type="button"
          onClick={resetSession}
          className="mx-1 mb-3 rounded-xl bg-white text-[#0a1b33] text-[11px] font-semibold py-2 inline-flex items-center justify-center gap-1.5 hover:bg-cyan-100 transition-colors"
        >
          <Plus size={11} /> {t('modules.commandCenter.workspace.newSession')}
        </button>
        <div className="text-[9px] uppercase tracking-[0.18em] text-white/45 font-semibold px-2 mb-2">
          {t('modules.commandCenter.workspace.recent')}
        </div>
        <ul className="flex-1 overflow-y-auto space-y-1">
          {sessions.map((s) => (
            <li
              key={s.id}
              className={cn(
                'rounded-lg px-2 py-2 cursor-pointer transition-colors',
                s.active ? 'bg-white/10 border border-white/15' : 'hover:bg-white/5',
              )}
            >
              <div className="text-[11px] font-semibold text-white truncate">{s.title}</div>
              <div className="text-[10px] text-white/45">{s.updated}</div>
            </li>
          ))}
        </ul>
      </aside>

      <div className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-md bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-500" />
            <div>
              <div className="text-[12px] font-semibold text-[#0a1b33]">
                {t('modules.commandCenter.workspace.sessionTitle')}
              </div>
              <div className="text-[10px] text-slate-500">{t('modules.commandCenter.workspace.sessionSub')}</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
            {t('modules.commandCenter.workspace.liveBadge')}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={cn('flex gap-3', m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
              <div
                className={cn(
                  'h-7 w-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold shrink-0',
                  m.role === 'user'
                    ? 'bg-gradient-to-br from-amber-400 to-rose-500'
                    : 'bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-500',
                )}
              >
                {m.role === 'user' ? 'MC' : <Sparkles size={12} />}
              </div>
              <div
                className={cn(
                  'max-w-[78%] rounded-2xl px-4 py-3 text-[12.5px] leading-relaxed',
                  m.role === 'user'
                    ? 'bg-[#0a152d] text-white rounded-tr-md'
                    : 'bg-slate-50 text-[#0a1b33] rounded-tl-md border border-slate-100',
                )}
              >
                <p>{m.content}</p>

                {m.attachments && (
                  <div className="mt-3 space-y-2">
                    {m.attachments.map((a, i) => {
                      const canOpenQuote = a.type === 'quote' && Boolean(a.quoteModalId)
                      return a.type === 'heatmap' ? (
                        <div key={i} className="rounded-xl border border-slate-200 bg-white p-2">
                          <div className="text-[10px] text-slate-500 font-semibold mb-1">{a.label}</div>
                          <HeatmapGrid cells={miniHeatmap} columns={24} cellHeight={8} gap={2} />
                        </div>
                      ) : (
                        <div
                          key={i}
                          className="rounded-xl border border-violet-200 bg-violet-50/60 p-3 flex items-center justify-between gap-2"
                        >
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.14em] text-violet-600 font-semibold">
                              {a.type}
                            </div>
                            <div className="text-[12px] font-semibold text-[#0a1b33]">{a.label}</div>
                          </div>
                          <button
                            type="button"
                            disabled={busy || !canOpenQuote}
                            onClick={() => {
                              if (a.type === 'quote' && a.quoteModalId) setQuoteModalId(a.quoteModalId)
                            }}
                            className={cn(
                              'text-[10px] font-semibold rounded-full px-2.5 py-1 border shrink-0',
                              canOpenQuote
                                ? 'text-violet-700 bg-white border-violet-200 hover:bg-violet-50'
                                : 'text-slate-400 bg-slate-100 border-slate-200 cursor-not-allowed',
                            )}
                          >
                            {t('modules.commandCenter.workspace.openQuote')}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}

                {m.sources && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.sources.map((s) => (
                      <span
                        key={s}
                        className="text-[9.5px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-full px-2 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  className={cn(
                    'text-[9.5px] mt-2',
                    m.role === 'user' ? 'text-white/55' : 'text-slate-400',
                  )}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start ml-12">
              <div className="rounded-2xl rounded-tl-md border border-slate-100 bg-white px-4 py-3 text-[12px] text-slate-600 flex items-center gap-2 shadow-sm">
                <span className="flex gap-0.5 items-center pt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce" />
                </span>
                <span>{t('modules.commandCenter.workspace.typingLabel')}</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <div className="border-t border-slate-100 p-3 space-y-2">
          <div className="flex flex-wrap gap-1.5 pb-1">
            {workspaceSuggestionSlugs.map((slug, idx) => {
              const chipLabel = chips[idx] ?? slug
              return (
                <button
                  key={slug}
                  type="button"
                  disabled={busy}
                  onClick={async () => {
                    await sendUserAndRespond(chipLabel, slug)
                  }}
                  className="text-[10px] font-semibold text-[#0a1b33] bg-slate-100 hover:bg-indigo-50 border border-slate-200 rounded-full px-2.5 py-1 truncate max-w-full disabled:opacity-50"
                >
                  {chipLabel}
                </button>
              )
            })}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 flex items-end gap-2">
            <button
              type="button"
              className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
              aria-hidden
              tabIndex={-1}
            >
              <Paperclip size={13} />
            </button>
            <textarea
              rows={1}
              value={composerText}
              disabled={busy}
              onCompositionStart={() => {
                composingRef.current = true
              }}
              onCompositionEnd={() => {
                composingRef.current = false
              }}
              onChange={(e) => setComposerText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter' || e.shiftKey) return
                if (composingRef.current) return
                e.preventDefault()
                void submitComposer()
              }}
              placeholder={t('modules.commandCenter.workspace.composerPlaceholder')}
              className="flex-1 resize-none bg-transparent text-[12.5px] text-[#0a1b33] py-1.5 focus:outline-none placeholder:text-slate-400 disabled:opacity-55"
              aria-label={t('modules.commandCenter.workspace.composerPlaceholder')}
            />
            <button
              type="button"
              className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
              aria-hidden
              tabIndex={-1}
            >
              <Mic size={13} />
            </button>
            <button
              type="button"
              disabled={busy || !composerText.trim()}
              onClick={() => void submitComposer()}
              aria-label={t('modules.commandCenter.workspace.send')}
              className={cn(
                'h-8 w-8 rounded-lg flex items-center justify-center disabled:opacity-40',
                'bg-[#0a152d] text-white hover:bg-[#0d1f42]',
              )}
            >
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>

      <aside className="rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/60 p-4 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)] flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[#0a1b33]/60 font-semibold">
          {t('modules.commandCenter.workspace.referencedSourcesHeading')}
        </div>
        <ul className="mt-3 space-y-2">
          {tArray('modules.commandCenter.workspace.referencedSourcesList').map((s) => (
            <li key={s} className="rounded-lg bg-white border border-slate-100 px-2.5 py-2 text-[11px] text-[#0a1b33]">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          <button
            type="button"
            className="w-full rounded-xl bg-[#0a152d] text-white text-[11px] font-semibold py-2.5 inline-flex items-center justify-center gap-1.5"
          >
            <Workflow size={11} />
            {t('modules.commandCenter.workspace.runWorkflow')}
          </button>
        </div>
      </aside>

    </div>
    <QuotePreviewModal
      open={quoteModalId !== null}
      quoteModalId={quoteModalId}
      onClose={() => setQuoteModalId(null)}
      formatUsd={formatUsd}
      formatCpmUsd={formatCpmUsd}
      t={t}
    />
    </>
  )
}
