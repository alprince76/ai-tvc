import { useLocale } from '../../../i18n/LocaleContext'
import { ModuleSection } from '../../ui/ModuleSection'
import { ActivityFeed } from './ActivityFeed'
import { AIWorkspace } from './AIWorkspace'
import { AutomationConsole } from './AutomationConsole'
import { PromptPanel } from './PromptPanel'
import { WorkflowSuggestions } from './WorkflowSuggestions'

export function CommandCenterModule() {
  const { t, tArray } = useLocale()
  return (
    <ModuleSection
      id="command-center"
      index="05 / 07"
      eyebrow={t('modules.commandCenter.eyebrow')}
      title={t('modules.commandCenter.title')}
      description={t('modules.commandCenter.description')}
      flowSteps={tArray('modules.commandCenter.flow')}
      tabs={[
        { id: 'workspace', label: t('modules.commandCenter.tabs.workspace'), render: () => <AIWorkspace /> },
        { id: 'prompt', label: t('modules.commandCenter.tabs.prompt'), render: () => <PromptPanel /> },
        { id: 'suggest', label: t('modules.commandCenter.tabs.suggest'), render: () => <WorkflowSuggestions /> },
        { id: 'feed', label: t('modules.commandCenter.tabs.feed'), render: () => <ActivityFeed /> },
        { id: 'auto', label: t('modules.commandCenter.tabs.auto'), render: () => <AutomationConsole /> },
      ]}
    />
  )
}
