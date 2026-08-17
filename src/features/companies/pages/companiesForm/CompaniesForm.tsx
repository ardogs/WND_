import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, Sliders, FileSpreadsheet } from 'lucide-react'
import { Flex, Form, Button, Tabs } from '../../../../components/atoms'
import { CompanyDataSelector } from '../../../../components/organisms'
import { useCompanies, useCompanyDataForm, useTitleBar } from '../../../../hooks'
import { TitleWithDescription } from '../../../../components/molecules'
import { AnimatedPage } from '../../../../components/layout'
import { useCompaniesForm } from '../../hooks/useCompaniesForm'
import { Company, companyDataSelectorMode } from '../../types'
import { companySchema } from '../../schemas/company.schema'
import { toast } from 'sonner'
import { QuotationFieldsConfig, QuotationExcelMappingConfig } from '../../components'

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
  useCompanyDataForm({ companyDataSelectorForm: form, defaultRegistrationNumber: activeRegNumber })

  const handleOnFinish = async (values: Company) => {
    const loadingToast = toast.loading('Guardando cambios...')
    try {
      const success = await updateSupplier(values)
      if (success) {
        toast.success('Cambios guardados con éxito', {
          id: loadingToast,
          description: `La empresa ${values.comercial_name || values.registration_number} y su configuración de cotización se guardaron correctamente.`,
        })
        handleGoBack()
      } else {
        toast.error('Error al guardar', {
          id: loadingToast,
          description: 'No se pudieron guardar los cambios. Por favor, revisa la información e intenta de nuevo.',
        })
      }
    } catch {
      toast.error('Error inesperado', {
        id: loadingToast,
        description: 'Ocurrió un problema al intentar actualizar el proveedor.',
      })
    }
  }

  const tabItems = useMemo(
    () => [
      {
        key: 'company-info',
        label: 'Datos de la Empresa',
        icon: <Building2 className="w-4 h-4" />,
        children: (
          <div className="pt-2">
            <CompanyDataSelector
              mode={activeMode}
              defaultValue={activeRegNumber}
            />
          </div>
        ),
      },
      {
        key: 'quotation-fields',
        label: 'Campos a renderizar',
        icon: <Sliders className="w-4 h-4" />,
        children: (
          <div className="pt-2">
            <QuotationFieldsConfig mode={activeMode} />
          </div>
        ),
      },
      {
        key: 'excel-mapping',
        label: 'Posiciones en Excel',
        icon: <FileSpreadsheet className="w-4 h-4" />,
        children: (
          <div className="pt-2">
            <QuotationExcelMappingConfig mode={activeMode} />
          </div>
        ),
      },
    ],
    [activeMode, activeRegNumber]
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <Flex align="end" justify="space-between">
          {activeMode === 'edit' ? (
            <TitleWithDescription
              title="Editar empresa"
              description="Edita la información de la empresa, configura los campos visibles y sus posiciones en Excel"
            />
          ) : (
            <TitleWithDescription
              title="Información de tu empresa"
              description="Muestra información de la empresa, campos a renderizar y posiciones en la plantilla Excel"
            />
          )}
        </Flex>

        <Form
          form={form}
          preserve={true}
          className="mt-6 mb-8"
          onFinish={handleOnFinish}
        >
          <Tabs items={tabItems} defaultActiveKey="company-info" />

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

