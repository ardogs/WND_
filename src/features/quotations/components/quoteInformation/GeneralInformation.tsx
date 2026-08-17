import { Input, Form, Col, Row, Divider, DatePicker } from '../../../../components/atoms'

export const GeneralInformation = () => {
  return (
    <div className="w-full">
      <Divider orientation="left" description="Información general" />
      <Row gutter={[16, 8]}>
        <Col span={6}>
          <Form.Item
            label="Fecha"
            name="date"
            layout="vertical"
            rules={[{ required: true, message: 'La fecha es obligatoria' }]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Cliente"
            name="customer"
            layout="vertical"
            rules={[{ required: true, message: 'El cliente es obligatorio' }]}
          >
            <Input placeholder="Nombre del cliente" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Concepto de trabajo"
            name="work_concept"
            layout="vertical"
            rules={[{ required: true, message: 'El concepto de trabajo es obligatorio' }]}
          >
            <Input placeholder="Ej. Instalación de ventanas" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Duración del trabajo"
            name="duration_of_work"
            layout="vertical"
            rules={[{ required: true, message: 'La duración del trabajo es obligatoria' }]}
          >
            <Input placeholder="Ej. 15 días" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}
