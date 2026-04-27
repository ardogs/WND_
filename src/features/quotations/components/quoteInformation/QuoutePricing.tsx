import { Flex, Form, Row, Col, Divider, InputNumber, Input } from "../../../../components/atoms"
import { useFormList } from "../../hooks/quotationForm";
import { CalculateTotalCheck } from "./CalculateTotalCheck"


const MIN_NUMBER = 0;
const MAX_NUMBER = 100000000;
const formatter = (value: number | string | undefined) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')


export const QuoutePricing = () => {

    const form = Form.useFormInstance();
    const { calculateTotalPrice, calculateTotalVat, calculatePriceBeforeTaxes } = useFormList({ form });

    return (
        <Row gutter={[8, 1]} align="middle" justify="center">
            <Divider orientation="left" description="Precio total de la cotización" />
            <Flex justify='flex-end' align='flex-end' className="calculate-total-check">
                <CalculateTotalCheck />
            </Flex>

            <Col span={6}>
                <Form.Item label="Precio antes de impuestos" name='price_before_taxes' layout="vertical" rules={[{ required: true}]}>
                    <InputNumber
                        disabled={calculatePriceBeforeTaxes}
                        formatter={formatter}
                        min={MIN_NUMBER}
                        max={MAX_NUMBER}
                        controls={false}
                    />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="IVA total" name='vat_total' layout="vertical" rules={[{ required: true}]}>
                    <InputNumber
                        disabled={calculateTotalVat}
                        formatter={formatter}
                        min={MIN_NUMBER}
                        max={MAX_NUMBER}
                        controls={false}
                    />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Precio total" name='total_price_number' layout="vertical" rules={[{ required: true}]}>
                    <InputNumber
                        disabled={calculateTotalPrice}
                        formatter={formatter}
                        min={MIN_NUMBER}
                        max={MAX_NUMBER}
                        controls={false}
                    />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Precio total en letras" name='total_price_letter' layout="vertical" rules={[{ required: true}]}>
                    <Input placeholder='Precio en letras' />
                </Form.Item>
            </Col>
        </Row>
    )
}
