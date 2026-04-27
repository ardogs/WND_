import { Company } from "../features/companies/types";
import { axiosInstance } from "../providers/api/axiosInstance";
// import { AppSettings } from "./types";


export const fetchSupplierListAPI = async (token: string): Promise<Company[] | undefined> => {
    try {
        const response = await axiosInstance.get('/api/suppliers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const updateSupplier = async(token: string, data: Company): Promise<string | undefined> => {
    try {

        const response = await axiosInstance.patch('/api/suppliers/saveSupplier', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
            params: {
                reg: data.registration_number
            }
        });
        console.log(response)
        
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

