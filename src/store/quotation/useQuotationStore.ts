import { create } from "zustand";
import { QuotationFormType } from "../../features/quotations/components/quoteForm/QuoteForm.data";
import { useAuthStore } from "../settings/useAuthStore";
import { saveQuotation } from "../../api/quotations";
// import { CheckboxChangeEvent } from "antd";

type mode = 'read' | 'edit' | 'create';


interface QuotationForm {
    mode: mode
    calculateVatperItem: boolean
    calculateSupplyPrice: boolean
    calculatePriceBeforeTaxes: boolean
    calculateTotalVat: boolean
    calculateTotalPrice: boolean
    isLoading: boolean,
    error: string
}

interface QuotationActions {
    setAutomaticCalculation: (key: CheckItemKey, value: boolean) => void,
    sendQuotationData: (data: QuotationFormType) => Promise<boolean>
}

const initialValues: QuotationForm = {
    mode: "create",
    calculateVatperItem: true,
    calculatePriceBeforeTaxes: true,
    calculateSupplyPrice: true,
    calculateTotalVat: true,
    calculateTotalPrice: true,
    isLoading: false,
    error: ""
}

export type CheckItemKey = keyof typeof initialValues;

// const simulateAPI = (): Promise<Company[]> => {
//     // console.log(`Buscando usuario con ID: ${userId}...`);
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             // if (userId === 1) {
//             resolve(suppliersData);
//             // } else {
//             // reject({status: 400});
//             // }
//         }, 10); // Simulamos un retardo de 1.5 segundos
//     });
// };


export const useQuotationStore = create<QuotationForm & QuotationActions>((set) => ({
    ...initialValues,

    setAutomaticCalculation: (key, value) => {
        set(state => ({
            ...state,
            [key]: value,
        }))
    },

    sendQuotationData: async (data: QuotationFormType) => {
        const token = useAuthStore.getState().token
        set({ isLoading: true, error: "" })
        try {
            await saveQuotation(token, data)
            // get().fetchCompanies(token)
            set({ isLoading: false })
            return true
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, isLoading: false });
            return false
        }
    }
})) 