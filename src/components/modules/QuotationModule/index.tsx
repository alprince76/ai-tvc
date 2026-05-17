import { useLocale } from '../../../i18n/LocaleContext'
import { ModuleSection } from '../../ui/ModuleSection'
import { CampaignInput } from './CampaignInput'
import { ExportDelivery } from './ExportDelivery'
import { PackageRecommendation } from './PackageRecommendation'
import { PricingSimulation } from './PricingSimulation'
import { QuotePreview } from './QuotePreview'

export function QuotationModule() {
  const { t, tArray } = useLocale()
  return (
    <ModuleSection
      id="quotation"
      index="01 / 07"
      eyebrow={t('modules.quotation.eyebrow')}
      title={t('modules.quotation.title')}
      description={t('modules.quotation.description')}
      flowSteps={tArray('modules.quotation.flow')}
      tabs={[
        { id: 'recommend', label: t('modules.quotation.tabs.recommend'), render: () => <PackageRecommendation /> },
        { id: 'input', label: t('modules.quotation.tabs.input'), render: () => <CampaignInput /> },
        { id: 'pricing', label: t('modules.quotation.tabs.pricing'), render: () => <PricingSimulation /> },
        { id: 'preview', label: t('modules.quotation.tabs.preview'), render: () => <QuotePreview /> },
        { id: 'export', label: t('modules.quotation.tabs.export'), render: () => <ExportDelivery /> },
      ]}
    />
  )
}
