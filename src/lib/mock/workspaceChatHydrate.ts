import type {
  ChatAttachment,
  ChatAttachmentTpl,
  ChatMessage,
  ChatSeedMessage,
  WorkspaceChatAiTurnTpl,
} from './commandCenter'

type FormatUsd = (
  amountUsd: number,
  opts?: { thousands?: boolean; millions?: boolean; style?: 'standard' | 'compact' },
) => string

export function nextWorkspaceChatClock(): string {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

/** Replace [[USD_K:n]], [[USD_K_PLUS:n]], [[USD_M:n]] */
export function hydrateWorkspaceMoneyTokens(text: string, formatUsd: FormatUsd): string {
  let out = text.replace(/\[\[USD_K_PLUS:([\d.]+)\]\]/g, (_, raw) => {
    const v = Number.parseFloat(raw)
    return `+${formatUsd(v, { thousands: true, style: 'compact' })}`
  })
  out = out.replace(/\[\[USD_K:([\d.]+)\]\]/g, (_, raw) =>
    formatUsd(Number.parseFloat(raw), { thousands: true, style: 'compact' }),
  )
  out = out.replace(/\[\[USD_M:([\d.]+)\]\]/g, (_, raw) =>
    formatUsd(Number.parseFloat(raw), { millions: true, style: 'compact' }),
  )
  return out
}

export function hydrateAttachmentTpl(tpl: ChatAttachmentTpl, formatUsd: FormatUsd): ChatAttachment {
  switch (tpl.type) {
    case 'quote':
      return {
        type: 'quote',
        label: hydrateWorkspaceMoneyTokens(tpl.labelTpl, formatUsd),
        ...(tpl.quoteModalId ? { quoteModalId: tpl.quoteModalId } : {}),
      }
    default:
      return {
        type: tpl.type,
        label: hydrateWorkspaceMoneyTokens(tpl.labelTpl, formatUsd),
      }
  }
}

export function seedToChatMessages(seeds: ChatSeedMessage[], formatUsd: FormatUsd): ChatMessage[] {
  return seeds.map((s, i) => ({
    id: `seed-${i}-${s.role}`,
    role: s.role,
    content: hydrateWorkspaceMoneyTokens(s.contentTpl, formatUsd),
    attachments: s.attachmentsTpl?.map((a) => hydrateAttachmentTpl(a, formatUsd)),
    sources: s.sources,
    time: s.time,
  }))
}

/** AI reply from scripted template */
export function aiTurnTplToMessage(tpl: WorkspaceChatAiTurnTpl, formatUsd: FormatUsd, id: string): ChatMessage {
  return {
    id,
    role: 'ai',
    content: hydrateWorkspaceMoneyTokens(tpl.contentTpl, formatUsd),
    attachments: tpl.attachmentsTpl?.map((a) => hydrateAttachmentTpl(a, formatUsd)),
    sources: tpl.sources,
    time: nextWorkspaceChatClock(),
  }
}
