import type { TString } from '../../i18n/types'

export type ChatAttachment =
  | { type: 'heatmap'; label: string }
  | { type: 'chart'; label: string }
  | { type: 'quote'; label: string; quoteModalId?: string }

export interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  content: string
  attachments?: ChatAttachment[]
  sources?: string[]
  time: string
}

export type ChatAttachmentTpl =
  | { type: 'heatmap'; labelTpl: string }
  | { type: 'chart'; labelTpl: string }
  | { type: 'quote'; labelTpl: string; quoteModalId?: string }

export interface ChatSeedMessage {
  role: ChatMessage['role']
  /** Use [[USD_K:n]], [[USD_K_PLUS:n]], [[USD_M:n]] placeholders (see workspaceChatHydrate) */
  contentTpl: string
  attachmentsTpl?: ChatAttachmentTpl[]
  sources?: string[]
  time: string
}

/** Initial transcript seeds (localized money applied at hydrate time) */
export const conversationSeedTemplates: ChatSeedMessage[] = [
  {
    role: 'user',
    contentTpl:
      'Generate a [[USD_K:320]] EV launch package for Aurora — prime metros, 3 weeks, awareness KPI.',
    time: '14:02',
  },
  {
    role: 'ai',
    contentTpl:
      'I shortlisted 3 candidate packages from current inventory. "Prime Reach" leads at 94% fit, projecting 12.4M reach with [[USD_K:340.5]] revenue (vs. [[USD_K:320]] brief — within 7% acceptance).',
    attachmentsTpl: [
      {
        type: 'quote',
        labelTpl: 'Prime Reach · [[USD_K:340.5]] · 94% fit',
        quoteModalId: 'primeReachAurora',
      },
      { type: 'heatmap', labelTpl: 'Aurora vertical demand · last 30d' },
    ],
    sources: ['Inventory · Jun 4–26', 'Pricing model v2.1', 'Aurora past 6 campaigns'],
    time: '14:02',
  },
  {
    role: 'user',
    contentTpl:
      'Stretch to [[USD_K:355]] if it adds Sport+ live windows. Then send to Mira for review.',
    time: '14:04',
  },
  {
    role: 'ai',
    contentTpl:
      'Updated. Added 2 Sport+ live windows (Jun 12 21:00, Jun 19 20:30) for [[USD_K_PLUS:14.5]]. New total [[USD_K:355]], 96% fit. Routed to Mira C. for approval — bottleneck risk: low (avg 6h response).',
    sources: ['Sport+ avails', 'Approval graph · Mira C.'],
    time: '14:04',
  },
]

/** Chips map to presets by slug (labels from i18n arrays) */
export const workspaceSuggestionSlugs = ['auto-quote', 'reprice-prime', 'inventory-risk', 'weekly-summary'] as const
export type WorkspaceSuggestionSlug = (typeof workspaceSuggestionSlugs)[number]

export interface WorkspaceChatAiTurnTpl {
  contentTpl: string
  attachmentsTpl?: ChatAttachmentTpl[]
  sources?: string[]
  delayBeforeMs?: number
}

export interface WorkspaceChatPresetTurns {
  userContentTpl?: string
  aiTurns: WorkspaceChatAiTurnTpl[]
}

