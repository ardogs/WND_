import { useEffect } from "react"
import { useCompanies } from "../../../hooks";


export const useCompaniesForm = (registration_number: string) => {

    const { companyData, onCompanyChange } = useCompanies();

    useEffect(() => {

        const company = companyData.find(item => item.registration_number === registration_number)
        if (company)
            onCompanyChange(company.registration_number)
    }, [companyData, onCompanyChange, registration_number]);



    return {

    }
}
