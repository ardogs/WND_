import { DefaultOptionType } from 'antd/es/select';
import { useCompaniesStore } from '../../store/companies/useCompaniesStore'
import { useShallow } from 'zustand/shallow';
import { useMemo } from 'react';
// import { Company } from '../../features/companies/types';

export const useCompanies = () => {

    const {
        companyData,
        registration_number_id,
        isLoading,
        setCurrentCompany,
        updateSupplier,
        
    } = useCompaniesStore(
        useShallow(
            (state) => ({
                registration_number_id: state.registration_number_id,
                companyData: state.companyData,
                setCurrentCompany: state.setCurrentCompany,
                updateSupplier: state.updateSupplier,
                isLoading: state.isLoading
            })
        ));


    // useEffect(() => {
    //     if (companyData && companyData.length > 0) 
    //         setCurrentCompany(registration_number_id);
        
    // }, [companyData, setCurrentCompany, registration_number_id])


    const getSelectOptions = useMemo((): DefaultOptionType[] => {
        console.log('Arranque')
        return companyData.map((option) => ({
            value: option.registration_number,
            label: option.registration_number
        }))
    }, [companyData])

    const onCompanyChange = (company: string) => {
        const data = companyData.find(element => element.registration_number === company);
        if (!data) return;
        setCurrentCompany(data.registration_number);

    }

    return {
        companyData,
        registration_number_id,
        isLoading,
        getSelectOptions,
        onCompanyChange,
        updateSupplier
    }
}