export const workspacePresetReplies: Record<WorkspaceSuggestionSlug, WorkspaceChatPresetTurns> = {
  'auto-quote': {
    aiTurns: [
      {
        delayBeforeMs: 700,
        contentTpl:
          'Drafting 3 advertiser quotes from Vitabar / GreenEarth / CityBank pipelines. Highest fit today: Prime Reach analogue at ~92%. Want me to attach line items?',
        sources: ['Pipeline · Tier-1', 'Quotation templates v4'],
      },
    ],
  },
  'reprice-prime': {
    aiTurns: [
      {
        delayBeforeMs: 650,
        contentTpl:
          'Metro One + Sport+ prime deltas staged: [[USD_K_PLUS:8.9]] modeled weekly lift with sold-out probability still under 11%. Shall I enqueue for Revenue Ops?',
        sources: ['Pricing model v2.1', 'Demand spike · Thu slot'],
      },
    ],
  },
  'inventory-risk': {
    aiTurns: [
      {
        delayBeforeMs: 600,
        contentTpl:
          '14 slots at News 24 late-fringe flagged with [[USD_K:28]] leakage risk unless bundled. I can propose a pairing with Lifestyle daytime.',
        sources: ['Burn-down forecast', 'Bundle library'],
      },
    ],
  },
  'weekly-summary': {
    aiTurns: [
      {
        delayBeforeMs: 550,
        contentTpl:
          'Executive digest compiled: Reach +6.2% WoW, GRP pacing [[USD_K_PLUS:12]] attributable to Sport+ tournaments. Sending preview to inbox…',
        sources: ['Performance lakehouse', 'KPI rollup'],
      },
    ],
  },
}

export interface QuoteLineSnapshot {
  channel: string
  daypart: string
  spots: number
  cpmUsd: number
  totalUsd: number
}

export interface QuoteModalSnapshot {
  id: string
  packageTitle: string
  clientSubtitle: string
  fitPct: number
  briefUsdThousands: number
  packageUsdThousands: number
  lines: QuoteLineSnapshot[]
}

export const quoteModalSnapshots: Record<string, QuoteModalSnapshot> = {
  primeReachAurora: {
    id: 'primeReachAurora',
    packageTitle: 'Prime Reach',
    clientSubtitle: 'Aurora Mobility — EV Launch',
    fitPct: 94,
    briefUsdThousands: 320,
    packageUsdThousands: 340.5,
    lines: [
      { channel: 'Metro One', daypart: 'Prime 19–22h', spots: 8, cpmUsd: 31.8, totalUsd: 102_200 },
      { channel: 'Sport+', daypart: 'Live 20–22h', spots: 4, cpmUsd: 34.2, totalUsd: 84_400 },
      { channel: 'News 24', daypart: 'Bulletin 19:00', spots: 2, cpmUsd: 22.4, totalUsd: 28_900 },
    ],
  },
}

export const sessions = [
  { id: 's1', title: 'Aurora Mobility quotation', updated: '2m ago', active: true },
  { id: 's2', title: 'Re-price Sport+ prime', updated: '18m ago' },
  { id: 's3', title: 'Q3 forecast briefing', updated: '1h ago' },
  { id: 's4', title: 'TVC approval bottleneck', updated: 'Yesterday' },
  { id: 's5', title: 'Inventory burn Q2 review', updated: '2d ago' },
]

export const promptSuggestions = [
  'Auto-quote 3 advertisers in pipeline',
  'Re-price prime time next 7 days',
  'Find inventory at risk of going unsold',
  'Summarize last week campaign performance',
  'Approve all TVCs blocked > 48h',
  'Forecast revenue impact of +5% Sport+ CPM',
]

export interface WorkflowSuggestion {
  id: string
  title: string
  description: string
  impactText?: TString
  /** Thousands USD → UI shows compact +money */
  impactUsdThousands?: number
  impactSuffix?: TString
  duration: string
  tag: 'pricing' | 'quotation' | 'approval' | 'analytics'
}

