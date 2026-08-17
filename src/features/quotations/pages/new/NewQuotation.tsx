import { TitleWithDescription } from '../../../../components/molecules'
import { AnimatedPage } from '../../../../components/layout'
import { QuoteForm } from '../../components/quoteForm/QuoteForm'
import './styles.scss'

export const NewQuotation = () => {
  return (
    <AnimatedPage>
      <div className="newQuotation-content w-full flex-1 flex flex-col min-h-0 space-y-4">
        <div className="flex-shrink-0">
          <TitleWithDescription
            title="Nueva Cotización"
            description="Completa los datos del proveedor y detalles para generar tu cotización"
          />
        </div>
        <QuoteForm />
      </div>
    </AnimatedPage>
  )
}

