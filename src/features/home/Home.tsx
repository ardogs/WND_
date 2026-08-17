import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Title, Divider } from '../../components/atoms'
import { TitleWithDescription } from '../../components/molecules'
import { LinkCard } from './components/linkCard/LinkCard'
import { AnimatedPage } from '../../components/layout'
import { getQuotationTableColumns, MOCK_QUOTATIONS } from '@/features/quotations/data/mockQuotations'

export const Home = () => {
  const { t } = useTranslation('home')
  const columns = useMemo(() => getQuotationTableColumns(), [])

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <Title level={1} text={t('title')} />

        <div>
          <TitleWithDescription
            title="¡Bienvenido!"
            description="Por favor, selecciona una opción para iniciar"
            level={3}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
            <LinkCard linkTo="quotations" title="Cotizaciones" />
            <LinkCard linkTo="invoices" title="Facturación" />
            <LinkCard linkTo="companies" title="Mis empresas" />
          </div>

          <Divider />

          <div className="pt-2">
            <TitleWithDescription
              title="Últimos documentos creados"
              description="Selecciona un documento para editarlo o eliminarlo"
              level={3}
            />
            <div className="mt-4">
              <Table
                columns={columns}
                dataSource={MOCK_QUOTATIONS}
                pagination={{ position: ['bottomCenter'] }}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}
