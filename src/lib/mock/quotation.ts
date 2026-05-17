import type { TString } from '../../i18n/types'

export interface Package {
  id: string
  name: string
  tagline: string
  fitScore: number
  channels: string[]
  spots: number
  reach: string
  revenue: number
  cpm: number
  recommended: boolean
}

export const packages: Package[] = [
  {
    id: 'pr',
    name: 'Prime Reach',
    tagline: 'Maximum mass-market exposure across flagship prime-time slots',
    fitScore: 94,
    channels: ['Metro One', 'Nusantara TV', 'Sport+'],
    spots: 18,
    reach: '12.4M',
    revenue: 340500,
    cpm: 28.4,
    recommended: true,
  },
  {
    id: 'sc',
    name: 'Smart Cluster',
    tagline: 'AI-clustered audience pockets across daypart-optimized slots',
    fitScore: 87,
    channels: ['Lifestyle TV', 'Kids HD', 'Sport+'],
    spots: 22,
    reach: '8.9M',
    revenue: 264800,
    cpm: 23.1,
    recommended: false,
  },
  {
    id: 'rf',
    name: 'Reach + Frequency',
    tagline: 'Balanced repetition strategy for consideration & recall',
    fitScore: 81,
    channels: ['Metro One', 'Lifestyle TV', 'News 24'],
    spots: 31,
    reach: '7.1M',
    revenue: 198600,
    cpm: 18.6,
    recommended: false,
  },
]

export const campaignBrief = {
  brand: 'Aurora Mobility',
  vertical: 'Automotive · EV',
  kpi: 'Awareness · Test-drive bookings',
  budget: 320000,
  flight: '04 Jun → 26 Jun 2026',
  market: 'Tier-1 metros',
  demo: 'A25-44, SEC AB',
}

export const aiRationale: TString[] = [
  {
    en: 'Highest GRP-to-cost ratio in EV vertical (last 90 days)',
    id: 'Rasio GRP terhadap biaya tertinggi di vertikal EV (90 hari terakhir)',
  },
  {
    en: 'Prime-time inventory exposure aligned with launch event',
    id: 'Eksposur inventori prime time selaras dengan event peluncuran',
  },
  {
    en: 'Cross-channel frequency cap auto-enforced',
    id: 'Batas frekuensi lintas kanal ditegakkan otomatis',
  },
  {
    en: 'Forecasted +18% incremental reach vs. baseline plan',
    id: 'Prakiraan +18% jangkauan inkremental vs. rencana dasar',
  },
]

export const revenueSeries = [120, 180, 240, 260, 310, 330, 360, 340, 380, 405]
export const weekLabels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10']

export interface DeliveryChannel {
  id: string
  name: TString
  description: TString
  status: 'ready' | 'sent' | 'pending'
}

export const deliveryChannels: DeliveryChannel[] = [
  {
    id: 'email',
    name: { en: 'Email · Branded HTML', id: 'Email · HTML bermerek' },
    description: { en: 'auto-personalized to advertiser', id: 'terpersonalisasi otomatis untuk pengiklan' },
    status: 'ready',
  },
  {
    id: 'portal',
    name: { en: 'Client Portal', id: 'Portal Klien' },
    description: { en: 'secure link, view-only', id: 'tautan aman, hanya lihat' },
    status: 'ready',
  },
  {
    id: 'pdf',
    name: { en: 'PDF Proposal', id: 'Proposal PDF' },
    description: { en: 'A4, signature-ready', id: 'A4, siap tanda tangan' },
    status: 'sent',
  },
  {
    id: 'docx',
    name: { en: 'Editable DOCX', id: 'DOCX dapat diedit' },
    description: { en: 'for legal markup', id: 'untuk markup legal' },
    status: 'pending',
  },
]
