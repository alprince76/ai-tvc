import { useLocale } from '../../../i18n/LocaleContext'
import { ModuleSection } from '../../ui/ModuleSection'
import { AIRecommendations } from './AIRecommendations'
import { DemandForecast } from './DemandForecast'
import { OccupancyHeatmap } from './OccupancyHeatmap'
import { PricingDashboard } from './PricingDashboard'
import { RevenueSimulator } from './RevenueSimulator'

export function PricingModule() {
  const { t, tArray } = useLocale()
  return (
    <ModuleSection
      id="pricing"
      index="02 / 07"
      eyebrow={t('modules.pricing.eyebrow')}
      title={t('modules.pricing.title')}
      description={t('modules.pricing.description')}
      flowSteps={tArray('modules.pricing.flow')}
      tabs={[
        { id: 'dashboard', label: t('modules.pricing.tabs.dashboard'), render: () => <PricingDashboard /> },
        { id: 'forecast', label: t('modules.pricing.tabs.forecast'), render: () => <DemandForecast /> },
        { id: 'heatmap', label: t('modules.pricing.tabs.heatmap'), render: () => <OccupancyHeatmap /> },
        { id: 'recs', label: t('modules.pricing.tabs.recs'), render: () => <AIRecommendations /> },
        { id: 'sim', label: t('modules.pricing.tabs.sim'), render: () => <RevenueSimulator /> },
      ]}
    />
  )
}
