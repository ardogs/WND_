import { CompanyDocumentCard } from './CompanyDocumentCard'
import { CompanyDetailsForm } from './CompanyDetailsForm'
import { useCompanies } from '../../../hooks'
import { companyDataSelectorMode } from '../../../features/companies/types'

interface Props {
  mode: companyDataSelectorMode
  defaultValue?: string
}

export const CompanyDataSelector = ({ mode, defaultValue }: Props) => {
  const {
    getSelectOptions,
    registration_number_id,
    onCompanyChange,
    companyData,
    ...rest
  } = useCompanies()

  const selectedId =
    defaultValue || registration_number_id || (companyData[0]?.registration_number ?? '')
  const data =
    companyData.find((element) => element.registration_number === selectedId) || companyData[0]
  const handleDefaultValue = () =>
    defaultValue === undefined ? selectedId : defaultValue

  return (
    <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-center rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="w-full lg:w-[48%] xl:w-[50%] p-5 sm:p-7 lg:p-8 bg-muted/20 border-b lg:border-b-0 lg:border-r border-border flex flex-col items-center justify-center">
        <CompanyDocumentCard
          option={getSelectOptions}
          defaultValue={handleDefaultValue()}
          img={data?.img || ''}
          companyName={data?.comercial_name}
          registrationNumber={data?.registration_number}
          onChangeSelect={onCompanyChange}
          mode={mode}
        />
      </div>
      <div className="w-full lg:w-[52%] xl:w-[50%] p-5 sm:p-7 lg:p-8 flex flex-col justify-center">
        <CompanyDetailsForm mode={mode} {...rest} />
      </div>
    </div>
  )
}
