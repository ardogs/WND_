import { ColumnsType } from '@/components/atoms/table/types'
import { Flex } from '@/components/atoms'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { RiFileExcel2Line } from 'react-icons/ri'
import { formatKRW, formatDateToISO } from '@/helpers/functions'

export interface QuotationTableItem {
  key: string
  id?: string
  company: string
  registration_number?: string
  customer: string | number
  concept?: string
  date: string
  price: number
}

export const getQuotationTableColumns = (
  onDownload?: (item: QuotationTableItem) => void,
  onView?: (item: QuotationTableItem) => void,
  onDelete?: (item: QuotationTableItem) => void
): ColumnsType<QuotationTableItem> => [
  {
    title: 'Empresa',
    dataIndex: 'company',
    key: 'company',
    render: (val: string, record: QuotationTableItem) => (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{val}</span>
        {record.registration_number && (
          <span className="text-[11px] text-muted-foreground">{record.registration_number}</span>
        )}
      </div>
    ),
  },
  {
    title: 'Cliente',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Concepto',
    dataIndex: 'concept',
    key: 'concept',
    render: (val?: string) => val || '-',
  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
    render: (val: string) => formatDateToISO(val) || val,
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
        <RiFileExcel2Line
          className="cursor-pointer text-emerald-600 dark:text-emerald-400 hover:scale-110 transition-transform text-lg"
          title="Descargar Excel"
          onClick={() => onDownload?.(record)}
        />
        <AiOutlineEye
          className="cursor-pointer text-muted-foreground hover:text-primary transition-colors text-lg"
          title="Ver Resumen"
          onClick={() => onView?.(record)}
        />
        <AiOutlineDelete
          className="cursor-pointer text-muted-foreground hover:text-destructive transition-colors text-lg"
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
    id: '1',
    company: 'John Brown',
    customer: 32,
    date: '2025-02-15',
    price: 100000,
  },
  {
    key: '2',
    id: '2',
    company: 'Jim Green',
    customer: 42,
    date: '2025-02-14',
    price: 10000,
  },
  {
    key: '3',
    id: '3',
    company: 'Joe Black',
    customer: 32,
    date: '2025-02-12',
    price: 100000,
  },
  {
    key: '4',
    id: '4',
    company: 'WND Doors Co.',
    customer: 'Samsung C&T',
    date: '2025-02-10',
    price: 250000,
  },
  {
    key: '5',
    id: '5',
    company: 'Hyundai Steel',
    customer: 'POSCO E&C',
    date: '2025-02-08',
    price: 450000,
  },
  {
    key: '6',
    id: '6',
    company: 'John Brown',
    customer: 32,
    date: '2025-02-05',
    price: 100000,
  },
]
