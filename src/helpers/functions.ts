import axios from "axios";
import { ApiErrorResponse } from "../api/types";
import { Company } from "../features/companies/types";

/**
 * Formats a numerical or string value into South Korean Won (KRW) currency format.
 * Example: 100000 -> ₩100,000
 */
export const formatKRW = (value: number | string | undefined | null): string => {
    if (value === undefined || value === null || value === '') return '₩0';

    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        maximumFractionDigits: 0,
    }).format(Number(value));
};

/**
 * Formats a number or string with thousands separators.
 * Example: 1000000 -> "1,000,000"
 */
export const formatNumber = (value: number | string | undefined | null): string => {
    if (value === undefined || value === null || value === '') return '0';
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Parses and formats a date to YYYY-MM-DD string without requiring external libraries.
 */
export const formatDateToISO = (dateInput: string | Date | undefined | null): string => {
    if (!dateInput) return '';
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

/**
 * Parses and formats a date to DD/MM/YYYY string for display.
 */
export const formatDateToDisplay = (dateInput: string | Date | undefined | null): string => {
    if (!dateInput) return '-';
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);

    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
};

/**
 * Extracts form-compatible company field values from a Company object.
 */
export const extractCompanyFormValues = (company: Partial<Company> | undefined | null) => {
    if (!company) return {};
    return {
        registration_number: company.registration_number || '',
        comercial_name: company.comercial_name || '',
        legal_representative: company.legal_representative || '',
        address: company.address || '',
        type_of_business: company.type_of_business || '',
        category: company.category || '',
        tel_fax: company.tel_fax || '',
        website: company.website || '',
        img: company.img || '',
    };
};

/**
 * Normalizes HTTP / Axios errors into an ApiErrorResponse object.
 */
export const returnError = (error: unknown): ApiErrorResponse => {
    if (axios.isAxiosError(error)) {
        const errorMessage = error.message ?? 'An unexpected error occurred';
        return {
            statusCode: error.response?.status || 500,
            message: `Axios Error: ${errorMessage}`,
        };
    }

    return {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
};
