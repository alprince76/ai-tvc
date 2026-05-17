import type { TString } from '../../i18n/types'

export const campaignKpis = [
  { label: 'Reach', value: '38.4M', unit: 'viewers', delta: 6.2, sparkline: [22, 26, 28, 30, 32, 34, 36, 38] },
  { label: 'GRP', value: '2,148', delta: 4.1, sparkline: [1600, 1700, 1800, 1900, 2000, 2050, 2100, 2148] },
  { label: 'CPM', cpmUsd: 22.4, delta: -3.4, sparkline: [26, 25, 24, 24, 23, 23, 22, 22] },
  { label: 'ROI', value: '4.6x', delta: 12.8, sparkline: [3.2, 3.4, 3.8, 4.0, 4.2, 4.3, 4.5, 4.6] },
]

export const revenueAreaSeries = {
  revenue: [120, 160, 180, 210, 240, 270, 305, 330, 360, 395, 420, 445],
  spend: [80, 100, 115, 125, 140, 158, 170, 184, 196, 210, 222, 235],
  labels: ['W01', 'W02', 'W03', 'W04', 'W05', 'W06', 'W07', 'W08', 'W09', 'W10', 'W11', 'W12'],
}

export const topCampaigns = [
  { name: 'Aurora · EV Launch', spend: 340, roi: 5.4 },
  { name: 'Perta · Fuel Next', spend: 280, roi: 4.8 },
  { name: 'BankX · Platinum', spend: 240, roi: 4.2 },
  { name: 'Nova · Ramadan', spend: 195, roi: 3.9 },
  { name: 'GreenEarth · Summer', spend: 120, roi: 3.1 },
]

export const audienceMix = [
  { label: 'A25-34', pct: 32, color: '#22d3ee' },
  { label: 'A35-44', pct: 28, color: '#6366f1' },
  { label: 'A45-54', pct: 18, color: '#8b5cf6' },
  { label: 'A18-24', pct: 12, color: '#ec4899' },
  { label: '55+', pct: 10, color: '#f59e0b' },
]

export const audienceGeo = [
  { region: 'Jakarta', reach: 9.8, share: 26 },
  { region: 'Surabaya', reach: 4.6, share: 12 },
  { region: 'Bandung', reach: 3.8, share: 10 },
  { region: 'Medan', reach: 3.2, share: 8 },
  { region: 'Makassar', reach: 2.4, share: 6 },
]

export const revenueByChannel = [180, 220, 145, 95, 60, 40]
export const revenueByChannelLabels = ['Sport+', 'Metro', 'News', 'Lifestyle', 'Kids', 'Other']

export const revenueByDaypart = [40, 65, 90, 145, 210, 165, 80]
export const revenueByDaypartLabels = ['06', '10', '14', '18', '20', '22', '24']

export interface Insight {
  id: string
  kind: 'anomaly' | 'opportunity' | 'risk'
  title: string
  detail: string
  /** Plain recommended action when actionTemplate is omitted */
  action?: string
  actionTemplate?: TString
  actionAmountUsdThousands?: number
  confidence: number
}

export const insights: Insight[] = [
  {
    id: 'i1',
    kind: 'opportunity',
    title: 'Sport+ over-indexes A25-34 by +28%',
    detail: 'Live tournament window correlates with brand-uplift study peaks',
    actionTemplate: {
      en: 'Shift +{amount} budget from Lifestyle to Sport+ live',
      id: 'Alihkan anggaran +{amount} dari Lifestyle ke Sport+ live',
    },
    actionAmountUsdThousands: 45,
    confidence: 94,
  },
  {
    id: 'i2',
    kind: 'anomaly',
    title: 'BankX Platinum CPM drifted +14%',
    detail: 'Creative fatigue after 4-week flight, recall declining',
    action: 'Rotate to v4.2 creative; refresh recall test',
    confidence: 88,
  },
  {
    id: 'i3',
    kind: 'risk',
    title: 'Aurora reach plateau forecast Jul 02',
    detail: 'Frequency cap reached on Metro One prime',
    action: 'Diversify to News 24 22:00 + Sport+ late-fringe',
    confidence: 91,
  },
]
