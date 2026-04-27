import { DefaultOptionType } from 'antd/es/select';
import { useCompaniesStore } from '../../store/companies/useCompaniesStore'
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';

export const useCompanies = (company = 0) => {

    const { registration_number,
        comercial_name,
        legal_representative,
        address,
        type_of_business,
        category,
        tel_fax,
        website,
        img,
        companyData,
        isLoading,
        setCompanyData,
        updateSupplier
    } = useCompaniesStore(
        useShallow(
            (state) => ({
                registration_number: state.registration_number,
                comercial_name: state.comercial_name,
                legal_representative: state.legal_representative,
                address: state.address,
                type_of_business: state.type_of_business,
                category: state.category,
                tel_fax: state.tel_fax,
                website: state.website,
                img: state.img,
                companyData: state.companyData,
                setCompanyData: state.setCompanyData,
                updateSupplier: state.updateSupplier,
                isLoading: state.isLoading
            })
        ));


    useEffect(() => {
        if(companyData && companyData.length > 0 && companyData[company]) {
            setCompanyData(companyData[company]);
        }
    }, [companyData, company, setCompanyData])







    const getSelectOptions = (): DefaultOptionType[] => {
        return companyData.map((option) => ({
            value: option.registration_number,
            label: option.registration_number
        }))
    }

    const onCompanyChange = (company: string) => {
        const data = companyData.find(element => element.registration_number === company);
        if (!data) return;

        setCompanyData(data);
    }

    return {
        registration_number,
        comercial_name,
        legal_representative,
        address,
        type_of_business,
        category,
        tel_fax,
        website,
        img,
        companyData,
        isLoading,
        getSelectOptions,
        onCompanyChange,
        updateSupplier
    }
}