export const workflowSuggestions: WorkflowSuggestion[] = [
  {
    id: 'w1',
    title: 'Auto-quote 3 advertisers',
    description: 'Generate proposals for Vitabar, GreenEarth, CityBank from open briefs',
    impactUsdThousands: 420,
    impactSuffix: { en: 'pipeline', id: 'pipeline' },
    duration: '~ 90s',
    tag: 'quotation',
  },
  {
    id: 'w2',
    title: 'Re-price prime time',
    description: 'Apply AI pricing deltas across Metro One & Sport+ for the next 7 days',
    impactUsdThousands: 72,
    impactSuffix: { en: 'weekly', id: 'per minggu' },
    duration: '~ 30s',
    tag: 'pricing',
  },
  {
    id: 'w3',
    title: 'Approve 5 pending TVCs',
    description: 'Auto-approve TVCs passing AI validation > 95% confidence',
    impactText: { en: '−2 day cycle time', id: 'Siklus −2 hari' },
    duration: '~ 15s',
    tag: 'approval',
  },
  {
    id: 'w4',
    title: 'Weekly executive digest',
    description: 'Compose performance brief & ship to leadership inbox',
    impactText: { en: 'Saves 3h analyst time', id: 'Hemat 3 jam kerja analis' },
    duration: '~ 45s',
    tag: 'analytics',
  },
  {
    id: 'w5',
    title: 'Bottleneck triage',
    description: 'Surface approvals stuck > 48h and ping owners',
    impactText: { en: '-1.4d avg cycle', id: '-1,4 hr siklus rata-rata' },
    duration: '~ 10s',
    tag: 'approval',
  },
  {
    id: 'w6',
    title: 'Inventory rebalance',
    description: 'Shift 18 unsold News 24 late-fringe slots into bundles',
    impactUsdThousands: 28,
    impactSuffix: { en: 'recovered', id: 'dipulihkan' },
    duration: '~ 60s',
    tag: 'pricing',
  },
]

export interface ActivityEvent {
  id: string
  actor: string
  action: string
  target: string
  /** When set, UI appends localized money (from thousands USD) */
  targetUsdThousands?: number
  time: string
  type: 'quote' | 'pricing' | 'tvc' | 'approval' | 'system'
}

export const activityFeed: ActivityEvent[] = [
  { id: 'e1', actor: 'AI Workspace', action: 'generated quotation', target: 'Aurora Mobility', targetUsdThousands: 355, time: '14:04', type: 'quote' },
  { id: 'e2', actor: 'Mira C.', action: 'approved pricing change', target: 'Sport+ Prime · +12%', time: '13:48', type: 'pricing' },
  { id: 'e3', actor: 'Jin Park', action: 'uploaded TVC version', target: 'AUR-EV-LAUNCH-30 v3.2', time: '13:22', type: 'tvc' },
  { id: 'e4', actor: 'AI Validator', action: 'passed validation', target: 'NOVA-SS-RAMADAN-15 v2.0', time: '12:58', type: 'tvc' },
  { id: 'e5', actor: 'Aldi N.', action: 'requested approval', target: 'BankX Platinum proposal', time: '11:40', type: 'approval' },
  { id: 'e6', actor: 'System', action: 'detected demand spike', target: 'Sport+ live · Jun 19', time: '10:15', type: 'system' },
]

export interface Automation {
  id: string
  name: string
  trigger: string
  condition: string
  action: string
  enabled: boolean
  runs: number
}

export const automations: Automation[] = [
  {
    id: 'a1',
    name: 'Auto-approve trusted TVC',
    trigger: 'TVC uploaded',
    condition: 'AI confidence > 96 & brand in trusted list',
    action: 'Move to Broadcast Ready',
    enabled: true,
    runs: 184,
  },
  {
    id: 'a2',
    name: 'Prime sellout alert',
    trigger: 'Inventory sync',
    condition: 'Channel sellout < 14 days',
    action: 'Slack #revenue + email VP Sales',
    enabled: true,
    runs: 22,
  },
  {
    id: 'a3',
    name: 'Daily quotation digest',
    trigger: 'Schedule 08:00',
    condition: 'New briefs > 0',
    action: 'Generate proposals & email sales lead',
    enabled: true,
    runs: 38,
  },
  {
    id: 'a4',
    name: 'Pricing nudge',
    trigger: 'Demand index spike > 15%',
    condition: 'Daypart in prime',
    action: 'Draft pricing recommendation for review',
    enabled: false,
    runs: 0,
  },
]
