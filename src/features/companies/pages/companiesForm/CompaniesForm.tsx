import { useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Form, Button } from '../../../../components/atoms'
import { CompanyDataSelector } from '../../../../components/organisms'
import { useCompanies, useCompanyDataForm, useTitleBar } from '../../../../hooks'
import { TitleWithDescription } from '../../../../components/molecules'
import { AnimatedPage } from '../../../../components/layout'
import { useCompaniesForm } from '../../hooks/useCompaniesForm'
import { Company, companyDataSelectorMode } from '../../types'
import { companySchema } from '../../schemas/company.schema'

export const CompaniesForm = () => {
  const { mode = 'view', registration_number } = useParams()
  const { handleGoBack } = useTitleBar()
  const { updateSupplier, companyData } = useCompanies()

  const activeMode: companyDataSelectorMode =
    mode === 'edit' ? 'edit' : mode === 'default' ? 'default' : 'view'
  const activeRegNumber =
    registration_number || companyData[0]?.registration_number || ''

  const [form] = Form.useForm<Company>({
    resolver: zodResolver(companySchema) as any,
  })

  useCompaniesForm(activeRegNumber)
  useCompanyDataForm({ companyDataSelectorForm: form })

  const handleOnFinish = async (values: Company) => {
    const success = await updateSupplier(values)
    if (success) {
      handleGoBack()
    }
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <Flex align="end" justify="space-between">
          {activeMode === 'edit' ? (
            <TitleWithDescription
              title="Editar empresa"
              description="Edita la información de la empresa seleccionada"
            />
          ) : (
            <TitleWithDescription
              title="Información de tu empresa"
              description="Muestra información detallada de la empresa seleccionada"
            />
          )}
        </Flex>

        <Form
          form={form}
          className="mt-6 mb-8"
          onFinish={handleOnFinish}
        >
          <CompanyDataSelector
            mode={activeMode}
            defaultValue={activeRegNumber}
          />
          <Flex justify="center" align="center" gap={12} className="mt-8">
            <Button type="default" text="Volver" onClick={handleGoBack} />
            {activeMode === 'edit' && (
              <Button type="primary" htmlType="submit" text="Actualizar" />
            )}
          </Flex>
        </Form>
      </div>
    </AnimatedPage>
  )
}
