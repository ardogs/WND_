import { useEffect, useRef } from "react";
import { FormInstance } from "../../components/atoms"
import { useCompanies } from "../companies";
import { QuotationFormType } from "../../features/quotations/components/quoteForm/QuoteForm.data";
import { Company } from "../../features/companies/types";
import { extractCompanyFormValues } from "../../helpers/functions";

interface Props {
    quotationForm?: FormInstance<QuotationFormType>
    companyDataSelectorForm?: FormInstance<Company>
    defaultRegistrationNumber?: string
}

export const useCompanyDataForm = ({ quotationForm, companyDataSelectorForm, defaultRegistrationNumber }: Props) => {
    const { companyData, registration_number_id } = useCompanies();
    const selectedId = defaultRegistrationNumber || registration_number_id || (companyData[0]?.registration_number ?? '');
    const data = companyData.find(element => element.registration_number === selectedId) || companyData[0];
    
    const prevQuotationCompanyRef = useRef<string | null>(null);
    const prevCompanyFormRef = useRef<string | null>(null);

    useEffect(() => {
        if (!quotationForm || !data) return;
        if (prevQuotationCompanyRef.current === data.registration_number) return;
        prevQuotationCompanyRef.current = data.registration_number;
        quotationForm.setFieldsValue(extractCompanyFormValues(data));
    }, [quotationForm, data]);

    useEffect(() => {
        if (!companyDataSelectorForm || !data) return;
        if (prevCompanyFormRef.current === data.registration_number) return;
        prevCompanyFormRef.current = data.registration_number;
        companyDataSelectorForm.setFieldsValue(extractCompanyFormValues(data) as Partial<Company>);
    }, [companyDataSelectorForm, data]);
}
