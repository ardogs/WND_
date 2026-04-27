import { useMemo } from 'react';
import dayjs from 'dayjs'
import { Title, Col, Row, Form, Table, Descriptions } from '../../../../components/atoms'
import { QuotationFormType, QuotationItem } from '../quoteForm/QuoteForm.data';
import { ColumnsType, AnyObject } from '../../../../components/atoms/table/types';
import { formatKRW } from '../../../../helpers/functions';
import "./styles.scss"
const numberFormat = (value: string) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const QuoteInformationReview = () => {

    const form = Form.useFormInstance();
    const data = form.getFieldsValue(true) as QuotationFormType;

    const columns_table1: ColumnsType<AnyObject> = [
        { title: "Descripción", dataIndex: 'description', key: 'description', align: 'right' },
        { title: "Especificación del producto", dataIndex: 'product_especification', key: 'product_especification', align: 'right' },
        { title: "Unidad", dataIndex: 'unit', key: 'unit', align: 'right' },
        { title: "Cantidad", dataIndex: 'amount', key: 'amount', align: 'right', render: numberFormat },
        { title: "Precio por unidad", dataIndex: 'unit_price', key: 'unit_price', align: 'right', render: numberFormat },
        { title: "Precio del suministro", dataIndex: 'supply_price', key: 'supply_price', align: 'right', render: numberFormat },
        { title: "IVA", dataIndex: 'vat', key: 'vat', align: 'right', render: numberFormat },
        { title: "Observaciones", dataIndex: 'observations', key: 'observations', align: 'right' },
    ];

    const dataSource: (QuotationItem & { key: number })[] = useMemo(() =>
        (data.quotation_item || []).map((item, index) => ({ key: index, ...item })),
        [data.quotation_item]
    );


    return (
        <div className='quouteReview-main-card scroll'>
            <Row gutter={[8, 8]}>
                <Col span={24}>
                    <div className="quoteReview-card shadow">
                        <Title level={2} text='Resumen de la cotización' />
                    </div>
                </Col>

                <Col span={12}>
                    <div className="quoteReview-card quoteReview-card-item shadow ">
                        <Descriptions title="Información general" layout='vertical' bordered className='description' >
                            <Descriptions.Item label="Fecha">{dayjs(data.date).format('MM/DD/YYYY')}</Descriptions.Item>
                            <Descriptions.Item label="Cliente">{data.customer}</Descriptions.Item>
                            <Descriptions.Item label="Concepto del trabajo"> {data.work_concept}</Descriptions.Item>
                            <Descriptions.Item label="Duración del trabajo">{data.duration_of_work}</Descriptions.Item>
                        </Descriptions>
                    </div>

                </Col>

                <Col span={12}>
                    <div className="quoteReview-card quoteReview-card-item shadow">
                        <div className='quoteReview-card-item-content'>
                            <Descriptions title="Información del proveedor" layout='vertical' bordered className='description' >
                                <Descriptions.Item label="Número de registro">{data.registration_number}</Descriptions.Item>
                                <Descriptions.Item label="Nombre comercial">{data.comercial_name}</Descriptions.Item>
                                <Descriptions.Item label="Representante legal"> {data.legal_representative}</Descriptions.Item>
                                <Descriptions.Item label="Dirección">{data.address}</Descriptions.Item>
                                <Descriptions.Item label="Tipo de negocio">{data.type_of_business}</Descriptions.Item>
                                <Descriptions.Item label="Categoría">{data.category}</Descriptions.Item>
                                <Descriptions.Item label="Tel / Fax"> {data.tel_fax}</Descriptions.Item>
                                <Descriptions.Item label="Sitio Web">{data.website}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    </div>
                </Col>

                <Col span={24}>
                    <div className="quoteReview-card quoteReview-card-item shadow">
                        <div className='quoteReview-card-item-content'>
                            <Title level={5} text='Información de los suministros' />
                            <Table columns={columns_table1} pagination={false} className='table' dataSource={dataSource} />
                        </div>
                    </div>
                </Col>

                <Col span={24}>
                    <div className="quoteReview-card quoteReview-card-item shadow ">
                        <div className='quoteReview-card-item-content'>
                            <Descriptions title="Precio total" layout='vertical' bordered className='description'>
                                <Descriptions.Item label="Precio antes de impuestos">{formatKRW(data.price_before_taxes)}</Descriptions.Item>
                                <Descriptions.Item label="IVA total">{formatKRW(data.vat_total)}</Descriptions.Item>
                                <Descriptions.Item label="Precio total">{formatKRW(data.total_price_number)}</Descriptions.Item>
                                <Descriptions.Item label="Precio total (en letras)">{data.total_price_letter}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    </div>
                </Col>
            </Row>
        </div >
    )
}
