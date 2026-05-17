import type { HeatCell } from '../../components/ui/HeatmapGrid'

export const pricingKpis = [
  { label: 'Avg CPM', value: '$24.80', delta: 8.4, sparkline: [18, 19, 20, 22, 21, 23, 24, 25] },
  { label: 'Demand Index', value: '128', delta: 12.6, sparkline: [80, 90, 95, 100, 110, 120, 125, 128] },
  { label: 'Occupancy', value: '82.4%', delta: -2.1, sparkline: [88, 86, 85, 84, 83, 82, 82, 82] },
  { label: 'Revenue Lift', value: '$1.42M', delta: 14.8, sparkline: [110, 130, 150, 170, 190, 210, 240, 280] },
]

export const demandSeries = {
  baseline: [62, 68, 72, 70, 75, 80, 78, 82, 85, 88, 92, 90],
  bullish: [70, 78, 84, 88, 92, 98, 102, 108, 112, 118, 124, 128],
  bearish: [55, 58, 60, 58, 62, 64, 62, 68, 70, 72, 74, 72],
}
export const demandLabels = ['Jun 4', 'Jun 8', 'Jun 12', 'Jun 16', 'Jun 20', 'Jun 24', 'Jun 28', 'Jul 2', 'Jul 6', 'Jul 10', 'Jul 14', 'Jul 18']

const palette: HeatCell[] = ['sold', 'sold', 'active', 'open', 'risk']
const weights = [60, 22, 8, 8, 2]
const total = weights.reduce((a, b) => a + b, 0)
function pickCell(seed: number): HeatCell {
  const r = (seed * 9301 + 49297) % 233280
  const t = (r / 233280) * total
  let acc = 0
  for (let i = 0; i < weights.length; i++) {
    acc += weights[i]
    if (t < acc) return palette[i]
  }
  return 'open'
}

export const occupancyCells: HeatCell[] = Array.from({ length: 7 * 24 }, (_, i) => pickCell(i + 1))

export interface PricingRecommendation {
  id: string
  channel: string
  daypart: string
  action: 'raise' | 'discount' | 'hold'
  delta: string
  reason: string
  impact: string
}

export const recommendations: PricingRecommendation[] = [
  {
    id: 'r1',
    channel: 'Metro One',
    daypart: 'Prime 19–22h',
    action: 'raise',
    delta: '+8.5%',
    reason: 'Demand index spike, GRP outperforms forecast by 14%',
    impact: '+$22.4k weekly',
  },
  {
    id: 'r2',
    channel: 'News 24',
    daypart: 'Late Fringe 22–24h',
    action: 'discount',
    delta: '-5.0%',
    reason: 'Inventory burn-down lagging, sellout risk in 11 days',
    impact: '+$8.9k weekly · clears 18 slots',
  },
  {
    id: 'r3',
    channel: 'Sport+',
    daypart: 'Live events',
    action: 'raise',
    delta: '+12.0%',
    reason: 'Tournament window, top 3 advertisers competing',
    impact: '+$41.2k weekly',
  },
  {
    id: 'r4',
    channel: 'Lifestyle TV',
    daypart: 'Daytime 12–17h',
    action: 'hold',
    delta: '0.0%',
    reason: 'Pricing aligned with elasticity model, no signal',
    impact: 'Stable',
  },
]

export const channelLeaderboard = [
  { channel: 'Sport+', cpm: 34.2, delta: 14.6 },
  { channel: 'Metro One', cpm: 31.8, delta: 8.4 },
  { channel: 'News 24', cpm: 22.4, delta: -3.1 },
  { channel: 'Lifestyle TV', cpm: 19.6, delta: 2.2 },
  { channel: 'Kids HD', cpm: 17.1, delta: 5.6 },
]
