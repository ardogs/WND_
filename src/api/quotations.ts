
// import { Company } from "../features/companies/types";
import { QuotationFormType } from "../features/quotations/components/quoteForm/QuoteForm.data";
import { returnError } from "../helpers/functions";
import { axiosInstance } from "../providers/api/axiosInstance";
import { ApiErrorResponse } from "./types";


export const saveQuotation = async (token: string, data: QuotationFormType): Promise<string | ApiErrorResponse> => {
    try {

        const response = await axiosInstance.post('/api/quotations/processQuotation', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
         return returnError(error)
    }
}
