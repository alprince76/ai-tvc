import type { Status } from '../../components/ui/StatusBadge'
import type { TString } from '../../i18n/types'

export interface Asset {
  id: string
  codename: string
  brand: string
  duration: string
  format: string
  version: string
  status: Status
  ai: number
  thumbGradient: string
  owners: string[]
}

export const assets: Asset[] = [
  {
    id: 'a1',
    codename: 'AUR-EV-LAUNCH-30',
    brand: 'Aurora Mobility',
    duration: '0:30',
    format: '16:9 · 1080p',
    version: 'v3.2',
    status: 'approved',
    ai: 98,
    thumbGradient: 'from-cyan-400 via-indigo-500 to-violet-600',
    owners: ['Maya R', 'Jin Park'],
  },
  {
    id: 'a2',
    codename: 'NOVA-SS-RAMADAN-15',
    brand: 'Nova Skincare',
    duration: '0:15',
    format: '16:9 · 4K',
    version: 'v2.0',
    status: 'review',
    ai: 92,
    thumbGradient: 'from-rose-400 via-fuchsia-500 to-violet-500',
    owners: ['Lia S', 'Andre K', 'Maya R'],
  },
  {
    id: 'a3',
    codename: 'PERTA-FUEL-NEXT-45',
    brand: 'Perta Energy',
    duration: '0:45',
    format: '16:9 · 1080p',
    version: 'v1.4',
    status: 'broadcast',
    ai: 99,
    thumbGradient: 'from-amber-400 via-orange-500 to-rose-500',
    owners: ['Rio M'],
  },
  {
    id: 'a4',
    codename: 'BANKX-CARD-PLATINUM-30',
    brand: 'BankX',
    duration: '0:30',
    format: '16:9 · 1080p',
    version: 'v4.1',
    status: 'pending',
    ai: 86,
    thumbGradient: 'from-slate-700 via-indigo-700 to-cyan-500',
    owners: ['Aldi N', 'Lia S'],
  },
  {
    id: 'a5',
    codename: 'GREEN-EARTH-SUMMER-20',
    brand: 'GreenEarth',
    duration: '0:20',
    format: '16:9 · 4K',
    version: 'v1.0',
    status: 'draft',
    ai: 74,
    thumbGradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    owners: ['Maya R'],
  },
  {
    id: 'a6',
    codename: 'CITYBANK-MORTGAGE-30',
    brand: 'CityBank',
    duration: '0:30',
    format: '16:9 · 1080p',
    version: 'v2.3',
    status: 'rejected',
    ai: 58,
    thumbGradient: 'from-slate-500 via-zinc-600 to-slate-800',
    owners: ['Andre K'],
  },
]

export interface ValidationCheck {
  label: TString
  detail: TString
  pass: boolean
}

export const validationChecks: ValidationCheck[] = [
  {
    label: { en: 'Resolution & frame rate', id: 'Resolusi & frame rate' },
    detail: { en: '3840×2160 · 25fps', id: '3840×2160 · 25fps' },
    pass: true,
  },
  {
    label: { en: 'Audio loudness (EBU R128)', id: 'Kerasan audio (EBU R128)' },
    detail: {
      en: '-23 LUFS · within tolerance',
      id: '-23 LUFS · dalam toleransi',
    },
    pass: true,
  },
  {
    label: { en: 'Broadcast-safe colour', id: 'Warna aman siaran' },
    detail: { en: 'Rec.709 · legal range', id: 'Rec.709 · rentang legal' },
    pass: true,
  },
  {
    label: { en: 'Caption track present', id: 'Trek teks hadir' },
    detail: {
      en: 'EN-ID burn-in detected',
      id: 'Burn-in EN-ID terdeteksi',
    },
    pass: true,
  },
  {
    label: { en: 'Brand safety lexicon', id: 'Leksikon keselamatan merek' },
    detail: { en: '0 flagged terms', id: '0 istilah ditandai' },
    pass: true,
  },
  {
    label: { en: 'Slate / bars / tone', id: 'Slate / bar / nada' },
    detail: {
      en: 'Missing 2s bars + tone at head',
      id: 'Kurang bar & nada 2 dtk di kepala',
    },
    pass: false,
  },
]

export interface VersionNode {
  tag: string
  date: string
  actor: string
  note: string
  status: Status
}

export const versionTimeline: VersionNode[] = [
  { tag: 'v3.2', date: 'May 16', actor: 'Maya R', note: 'Approved by broadcasting', status: 'approved' },
  { tag: 'v3.1', date: 'May 14', actor: 'Andre K', note: 'Caption corrections, end-card swap', status: 'broadcast' },
  { tag: 'v3.0', date: 'May 11', actor: 'AI Validator', note: 'Auto-trimmed silence at 0:27', status: 'review' },
  { tag: 'v2.4', date: 'May 09', actor: 'Lia S', note: 'Brand logo timing adjustment', status: 'draft' },
  { tag: 'v2.3', date: 'May 06', actor: 'Maya R', note: 'Initial cut for review', status: 'draft' },
]

export interface BoardCard {
  id: string
  title: string
  brand: string
  version: string
  owners: string[]
}

export const board: Record<string, BoardCard[]> = {
  Draft: [
    { id: 'b1', title: 'GreenEarth Summer', brand: 'GreenEarth', version: 'v1.0', owners: ['Maya R'] },
    { id: 'b2', title: 'Vitabar Energy', brand: 'Vitabar', version: 'v0.3', owners: ['Jin Park', 'Andre K'] },
  ],
  'In Review': [
    { id: 'b3', title: 'Nova Skincare', brand: 'Nova', version: 'v2.0', owners: ['Lia S', 'Andre K', 'Maya R'] },
    { id: 'b4', title: 'BankX Platinum', brand: 'BankX', version: 'v4.1', owners: ['Aldi N'] },
  ],
  Approved: [
    { id: 'b5', title: 'Aurora EV Launch', brand: 'Aurora', version: 'v3.2', owners: ['Maya R', 'Jin Park'] },
  ],
  'Broadcast Ready': [
    { id: 'b6', title: 'Perta Fuel Next', brand: 'Perta', version: 'v1.4', owners: ['Rio M'] },
  ],
}

export const broadcastReadiness = [
  { channel: 'Metro One', light: 'green', time: '19:30 · 21:00 · 22:15', spots: 3 },
  { channel: 'Sport+', light: 'green', time: '20:00 · 21:45', spots: 2 },
  { channel: 'Lifestyle TV', light: 'amber', time: '17:30 · 21:15', spots: 2 },
  { channel: 'News 24', light: 'green', time: '06:00 · 19:00 · 22:00', spots: 3 },
  { channel: 'Kids HD', light: 'red', time: 'No slot — pending traffic', spots: 0 },
] as const
