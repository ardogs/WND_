import { ColumnsType } from '@/components/atoms/table/types'
import { Flex } from '@/components/atoms'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { formatKRW } from '@/helpers/functions'

export interface QuotationTableItem {
  key: string
  company: string
  customer: string | number
  date: string
  price: number
}

export const getQuotationTableColumns = (
  onView?: (item: QuotationTableItem) => void,
  onEdit?: (item: QuotationTableItem) => void,
  onDelete?: (item: QuotationTableItem) => void
): ColumnsType<QuotationTableItem> => [
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
    render: (val: number) => (
      <span className="font-semibold text-primary">{formatKRW(val)}</span>
    ),
  },
  {
    title: 'Acciones',
    key: 'action',
    align: 'center',
    render: (_: unknown, record: QuotationTableItem) => (
      <Flex gap={12} justify="center">
        <AiOutlineEye
          className="cursor-pointer text-muted-foreground hover:text-primary transition-colors text-base"
          title="Ver"
          onClick={() => onView?.(record)}
        />
        <AiOutlineEdit
          className="cursor-pointer text-muted-foreground hover:text-primary transition-colors text-base"
          title="Editar"
          onClick={() => onEdit?.(record)}
        />
        <AiOutlineDelete
          className="cursor-pointer text-muted-foreground hover:text-destructive transition-colors text-base"
          title="Eliminar"
          onClick={() => onDelete?.(record)}
        />
      </Flex>
    ),
  },
]

export const MOCK_QUOTATIONS: QuotationTableItem[] = [
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
