import { Flex, Table, Button } from '../../../../components/atoms'
import { AnimatedPage } from '../../../../components/layout'
import { TitleWithDescription } from '../../../../components/molecules/titleWithDescription/TitleWithDescription'
import { ColumnsType } from '../../../../components/atoms/table/types'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { formatKRW } from '../../../../helpers/functions'

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
    customer: 32,
    date: '2025-02-15',
    price: 100000,
  },
  {
    key: '2',
    company: 'Jim Green',
    customer: 42,
    date: '2025-02-14',
    price: 10000,
  },
  {
    key: '3',
    company: 'Joe Black',
    customer: 32,
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
  {
    key: '6',
    company: 'John Brown',
    customer: 32,
    date: '2025-02-05',
    price: 100000,
  },
]

export const Home = () => {
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
            dataSource={data}
            pagination={{ position: ['bottomCenter'] }}
          />
        </div>
      </div>
    </AnimatedPage>
  )
}
