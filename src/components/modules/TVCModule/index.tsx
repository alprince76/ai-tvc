import { useLocale } from '../../../i18n/LocaleContext'
import { ModuleSection } from '../../ui/ModuleSection'
import { ApprovalBoard } from './ApprovalBoard'
import { AssetLibrary } from './AssetLibrary'
import { BroadcastReadiness } from './BroadcastReadiness'
import { UploadValidation } from './UploadValidation'
import { VersionTimeline } from './VersionTimeline'

export function TVCModule() {
  const { t, tArray } = useLocale()
  return (
    <ModuleSection
      id="tvc"
      index="03 / 07"
      eyebrow={t('modules.tvc.eyebrow')}
      title={t('modules.tvc.title')}
      description={t('modules.tvc.description')}
      flowSteps={tArray('modules.tvc.flow')}
      tabs={[
        { id: 'library', label: t('modules.tvc.tabs.library'), render: () => <AssetLibrary /> },
        { id: 'upload', label: t('modules.tvc.tabs.upload'), render: () => <UploadValidation /> },
        { id: 'timeline', label: t('modules.tvc.tabs.timeline'), render: () => <VersionTimeline /> },
        { id: 'board', label: t('modules.tvc.tabs.board'), render: () => <ApprovalBoard /> },
        { id: 'broadcast', label: t('modules.tvc.tabs.broadcast'), render: () => <BroadcastReadiness /> },
      ]}
    />
  )
}
