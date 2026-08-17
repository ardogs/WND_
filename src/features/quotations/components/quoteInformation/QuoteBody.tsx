import { QuoteItemList } from './QuoteItemList'
import { GeneralInformation } from './GeneralInformation'
import { QuotePricing } from './QuotePricing'

export const QuoteBody = () => {
  return (
    <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8 space-y-6">
      <GeneralInformation />
      <QuoteItemList />
      <QuotePricing />
    </div>
  )
}
