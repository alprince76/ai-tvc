import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Locale, TString } from './types'
import { formatMoney, type FormatMoneyOptions } from '../lib/money'
import { en } from './en'
import { id } from './id'
import { isTString } from './types'

const STORAGE_KEY = 'ai-tvc-locale'

const dictionaries: Record<Locale, typeof en> = { en, id: id as unknown as typeof en }

function getPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc === null || acc === undefined || typeof acc !== 'object') return undefined
    return (acc as Record<string, unknown>)[part]
  }, obj)
}

interface LocaleContextValue {
  locale: Locale
  setLocale: (next: Locale) => void
  t: (path: string, fallback?: string) => string
  tArray: (path: string) => string[]
  tr: (v: string | TString) => string
  /** Monetary amounts modeled in USD → display USD (en) or IDR (id) via demo FX */
  formatUsd: (amountUsd: number, options?: FormatMoneyOptions) => string
  formatCpmUsd: (cpmUsd: number, options?: Omit<FormatMoneyOptions, 'perMille'>) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'id') return saved
  } catch {
    /* ignore */
  }
  return 'id'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window !== 'undefined' ? readInitialLocale() : 'id',
  )

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = next === 'id' ? 'id' : 'en'
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === 'id' ? 'id' : 'en'
  }, [locale])

  const dict = dictionaries[locale]

  const t = useCallback(
    (path: string, fallback?: string) => {
      const v = getPath(dict, path)
      if (typeof v === 'string') return v
      if (locale !== 'en') {
        const vEn = getPath(dictionaries.en, path)
        if (typeof vEn === 'string') return vEn
      }
      if (fallback !== undefined) return fallback
      return path
    },
    [dict, locale],
  )

  const tArray = useCallback(
    (path: string) => {
      const v = getPath(dict, path)
      if (Array.isArray(v) && v.every((x) => typeof x === 'string')) return v as string[]
      if (locale !== 'en') {
        const vEn = getPath(dictionaries.en, path)
        if (Array.isArray(vEn) && vEn.every((x) => typeof x === 'string')) return vEn as string[]
      }
      return []
    },
    [dict, locale],
  )

  const tr = useCallback(
    (v: string | TString): string => {
      if (isTString(v)) return v[locale]
      return v
    },
    [locale],
  )

  const formatUsd = useCallback(
    (amountUsd: number, options?: FormatMoneyOptions) => formatMoney(locale, amountUsd, options ?? {}),
    [locale],
  )

  const formatCpmUsd = useCallback(
    (cpmUsd: number, options?: Omit<FormatMoneyOptions, 'perMille'>) =>
      formatMoney(locale, cpmUsd, { ...options, perMille: true }),
    [locale],
  )

  const value = useMemo(
    () => ({ locale, setLocale, t, tArray, tr, formatUsd, formatCpmUsd }),
    [locale, setLocale, t, tArray, tr, formatUsd, formatCpmUsd],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

// Hooks colocated with provider for ergonomics — fast-refresh caveat is acceptable here.
// eslint-disable-next-line react-refresh/only-export-components
export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
