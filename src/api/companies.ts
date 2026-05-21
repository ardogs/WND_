// import axios from "axios";
import { Company } from "../features/companies/types";
import { returnError } from "../helpers/functions";
import { axiosInstance } from "../providers/api/axiosInstance";
import { ApiErrorResponse } from "./types";
// import { ApiErrorResponse } from "./types";
// import { AppSettings } from "./types";


export const fetchSupplierListAPI = async (token: string): Promise<Company[] | ApiErrorResponse> => {
    try {
        const response = await axiosInstance.get('/api/suppliers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        return returnError(error)
    }
}

export const updateSupplier = async (token: string, data: Company): Promise<string | ApiErrorResponse> => {
    try {

        const response = await axiosInstance.patch('/api/suppliers/saveSupplier', data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                reg: data.registration_number
            }
        });

        return response.data;
    } catch (error) {
         return returnError(error)
    }
}

