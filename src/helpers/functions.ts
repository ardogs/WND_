import axios from "axios";
import { ApiErrorResponse } from "../api/types";

export const formatKRW = (value: number | string | undefined | null) => {
    // Si el valor no existe, devolvemos 0 wones
    if (value === undefined || value === null || value === '') return '₩0';

    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        // El Won raramente usa decimales, esto lo limpia (ej: 1,000 en lugar de 1,000.00)
        maximumFractionDigits: 0
    }).format(Number(value));
};



export const returnError = (error: unknown): ApiErrorResponse => {
    if (axios.isAxiosError(error)) {
        // console.error("Error de Axios:", error.message);
        const errorMessage = error.message ?? 'An unexpected error occurred'
        return {
            statusCode: 500,
            message: `Axios Error: ${ errorMessage }`,
        };
    }

    // // // 2. Verificación manual para Fetch genérico
    // if (typeof error.response === 'object' && error !== null && 'message' in error) {
    //       const apiErr = error as ApiErrorResponse;
    //     console.error(`Error ${apiErr.data}: ${apiErr.statusText}`);
    // } else {
    //     console.error("Ocurrió un error inesperado", error);
    // }

    return {
        statusCode: 500,
        message: 'An unexpected error occurred',
    };
};
