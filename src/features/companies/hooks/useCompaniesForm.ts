import { useEffect } from "react"
import { useCompanies } from "../../../hooks";


export const useCompaniesForm = (registration_number: string) => {

    const { companyData, onCompanyChange, registration_number_id } = useCompanies();

    useEffect(() => {
        if (!registration_number) return;
        if (registration_number_id === registration_number) return;
        const company = companyData.find(item => item.registration_number === registration_number)
        if (company) {
            onCompanyChange(company.registration_number)
        }
    }, [companyData, onCompanyChange, registration_number, registration_number_id]);



    return {

    }
}
