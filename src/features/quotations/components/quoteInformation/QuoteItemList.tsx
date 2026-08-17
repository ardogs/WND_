import { useEffect } from 'react'
import { Button, Col, Divider, Form, IconButton, Input, Row, Flex, InputNumber } from '../../../../components/atoms'
import { useFormList } from '../../hooks/quotationForm'
import { CalculateItemCheck } from './CalculateItemCheck'
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai'
import { useFieldArray } from 'react-hook-form'
import { QuotationFormType } from '../quoteForm/QuoteForm.data'

const initValue = {
  description: '',
  product_especification: '',
  unit: '',
  amount: 0,
  unit_price: 0,
  supply_price: 0,
  vat: 0,
  observations: '',
}

export const QuoteItemList = () => {
  const form = Form.useFormInstance<QuotationFormType>()
  const { calculateSupplyPrice, calculateVatperItem } = useFormList({ form })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'quotation_item',
  })

  useEffect(() => {
    if (fields.length === 0) {
      append(initValue)
    }
  }, [fields.length, append])

  return (
    <div className="w-full">
      <Divider orientation="left" description="Lista de insumos" />

      <Flex justify="flex-end" align="center" className="quoute-item-check mb-3">
        <CalculateItemCheck />
      </Flex>

      <div className="quoute-item-list w-full space-y-2.5">
        {fields.map((field, index) => (
          <Row gutter={[6, 1]} key={field.id} align="middle">
            <Col span={4}>
              <Form.Item
                name={`quotation_item.${index}.description`}
                rules={[{ required: true, message: 'La descripción es obligatoria' }]}
                label={index < 1 ? 'Descripción' : undefined}
                layout="vertical"
              >
                <Input placeholder="Descripción" size="small" />
              </Form.Item>
            </Col>

            <Col span={3}>
              <Form.Item
                name={`quotation_item.${index}.product_especification`}
                rules={[{ required: true, message: 'La especificación es obligatoria' }]}
                label={index < 1 ? 'Especificación' : undefined}
                layout="vertical"
              >
                <Input placeholder="Especificación" size="small" />
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item
                name={`quotation_item.${index}.unit`}
                rules={[{ required: true, message: 'La unidad es obligatoria' }]}
                label={index < 1 ? 'Unidad' : undefined}
                layout="vertical"
              >
                <Input placeholder="Unidad" size="small" />
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item
                name={`quotation_item.${index}.amount`}
                rules={[{ required: true, message: 'La cantidad es obligatoria' }]}
                label={index < 1 ? 'Cant.' : undefined}
                layout="vertical"
              >
                <InputNumber placeholder="0" size="small" />
              </Form.Item>
            </Col>

            <Col span={3}>
              <Form.Item
                name={`quotation_item.${index}.unit_price`}
                rules={[{ required: true, message: 'El precio unitario es obligatorio' }]}
                label={index < 1 ? 'P. Unitario' : undefined}
                layout="vertical"
              >
                <InputNumber placeholder="0" size="small" />
              </Form.Item>
            </Col>

            <Col span={3}>
              <Form.Item
                name={`quotation_item.${index}.supply_price`}
                rules={[{ required: true, message: 'El precio de suministro es obligatorio' }]}
                label={index < 1 ? 'P. Suministro' : undefined}
                layout="vertical"
              >
                <InputNumber placeholder="0" size="small" disabled={calculateSupplyPrice} />
              </Form.Item>
            </Col>

            <Col span={3}>
              <Form.Item
                name={`quotation_item.${index}.vat`}
                rules={[{ required: true, message: 'El IVA es obligatorio' }]}
                label={index < 1 ? 'IVA' : undefined}
                layout="vertical"
              >
                <InputNumber placeholder="0" size="small" disabled={calculateVatperItem} />
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item
                name={`quotation_item.${index}.observations`}
                label={index < 1 ? 'Observaciones' : undefined}
                layout="vertical"
              >
                <div className="flex items-center gap-1.5 w-full">
                  <Input placeholder="Observaciones" size="small" />
                  <IconButton
                    size="small"
                    className="red text-destructive hover:bg-destructive/10 shrink-0"
                    icon={<AiOutlineCloseCircle className="text-base" />}
                    onClick={() => remove(index)}
                    disabled={fields.length < 2}
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>
        ))}

        <Flex justify="center" className="mt-4">
          <Button
            onClick={() => append(initValue)}
            icon={<AiOutlinePlus />}
            text="Agregar insumo"
            type="dashed"
            size="small"
          />
        </Flex>
      </div>
    </div>
  )
}
