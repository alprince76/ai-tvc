import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { LanguageToggle } from '../ui/LanguageToggle'
import { useLocale } from '../../i18n/LocaleContext'

export function NavPill() {
  const { t } = useLocale()
  const links = [
    { href: '#inventory', label: t('nav.inventory') },
    { href: '#pricing', label: t('nav.pricingAi') },
    { href: '#tvc', label: t('nav.tvcAssets') },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
    >
      <div className="flex items-center bg-white/90 backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/40">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-white/90 to-slate-100/80 border border-slate-200/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8),0_0_18px_rgba(99,102,241,0.18)] text-[#0a1b33]">
          <span className="text-[15px] leading-none bg-gradient-to-br from-cyan-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
            ✦
          </span>
        </div>

        <ul className="flex items-center px-3 gap-1">
          {links.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                className="px-3 py-1.5 rounded-full text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33] hover:bg-slate-100/70 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <LanguageToggle />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="bg-white px-5 py-2 rounded-full text-[12px] font-semibold text-[#0a1b33] border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all inline-flex items-center gap-1"
        >
          {t('nav.generateQuote')}
          <ChevronRight size={13} strokeWidth={2.5} />
        </motion.button>
      </div>
    </motion.nav>
  )
}
