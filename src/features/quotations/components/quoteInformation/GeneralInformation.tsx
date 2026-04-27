import { Input, Form, Col, Row, Divider, DatePicker } from '../../../../components/atoms'

export const GeneralInformation = () => {
    return (
        <Row gutter={8}>
            <Divider orientation="left" description='Información general' />
            <Col span={6}>
                <Form.Item label="Fecha" name='date' layout="vertical" rules={[{ required: true }]}>
                    <DatePicker />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Cliente" name='customer' layout="vertical" rules={[{ required: true  }]}>
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Concepto de trabajo" name='work_concept' layout="vertical" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Duracion del trabajo" name='duration_of_work' layout="vertical" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Col>
        </Row>
    )
}
