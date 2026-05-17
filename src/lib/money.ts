import type { Locale } from '../i18n/types'

/** Demo FX rate USD → IDR; adjust for stakeholder presentations */
export const USD_TO_IDR = 16500

export type MoneyFormatStyle = 'standard' | 'compact'

export interface FormatMoneyOptions {
  /** Value is in thousands of USD (e.g. 320 for \"$320k\") */
  thousands?: boolean
  /** Value is millions of USD (e.g. 1.42 for \"$1.42M\") */
  millions?: boolean
  style?: MoneyFormatStyle
  maxFractionDigits?: number
  minFractionDigits?: number
  /** CPM stored as USD per mille → show IDR per mille when locale id */
  perMille?: boolean
}

export function usdToIdr(usd: number): number {
  return usd * USD_TO_IDR
}

function formatEnUsd(amountUsd: number, opts: FormatMoneyOptions): string {
  const { thousands = false, millions = false, style = 'standard', maxFractionDigits, minFractionDigits } = opts
  let v = amountUsd
  if (thousands) v *= 1000
  if (millions) v *= 1e6

  if (style === 'compact') {
    const abs = Math.abs(v)
    if (abs >= 1e6) {
      return `$${(v / 1e6).toFixed(abs >= 10e6 ? 1 : 2)}M`
    }
    if (abs >= 1000) {
      return `$${(v / 1000).toFixed(abs >= 100e3 ? 0 : 1)}k`
    }
    return `$${v.toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`
  }

  const fd = maxFractionDigits ?? (Number.isInteger(v) ? 0 : 2)
  const md = minFractionDigits ?? fd
  return `$${v.toLocaleString('en-US', {
    minimumFractionDigits: md,
    maximumFractionDigits: fd,
  })}`
}

function formatIdIdr(usdRaw: number, opts: FormatMoneyOptions): string {
  const { thousands = false, millions = false, style = 'standard', maxFractionDigits, minFractionDigits, perMille } =
    opts

  if (perMille) {
    const idrPerMille = usdRaw * USD_TO_IDR
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      notation: style === 'compact' ? 'compact' : 'standard',
      maximumFractionDigits: maxFractionDigits ?? 0,
      minimumFractionDigits: minFractionDigits ?? 0,
    }).format(idrPerMille)
  }

  let v = usdRaw
  if (thousands) v *= 1000
  if (millions) v *= 1e6
  const idr = usdToIdr(v)

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    notation: style === 'compact' ? 'compact' : 'standard',
    maximumFractionDigits: maxFractionDigits ?? (style === 'compact' ? 1 : Number.isInteger(idr) ? 0 : 0),
    minimumFractionDigits: minFractionDigits ?? 0,
  }).format(idr)
}

export function formatMoney(locale: Locale, amountUsd: number, options: FormatMoneyOptions = {}): string {
  if (locale === 'en') return formatEnUsd(amountUsd, options)
  return formatIdIdr(amountUsd, options)
}
