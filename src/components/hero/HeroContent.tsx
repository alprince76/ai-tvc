import { motion } from 'motion/react'
import { ArrowUpRight, Play } from 'lucide-react'
import { EnterpriseButton } from '../ui/EnterpriseButton'
import { useLocale } from '../../i18n/LocaleContext'

const easing = [0.22, 1, 0.36, 1] as const

export function HeroContent() {
  const { t } = useLocale()
  return (
    <div className="relative z-20 flex-1 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easing }}
        className="flex flex-col items-start"
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: easing }}
          className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-xl px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#0a1b33]/80 border border-white/60 shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          {t('hero.liveBadge')}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: easing }}
          className="font-display text-[42px] md:text-[56px] font-medium leading-[1.05] tracking-tight text-[#0a1b33] mt-5"
        >
          {t('hero.headline1')}
          <br />
          {t('hero.headline2')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: easing }}
          className="font-sans text-[14px] md:text-[15px] leading-[1.65] text-[#64748b] max-w-[560px] mt-5"
        >
          {t('hero.sub')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: easing }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <EnterpriseButton variant="primary" icon={<ArrowUpRight size={15} strokeWidth={2.25} />}>
            {t('hero.ctaPrimary')}
          </EnterpriseButton>
          <EnterpriseButton variant="secondary" icon={<Play size={13} strokeWidth={2.25} className="fill-current" />} iconPosition="left">
            {t('hero.ctaSecondary')}
          </EnterpriseButton>
        </motion.div>
      </motion.div>
    </div>
  )
}
