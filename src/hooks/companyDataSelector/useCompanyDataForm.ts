import { useEffect } from "react";
import { FormInstance } from "../../components/atoms"
import { useCompanies } from "../companies";
import { QuotationFormType } from "../../features/quotations/components/quoteForm/QuoteForm.data";
import { Company } from "../../features/companies/types";
import { extractCompanyFormValues } from "../../helpers/functions";

interface Props {
    quotationForm?: FormInstance<QuotationFormType>
    companyDataSelectorForm?: FormInstance<Company>
}

export const useCompanyDataForm = ({ quotationForm, companyDataSelectorForm }: Props) => {
    const { companyData, registration_number_id } = useCompanies();
    const selectedId = registration_number_id || (companyData[0]?.registration_number ?? '');
    const data = companyData.find(element => element.registration_number === selectedId) || companyData[0];

    useEffect(() => {
        if (!quotationForm || !data) return;
        quotationForm.setFieldsValue(extractCompanyFormValues(data));
    }, [quotationForm, data]);

    useEffect(() => {
        if (!companyDataSelectorForm || !data) return;
        companyDataSelectorForm.setFieldsValue(extractCompanyFormValues(data) as Partial<Company>);
    }, [companyDataSelectorForm, data]);
}
