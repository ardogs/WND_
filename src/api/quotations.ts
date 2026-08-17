
import { QuotationFormType } from "../features/quotations/components/quoteForm/QuoteForm.data";
import { returnError } from "../helpers/functions";
import { axiosInstance } from "../providers/api/axiosInstance";
import { ApiErrorResponse } from "./types";

export interface ProcessQuotationResponse {
    success: boolean;
    message: string;
    quotation: QuotationFormType & { _id: string; createdAt: string; updatedAt: string };
    filePath: string;
    fileName: string;
    downloadUrl: string;
}

export interface QuotationsListResponse {
    success: boolean;
    count: number;
    quotations: (QuotationFormType & { _id: string; createdAt: string; updatedAt: string })[];
}

/**
 * Envía los datos del formulario de cotización, genera el Excel y guarda en MongoDB.
 */
export const saveQuotation = async (
    token: string,
    data: QuotationFormType
): Promise<ProcessQuotationResponse | ApiErrorResponse> => {
    try {
        const response = await axiosInstance.post<ProcessQuotationResponse>(
            '/api/quotations/processQuotation',
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        return returnError(error);
    }
};

/**
 * Obtiene todas las cotizaciones almacenadas en la base de datos.
 */
export const getAllQuotations = async (
    token: string
): Promise<QuotationsListResponse | ApiErrorResponse> => {
    try {
        const response = await axiosInstance.get<QuotationsListResponse>(
            '/api/quotations',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        return returnError(error);
    }
};

/**
 * Obtiene los detalles de una cotización específica por ID.
 */
export const getQuotationById = async (
    token: string,
    id: string
): Promise<{ success: boolean; quotation: any } | ApiErrorResponse> => {
    try {
        const response = await axiosInstance.get(`/api/quotations/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return returnError(error);
    }
};

/**
 * Descarga el archivo Excel en formato Blob para el navegador/React.
 */
export const downloadQuotationExcelBlob = async (
    token: string,
    id: string
): Promise<Blob | ApiErrorResponse> => {
    try {
        const response = await axiosInstance.get(`/api/quotations/${id}/download`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        return returnError(error);
    }
};

/**
 * Elimina una cotización por ID.
 */
export const deleteQuotationApi = async (
    token: string,
    id: string
): Promise<{ success: boolean; message: string } | ApiErrorResponse> => {
    try {
        const response = await axiosInstance.delete(`/api/quotations/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return returnError(error);
    }
};

