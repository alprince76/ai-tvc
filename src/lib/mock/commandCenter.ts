export interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  content: string
  attachments?: { type: 'quote' | 'heatmap' | 'chart'; label: string }[]
  sources?: string[]
  time: string
}

export const sessions = [
  { id: 's1', title: 'Aurora Mobility quotation', updated: '2m ago', active: true },
  { id: 's2', title: 'Re-price Sport+ prime', updated: '18m ago' },
  { id: 's3', title: 'Q3 forecast briefing', updated: '1h ago' },
  { id: 's4', title: 'TVC approval bottleneck', updated: 'Yesterday' },
  { id: 's5', title: 'Inventory burn Q2 review', updated: '2d ago' },
]

export const conversation: ChatMessage[] = [
  {
    id: 'm1',
    role: 'user',
    content: 'Generate a $320k EV launch package for Aurora — prime metros, 3 weeks, awareness KPI.',
    time: '14:02',
  },
  {
    id: 'm2',
    role: 'ai',
    content:
      'I shortlisted 3 candidate packages from current inventory. "Prime Reach" leads at 94% fit, projecting 12.4M reach with $340.5k revenue (vs. $320k brief — within 7% acceptance).',
    attachments: [
      { type: 'quote', label: 'Prime Reach · $340.5k · 94% fit' },
      { type: 'heatmap', label: 'Aurora vertical demand · last 30d' },
    ],
    sources: ['Inventory · Jun 4–26', 'Pricing model v2.1', 'Aurora past 6 campaigns'],
    time: '14:02',
  },
  {
    id: 'm3',
    role: 'user',
    content: 'Stretch to $355k if it adds Sport+ live windows. Then send to Mira for review.',
    time: '14:04',
  },
  {
    id: 'm4',
    role: 'ai',
    content:
      'Updated. Added 2 Sport+ live windows (Jun 12 21:00, Jun 19 20:30) for +$14.5k. New total $355.0k, 96% fit. Routed to Mira C. for approval — bottleneck risk: low (avg 6h response).',
    sources: ['Sport+ avails', 'Approval graph · Mira C.'],
    time: '14:04',
  },
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
  impact: string
  duration: string
  tag: 'pricing' | 'quotation' | 'approval' | 'analytics'
}

export const workflowSuggestions: WorkflowSuggestion[] = [
  {
    id: 'w1',
    title: 'Auto-quote 3 advertisers',
    description: 'Generate proposals for Vitabar, GreenEarth, CityBank from open briefs',
    impact: '+$420k pipeline',
    duration: '~ 90s',
    tag: 'quotation',
  },
  {
    id: 'w2',
    title: 'Re-price prime time',
    description: 'Apply AI pricing deltas across Metro One & Sport+ for the next 7 days',
    impact: '+$72k weekly',
    duration: '~ 30s',
    tag: 'pricing',
  },
  {
    id: 'w3',
    title: 'Approve 5 pending TVCs',
    description: 'Auto-approve TVCs passing AI validation > 95% confidence',
    impact: '−2 day cycle time',
    duration: '~ 15s',
    tag: 'approval',
  },
  {
    id: 'w4',
    title: 'Weekly executive digest',
    description: 'Compose performance brief & ship to leadership inbox',
    impact: 'Saves 3h analyst time',
    duration: '~ 45s',
    tag: 'analytics',
  },
  {
    id: 'w5',
    title: 'Bottleneck triage',
    description: 'Surface approvals stuck > 48h and ping owners',
    impact: '-1.4d avg cycle',
    duration: '~ 10s',
    tag: 'approval',
  },
  {
    id: 'w6',
    title: 'Inventory rebalance',
    description: 'Shift 18 unsold News 24 late-fringe slots into bundles',
    impact: '+$28k recovered',
    duration: '~ 60s',
    tag: 'pricing',
  },
]

export interface ActivityEvent {
  id: string
  actor: string
  action: string
  target: string
  time: string
  type: 'quote' | 'pricing' | 'tvc' | 'approval' | 'system'
}

export const activityFeed: ActivityEvent[] = [
  { id: 'e1', actor: 'AI Workspace', action: 'generated quotation', target: 'Aurora Mobility · $355k', time: '14:04', type: 'quote' },
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
