import { useMemo } from 'react'
import { Flex, Table, Button } from '../../../../components/atoms'
import { AnimatedPage } from '../../../../components/layout'
import { TitleWithDescription } from '@/components/molecules'
import { Link } from 'react-router-dom'
import { getQuotationTableColumns, MOCK_QUOTATIONS } from '@/features/quotations/data/mockQuotations'

export const Home = () => {
  const columns = useMemo(() => getQuotationTableColumns(), [])

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <Flex align="center" justify="space-between">
          <TitleWithDescription
            title="Cotizaciones"
            description="Gestiona y consulta el historial de cotizaciones emitidas"
          />
          <Link to="new">
            <Button size="middle" type="primary" text="Nueva Cotización" />
          </Link>
        </Flex>

        <div className="mt-4">
          <Table
            columns={columns}
            dataSource={MOCK_QUOTATIONS}
            pagination={{ position: ['bottomCenter'] }}
          />
        </div>
      </div>
    </AnimatedPage>
  )
}
