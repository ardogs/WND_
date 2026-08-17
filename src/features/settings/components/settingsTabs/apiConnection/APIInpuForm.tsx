import { useEffect } from 'react'
import { Form } from '../../../../../components/atoms'
import { Input } from '../../../../../components/atoms/input/Input'
import { Button } from '../../../../../components/atoms'
import { useSettings } from '../../../../../hooks'
import './styles.scss'

interface FormType {
  apiURL: string
}

export const APIInpuForm = () => {
  const [form] = Form.useForm<FormType>()
  const { apiURL, apiURLisLoading, handleApiUrl } = useSettings()

  useEffect(() => {
    if (apiURL) {
      form.setFieldValue('apiURL', apiURL)
    }
  }, [apiURL, form])

  return (
    <Form
      onFinish={(value) => handleApiUrl(value.apiURL)}
      layout="inline"
      className="api-input-form"
      disabled={apiURLisLoading}
      form={form}
      initialValues={{ apiURL }}
    >
      <Form.Item
        name="apiURL"
        rules={[
          { required: true, message: 'Este campo es requerido' },
          { type: 'url', message: 'Ingresa una dirección válida' },
        ]}
      >
        <Input
          placeholder="http://localhost:3000"
          className="api-input"
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button
          type="primary"
          htmlType="submit"
          text="Guardar"
          size="sm"
          loading={apiURLisLoading}
          className="api-submit-btn"
        />
      </Form.Item>
    </Form>
  )
}
