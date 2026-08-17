import { useMemo } from 'react'
import dayjs from 'dayjs'
import { Title, Col, Row, Form, Table, Descriptions } from '../../../../components/atoms'
import { QuotationFormType, QuotationItem } from '../quoteForm/QuoteForm.data'
import { ColumnsType, AnyObject } from '../../../../components/atoms/table/types'
import { formatKRW } from '../../../../helpers/functions'
import './styles.scss'

const numberFormat = (value: string) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const QuoteInformationReview = () => {
  const form = Form.useFormInstance()
  const data = form.getFieldsValue(true) as QuotationFormType

  const columns_table1: ColumnsType<AnyObject> = [
    { title: 'Descripción', dataIndex: 'description', key: 'description', align: 'left' },
    { title: 'Especificación', dataIndex: 'product_especification', key: 'product_especification' },
    { title: 'Unidad', dataIndex: 'unit', key: 'unit', align: 'center' },
    { title: 'Cant.', dataIndex: 'amount', key: 'amount', align: 'right', render: numberFormat },
    { title: 'P. Unitario', dataIndex: 'unit_price', key: 'unit_price', align: 'right', render: numberFormat },
    { title: 'P. Suministro', dataIndex: 'supply_price', key: 'supply_price', align: 'right', render: numberFormat },
    { title: 'IVA', dataIndex: 'vat', key: 'vat', align: 'right', render: numberFormat },
    { title: 'Observaciones', dataIndex: 'observations', key: 'observations' },
  ]

  const dataSource: (QuotationItem & { key: number })[] = useMemo(
    () => (data?.quotation_item || []).map((item, index) => ({ key: index, ...item })),
    [data?.quotation_item]
  )

  return (
    <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm flex items-center justify-between">
        <div>
          <Title level={2} text="Resumen de la Cotización" />
          <p className="text-xs text-muted-foreground mt-1">
            Verifica todos los datos antes de emitir y generar el documento final.
          </p>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {/* Información general */}
        <Col span={12}>
          <div className="h-full p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm">
            <Descriptions title="Información General" layout="vertical" bordered className="w-full">
              <Descriptions.Item label="Fecha">
                {data?.date ? dayjs(data.date).format('YYYY-MM-DD') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Cliente">{data?.customer || '-'}</Descriptions.Item>
              <Descriptions.Item label="Concepto">{data?.work_concept || '-'}</Descriptions.Item>
              <Descriptions.Item label="Duración">{data?.duration_of_work || '-'}</Descriptions.Item>
            </Descriptions>
          </div>
        </Col>

        {/* Información del proveedor */}
        <Col span={12}>
          <div className="h-full p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm">
            <Descriptions title="Información del Proveedor" layout="vertical" bordered className="w-full">
              <Descriptions.Item label="Nº Registro">{data?.registration_number || '-'}</Descriptions.Item>
              <Descriptions.Item label="Nombre comercial">{data?.comercial_name || '-'}</Descriptions.Item>
              <Descriptions.Item label="Representante">{data?.legal_representative || '-'}</Descriptions.Item>
              <Descriptions.Item label="Dirección">{data?.address || '-'}</Descriptions.Item>
              <Descriptions.Item label="Tipo negocio">{data?.type_of_business || '-'}</Descriptions.Item>
              <Descriptions.Item label="Categoría">{data?.category || '-'}</Descriptions.Item>
              <Descriptions.Item label="Tel / Fax">{data?.tel_fax || '-'}</Descriptions.Item>
              <Descriptions.Item label="Sitio Web">{data?.website || '-'}</Descriptions.Item>
            </Descriptions>
          </div>
        </Col>

        {/* Lista de suministros */}
        <Col span={24}>
          <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm space-y-3">
            <Title level={5} text="Insumos y Suministros Cotizados" />
            <div className="overflow-x-auto w-full">
              <Table columns={columns_table1} pagination={false} dataSource={dataSource} />
            </div>
          </div>
        </Col>

        {/* Totales y precios */}
        <Col span={24}>
          <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm">
            <Descriptions title="Totales Económicos" layout="vertical" bordered className="w-full">
              <Descriptions.Item label="Precio antes de impuestos">
                {formatKRW(data?.price_before_taxes || 0)}
              </Descriptions.Item>
              <Descriptions.Item label="IVA total">
                {formatKRW(data?.vat_total || 0)}
              </Descriptions.Item>
              <Descriptions.Item label="Precio Total">
                <span className="font-bold text-primary text-base">
                  {formatKRW(data?.total_price_number || 0)}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Precio total (en letras)">
                {data?.total_price_letter || '-'}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Col>
      </Row>
    </div>
  )
}
