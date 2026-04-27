import { Input, Row, Col, Form } from '../../atoms'
import { companyDataSelectorMode } from './types'

interface Props {
    mode: companyDataSelectorMode
}

export const CompanyDetailsForm = ({ mode }: Props) => {

    return (
        <div className='company-card company-card-form shadow' >
            <Row gutter={[8, 1]} align="middle" justify="center">
                <Col span={24}>
                    <Form.Item label="Número de registro" name='registration_number' layout="vertical" rules={[{ required: true, message: 'This field is requiered' }]}>
                        <Input disabled/>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="Nombre comercial" name='comercial_name' layout="vertical" rules={[{ required: true, message: 'This field is requiered' }]}>
                        <Input disabled={ mode === 'edit' ? false : true } />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Representante legal" name='legal_representative' layout="vertical" rules={[{ required: true, message: 'This field is requiered' }]}>
                        <Input disabled={ mode === 'edit' ? false : true } />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label="Dirección legal" name='address' layout="vertical" rules={[{ required: true, message: 'This field is requiered' }]}>
                        <Input disabled={ mode === 'edit' ? false : true } />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="Tipo de negocio" name='type_of_business' layout="vertical" rules={[{ required: true, message: 'This field is requiered' }]}>
                        <Input disabled={ mode === 'edit' ? false : true } />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Categoría" name='category' layout="vertical" rules={[{ required: true, message: 'This field is requiered' }]}>
                        <Input disabled={ mode === 'edit' ? false : true } />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Telefono / Fax" name='tel_fax' layout="vertical" rules={[{ required: true, message: 'This field is requiered' }]}>
                        <Input disabled={ mode === 'edit' ? false : true } />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Sitio web" name='website' layout="vertical" rules={[{ required: true, message: 'This field is requiered' }]}>
                        <Input disabled={ mode === 'edit' ? false : true } />
                    </Form.Item>
                </Col>

                
            </Row>
        </div>
    )
}
