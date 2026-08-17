import { DefaultOptionType } from '../../components/atoms/select/types'
import { useCompaniesStore } from '../../store/companies/useCompaniesStore'
import { useShallow } from 'zustand/shallow'
import { useMemo, useEffect, useCallback } from 'react'

export const useCompanies = () => {
  const {
    companyData,
    registration_number_id,
    isLoading,
    setCurrentCompany,
    updateSupplier,
  } = useCompaniesStore(
    useShallow((state) => ({
      registration_number_id: state.registration_number_id,
      companyData: state.companyData,
      setCurrentCompany: state.setCurrentCompany,
      updateSupplier: state.updateSupplier,
      isLoading: state.isLoading,
    }))
  )

  useEffect(() => {
    if (
      companyData &&
      companyData.length > 0 &&
      (!registration_number_id ||
        !companyData.some((c) => c.registration_number === registration_number_id))
    ) {
      setCurrentCompany(companyData[0].registration_number)
    }
  }, [companyData, registration_number_id, setCurrentCompany])

  const getSelectOptions = useMemo((): DefaultOptionType[] => {
    return companyData.map((option) => ({
      value: option.registration_number,
      label: `${option.registration_number} - ${option.comercial_name || 'Proveedor'}`,
    }))
  }, [companyData])

  const onCompanyChange = useCallback(
    (company: string) => {
      const data = companyData.find(
        (element) => element.registration_number === company
      )
      if (!data) return
      if (data.registration_number !== registration_number_id) {
        setCurrentCompany(data.registration_number)
      }
    },
    [companyData, registration_number_id, setCurrentCompany]
  )

  return {
    companyData,
    registration_number_id,
    isLoading,
    getSelectOptions,
    onCompanyChange,
    updateSupplier,
  }
}
