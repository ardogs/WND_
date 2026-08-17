import { useEffect } from 'react'
import { Form } from '../../../../../components/atoms'
import { Input } from '../../../../../components/atoms/input/Input'
import { Button } from '../../../../../components/atoms'
import { useSettings } from '../../../../../hooks'
import './styles.scss'

interface FormType {
  apiPWD: string
}

export const APIAccessForm = () => {
  const [form] = Form.useForm<FormType>()
  const { apiPWD, apiPWDisLoading, handleApiPwd } = useSettings()

  useEffect(() => {
    if (apiPWD && apiPWD !== '-') {
      form.setFieldValue('apiPWD', apiPWD)
    }
  }, [apiPWD, form])

  return (
    <Form
      onFinish={(value) => handleApiPwd(value.apiPWD)}
      layout="inline"
      className="api-input-form"
      disabled={apiPWDisLoading}
      form={form}
      initialValues={{ apiPWD: apiPWD !== '-' ? apiPWD : '' }}
    >
      <Form.Item
        name="apiPWD"
        rules={[{ required: true, message: 'Este campo es requerido' }]}
      >
        <Input
          placeholder="Contraseña"
          type="password"
          className="api-input"
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button
          type="primary"
          htmlType="submit"
          text="Conectar"
          size="sm"
          loading={apiPWDisLoading}
          className="api-submit-btn"
        />
      </Form.Item>
    </Form>
  )
}
