import { useLocale } from '../../../i18n/LocaleContext'
import { ModuleSection } from '../../ui/ModuleSection'
import { ApprovalQueue } from './ApprovalQueue'
import { CollaborationWorkspace } from './CollaborationWorkspace'
import { RevisionTimeline } from './RevisionTimeline'
import { StatusTracker } from './StatusTracker'
import { TeamActivity } from './TeamActivity'

export function ApprovalModule() {
  const { t, tArray } = useLocale()
  return (
    <ModuleSection
      id="approval"
      index="07 / 07"
      eyebrow={t('modules.approval.eyebrow')}
      title={t('modules.approval.title')}
      description={t('modules.approval.description')}
      flowSteps={tArray('modules.approval.flow')}
      tabs={[
        { id: 'queue', label: t('modules.approval.tabs.queue'), render: () => <ApprovalQueue /> },
        { id: 'collab', label: t('modules.approval.tabs.collab'), render: () => <CollaborationWorkspace /> },
        { id: 'revisions', label: t('modules.approval.tabs.revisions'), render: () => <RevisionTimeline /> },
        { id: 'team', label: t('modules.approval.tabs.team'), render: () => <TeamActivity /> },
        { id: 'tracker', label: t('modules.approval.tabs.tracker'), render: () => <StatusTracker /> },
      ]}
    />
  )
}
