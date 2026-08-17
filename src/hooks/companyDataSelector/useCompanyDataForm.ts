import { useEffect } from "react";
import { FormInstance } from "../../components/atoms"
import { useCompanies } from "../companies";
import { QuotationFormType } from "../../features/quotations/components/quoteForm/QuoteForm.data";
import { Company } from "../../features/companies/types";

interface Props {
    quotationForm?: FormInstance<QuotationFormType>
    companyDataSelectorForm?: FormInstance<Company>
}

export const useCompanyDataForm = ({ quotationForm, companyDataSelectorForm }: Props) => {
    const { companyData, registration_number_id } = useCompanies();
    const selectedId = registration_number_id || (companyData[0]?.registration_number ?? '');
    const data = companyData.find(element => element.registration_number === selectedId) || companyData[0];

    useEffect(() => {
        if (quotationForm === undefined || !data)
            return;

        quotationForm.setFieldsValue({
            registration_number: data.registration_number,
            comercial_name: data.comercial_name,
            legal_representative: data.legal_representative,
            address: data.address,
            type_of_business: data.type_of_business,
            category: data.category,
            tel_fax: data.tel_fax,
            website: data.website
        })
    }, [quotationForm, data]);

    useEffect(() => {
        if (companyDataSelectorForm === undefined || !data)
            return;

        companyDataSelectorForm.setFieldsValue({
            registration_number: data.registration_number,
            comercial_name: data.comercial_name,
            legal_representative: data.legal_representative,
            address: data.address,
            type_of_business: data.type_of_business,
            category: data.category,
            tel_fax: data.tel_fax,
            website: data.website
        })
    }, [companyDataSelectorForm, data])
}
