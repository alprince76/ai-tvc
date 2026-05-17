import { useLocale } from '../../../i18n/LocaleContext'
import { ModuleSection } from '../../ui/ModuleSection'
import { AIInsights } from './AIInsights'
import { AudienceReport } from './AudienceReport'
import { CampaignDashboard } from './CampaignDashboard'
import { ExecutiveSummary } from './ExecutiveSummary'
import { RevenueTrends } from './RevenueTrends'

export function AnalyticsModule() {
  const { t, tArray } = useLocale()
  return (
    <ModuleSection
      id="analytics"
      index="06 / 07"
      eyebrow={t('modules.analytics.eyebrow')}
      title={t('modules.analytics.title')}
      description={t('modules.analytics.description')}
      flowSteps={tArray('modules.analytics.flow')}
      tabs={[
        { id: 'dash', label: t('modules.analytics.tabs.dash'), render: () => <CampaignDashboard /> },
        { id: 'audience', label: t('modules.analytics.tabs.audience'), render: () => <AudienceReport /> },
        { id: 'revenue', label: t('modules.analytics.tabs.revenue'), render: () => <RevenueTrends /> },
        { id: 'insights', label: t('modules.analytics.tabs.insights'), render: () => <AIInsights /> },
        { id: 'exec', label: t('modules.analytics.tabs.exec'), render: () => <ExecutiveSummary /> },
      ]}
    />
  )
}
