import { Title, Button, Flex } from '../../components/atoms'
import { TitleWithDescription } from '../../components/molecules'
import { AnimatedPage } from '../../components/layout'
import { Receipt, Plus } from 'lucide-react'

export const Invoices = () => {
  return (
    <AnimatedPage>
      <div className="w-full space-y-6">
        <Flex align="center" justify="space-between">
          <TitleWithDescription
            title="Facturación"
            description="Administra las facturas electrónicas y comprobantes de pago"
          />
          <Button
            type="primary"
            icon={<Plus className="w-4 h-4" />}
            text="Nueva Factura"
            disabled
          />
        </Flex>

        <div className="w-full min-h-[360px] rounded-2xl border border-dashed border-border bg-card/50 flex flex-col items-center justify-center p-8 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Receipt className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm">
            <Title level={4} text="Módulo de facturación en preparación" />
            <p className="text-xs text-muted-foreground">
              Pronto podrás emitir y timbrar facturas directamente asociadas a tus cotizaciones aprobadas.
            </p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}
