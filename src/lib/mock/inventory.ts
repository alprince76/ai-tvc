import type { HeatCell } from '../../components/ui/HeatmapGrid'

const distribution: HeatCell[] = ['sold', 'sold', 'sold', 'active', 'open', 'risk']
const weights = [62, 18, 7, 8, 4, 1]
const total = weights.reduce((a, b) => a + b, 0)
function pick(seed: number): HeatCell {
  const r = (seed * 1103515245 + 12345) & 0x7fffffff
  const t = (r / 0x7fffffff) * total
  let acc = 0
  for (let i = 0; i < weights.length; i++) {
    acc += weights[i]
    if (t < acc) return distribution[i]
  }
  return 'open'
}

export const inventoryCells: HeatCell[] = Array.from({ length: 7 * 24 }, (_, i) => pick(i + 17))

export const inventoryKpis = [
  { label: 'Total Slots', value: '1,248', delta: 0, hint: 'this week' },
  { label: 'Sold', value: '74.2%', delta: 3.4, hint: '+92 vs. last' },
  { label: 'Available', value: '321', delta: -3.4, hint: 'across 5 channels' },
  { label: 'Revenue at Risk', riskUsdThousands: 84, delta: -8.1, hint: '14 slots, 9d window' },
]

export interface OpenSlot {
  id: string
  channel: string
  date: string
  daypart: string
  cpm: number
  projected: number
  fit: number
}

export const openSlots: OpenSlot[] = [
  { id: 's1', channel: 'Metro One', date: 'Jun 14', daypart: '20:15', cpm: 32, projected: 18500, fit: 94 },
  { id: 's2', channel: 'Sport+', date: 'Jun 15', daypart: '21:00', cpm: 36, projected: 24200, fit: 91 },
  { id: 's3', channel: 'News 24', date: 'Jun 16', daypart: '22:30', cpm: 24, projected: 9800, fit: 78 },
  { id: 's4', channel: 'Metro One', date: 'Jun 18', daypart: '19:45', cpm: 30, projected: 16400, fit: 88 },
  { id: 's5', channel: 'Lifestyle TV', date: 'Jun 19', daypart: '17:30', cpm: 22, projected: 7600, fit: 72 },
  { id: 's6', channel: 'Sport+', date: 'Jun 21', daypart: '20:30', cpm: 35, projected: 22100, fit: 90 },
]

export interface TimelineSegment {
  start: number
  end: number
  advertiser: string
  variant: 'navy' | 'cyan' | 'violet' | 'amber' | 'emerald'
  open?: boolean
}

const primeDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const primeTimeTimeline: { day: string; segments: TimelineSegment[] }[] = primeDays.map((day, i) => ({
  day,
  segments: [
    { start: 18, end: 19, advertiser: 'Aurora', variant: 'cyan' },
    { start: 19, end: 20.2, advertiser: 'BankX', variant: 'navy' },
    { start: 20.2, end: 21, advertiser: 'Perta', variant: 'amber' },
    { start: 21, end: 22, advertiser: i % 2 ? 'Open slot' : 'Nova', variant: i % 2 ? 'emerald' : 'violet', open: i % 2 === 1 },
    { start: 22, end: 23, advertiser: 'BankX', variant: 'navy' },
  ],
}))

export const availabilityForecast = {
  series: [98, 92, 84, 76, 68, 60, 52, 44, 38, 30, 22, 16],
  labels: ['Jun 4', 'Jun 8', 'Jun 12', 'Jun 16', 'Jun 20', 'Jun 24', 'Jun 28', 'Jul 2', 'Jul 6', 'Jul 10', 'Jul 14', 'Jul 18'],
  selloutDates: [
    { channel: 'Sport+', date: 'Jul 02', confidence: 92 },
    { channel: 'Metro One', date: 'Jul 09', confidence: 88 },
    { channel: 'News 24', date: 'Jul 14', confidence: 81 },
    { channel: 'Lifestyle TV', date: 'Jul 22', confidence: 76 },
  ],
}
