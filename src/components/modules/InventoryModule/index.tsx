import { useLocale } from '../../../i18n/LocaleContext'
import { ModuleSection } from '../../ui/ModuleSection'
import { AvailabilityForecast } from './AvailabilityForecast'
import { InventoryDashboard } from './InventoryDashboard'
import { PrimeTimeTimeline } from './PrimeTimeTimeline'
import { RevenueOpportunity } from './RevenueOpportunity'
import { SchedulingWorkspace } from './SchedulingWorkspace'

export function InventoryModule() {
  const { t, tArray } = useLocale()
  return (
    <ModuleSection
      id="inventory"
      index="04 / 07"
      eyebrow={t('modules.inventory.eyebrow')}
      title={t('modules.inventory.title')}
      description={t('modules.inventory.description')}
      flowSteps={tArray('modules.inventory.flow')}
      tabs={[
        { id: 'dashboard', label: t('modules.inventory.tabs.dashboard'), render: () => <InventoryDashboard /> },
        { id: 'prime', label: t('modules.inventory.tabs.prime'), render: () => <PrimeTimeTimeline /> },
        { id: 'sched', label: t('modules.inventory.tabs.sched'), render: () => <SchedulingWorkspace /> },
        { id: 'forecast', label: t('modules.inventory.tabs.forecast'), render: () => <AvailabilityForecast /> },
        { id: 'opp', label: t('modules.inventory.tabs.opp'), render: () => <RevenueOpportunity /> },
      ]}
    />
  )
}
