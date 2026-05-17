import type { Status } from '../../components/ui/StatusBadge'

export interface ApprovalItem {
  id: string
  subject: string
  type: 'Quotation' | 'TVC' | 'Pricing' | 'Schedule' | 'Contract'
  requester: string
  team: string
  age: string
  bottleneck: number
  status: Status
  eta: string
}

export const approvalQueue: ApprovalItem[] = [
  {
    id: 'q1',
    subject: 'Aurora Mobility · $355k EV launch',
    type: 'Quotation',
    requester: 'Mira C.',
    team: 'Sales · Auto vertical',
    age: '2h',
    bottleneck: 18,
    status: 'pending',
    eta: 'Today · 17:30',
  },
  {
    id: 'q2',
    subject: 'Sport+ prime CPM +12%',
    type: 'Pricing',
    requester: 'AI Workspace',
    team: 'Revenue ops',
    age: '5h',
    bottleneck: 32,
    status: 'review',
    eta: 'Today · 19:00',
  },
  {
    id: 'q3',
    subject: 'NOVA-SS-RAMADAN-15 v2.0',
    type: 'TVC',
    requester: 'Lia S.',
    team: 'Broadcasting QA',
    age: '1d',
    bottleneck: 64,
    status: 'pending',
    eta: 'Tomorrow · 10:00',
  },
  {
    id: 'q4',
    subject: 'BankX traffic schedule reshuffle',
    type: 'Schedule',
    requester: 'Aldi N.',
    team: 'Traffic',
    age: '3h',
    bottleneck: 12,
    status: 'pending',
    eta: 'Today · 16:00',
  },
  {
    id: 'q5',
    subject: 'Perta Energy master contract amendment',
    type: 'Contract',
    requester: 'Legal',
    team: 'Legal · Finance',
    age: '2d',
    bottleneck: 78,
    status: 'risk',
    eta: 'Overdue',
  },
]

export interface ApprovalChainStep {
  role: string
  name: string
  status: 'done' | 'current' | 'pending'
  time?: string
}

export const approvalChain: Record<string, ApprovalChainStep[]> = {
  q1: [
    { role: 'Account Lead', name: 'Mira C.', status: 'done', time: 'Mon 09:14' },
    { role: 'Revenue Ops', name: 'Aldi N.', status: 'done', time: 'Mon 11:02' },
    { role: 'Sales VP', name: 'Karen Y.', status: 'current' },
    { role: 'Finance', name: 'Tomi H.', status: 'pending' },
    { role: 'Client', name: 'Aurora · Pak Rendra', status: 'pending' },
  ],
}

export interface CommentThread {
  id: string
  author: string
  body: string
  time: string
  mentions?: string[]
}

export const collabComments: CommentThread[] = [
  {
    id: 'c1',
    author: 'Mira C.',
    body: 'Confirmed the Sport+ live windows with Aurora. They want logo end-frame revised before approval.',
    time: '13:24',
    mentions: ['Jin Park'],
  },
  {
    id: 'c2',
    author: 'Jin Park',
    body: 'On it — pushing v3.3 in 30 min. Should pass AI validation no problem.',
    time: '13:31',
  },
  {
    id: 'c3',
    author: 'AI Workspace',
    body: 'Routed v3.3 to broadcasting QA. ETA from QA: ~ 45 min based on team\u2019s last 30 days.',
    time: '13:32',
  },
]

export interface RevisionDelta {
  id: string
  version: string
  who: string
  when: string
  changes: { field: string; from: string; to: string }[]
}

export const revisionDeltas: RevisionDelta[] = [
  {
    id: 'r1',
    version: 'v3.3',
    who: 'Jin Park',
    when: 'Today · 13:55',
    changes: [
      { field: 'End-frame', from: 'Aurora wordmark only', to: 'Wordmark + tagline + URL' },
      { field: 'Duration', from: '0:30', to: '0:30 (locked)' },
    ],
  },
  {
    id: 'r2',
    version: 'v3.2',
    who: 'Maya R',
    when: 'Yesterday · 16:12',
    changes: [
      { field: 'Audio mix', from: '-21 LUFS', to: '-23 LUFS' },
      { field: 'Caption track', from: 'EN only', to: 'EN + ID burn-in' },
    ],
  },
]

export interface WorkflowProgress {
  id: string
  name: string
  stages: { label: string; state: 'done' | 'current' | 'pending' }[]
  bottleneck?: string
}

export const workflowProgress: WorkflowProgress[] = [
  {
    id: 'wp1',
    name: 'Aurora EV launch · proposal → broadcast',
    stages: [
      { label: 'Brief', state: 'done' },
      { label: 'AI Quote', state: 'done' },
      { label: 'Internal Approval', state: 'current' },
      { label: 'Client Sign-off', state: 'pending' },
      { label: 'Traffic Schedule', state: 'pending' },
      { label: 'On Air', state: 'pending' },
    ],
    bottleneck: 'Sales VP review trending 14h above team avg',
  },
  {
    id: 'wp2',
    name: 'Sport+ pricing uplift · approval cascade',
    stages: [
      { label: 'AI Recommendation', state: 'done' },
      { label: 'Revenue Ops', state: 'done' },
      { label: 'Sales VP', state: 'current' },
      { label: 'CRO Sign-off', state: 'pending' },
    ],
  },
  {
    id: 'wp3',
    name: 'Perta master contract amendment',
    stages: [
      { label: 'Draft', state: 'done' },
      { label: 'Legal Review', state: 'current' },
      { label: 'Finance', state: 'pending' },
      { label: 'Client Counter', state: 'pending' },
      { label: 'Signed', state: 'pending' },
    ],
    bottleneck: 'Legal review > 48h SLA',
  },
]

export const teamActivity = [
  {
    day: 'Today',
    items: [
      { actor: 'Mira C.', action: 'approved', target: 'Aurora EV launch · v3.2', time: '13:24' },
      { actor: 'Jin Park', action: 'uploaded', target: 'Aurora v3.3 with end-frame fix', time: '13:55' },
      { actor: 'AI Workspace', action: 'routed', target: 'v3.3 → Broadcasting QA', time: '13:55' },
    ],
  },
  {
    day: 'Yesterday',
    items: [
      { actor: 'Aldi N.', action: 'opened', target: 'BankX schedule reshuffle', time: '16:42' },
      { actor: 'Karen Y.', action: 'commented on', target: 'Sport+ pricing uplift', time: '11:08' },
    ],
  },
]
