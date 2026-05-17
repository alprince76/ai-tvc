import { motion } from 'motion/react'
import { useLocale } from '../../i18n/LocaleContext'
import type { Locale } from '../../i18n/types'

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale()

  const segments: { value: Locale; label: string }[] = [
    { value: 'en', label: t('nav.langEn') },
    { value: 'id', label: t('nav.langId') },
  ]

  return (
    <div
      className="relative flex items-center rounded-full bg-slate-100/90 p-0.5 border border-slate-200/70"
      role="group"
      aria-label={`${t('nav.langEn')} / ${t('nav.langId')}`}
    >
      {segments.map((s) => {
        const active = locale === s.value
        return (
          <button
            key={s.value}
            type="button"
            onClick={() => setLocale(s.value)}
            className="relative z-10 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide min-w-[32px] transition-colors text-[#0a1b33]/70 hover:text-[#0a1b33]"
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId="nav-lang-pill"
                className="absolute inset-0 rounded-full bg-white shadow-[0_2px_8px_rgba(15,23,42,0.08)] border border-slate-200/60"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{s.label}</span>
          </button>
        )
      })}
    </div>
  )
}
