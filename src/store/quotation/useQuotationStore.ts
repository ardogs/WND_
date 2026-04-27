import { create } from "zustand";
// import { CheckboxChangeEvent } from "antd";

type mode = 'read' | 'edit' | 'create';


interface QuotationForm {
    mode: mode
    calculateVatperItem: boolean
    calculateSupplyPrice: boolean
    calculatePriceBeforeTaxes: boolean
    calculateTotalVat: boolean
    calculateTotalPrice: boolean
}

interface QuotationActions {
    setAutomaticCalculation: (key: CheckItemKey, value: boolean) => void
}

const initialValues: QuotationForm = {
    mode: "create",
    calculateVatperItem: true,
    calculatePriceBeforeTaxes: true,
    calculateSupplyPrice: true,
    calculateTotalVat: true,
    calculateTotalPrice: true,
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
    }
})) 