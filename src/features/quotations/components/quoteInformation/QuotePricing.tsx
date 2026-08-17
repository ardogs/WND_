import { Flex, Form, Row, Col, Divider, InputNumber, Input } from '../../../../components/atoms'
import { useFormList } from '../../hooks/quotationForm'
import { CalculateTotalCheck } from './CalculateTotalCheck'
import { QuotationFormType } from '../quoteForm/QuoteForm.data'

const MIN_NUMBER = 0
const MAX_NUMBER = 100000000

export const QuotePricing = () => {
  const form = Form.useFormInstance<QuotationFormType>()
  const { calculateTotalPrice, calculateTotalVat, calculatePriceBeforeTaxes } = useFormList({ form })

  return (
    <div className="w-full">
      <Divider orientation="left" description="Precio total de la cotización" />
      <Flex justify="flex-end" align="center" className="w-full mb-3">
        <CalculateTotalCheck />
      </Flex>

      <Row gutter={[16, 8]}>
        <Col span={6}>
          <Form.Item
            label="Precio antes de impuestos"
            name="price_before_taxes"
            layout="vertical"
          >
            <InputNumber
              disabled={calculatePriceBeforeTaxes}
              min={MIN_NUMBER}
              max={MAX_NUMBER}
              controls={false}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="IVA total"
            name="vat_total"
            layout="vertical"
          >
            <InputNumber
              disabled={calculateTotalVat}
              min={MIN_NUMBER}
              max={MAX_NUMBER}
              controls={false}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Precio total"
            name="total_price_number"
            layout="vertical"
          >
            <InputNumber
              disabled={calculateTotalPrice}
              min={MIN_NUMBER}
              max={MAX_NUMBER}
              controls={false}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Precio total en letras"
            name="total_price_letter"
            layout="vertical"
          >
            <Input placeholder="Precio en letras" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}
