import { useMemo } from 'react'
import { Form } from '../../../../components/atoms'
import { Steps, CompanyDataSelector } from '../../../../components/organisms'
import { StepsContent, useCompanyDataForm } from '../../../../hooks'
import { useFormList } from '../../hooks/quotationForm'
import { QuoteGetFile } from '../quoteGetFile'
import { QuoteBody } from '../quoteInformation'
import { QuoteInformationReview } from '../quoteReview'
import { initialValues, QuotationFormType } from './QuoteForm.data'
import { zodResolver } from '@hookform/resolvers/zod'
import { quotationSchema } from '../../schemas/quotation.schema'

export const QuoteForm = () => {
  const [form] = Form.useForm<QuotationFormType>({
    resolver: zodResolver(quotationSchema) as any,
    defaultValues: initialValues as any,
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  useCompanyDataForm({ quotationForm: form })
  const { handleOnFieldChange, handleSendQuotation } = useFormList({ form })

  const handleOnFinish = async () => {
    const data = form.getFieldsValue(true)
    await handleSendQuotation(data)
  }

  const steps: StepsContent[] = useMemo(
    () => [
      {
        title: 'Información del proveedor',
        content: <CompanyDataSelector mode="default" />,
        fieldsToValidate: ['registration_number'],
      },
      {
        title: 'Detalles de la cotización',
        content: <QuoteBody />,
        fieldsToValidate: ['customer', 'work_concept', 'duration_of_work', 'quotation_item'],
      },
      {
        title: 'Resumen de la cotización',
        content: <QuoteInformationReview />,
      },
      {
        title: 'Obtener archivo',
        content: <QuoteGetFile />,
      },
    ],
    []
  )

  return (
    <Form
      initialValues={initialValues}
      preserve={true}
      onFinish={handleOnFinish}
      form={form}
      onValuesChange={handleOnFieldChange}
      className="flex-1 flex flex-col min-h-0 w-full"
    >
      <Steps stepsArray={steps} />
    </Form>
  )
}
