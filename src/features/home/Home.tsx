import { useTranslation } from 'react-i18next'
import { Flex, Table, Title, Divider } from '../../components/atoms'
import { TitleWithDescription } from '../../components/molecules'
import { LinkCard } from './components/linkCard/LinkCard'
import { AnimatedPage } from '../../components/layout'
import { ColumnsType } from '../../components/atoms/table/types'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { formatKRW } from '../../helpers/functions'

interface DataType {
  key: string
  company: string
  customer: number | string
  date: string
  price: number
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Empresa',
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: 'Cliente',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Precio Total',
    key: 'price',
    dataIndex: 'price',
    render: (val: number) => <span className="font-semibold text-primary">{formatKRW(val)}</span>,
  },
  {
    title: 'Acciones',
    key: 'action',
    align: 'center',
    render: () => (
      <Flex gap={12} justify="center">
        <AiOutlineEye className="cursor-pointer text-muted-foreground hover:text-primary transition-colors text-base" title="Ver" />
        <AiOutlineEdit className="cursor-pointer text-muted-foreground hover:text-primary transition-colors text-base" title="Editar" />
        <AiOutlineDelete className="cursor-pointer text-muted-foreground hover:text-destructive transition-colors text-base" title="Eliminar" />
      </Flex>
    ),
  },
]

const data: DataType[] = [
  {
    key: '1',
    company: 'John Brown',
    customer: '32',
    date: '2025-02-15',
    price: 100000,
  },
  {
    key: '2',
    company: 'Jim Green',
    customer: '42',
    date: '2025-02-14',
    price: 10000,
  },
  {
    key: '3',
    company: 'Joe Black',
    customer: '32',
    date: '2025-02-12',
    price: 100000,
  },
  {
    key: '4',
    company: 'WND Doors Co.',
    customer: 'Samsung C&T',
    date: '2025-02-10',
    price: 250000,
  },
  {
    key: '5',
    company: 'Hyundai Steel',
    customer: 'POSCO E&C',
    date: '2025-02-08',
    price: 450000,
  },
]

export const Home = () => {
  const { t } = useTranslation('home')

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
                dataSource={data}
                pagination={{ position: ['bottomCenter'] }}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}
