import { AnalyticsModule } from './AnalyticsModule'
import { ApprovalModule } from './ApprovalModule'
import { CommandCenterModule } from './CommandCenterModule'
import { InventoryModule } from './InventoryModule'
import { PricingModule } from './PricingModule'
import { QuotationModule } from './QuotationModule'
import { TVCModule } from './TVCModule'

export function Modules() {
  return (
    <div className="flex flex-col gap-20 md:gap-28">
      <QuotationModule />
      <PricingModule />
      <TVCModule />
      <InventoryModule />
      <CommandCenterModule />
      <AnalyticsModule />
      <ApprovalModule />
    </div>
  )
}
