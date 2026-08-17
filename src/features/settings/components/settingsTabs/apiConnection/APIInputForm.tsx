import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Button } from '../../../../../components/atoms'
import { Input } from '../../../../../components/atoms/input/Input'
import { useSettings } from '../../../../../hooks'
import { apiUrlSchema, ApiUrlFormData } from '../../../schemas/settings.schema'

export const APIInputForm = () => {
  const [form] = Form.useForm<ApiUrlFormData>({
    resolver: zodResolver(apiUrlSchema) as any,
  })
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
      className="inline-flex items-center flex-row relative w-full max-w-[290px] h-9 bg-background border border-input rounded-lg shadow-2xs p-[3px] focus-within:border-ring focus-within:ring-1 focus-within:ring-ring transition-all"
      disabled={apiURLisLoading}
      form={form}
      initialValues={{ apiURL }}
    >
      <Form.Item name="apiURL" className="flex-1 min-w-0">
        <Input
          placeholder="http://localhost:3000"
          className="border-none bg-transparent shadow-none h-full text-[13px] px-2.5 rounded-none focus:outline-none focus:ring-0 focus-visible:ring-0"
        />
      </Form.Item>
      <Form.Item label={null} className="shrink-0">
        <Button
          type="primary"
          htmlType="submit"
          text="Guardar"
          size="sm"
          loading={apiURLisLoading}
          className="h-7 min-h-[28px] max-h-[28px] px-3 text-xs font-medium rounded-md shrink-0 shadow-xs"
        />
      </Form.Item>
    </Form>
  )
}
