import { Form, Input, Col, Row } from '../../atoms'
import { companyDataSelectorMode } from '../../../features/companies/types'

interface Props {
  mode: companyDataSelectorMode
}

export const CompanyDetailsForm = ({ mode }: Props) => {
  const isEditable = mode === 'edit'

  return (
    <div className="w-full">
      <Row gutter={[12, 10]} align="middle">
        <Col span={24}>
          <Form.Item
            label="Número de registro"
            name="registration_number"
            layout="vertical"
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Nombre comercial"
            name="comercial_name"
            layout="vertical"
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <Input disabled={!isEditable} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Representante legal"
            name="legal_representative"
            layout="vertical"
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <Input disabled={!isEditable} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Dirección legal"
            name="address"
            layout="vertical"
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <Input disabled={!isEditable} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Tipo de negocio"
            name="type_of_business"
            layout="vertical"
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <Input disabled={!isEditable} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Categoría"
            name="category"
            layout="vertical"
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <Input disabled={!isEditable} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Teléfono / Fax"
            name="tel_fax"
            layout="vertical"
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <Input disabled={!isEditable} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Sitio web"
            name="website"
            layout="vertical"
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <Input disabled={!isEditable} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}
