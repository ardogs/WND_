
import { Button, Col, Divider, Form, IconButton, Input, Row, Flex, InputNumber } from '../../../../components/atoms';
import { useFormList } from '../../hooks/quotationForm';

import { CalculateItemCheck } from './CalculateItemCheck';
import { AiOutlineCloseCircle, AiOutlinePlus, } from 'react-icons/ai';

const initValue = {
    description: "",
    product_especification: "",
    unit: "",
    amount: 0,
    unit_price: 0,
    supply_price: 0,
    vat: 0,
    observations: "",
}

export const QuoteItemList = () => {

    const form = Form.useFormInstance();
    const { calculateSupplyPrice, calculateVatperItem } = useFormList({ form });

    return (
        <Row gutter={[8, 1]} align="middle" justify="center">
            <Divider orientation="left" description='Lista de insumos' />

            <Flex justify='flex-end' align='flex-end' className='quoute-item-check'>
                <CalculateItemCheck />
            </Flex>

            <Form.List name="quotation_item">
                {(fields, { add, remove }) => (

                    <div className='quoute-item-list'>
                        {fields.map(({ key, name, ...restField }, index) => (

                            <Row gutter={[8, 1]} key={key} justify="center" align="middle">

                                <Col span={3}>
                                    <Form.Item {...restField} name={[name, 'description']} rules={[{ required: true }]} label={index < 1 && "Descripción"} layout="vertical" >
                                        <Input placeholder="Descripción" />
                                    </Form.Item>
                                </Col>

                                <Col span={3}>
                                    <Form.Item {...restField} name={[name, 'product_especification']} rules={[{ required: true }]} label={index < 1 && "Espeficación del producto"} layout="vertical">
                                        <Input placeholder="Espeficación del producto" />
                                    </Form.Item></Col>

                                <Col span={3}>
                                    <Form.Item {...restField} name={[name, 'unit']} rules={[{ required: true }]} label={index < 1 && "Unidad"} layout="vertical">
                                        <Input placeholder="Unidad" />
                                    </Form.Item>
                                </Col>


                                <Col span={3}>
                                    <Form.Item {...restField} name={[name, 'amount']} rules={[{ required: true },]} label={index < 1 && "Cantidad"} layout="vertical" >
                                        <InputNumber placeholder='Cantidad' />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item {...restField} name={[name, 'unit_price']} rules={[{ required: true }]} label={index < 1 && "Precio de unitario"} layout="vertical" >
                                        <InputNumber placeholder='Precio unitario' />
                                    </Form.Item>
                                </Col>

                                <Col span={3}>
                                    <Form.Item {...restField} name={[name, 'supply_price']} rules={[{ required: true }]} label={index < 1 && "Precio"} layout="vertical" >
                                        <InputNumber placeholder='Precio' disabled={calculateSupplyPrice} />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item {...restField} name={[name, 'vat']} rules={[{ required: true }]} label={index < 1 && "IVA"} layout="vertical" >
                                        <InputNumber placeholder='IVA' disabled={calculateVatperItem} />
                                    </Form.Item>
                                </Col>

                                <Col span={3}>
                                    <Form.Item {...restField} name={[name, 'observations']} rules={[{ required: true }]} label={index < 1 && "Observaciones"} layout="vertical" >
                                        <Flex align='center' justify='space-around' gap={10}>
                                            <Input placeholder="Observaciones" />
                                            <IconButton size='large' icon={<AiOutlineCloseCircle />} onClick={() => remove(name)} disabled={fields.length < 2} />
                                        </Flex>
                                    </Form.Item>
                                </Col>
                            </Row>
                        ))}

                        <Flex justify='center'>
                            <Button color='default' variant='filled'
                                onClick={() => add(initValue)}
                                icon={<AiOutlinePlus />}  text='Agregar' type='dashed' />
                        </Flex>
                    </div>
                )}
            </Form.List>
        </Row>

    );
};

